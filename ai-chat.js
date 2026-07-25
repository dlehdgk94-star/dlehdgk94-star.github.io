(function () {
    // ── AI 챗봇 UI 주입 ──
    var html = `
<div id="ai-chat-wrap">
    <!-- 플로팅 버튼 행 -->
    <div id="ai-side-icons-row">
        <a id="gemini-btn-wrap" href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" aria-label="Gemini">
            <div id="gemini-btn-icon">
                <img src="/images/gemini-color.svg" alt="Gemini">
            </div>
            <span id="gemini-label">Gemini</span>
        </a>
        <div id="ai-chat-btn-wrap" onclick="toggleAiChat()">
            <button id="ai-chat-btn" aria-label="AI 컨시어지 열기">
                <img src="/images/symbol-icon.png" alt="AI">
            </button>
            <span id="ai-chat-label">Chat GPT</span>
        </div>
    </div>

    <!-- 채팅창 -->
    <div id="ai-chat-box">
        <!-- 헤더 -->
        <div id="ai-chat-header">
            <div id="ai-chat-title">
                <img src="/images/symbol-icon.png" alt="AI" id="ai-chat-logo">
                <div id="ai-chat-title-text">Chat GPT</div>
            </div>
            <button id="ai-chat-close" onclick="toggleAiChat()" aria-label="닫기">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>

        <!-- 메시지 영역 -->
        <div id="ai-chat-messages">
            <!-- 첫 진입 안내 (첫 메시지 전송 시 숨김) -->
            <div id="ai-chat-empty">
                <img src="/images/symbol-icon.png" alt="AI" id="ai-chat-empty-icon">
                <div id="ai-chat-empty-text">무엇이든 편하게 물어보세요</div>
            </div>
        </div>

        <!-- 입력창 -->
        <div id="ai-chat-input-row">
            <textarea id="ai-chat-input" placeholder="ChatGPT에게 물어보세요" rows="1" onkeydown="aiChatKeydown(event)"></textarea>
            <button id="ai-chat-send" onclick="aiChatSend()">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9L16 2L9 16L8 10L2 9Z" fill="currentColor"/></svg>
            </button>
        </div>
    </div>
</div>

<style>
#ai-chat-wrap {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 99000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}

/* 플로팅 버튼 행 */
#ai-side-icons-row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 12px;
}
/* Gemini 버튼 */
#gemini-btn-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    cursor: pointer;
}
#gemini-btn-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}
#gemini-btn-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.2s;
}
#gemini-btn-wrap:hover #gemini-btn-icon img { transform: scale(1.08); }
#gemini-label {
    font-size: 13px;
    font-weight: 700;
    color: rgb(58, 154, 180);
    font-family: 'Barlow', sans-serif;
    letter-spacing: 0.2px;
    user-select: none;
    text-align: center;
    line-height: 1.5;
}
/* ChatGPT 플로팅 버튼 */
#ai-chat-btn-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}
#ai-chat-label {
    font-size: 13px;
    font-weight: 700;
    color: rgb(58, 154, 180);
    font-family: 'Barlow', sans-serif;
    letter-spacing: 0.2px;
    user-select: none;
    text-align: center;
    line-height: 1.5;
}
#ai-chat-btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #fff;
    border: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s;
    padding: 0;
    overflow: hidden;
    flex-shrink: 0;
}
#ai-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(0,0,0,0.22); }
#ai-chat-btn:focus { outline: none; }
#ai-chat-btn img { width: 72%; height: 72%; object-fit: contain; border-radius: 0; }

/* 채팅창 (데스크탑 769px 이상) */
#ai-chat-box {
    display: none;
    flex-direction: column;
    width: 520px;
    height: 720px;
    max-height: calc(100vh - 140px);
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    overflow: hidden;
    animation: aiChatOpen 0.22s ease;
}
#ai-chat-box.open { display: flex; }

@keyframes aiChatOpen {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* 헤더 */
#ai-chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    background: #ffffff;
    border-bottom: 1px solid #ececec;
    flex-shrink: 0;
}
#ai-chat-title {
    display: flex;
    align-items: center;
    gap: 10px;
}
#ai-chat-logo {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    object-fit: contain;
    background: #fff;
}
#ai-chat-title-text {
    font-size: 16px;
    font-weight: 500;
    color: #202020;
    font-family: 'Barlow', sans-serif;
}
#ai-chat-close {
    background: none;
    border: none;
    color: #8e8e8e;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.15s;
}
#ai-chat-close:hover { color: #202020; }
#ai-chat-close:focus { outline: none; }

/* 메시지 영역 */
#ai-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #fff;
}
#ai-chat-messages::-webkit-scrollbar { width: 4px; }
#ai-chat-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

/* 첫 진입 안내 (세로 중앙) */
#ai-chat-empty {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#ai-chat-empty-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
}
#ai-chat-empty-text {
    margin-top: 16px;
    font-size: 18px;
    font-weight: 400;
    color: #202020;
    font-family: 'Barlow', sans-serif;
    text-align: center;
}

/* 말풍선 (ChatGPT 방식) */
.ai-msg { display: flex; }
.ai-msg-bot { justify-content: flex-start; }
.ai-msg-user { justify-content: flex-end; }
.ai-msg-bubble {
    font-size: 15px;
    line-height: 1.7;
    font-family: 'Barlow', sans-serif;
    word-break: break-word;
}
/* 봇: 배경 없이 왼쪽 정렬 평문 */
.ai-msg-bot .ai-msg-bubble {
    max-width: 100%;
    color: rgb(28,28,28);
}
/* 사용자: 오른쪽 정렬, 연한 회색 버블 */
.ai-msg-user .ai-msg-bubble {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 18px;
    background: #f0f0f0;
    color: rgb(28,28,28);
}

/* 봇 답변 내부 마크다운 요소 */
.ai-msg-bot .ai-msg-bubble a {
    color: rgb(58,154,180);
    text-decoration: none;
    word-break: break-all;
}
.ai-msg-bot .ai-msg-bubble a:hover { text-decoration: underline; }
.ai-msg-bot .ai-msg-bubble strong { font-weight: 700; }
.ai-md-list {
    margin: 6px 0;
    padding-left: 20px;
}
.ai-md-list li { margin: 2px 0; }

/* 출처 링크 (웹 검색 시) */
.ai-msg-citations {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.ai-msg-citations a {
    font-size: 13px;
    color: rgb(58,154,180);
    text-decoration: none;
    word-break: break-all;
    line-height: 1.4;
}
.ai-msg-citations a:hover { text-decoration: underline; }

/* 로딩 표시 */
.ai-msg-loading .ai-msg-bubble { color: #999; font-style: italic; }

/* 입력 영역 — 대화창과 같은 흰 배경, 상단 구분선 없음 */
#ai-chat-input-row {
    position: relative;
    padding: 12px 16px 16px;
    background: #ffffff;
    flex-shrink: 0;
}
#ai-chat-input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    background: #ffffff;
    padding: 12px 52px 12px 18px;
    font-size: 15px;
    font-family: 'Barlow', sans-serif;
    resize: none;
    outline: none;
    line-height: 1.4;
    max-height: 96px;
    overflow-y: auto;
    color: rgb(28,28,28);
    transition: border-color 0.15s;
}
#ai-chat-input::placeholder { color: #9e9e9e; }
#ai-chat-input:focus { border-color: rgb(100,100,100); }
#ai-chat-send {
    position: absolute;
    right: 24px;
    bottom: 24px;
    width: 32px;
    height: 32px;
    background: #202020;
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s;
}
#ai-chat-send:hover { background: #444; }
#ai-chat-send:focus { outline: none; }
/* 입력이 비어 있거나 전송 중이면 비활성 표시 */
#ai-chat-send:disabled { background: #d4d4d4; cursor: default; }

/* 모바일 */
@media (max-width: 768px) {
    #ai-chat-wrap { bottom: 72px; right: 16px; }
    #ai-chat-box { width: calc(100vw - 32px); height: 70vh; max-height: 520px; }
    #ai-chat-btn { width: 50px; height: 50px; }
    #ai-side-icons-row { display: none; }
}
</style>
`;

    function getBase() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.indexOf('ai-chat.js') !== -1) {
                return scripts[i].src.split('ai-chat.js')[0];
            }
        }
        return '';
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', html);
        if (typeof setLanguage === 'function' && typeof currentLang !== 'undefined') {
            setLanguage(currentLang);
        }
        // 입력 여부에 따라 전송 버튼 활성/비활성 실시간 반영
        var input = document.getElementById('ai-chat-input');
        if (input) input.addEventListener('input', refreshSendBtn);
        refreshSendBtn();
    });

    // ── 전역 함수 ──
    window.toggleAiChat = function () {
        var box = document.getElementById('ai-chat-box');
        if (!box) return;
        box.classList.toggle('open');
        if (box.classList.contains('open')) {
            setTimeout(function () {
                document.getElementById('ai-chat-input').focus();
            }, 100);
        }
    };

    // ── 챗봇 서버 설정 ──
    var AI_CHAT_ENDPOINT = 'https://lbhdujheuokkmiowobzu.supabase.co/functions/v1/ai-chat';
    // 기존 Edge Function 호출과 동일한 publishable key 헤더 구조 (로그인 없이 호출)
    var AI_CHAT_ANON = 'sb_publishable_2X3S_RgN_0ipbUtR-zAV6A_yIp1n5PC';
    var CLIENT_TIMEOUT_MS = 45000; // 서버 40초보다 조금 길게
    var CLIENT_ERROR_REPLY = '죄송합니다, 일시적인 오류가 발생했습니다. 프런트(031-203-4301, 24시간)로 문의해 주세요.';

    var chatHistory = [];   // { role, content } — 서버로 보낼 이전 대화
    var aiChatSending = false;

    function getLang() {
        try {
            if (typeof currentLang !== 'undefined' && currentLang) return currentLang;
            var s = sessionStorage.getItem('siteLang');
            if (s) return s;
        } catch (e) {}
        return 'ko';
    }

    window.aiChatSend = function () {
        if (aiChatSending) return; // 전송 중 중복 전송 방지

        var input = document.getElementById('ai-chat-input');
        if (!input) return;
        var text = input.value.trim();
        if (!text) return;

        // 첫 메시지 전송 시 안내 화면 숨김
        var emptyEl = document.getElementById('ai-chat-empty');
        if (emptyEl) emptyEl.style.display = 'none';

        addMsg(text, 'user');
        input.value = '';
        input.style.height = 'auto';

        aiChatSending = true;
        refreshSendBtn();

        // 서버로 보낼 히스토리 (현재 메시지 이전까지, 최근 10개)
        var historyToSend = chatHistory.slice(-10);
        chatHistory.push({ role: 'user', content: text });

        var loadingEl = addLoading();

        var controller = new AbortController();
        var timeoutId = setTimeout(function () { controller.abort(); }, CLIENT_TIMEOUT_MS);

        fetch(AI_CHAT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AI_CHAT_ANON
            },
            body: JSON.stringify({
                message: text,
                history: historyToSend,
                lang: getLang()
            }),
            signal: controller.signal
        }).then(function (res) {
            // 본문 파싱 실패는 예외가 아니라 정상 시나리오로 취급
            // (Supabase 플랫폼이 우리 JSON 없이 429 등을 반환할 수 있음)
            return res.json().then(function (data) {
                return { ok: res.ok, data: data };
            }).catch(function () {
                return { ok: res.ok, data: null };
            });
        }).then(function (result) {
            var data = result.data;
            var reply;
            var citations = null;
            var usedWebSearch = false;

            if (data && typeof data.reply === 'string' && data.reply) {
                reply = data.reply;
                usedWebSearch = data.usedWebSearch === true;
                if (usedWebSearch && Array.isArray(data.citations)) citations = data.citations;
            } else {
                reply = CLIENT_ERROR_REPLY;
            }

            addMsg(reply, 'bot', (usedWebSearch && citations) ? citations : null);
            chatHistory.push({ role: 'assistant', content: reply });
        }).catch(function () {
            // 네트워크 오류 / 타임아웃(abort) 등
            addMsg(CLIENT_ERROR_REPLY, 'bot');
        }).finally(function () {
            clearTimeout(timeoutId);           // 타이머 정리
            removeLoading(loadingEl);           // 로딩 DOM 제거 (존재 여부 확인 포함)
            aiChatSending = false;              // 전송 중 상태 해제
            refreshSendBtn();                   // 입력 버튼 상태 갱신
        });
    };

    // 전송 중이거나 입력이 비어 있으면 전송 버튼 비활성
    function refreshSendBtn() {
        var btn = document.getElementById('ai-chat-send');
        var input = document.getElementById('ai-chat-input');
        if (!btn) return;
        var empty = !input || input.value.trim() === '';
        btn.disabled = aiChatSending || empty;
    }

    window.aiChatKeydown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            window.aiChatSend();
        }
    };

    // ── 최소 마크다운 → 안전한 HTML 변환 (봇 답변용) ──
    function escHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // 한 줄 내부 인라인 요소 변환 (입력은 이미 이스케이프된 문자열)
    function mdInline(s) {
        // [제목](URL) → 링크 : http/https URL 만 허용
        s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, function (m, label, url) {
            return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
        });
        // 맨 URL 자동 링크 : 앞 문자가 따옴표/꺾쇠/= (이미 만든 링크 내부)면 제외
        s = s.replace(/(^|[^"'>=\]])(https?:\/\/[^\s<]+)/g, function (m, pre, url) {
            return pre + '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
        });
        // **굵게** → <strong>
        s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return s;
    }

    function renderMarkdown(raw) {
        // 1) 먼저 이스케이프 (XSS 방지 — 순서 중요)
        var esc = escHtml(raw);
        // 2) 줄 단위로 불릿/일반 줄 처리
        var lines = esc.split('\n');
        var parts = [];
        var i = 0;
        while (i < lines.length) {
            if (/^\s*-\s+/.test(lines[i])) {
                var items = [];
                while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
                    items.push('<li>' + mdInline(lines[i].replace(/^\s*-\s+/, '')) + '</li>');
                    i++;
                }
                parts.push('<ul class="ai-md-list">' + items.join('') + '</ul>');
            } else {
                var textLines = [];
                while (i < lines.length && !/^\s*-\s+/.test(lines[i])) {
                    textLines.push(mdInline(lines[i]));
                    i++;
                }
                parts.push(textLines.join('<br>'));
            }
        }
        return parts.join('');
    }

    function addMsg(text, type, citations) {
        var messages = document.getElementById('ai-chat-messages');
        if (!messages) return;
        var div = document.createElement('div');
        div.className = 'ai-msg ai-msg-' + type;

        var bubble = document.createElement('div');
        bubble.className = 'ai-msg-bubble';
        if (type === 'bot') {
            // 봇 답변만 마크다운 렌더링 (이스케이프 후 허용 패턴만 태그화)
            bubble.innerHTML = renderMarkdown(text);
        } else {
            // 사용자 입력은 변환 없이 textContent 로만 표시
            bubble.textContent = text;
        }

        // 출처 링크 (웹 검색 결과가 있을 때만)
        if (Array.isArray(citations) && citations.length > 0) {
            var cites = document.createElement('div');
            cites.className = 'ai-msg-citations';
            for (var i = 0; i < citations.length; i++) {
                var c = citations[i];
                if (!c || typeof c.url !== 'string' || !/^https?:\/\//i.test(c.url)) continue;
                var a = document.createElement('a');
                a.href = c.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                // 외부 URL·제목은 textContent 로만 삽입
                a.textContent = (c.title && String(c.title).trim()) ? String(c.title) : c.url;
                cites.appendChild(a);
            }
            if (cites.childNodes.length > 0) bubble.appendChild(cites);
        }

        div.appendChild(bubble);
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function addLoading() {
        var messages = document.getElementById('ai-chat-messages');
        if (!messages) return null;
        var div = document.createElement('div');
        div.className = 'ai-msg ai-msg-bot ai-msg-loading';
        div.innerHTML = '<div class="ai-msg-bubble">답변을 작성하고 있어요...</div>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    function removeLoading(el) {
        // 이미 제거됐더라도 오류 없이 동작
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }
})();
