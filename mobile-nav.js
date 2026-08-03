(function () {
    var path = window.location.pathname.replace(/\\/g, '/');
    var isSubfolder = path.indexOf('/rooms/') !== -1;
    var base = isSubfolder ? '../' : '';

    function isActive(page) {
        if (page === 'index.html') return /index\.html$|\/insta-hotel-html\/?$|\/[^/]*$/.test(path) && !isSubfolder && !/rooms\.html|gallery\.html|nearby\.html|booking/.test(path);
        if (page === 'rooms.html') return /rooms\.html$/.test(path) || isSubfolder;
        if (page === 'gallery.html') return /gallery\.html$/.test(path);
        if (page === 'nearby.html') return /nearby\.html$/.test(path);
        return false;
    }

    function link(page, label, i18nKey) {
        var cls = isActive(page) ? ' class="mob-active"' : '';
        var i18n = i18nKey ? ' data-i18n="' + i18nKey + '"' : '';
        return '<li><a href="' + base + page + '"' + cls + i18n + '>' + label + '</a></li>';
    }

    var overlay = document.createElement('div');
    overlay.id = 'mobileNavOverlay';
    overlay.innerHTML =
        '<div id="mobileNavDrawer">' +
            '<button id="mobileNavClose"><i class="fa-solid fa-xmark"></i></button>' +
            '<div class="mob-nav-logo">' +
                '<a href="' + base + 'index.html"><img src="' + base + 'instalogo.png" alt="INSTA HOTEL"></a>' +
            '</div>' +
            '<ul class="mob-nav-links">' +
                link('index.html', '호텔소개', 'nav.hotel') +
                link('rooms.html', '객실예약', 'nav.rooms') +
                link('gallery.html', '갤러리', 'nav.gallery') +
                link('nearby.html', '주변안내', 'nav.nearby') +
            '</ul>' +
            '<div class="mob-nav-footer">' +
                '<a href="https://www.instagram.com/instar_hotel_/" target="_blank"><i class="fa-brands fa-instagram"></i></a>' +
                '<div class="mob-nav-contact">+82 31-203-4301</div>' +
            '</div>' +
        '</div>';

    function openNav() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        var taxiBtns = document.getElementById('taxi-btns-wrap');
        if (taxiBtns) taxiBtns.style.display = 'none';
    }
    function closeNav() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        var taxiBtns = document.getElementById('taxi-btns-wrap');
        if (taxiBtns) taxiBtns.style.display = '';
    }

    var isIndexPage = /index\.html$|\/insta-hotel-html\/?$|\/[^/]*$/.test(path) && !isSubfolder && !/rooms\.html|gallery\.html|nearby\.html|booking/.test(path);
    var isGalleryOrNearby = /gallery\.html$|nearby\.html$|rooms\.html$/.test(path) || isSubfolder;

    document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(overlay);

        // 현재 언어로 nav 항목 번역 적용 (translations.js가 먼저 실행된 경우 대비)
        if (typeof currentLang !== 'undefined' && typeof t === 'function') {
            overlay.querySelectorAll('[data-i18n]').forEach(function(el) {
                var val = t(el.getAttribute('data-i18n'));
                if (val) el.textContent = val;
            });
        }

        // index.html 외 모든 페이지(갤러리/주변안내 제외): sticky 래퍼 + 서브헤더 + 예약하기 버튼 주입 (모바일 전용)
        if (!isIndexPage && !isGalleryOrNearby && window.innerWidth <= 768) {
            // rooms.html 등 기존 sticky-wrapper를 모바일에서 JS로 직접 숨김
            var existingSticky = document.querySelector('.sticky-wrapper');
            if (existingSticky && window.innerWidth <= 768) {
                existingSticky.style.setProperty('display', 'none', 'important');
            }

            // ── 예약 팝업 HTML 주입 (index.html과 동일 구조, 동일 CSS 클래스 사용) ──
            // 각 팝업을 body에 직접 append (wrapper div 없이)
            function injectPopup(html) {
                var tmp = document.createElement('div');
                tmp.innerHTML = html;
                document.body.appendChild(tmp.firstElementChild);
            }
            injectPopup(
                '<div class="booking-dropdown calendar-dropdown" id="ext-calendarPopup" onclick="event.stopPropagation()">' +
                    '<i class="fa-solid fa-xmark dropdown-close" onclick="closeDropdowns(event)"></i>' +
                    '<div class="cal-months-wrap">' +
                        '<div class="cal-month">' +
                            '<div class="cal-month-header">' +
                                '<i class="fa-solid fa-chevron-left" onclick="extChangeMonth(-1)"></i>' +
                                '<span id="ext-cal-month-title-left"></span>' +
                                '<i class="fa-solid fa-chevron-right cal-nav-right-mob" onclick="event.stopPropagation(); extChangeMonth(1)"></i>' +
                            '</div>' +
                            '<div class="cal-grid" id="ext-cal-grid-left"></div>' +
                        '</div>' +
                        '<div class="cal-month">' +
                            '<div class="cal-month-header">' +
                                '<span></span>' +
                                '<span id="ext-cal-month-title-right"></span>' +
                                '<i class="fa-solid fa-chevron-right" onclick="extChangeMonth(1)"></i>' +
                            '</div>' +
                            '<div class="cal-grid" id="ext-cal-grid-right"></div>' +
                        '</div>' +
                    '</div>' +
                    '<button class="dropdown-done-btn" onclick="extCalendarDone(event)">완료</button>' +
                '</div>'
            );
            injectPopup(
                '<div class="booking-dropdown guest-dropdown" id="ext-guestPopup" onclick="event.stopPropagation()">' +
                    '<i class="fa-solid fa-xmark dropdown-close" onclick="closeDropdowns(event)"></i>' +
                    '<div class="guest-row">' +
                        '<div class="guest-label-box"><span class="g-title">객실</span></div>' +
                        '<div class="guest-controls">' +
                            '<button class="btn-ctrl" onclick="updateGuest(\'room\',-1)"><i class="fa-solid fa-minus"></i></button>' +
                            '<span class="val-ctrl" id="ext-val-room">1</span>' +
                            '<button class="btn-ctrl" onclick="updateGuest(\'room\',1)"><i class="fa-solid fa-plus"></i></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="guest-row">' +
                        '<div class="guest-label-box"><span class="g-title">성인</span></div>' +
                        '<div class="guest-controls">' +
                            '<button class="btn-ctrl" onclick="updateGuest(\'adult\',-1)"><i class="fa-solid fa-minus"></i></button>' +
                            '<span class="val-ctrl" id="ext-val-adult">1</span>' +
                            '<button class="btn-ctrl" onclick="updateGuest(\'adult\',1)"><i class="fa-solid fa-plus"></i></button>' +
                        '</div>' +
                    '</div>' +
                    '<button class="dropdown-done-btn" onclick="extGuestDone(event)">완료</button>' +
                '</div>'
            );
            injectPopup(
                '<div class="booking-dropdown price-popup" id="ext-pricePopup" onclick="event.stopPropagation()">' +
                    '<i class="fa-solid fa-xmark dropdown-close" onclick="event.stopPropagation(); document.getElementById(\'ext-pricePopup\').classList.remove(\'active\')"></i>' +
                    '<div id="ext-pricePopupList"></div>' +
                '</div>'
            );

            // ── mob-ext-panel HTML (index.html mob-book-panel과 동일 구조) ──
            var stickyTop = document.createElement('div');
            stickyTop.id = 'mob-sticky-top';
            stickyTop.innerHTML =
                '<div id="mob-book-bar">' +
                    '<button id="mob-book-bar-btn" onclick="toggleExtPanel(event)">예약하기</button>' +
                '</div>' +
                '<div id="mob-ext-panel">' +
                    '<div class="mob-panel-row" onclick="toggleCalendarPopup(event)">' +
                        '<span class="mob-panel-label" id="mob-ext-nights"><i class="fa-regular fa-calendar"></i> 날짜 (1박)</span>' +
                        '<div class="mob-panel-value">' +
                            '<span id="mob-ext-checkin">날짜 선택</span>' +
                            '<i class="fa-solid fa-arrow-right" style="font-size:12px;color:#aaa;"></i>' +
                            '<span id="mob-ext-checkout"></span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="mob-panel-row" onclick="toggleGuestPopup(event)">' +
                        '<span class="mob-panel-label">객실 &amp; 투숙객</span>' +
                        '<div class="mob-panel-value">' +
                            '<span id="mob-ext-guests">1 객실, 1 성인</span>' +
                            '<i class="fa-solid fa-chevron-down" style="font-size:12px;color:#aaa;margin-left:auto;"></i>' +
                        '</div>' +
                    '</div>' +
                    '<div class="mob-panel-row" onclick="togglePricePopup(event)">' +
                        '<span class="mob-panel-label">객실선택 & 특별요금</span>' +
                        '<div class="mob-panel-value">' +
                            '<span id="mob-ext-price-lbl">최저 요금선택</span>' +
                            '<i class="fa-solid fa-chevron-down" style="font-size:12px;color:#aaa;margin-left:auto;"></i>' +
                        '</div>' +
                    '</div>' +
                    '<div style="padding:12px 16px 16px;">' +
                        '<button class="mob-panel-confirm" onclick="goExtBooking()">예약하기</button>' +
                    '</div>' +
                '</div>';

            // ── 날짜/인원/요금 상태 ──
            var _extToday = new Date(); _extToday.setHours(0,0,0,0);
            var _extTomorrow = new Date(_extToday); _extTomorrow.setDate(_extToday.getDate()+1);
            var extCI = _extToday, extCO = _extTomorrow;
            var extCurMonth = new Date(); extCurMonth.setDate(1);
            var extGuests = { room: 1, adult: 1 };
            var extRoomId = null;
            var extDatesSelected = true;
            var _extAutoAdvDate = true;
            var _extDatesExplicitlySet = false;

            var EXT_PRICES = {
                edelweiss:{prices:[49500,58500,72000],maxGuests:2},
                aurora:   {prices:[58000,67000,81000],maxGuests:2},
                glorio:   {prices:[67000,76000,99000],maxGuests:2},
                envidion: {prices:[76000,85000,108000],maxGuests:3},
                special:  {prices:[99000,108000,126000],maxGuests:4},
                ruby:     {prices:[76000,85000,108000],maxGuests:2}
            };
            var EXT_NAMES = {edelweiss:'이코노미 룸',aurora:'스탠다드 룸',glorio:'디럭스 룸',envidion:'트윈 룸',special:'스페셜 룸',ruby:'루비 룸'};
            var EXT_ORDER = ['edelweiss','aurora','glorio','envidion','special','ruby'];

            function extFmtDate(d) {
                var days=['일','월','화','수','목','금','토'];
                return (d.getMonth()+1)+'월 '+d.getDate()+'일, '+days[d.getDay()];
            }
            function extFmtWon(n) { return n.toLocaleString('ko-KR'); }
            function extNightRate(id, date) {
                var r=EXT_PRICES[id]; if(!r) return 0;
                var d=date.getDay(); return d===6?r.prices[2]:d===5?r.prices[1]:r.prices[0];
            }
            function extSyncPanel() {
                var nights = extCI && extCO ? Math.round((extCO-extCI)/86400000) : 1;
                var nl=document.getElementById('mob-ext-nights');
                if(nl) nl.innerHTML='<i class="fa-regular fa-calendar"></i> 날짜 ('+nights+'박)';
                var ci=document.getElementById('mob-ext-checkin'), co=document.getElementById('mob-ext-checkout');
                if(ci) ci.textContent = extCI ? extFmtDate(extCI) : '날짜 선택';
                if(co) co.textContent = extCO ? extFmtDate(extCO) : (extCI ? '체크아웃 선택' : '');
                var g=document.getElementById('mob-ext-guests');
                if(g) g.textContent = extGuests.room+' 객실, '+extGuests.adult+' 성인';
                var p=document.getElementById('mob-ext-price-lbl');
                if(p) {
                    if(extRoomId && extCI && extCO) {
                        var tot=0; for(var i=0;i<nights;i++){ var nd=new Date(extCI); nd.setDate(nd.getDate()+i); tot+=extNightRate(extRoomId,nd); } tot*=extGuests.room;
                        p.textContent=(EXT_NAMES[extRoomId]||'')+' · '+nights+'박 총 '+extFmtWon(tot)+'원';
                    } else { p.textContent='최저 요금선택'; }
                }
            }
            function extRenderCal() {
                var ly=extCurMonth.getFullYear(), lm=extCurMonth.getMonth();
                var rd=new Date(ly,lm+1,1), ry=rd.getFullYear(), rm=rd.getMonth();
                var tl=document.getElementById('ext-cal-month-title-left'), tr=document.getElementById('ext-cal-month-title-right');
                var gl=document.getElementById('ext-cal-grid-left'), gr=document.getElementById('ext-cal-grid-right');
                if(tl) tl.textContent=ly+'년 '+(lm+1)+'월';
                if(tr) tr.textContent=ry+'년 '+(rm+1)+'월';
                if(gl) gl.innerHTML=extGenMonth(ly,lm);
                if(gr) gr.innerHTML=extGenMonth(ry,rm);
            }
            function extGenMonth(year, month) {
                var dn=['일','월','화','수','목','금','토'];
                var html=dn.map(function(d){ return '<div class="cal-day-name">'+d+'</div>'; }).join('');
                var fd=new Date(year,month,1).getDay(), dim=new Date(year,month+1,0).getDate();
                var today=new Date(); today.setHours(0,0,0,0);
                for(var i=0;i<fd;i++) html+='<div class="cal-date faded"></div>';
                for(var d=1;d<=dim;d++){
                    var dt=new Date(year,month,d);
                    var ds=year+'-'+String(month+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
                    var cls='cal-date', clk='';
                    if(dt<today){ cls+=' faded'; }
                    else {
                        clk='onclick="event.stopPropagation();extSelectDate(\''+ds+'\')"';
                        if(extCI && dt.getTime()===extCI.getTime()) cls+=extCO?' selected-start':' selected-single';
                        if(extCO && dt.getTime()===extCO.getTime()) cls+=' selected-end';
                        if(extCI && extCO && dt>extCI && dt<extCO) cls+=' in-range';
                    }
                    html+='<div class="'+cls+'" '+clk+'>'+d+'</div>';
                }
                return html;
            }
            function extPopulatePrice() {
                if(!extCI||!extCO) return;
                var listEl=document.getElementById('ext-pricePopupList'); if(!listEl) return;
                var nights=Math.round((extCO-extCI)/86400000);
                listEl.innerHTML=EXT_ORDER.map(function(id){
                    var pt=EXT_PRICES[id], title=EXT_NAMES[id];
                    var avail=pt && extGuests.adult<=pt.maxGuests*extGuests.room;
                    var tot=0; for(var i=0;i<nights;i++){ var nd=new Date(extCI); nd.setDate(nd.getDate()+i); tot+=extNightRate(id,nd); } tot*=extGuests.room;
                    if(!avail) return '<div class="price-popup-row price-popup-unavail"><span class="price-popup-name">'+title+'</span><span class="price-popup-total" style="color:rgb(180,180,180);">최대 '+(pt.maxGuests*extGuests.room)+'인</span></div>';
                    return '<div class="price-popup-row" onclick="extSelectRoom(\''+id+'\')"><span class="price-popup-name">'+title+'</span><span class="price-popup-total">'+nights+'박 총 '+extFmtWon(tot)+'원</span></div>';
                }).join('');
            }

            window.toggleCalendarPopup = function(e) {
                if(e) e.stopPropagation();
                var cp=document.getElementById('ext-calendarPopup'), gp=document.getElementById('ext-guestPopup'), pp=document.getElementById('ext-pricePopup');
                if(gp) gp.classList.remove('active'); if(pp) pp.classList.remove('active');
                if(cp){ var opening=!cp.classList.contains('active'); cp.classList.toggle('active'); if(opening) extRenderCal(); if(opening&&extCI&&extCO&&_extDatesExplicitlySet) _extAutoAdvDate=false; else if(opening) _extAutoAdvDate=true; }
            };
            window.toggleGuestPopup = function(e) {
                if(e) e.stopPropagation();
                var cp=document.getElementById('ext-calendarPopup'), gp=document.getElementById('ext-guestPopup'), pp=document.getElementById('ext-pricePopup');
                if(cp) cp.classList.remove('active'); if(pp) pp.classList.remove('active');
                if(gp) gp.classList.toggle('active');
            };
            window.togglePricePopup = function(e) {
                if(e) e.stopPropagation();
                var cp=document.getElementById('ext-calendarPopup'), gp=document.getElementById('ext-guestPopup'), pp=document.getElementById('ext-pricePopup');
                if(cp) cp.classList.remove('active'); if(gp) gp.classList.remove('active');
                extPopulatePrice();
                if(pp) pp.classList.toggle('active');
            };
            window.closeDropdowns = function(e) {
                if(e) e.stopPropagation();
                ['ext-calendarPopup','ext-guestPopup','ext-pricePopup'].forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.remove('active'); });
            };
            window.extCalendarDone = function(e) {
                if(e) e.stopPropagation();
                var cp=document.getElementById('ext-calendarPopup'), pp=document.getElementById('ext-pricePopup');
                if(cp) cp.classList.remove('active');
                if(pp) pp.classList.remove('active');
                if(extCI&&extCO){
                    setTimeout(function(){
                        var gp=document.getElementById('ext-guestPopup');
                        if(gp){ gp.classList.add('active'); gp.scrollIntoView({behavior:'smooth',block:'nearest'}); }
                    },150);
                }
            };
            window.extGuestDone = function(e) {
                window.closeDropdowns(e);
                setTimeout(function(){
                    extPopulatePrice();
                    var pp=document.getElementById('ext-pricePopup');
                    if(pp){ pp.classList.add('active'); pp.scrollIntoView({behavior:'smooth',block:'nearest'}); }
                },200);
            };
            window.extChangeMonth = function(dir) {
                event.stopPropagation();
                extCurMonth.setMonth(extCurMonth.getMonth()+dir);
                extRenderCal();
            };
            window.extSelectDate = function(ds) {
                var p=ds.split('-'), clicked=new Date(parseInt(p[0]),parseInt(p[1])-1,parseInt(p[2])); clicked.setHours(0,0,0,0);
                var today=new Date(); today.setHours(0,0,0,0); if(clicked<today) return;
                if(!extCI||(extCI&&extCO)){ extCI=clicked; extCO=null; extDatesSelected=false; extRoomId=null; }
                else if(extCI&&!extCO){
                    if(clicked>extCI){ extCO=clicked; extDatesSelected=true; _extDatesExplicitlySet=true; }
                    else if(clicked.getTime()!==extCI.getTime()){ extCI=clicked; extDatesSelected=false; extRoomId=null; }
                }
                extSyncPanel(); extRenderCal();
                if(extDatesSelected) extPopulatePrice();
                if(extDatesSelected&&_extAutoAdvDate){
                    setTimeout(function(){
                        var cp=document.getElementById('ext-calendarPopup'), gp=document.getElementById('ext-guestPopup');
                        if(cp) cp.classList.remove('active');
                        if(gp){ gp.classList.add('active'); gp.scrollIntoView({behavior:'smooth',block:'nearest'}); }
                    },350);
                }
            };
            window.updateGuest = function(type, delta) {
                var nv=extGuests[type]+delta;
                if(nv<1) nv=1;
                extGuests[type]=nv;
                var el=document.getElementById('ext-val-'+type); if(el) el.textContent=nv;
                extSyncPanel(); extPopulatePrice();
            };
            window.extSelectRoom = function(id) {
                extRoomId=id; extSyncPanel();
                var pp=document.getElementById('ext-pricePopup'); if(pp) pp.classList.remove('active');
            };

            var header = document.querySelector('.top-header');
            if (header && header.parentNode) {
                header.parentNode.insertBefore(stickyTop, header.nextSibling);
            }

            var _extPanelCloseHandler = null;
            window._registerExtPanelCloseHandler = function() {
                if (_extPanelCloseHandler) {
                    document.removeEventListener('pointerdown', _extPanelCloseHandler);
                }
                _extPanelCloseHandler = function(e) {
                    // stickyTop 안이면 무시
                    if (stickyTop.contains(e.target)) return;
                    // 열려있는 팝업(달력/투숙객/요금) 안 탭이면 무시 (팝업은 body에 직접 주입되어 stickyTop 밖에 있음)
                    var popupIds = ['ext-calendarPopup', 'ext-guestPopup', 'ext-pricePopup'];
                    for (var i = 0; i < popupIds.length; i++) {
                        var el = document.getElementById(popupIds[i]);
                        if (el && el.classList.contains('active') && el.contains(e.target)) return;
                    }
                    var panel = document.getElementById('mob-ext-panel');
                    var bookBar = document.getElementById('mob-book-bar');
                    var anyDropdownOpen = document.querySelector('#ext-calendarPopup.active, #ext-guestPopup.active, #ext-pricePopup.active');
                    if (anyDropdownOpen) {
                        popupIds.forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.remove('active'); });
                    } else {
                        if (panel) panel.classList.remove('open');
                        if (bookBar) bookBar.style.display = '';
                        document.removeEventListener('pointerdown', _extPanelCloseHandler);
                        _extPanelCloseHandler = null;
                    }
                };
                document.addEventListener('pointerdown', _extPanelCloseHandler);
            };
            window.toggleExtPanel = function(e) {
                if (e) e.stopPropagation();
                var panel = document.getElementById('mob-ext-panel');
                var bookBar = document.getElementById('mob-book-bar');
                if (!panel) return;
                if (panel.classList.contains('open')) {
                    panel.classList.remove('open');
                    if (bookBar) bookBar.style.display = '';
                    if (_extPanelCloseHandler) {
                        document.removeEventListener('pointerdown', _extPanelCloseHandler);
                        _extPanelCloseHandler = null;
                    }
                } else {
                    panel.classList.add('open');
                    if (bookBar) bookBar.style.display = 'none';
                    setTimeout(function() { window._registerExtPanelCloseHandler(); }, 0);
                }
            };
            window.goExtBooking = function() {
                if (!extCI || !extCO) { window.toggleCalendarPopup(); return; }
                if (!extRoomId) { alert('객실을 선택해 주세요.'); window.togglePricePopup(); return; }
                var nights = Math.round((extCO-extCI)/86400000);
                var total = 0;
                for (var i=0; i<nights; i++) { var nd=new Date(extCI); nd.setDate(nd.getDate()+i); total+=extNightRate(extRoomId,nd); }
                total *= extGuests.room;
                function toLocalDateStr(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
                localStorage.setItem('instaHotelBooking', JSON.stringify({
                    roomId: extRoomId, roomName: EXT_NAMES[extRoomId]||extRoomId,
                    checkin: toLocalDateStr(extCI), checkout: toLocalDateStr(extCO),
                    nights: nights, roomCount: extGuests.room, adultCount: extGuests.adult, totalPrice: total
                }));
                window.location.href = base + 'booking.html';
            };

            // 초기화: 달력 렌더링 + 패널 라벨 동기화
            extRenderCal();
            extSyncPanel();

            // 스크롤 기반 sticky 구현 (position:sticky 브라우저 호환 이슈 우회)
            if (window.innerWidth <= 768) {
                setTimeout(function() {
                    var el = document.getElementById('mob-sticky-top');
                    if (!el) return;
                    var triggerY = el.getBoundingClientRect().top + window.pageYOffset;
                    var elH = el.offsetHeight;
                    var spacer = document.createElement('div');
                    spacer.id = 'mob-sticky-spacer';
                    spacer.style.cssText = 'height:' + elH + 'px;display:none;flex-shrink:0;';
                    el.parentNode.insertBefore(spacer, el.nextSibling);
                    function onScroll() {
                        if (window.pageYOffset >= triggerY) {
                            el.classList.add('is-fixed');
                            spacer.style.display = 'block';
                        } else {
                            el.classList.remove('is-fixed');
                            spacer.style.display = 'none';
                        }
                    }
                    window.addEventListener('scroll', onScroll, { passive: true });
                    onScroll();
                }, 80);
            }
        }

        // ── 모바일: 언어 선택 버튼을 상단 유틸바 햄버거 오른쪽으로 이동 ──
        // 기존 .lang-selector 노드를 그대로 옮겨 전환 로직/드롭다운(#langDropdown)을 재사용한다.
        // 데스크탑(769px 이상)에서는 이동하지 않으므로 헤더 레이아웃이 그대로 유지된다.
        if (window.innerWidth <= 768) {
            var utilBar = document.querySelector('.top-util-bar');
            var langSelector = document.querySelector('.lang-selector');
            var hamEl = utilBar ? utilBar.querySelector('.hamburger-menu') : null;
            if (utilBar && langSelector && hamEl) {
                utilBar.insertBefore(langSelector, hamEl.nextSibling);
            }
        }

        var hamburger = document.querySelector('.hamburger-menu');
        if (hamburger) hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            openNav();
        });

        document.getElementById('mobileNavClose').addEventListener('click', closeNav);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeNav();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });
    });

    // 후기 모달 폴백 - index.html에 이미 정의된 경우는 그대로 사용
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof window.openReviewModal !== 'function') {
            var REVIEWS = [
                { name:'김지수', lang:'한국어', date:'3일 전', stars:5, title:'정말 완벽한 숙소였어요', body:'처음에 기대 없이 방문했는데 생각보다 훨씬 좋았어요. 방이 굉장히 깔끔하고 아늑하며, 비데, 목욕 가운까지 구비되어 있어 호텔급 서비스를 느꼈습니다.' },
                { name:'James W.', lang:'English', date:'5 days ago', stars:5, title:'Exceeded all expectations!', body:'I travel frequently for work and this is easily one of the most comfortable stays I\'ve had in Korea. The room was spotless and the soundproofing was excellent.' },
                { name:'田中 美咲', lang:'日本語', date:'1週間前', stars:5, title:'また絶対に泊まりたいです！', body:'部屋は清潔でとても広く感じられ、アメニティも充実していました。スタッフの方も笑顔で親切に対応してくださり、安心して過ごせました。' },
                { name:'王小明', lang:'中文', date:'2周前', stars:5, title:'非常棒的入住体验！', body:'这家酒店的性价比非常高，房间干净整洁，床铺也很舒适。酒店附近有便利店和餐厅，生活十分便利。' },
                { name:'이준혁', lang:'한국어', date:'2주 전', stars:5, title:'가성비 최고, 재방문 확정', body:'출장으로 방문했는데 업무용 책상이 넓고 Wi-Fi도 빨라서 작업하기 최적의 환경이었습니다. 방음도 잘 되어 있어서 옆방 소리가 전혀 안 들렸어요.' },
                { name:'Sarah M.', lang:'English', date:'3 weeks ago', stars:4, title:'Great value, lovely stay', body:'Really enjoyed my two-night stay here. The bathroom amenities were top-notch and the mini fridge was a great touch. Would definitely stay again.' },
                { name:'박소현', lang:'한국어', date:'1개월 전', stars:5, title:'루비룸 강추!! 강아지랑 함께', body:'강아지와 함께 여행을 많이 다니는 편인데 루비룸은 강아지와 함께 묵을 수 있어서 너무 감사했고, 방도 넓고 깨끗했습니다.' },
                { name:'鈴木 健太', lang:'日本語', date:'1ヶ月前', stars:5, title:'韓国旅行のベストステイ', body:'部屋のデザインがおしゃれで、写真映えする空間でした。近くにコンビニや飲食店があり、観光の拠点としても最高でした。' },
                { name:'이수현', lang:'한국어', date:'3개월 전', stars:4, title:'전반적으로 만족스러운 숙박', body:'깔끔하고 모던한 인테리어가 마음에 들었어요. 객실 청결도와 침구 품질은 정말 훌륭했습니다.' },
                { name:'최민서', lang:'한국어', date:'2개월 전', stars:5, title:'스페셜룸 4인 가족여행 최적!', body:'가족 4명이서 스페셜룸 이용했는데 정말 넓고 쾌적했어요. 추가요금 없이 4인 이용이 가능하다는 점이 가장 큰 장점이었어요.' }
            ];

            function starHTML(n) {
                var h = '';
                for (var i = 0; i < 5; i++) h += i < n ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
                return h;
            }

            var itemsHTML = REVIEWS.map(function(r) {
                return '<div class="review-item">' +
                    '<div class="review-item-meta"><div class="review-item-left">' +
                    '<span class="review-item-name">' + r.name + '</span>' +
                    '<div class="review-item-stars">' + starHTML(r.stars) + '<span>' + r.stars + '</span></div>' +
                    '</div><span class="review-item-date">' + r.date + '</span></div>' +
                    '<span class="review-item-lang">' + r.lang + '</span>' +
                    '<div class="review-item-title">' + r.title + '</div>' +
                    '<div class="review-item-body">' + r.body + '</div>' +
                    '</div>';
            }).join('');

            var modal = document.createElement('div');
            modal.id = 'reviewModal';
            modal.innerHTML =
                '<div class="review-modal-box">' +
                    '<div class="review-modal-header">' +
                        '<span class="review-modal-title">평점 및 후기</span>' +
                        '<button class="review-modal-close" onclick="document.getElementById(\'reviewModal\').classList.remove(\'open\');document.body.style.overflow=\'\'">✕</button>' +
                    '</div>' +
                    '<div class="review-summary">' +
                        '<div class="review-summary-dots"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></div>' +
                        '<span class="review-summary-score">4.9</span>' +
                        '<span class="review-summary-count">· 1446개의 리뷰</span>' +
                    '</div>' +
                    '<div class="review-list">' + itemsHTML + '</div>' +
                    '<div class="review-modal-footer"><button class="review-more-btn">더 많은 후기 보기 (1436)</button></div>' +
                '</div>';
            modal.addEventListener('click', function(e) {
                if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
            });
            document.body.appendChild(modal);

            window.openReviewModal = function() {
                document.getElementById('reviewModal').classList.add('open');
                document.body.style.overflow = 'hidden';
            };
        }
    });
})();
