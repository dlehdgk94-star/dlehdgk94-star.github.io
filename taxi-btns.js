(function () {
    var kakaoSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.5 31.22"><g transform="translate(-218.2681,-557.008)"><path d="m 246.9821,588.228 h -26.209 c -1.384,0 -2.505,-1.122 -2.505,-2.505 v -26.209 c 0,-1.384 1.121,-2.506 2.505,-2.506 h 26.209 c 1.384,0 2.505,1.122 2.505,2.506 v 26.209 c 0,1.383 -1.121,2.505 -2.505,2.505" fill="#20284f"/><path d="m 243.243,563.252 h -18.732 v 2.226 h 18.732 z" fill="#ffea00"/><path d="m 243.2435,568.0508 h -8.014 v 13.933 h 2.336 v -11.707 h 5.678 z" fill="#ffea00"/><path d="m 224.5117,568.0508 v 2.226 h 5.678 v 11.707 h 2.336 v -13.933 z" fill="#ffea00"/></g></svg>';

    var uberSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="15%"/><path fill="#fff" d="M119.8,303.6c17.6,0,31.3-13.6,31.3-33.8V191.3h19.1V318.6H151.3V306.8a45.9,45.9,0,0,1-33.6,14c-27.3,0-48.2-19.8-48.2-49.8V191.4H88.6v78.5c0,20.5,13.4,33.7,31.2,33.7m64.6-112.3h18.4v46.4a46.11,46.11,0,0,1,32.9-13.8,48.45,48.45,0,0,1,0,96.9A46.52,46.52,0,0,1,202.6,307v11.6H184.4V191.3Zm50,113.2a32.2,32.2,0,1,0-32-32.4v.2a32,32,0,0,0,31.8,32.2h.2M339.3,224c26.7,0,46.4,20.5,46.4,48.2v6H310.3A31.09,31.09,0,0,0,341,304.6c10.7,0,19.8-4.4,26.7-13.6l13.3,9.8c-9.3,12.4-23.1,19.8-40,19.8-27.8,0-49.3-20.7-49.3-48.4-.1-26.2,20.5-48.2,47.6-48.2m-28.8,39.6H367c-3.1-14.2-14.5-23.6-28.2-23.6-13.5,0-25,9.5-28.3,23.6m124.4-21.4c-12,0-20.7,9.3-20.7,23.6v52.7H395.8V225.8H414v11.5c4.5-7.5,12-12.2,22.2-12.2h6.4v17.1Z"/></svg>';

    function getBase() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.indexOf('taxi-btns.js') !== -1) {
                return scripts[i].src.split('taxi-btns.js')[0];
            }
        }
        return '';
    }

    var base = getBase();

    var html = '\
<div id="taxi-btns-wrap">\
    <a id="taxi-btn-kakao" class="taxi-btn-item" href="https://t.kakao.com" target="_blank" rel="noopener" aria-label="카카오T 택시">\
        <div class="taxi-btn-icon">' + kakaoSvg + '</div>\
        <span class="taxi-btn-label">Taxi</span>\
    </a>\
    <a id="taxi-btn-uber" class="taxi-btn-item" href="https://www.uber.com/global/ko/cities/seoul/" target="_blank" rel="noopener" aria-label="우버">\
        <div class="taxi-btn-icon">' + uberSvg + '</div>\
        <span class="taxi-btn-label">Taxi</span>\
    </a>\
    <div id="food-delivery-group">\
        <div id="food-delivery-icons">\
            <a id="taxi-btn-baemin" class="taxi-btn-item food-icon" href="https://baemin.com" target="_blank" rel="noopener" aria-label="배달의민족">\
                <div class="taxi-btn-icon"><img src="/images/baemin.svg" alt="배민" style="width:100%;height:100%;object-fit:contain;display:block;"></div>\
            </a>\
            <a id="taxi-btn-coupang" class="taxi-btn-item food-icon" href="https://eats.coupang.com" target="_blank" rel="noopener" aria-label="쿠팡이츠">\
                <div class="taxi-btn-icon"><img src="/images/coupang-eats1.svg" alt="쿠팡이츠" style="width:100%;height:100%;object-fit:contain;display:block;"></div>\
            </a>\
        </div>\
        <span class="taxi-btn-label">Order Food Delivery</span>\
    </div>\
</div>\
<style>\
#taxi-btns-wrap {\
    position: fixed;\
    bottom: 24px;\
    left: 24px;\
    z-index: 99000;\
    display: grid;\
    grid-template-columns: 56px 56px;\
    gap: 14px 12px;\
}\
.taxi-btn-item {\
    display: flex;\
    flex-direction: column;\
    align-items: center;\
    gap: 5px;\
    text-decoration: none;\
    cursor: default;\
    pointer-events: none;\
    width: 56px;\
}\
#food-delivery-group {\
    grid-column: 1 / -1;\
    display: flex;\
    flex-direction: column;\
    align-items: center;\
    gap: 5px;\
}\
#food-delivery-icons {\
    display: flex;\
    flex-direction: row;\
    gap: 12px;\
}\
.food-icon {\
    width: 44px;\
}\
.taxi-btn-icon {\
    width: 44px;\
    height: 44px;\
    display: flex;\
    align-items: center;\
    justify-content: center;\
    overflow: hidden;\
    transition: transform 0.2s;\
    flex-shrink: 0;\
}\
.taxi-btn-item:hover .taxi-btn-icon { transform: scale(1.08); }\
#taxi-btn-coupang .taxi-btn-icon { border: 1.5px solid #c8c8c8; border-radius: 10px; }\
.taxi-btn-icon svg { width: 100%; height: 100%; display: block; }\
.taxi-btn-label {\
    font-size: 11px;\
    font-weight: 700;\
    color: rgb(58, 154, 180);\
    font-family: "Barlow", sans-serif;\
    letter-spacing: 0.2px;\
    user-select: none;\
    text-align: center;\
    line-height: 1.4;\
    white-space: nowrap;\
}\
@media (max-width: 768px) {\
    #taxi-btns-wrap { display: none; }\
}\
</style>';

    document.body.insertAdjacentHTML('beforeend', html);
})();
