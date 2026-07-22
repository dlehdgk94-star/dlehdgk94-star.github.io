(function () {
    // ── AI 챗봇 UI 주입 ──
    var html = `
<div id="ai-chat-wrap">
    <!-- 플로팅 버튼 -->
    <div id="ai-chat-btn-wrap" onclick="toggleAiChat()">
        <button id="ai-chat-btn" aria-label="AI 컨시어지 열기">
            <img src="${getBase()}images/symbol-icon.png" alt="AI">
        </button>
        <span id="ai-chat-label">Chat GPT</span>
    </div>

    <!-- 채팅창 -->
    <div id="ai-chat-box">
        <!-- 헤더 -->
        <div id="ai-chat-header">
            <div id="ai-chat-title">
                <img src="${getBase()}images/symbol-icon.png" alt="AI" id="ai-chat-logo">
                <div>
                    <div id="ai-chat-title-text">챗GPT</div>
                    <div id="ai-chat-subtitle">인스타 호텔 AI 상담</div>
                </div>
            </div>
            <button id="ai-chat-close" onclick="toggleAiChat()" aria-label="닫기">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>

        <!-- 메시지 영역 -->
        <div id="ai-chat-messages">
            <div class="ai-msg ai-msg-bot">
                <div class="ai-msg-bubble">안녕하세요! 무엇이든 편하게 물어보세요 😊</div>
            </div>
        </div>

        <!-- 입력창 -->
        <div id="ai-chat-input-row">
            <textarea id="ai-chat-input" placeholder="메시지를 입력하세요..." rows="1" onkeydown="aiChatKeydown(event)"></textarea>
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

/* 플로팅 버튼 */
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

/* 채팅창 */
#ai-chat-box {
    display: none;
    flex-direction: column;
    width: 340px;
    height: 480px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.16);
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
    padding: 14px 16px;
    background: rgb(28,28,28);
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
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    font-family: 'Barlow', sans-serif;
}
#ai-chat-subtitle {
    font-size: 11px;
    color: rgba(255,255,255,0.6);
    font-family: 'Barlow', sans-serif;
    margin-top: 1px;
}
#ai-chat-close {
    background: none;
    border: none;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.15s;
}
#ai-chat-close:hover { color: #fff; }
#ai-chat-close:focus { outline: none; }

/* 메시지 영역 */
#ai-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #f7f7f7;
}
#ai-chat-messages::-webkit-scrollbar { width: 4px; }
#ai-chat-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

/* 말풍선 */
.ai-msg { display: flex; }
.ai-msg-bot { justify-content: flex-start; }
.ai-msg-user { justify-content: flex-end; }
.ai-msg-bubble {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 13px;
    line-height: 1.55;
    font-family: 'Barlow', sans-serif;
    word-break: break-word;
}
.ai-msg-bot .ai-msg-bubble {
    background: #fff;
    color: rgb(28,28,28);
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}
.ai-msg-user .ai-msg-bubble {
    background: rgb(28,28,28);
    color: #fff;
    border-bottom-right-radius: 4px;
}

/* 입력창 */
#ai-chat-input-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 12px 14px;
    border-top: 1px solid #eee;
    background: #fff;
    flex-shrink: 0;
}
#ai-chat-input {
    flex: 1;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 9px 14px;
    font-size: 13px;
    font-family: 'Barlow', sans-serif;
    resize: none;
    outline: none;
    line-height: 1.4;
    max-height: 80px;
    overflow-y: auto;
    color: rgb(28,28,28);
    transition: border-color 0.15s;
}
#ai-chat-input:focus { border-color: rgb(100,100,100); }
#ai-chat-send {
    width: 36px;
    height: 36px;
    background: rgb(28,28,28);
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

/* 모바일 */
@media (max-width: 768px) {
    #ai-chat-wrap { bottom: 16px; right: 16px; }
    #ai-chat-box { width: calc(100vw - 32px); height: 70vh; max-height: 520px; }
    #ai-chat-btn { width: 50px; height: 50px; }
}
</style>
`;

    function getBase() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.indexOf('ai-chat.js') !== -1) {
                return scripts[i].src.replace('ai-chat.js', '');
            }
        }
        return '';
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', html);
        if (typeof setLanguage === 'function' && typeof currentLang !== 'undefined') {
            setLanguage(currentLang);
        }
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

    window.aiChatSend = function () {
        var input = document.getElementById('ai-chat-input');
        var text = input.value.trim();
        if (!text) return;

        addMsg(text, 'user');
        input.value = '';
        input.style.height = 'auto';

        // TODO: OpenAI API 연동 예정
        setTimeout(function () {
            addMsg('죄송합니다, 현재 AI 서비스 준비 중입니다. 전화(+82 31-203-4301)로 문의해 주세요.', 'bot');
        }, 600);
    };

    window.aiChatKeydown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            window.aiChatSend();
        }
    };

    function addMsg(text, type) {
        var messages = document.getElementById('ai-chat-messages');
        var div = document.createElement('div');
        div.className = 'ai-msg ai-msg-' + type;
        div.innerHTML = '<div class="ai-msg-bubble">' + escHtml(text) + '</div>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function escHtml(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
})();
