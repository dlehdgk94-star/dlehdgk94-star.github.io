// ingest-places.mjs
// 주변 장소 청크를 임베딩해서 Supabase knowledge_base 에 넣는 1회성 스크립트.
// 외부 의존성 없이 Node.js 내장 fetch 사용 (Node 18+ 필요).
//
// 실행 전 환경변수 설정 필요:
//   OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// (README/안내 참고. 키 값은 코드/로그에 남기지 않는다.)

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const EMBED_MODEL = 'text-embedding-3-small'; // 정확히 1536차원 — 테이블과 일치해야 함
const EMBED_BATCH = 100;   // 임베딩 한 번에 100개
const INSERT_BATCH = 100;  // Supabase insert 배치 크기
const CHUNKS_FILE = join(__dirname, 'place_chunks.json');

/* ── 1. 환경변수 검증 ── */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function fail(msg) {
  console.error('❌ ' + msg);
  process.exit(1);
}

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  const missing = [
    !OPENAI_API_KEY ? 'OPENAI_API_KEY' : null,
    !SUPABASE_URL ? 'SUPABASE_URL' : null,
    !SUPABASE_SERVICE_ROLE_KEY ? 'SUPABASE_SERVICE_ROLE_KEY' : null,
  ].filter(Boolean).join(', ');
  fail('환경변수가 설정되지 않았습니다: ' + missing);
}

// 끝의 슬래시 제거
const SB_URL = SUPABASE_URL.replace(/\/+$/, '');
const KB_ENDPOINT = SB_URL + '/rest/v1/knowledge_base';

const sbHeaders = {
  'apikey': SUPABASE_SERVICE_ROLE_KEY,
  'Authorization': 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
  'Content-Type': 'application/json',
};

/* ── 유틸 ── */
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/* ── 2. OpenAI 임베딩 (index 기준 정렬) ── */
async function embedBatch(inputs) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + OPENAI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error('OpenAI 임베딩 실패 (HTTP ' + res.status + '): ' + body.slice(0, 500));
  }

  const json = await res.json();
  if (!json || !Array.isArray(json.data) || json.data.length !== inputs.length) {
    throw new Error('OpenAI 응답 형식 오류: data 길이가 입력과 다릅니다.');
  }

  // 순서를 가정하지 않고 index 필드 기준으로 정렬
  const sorted = json.data.slice().sort((a, b) => a.index - b.index);
  return sorted.map((d) => d.embedding);
}

/* ── 3. Supabase 저장 ── */
async function insertBatch(rows) {
  const res = await fetch(KB_ENDPOINT, {
    method: 'POST',
    headers: { ...sbHeaders, 'Prefer': 'return=minimal' },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error('Supabase insert 실패 (HTTP ' + res.status + '): ' + body.slice(0, 500));
  }
}

/* ── 재실행 안전장치: 기존 source='place' 전부 삭제 ──
   ★ source=eq.place 만 삭제한다. FAQ(source='qa') 298건은 건드리지 않는다. */
async function deleteExistingPlace() {
  const res = await fetch(KB_ENDPOINT + '?source=eq.place', {
    method: 'DELETE',
    headers: sbHeaders,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error('기존 place 삭제 실패 (HTTP ' + res.status + '): ' + body.slice(0, 500));
  }
}

/* ── 메인 ── */
async function main() {
  // 청크 로드
  let chunks;
  try {
    const raw = await readFile(CHUNKS_FILE, 'utf8');
    chunks = JSON.parse(raw);
  } catch (err) {
    fail('place_chunks.json 읽기/파싱 실패: ' + err.message);
  }
  if (!Array.isArray(chunks) || chunks.length === 0) {
    fail('place_chunks.json 에 유효한 청크가 없습니다.');
  }
  console.log('청크 ' + chunks.length + '건 로드됨');

  // 기존 place 삭제
  console.log('기존 source=place 행 삭제 중...');
  await deleteExistingPlace();
  console.log('기존 place 삭제 완료');

  // 임베딩 (배치)
  const contents = chunks.map((c) => c.content);
  const embeddings = new Array(chunks.length);
  const embedBatches = chunk(contents, EMBED_BATCH);
  let done = 0;
  for (let b = 0; b < embedBatches.length; b++) {
    const batch = embedBatches[b];
    let vecs;
    try {
      vecs = await embedBatch(batch);
    } catch (err) {
      fail('임베딩 배치 ' + (b + 1) + '/' + embedBatches.length + ' 실패: ' + err.message);
    }
    for (let i = 0; i < vecs.length; i++) embeddings[done + i] = vecs[i];
    done += batch.length;
    console.log('임베딩 ' + done + '/' + chunks.length);
  }

  // 행 구성
  const rows = chunks.map((c, i) => ({
    source: c.source,
    category: c.category,
    content: c.content,
    embedding: embeddings[i],
  }));

  // 저장 (배치)
  const insertBatches = chunk(rows, INSERT_BATCH);
  let saved = 0;
  for (let b = 0; b < insertBatches.length; b++) {
    try {
      await insertBatch(insertBatches[b]);
    } catch (err) {
      fail('저장 배치 ' + (b + 1) + '/' + insertBatches.length + ' 실패: ' + err.message);
    }
    saved += insertBatches[b].length;
    console.log('저장 ' + saved + '/' + chunks.length);
  }

  console.log('✅ 저장 완료 ' + saved + '건');
}

main().catch((err) => {
  fail('예기치 못한 오류: ' + (err && err.message ? err.message : String(err)));
});
