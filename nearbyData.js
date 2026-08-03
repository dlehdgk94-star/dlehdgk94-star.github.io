// 호텔인스타 주변안내 데이터
// 카테고리 탭 + 카드 그리드용. 새 장소 추가 시 해당 category의 places 배열에 push.
//
// 구조
//   category : { id, label(ko), label_en, places[] }
//   place    : { id, name(ko), name_en, distance, distance_en?, url?, description?, description_en?, photo? }
//   distance : 정형이면 { mode:'car'|'walk', value, valueTo?, unit:'min'|'sec'|'hour' } 객체,
//              비정형이면 한국어 문자열 + distance_en 으로 영문 병기
//   transit  : 다른 카테고리 장소의 복제본은 { ref: '<place id>' } 로 원본을 참조한다.
//              (같은 장소를 두 번 관리·번역하지 않기 위함. 렌더 시 원본을 조회해 동일하게 표시)
//
// ※ 챗봇 RAG 데이터(place_chunks.json)는 이 파일과 별개로 관리됩니다.
const nearbyData = {
  "categories": [
    {
      "id": "attractions",
      "label": "관광지",
      "label_en": "Attractions",
      "places": [
        {
          "id": "hwaseong-fortress",
          "name": "수원화성",
          "name_en": "Hwaseong Fortress",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/13491459?lng=127.0116997&lat=37.2869919&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "성곽길을 따라 걸으며 수원의 전경을 한눈에 담을 수 있는 최고의 랜드마크입니다.",
          "description_en": "Suwon's greatest landmark — walk the fortress wall trail for sweeping views over the whole city.",
          "photo": "images/nearby/attractions/수원화성.jpg"
        },
        {
          "id": "hwaseong-haenggung",
          "name": "화성행궁",
          "name_en": "Hwaseong Haenggung Palace",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/31169145?lng=127.0137602&lat=37.2818785&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607160944%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place",
          "description": "정조가 머물던 임시 궁궐로, 아름다운 건축미와 다양한 상설 공연을 즐길 수 있습니다.",
          "description_en": "The temporary palace where King Jeongjo stayed, offering beautiful traditional architecture and regular live performances.",
          "photo": "images/nearby/attractions/화성행궁.png"
        },
        {
          "id": "korean-folk-village",
          "name": "한국민속촌",
          "name_en": "Korean Folk Village",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11620801?lng=127.1205573&lat=37.2594023&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607180158%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "선조들의 지혜와 슬기를 체험할 수 있는 국내 유일의 전통문화 테마파크",
          "description_en": "Korea's only traditional-culture theme park, where you can experience the wisdom and daily life of past generations.",
          "photo": "images/nearby/attractions/한국민속촌.jpg"
        },
        {
          "id": "paldalmun-gate",
          "name": "팔달문",
          "name_en": "Paldalmun Gate",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/19796543?lng=127.0167507&lat=37.2775465&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "수원의 중심에 우뚝 솟아 있는 보물 제402호 남문입니다.",
          "description_en": "The south gate of Hwaseong Fortress, National Treasure No. 402, standing at the heart of Suwon.",
          "photo": "images/nearby/attractions/팔달문.jpg"
        },
        {
          "id": "hwaseong-museum",
          "name": "수원화성박물관",
          "name_en": "Suwon Hwaseong Museum",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/13093608?lng=127.018934&lat=37.2826896&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "수원화성의 축성 과정과 정조의 사상을 깊이 있게 이해할 수 있는 전문 박물관입니다.",
          "description_en": "A dedicated museum explaining how Hwaseong Fortress was built and the philosophy of King Jeongjo behind it.",
          "photo": "images/nearby/attractions/수원화성박물관.jpg"
        },
        {
          "id": "samsung-innovation-museum",
          "name": "삼성이노베이션뮤지엄 (SIM)",
          "name_en": "Samsung Innovation Museum (SIM)",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/34761205?lng=127.055628&lat=37.2576968&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161050%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "전자산업의 역사와 미래 기술을 체험할 수 있는 세계 최대 규모의 전자산업사 박물관입니다.",
          "description_en": "The world's largest museum of electronics history, tracing the industry's past and letting you try the technology of the future.",
          "photo": "images/nearby/attractions/삼성이노베이션뮤지엄.jpg"
        },
        {
          "id": "suwon-museum",
          "name": "수원박물관",
          "name_en": "Suwon Museum",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EB%B0%95%EB%AC%BC%EA%B4%80/place/2047361170?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EB%B0%95%EB%AC%BC%EA%B4%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607160954%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%EB%B0%95%EB%AC%BC%EA%B4%80&placeSearchOption=bk_query%3D%25EC%2588%2598%25EC%259B%2590%25EB%25B0%2595%25EB%25AC%25BC%25EA%25B4%2580%26entry%3Dpll%26fromNxList%3Dtrue&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원의 고대 역사부터 근현대사까지 한눈에 볼 수 있는 곳입니다",
          "description_en": "A single place to take in Suwon's story, from ancient history through the modern era.",
          "photo": "images/nearby/attractions/수원박물관.jpg"
        },
        {
          "id": "gwanggyo-museum",
          "name": "수원광교박물관",
          "name_en": "Suwon Gwanggyo Museum",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/20597182?lng=127.0514217&lat=37.2963487&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "광교 신도시 개발 중 발굴된 유물과 기증 유물을 전시하는 차분한 공간입니다.",
          "description_en": "A quiet space exhibiting artifacts excavated during the development of Gwanggyo New Town, along with donated collections.",
          "photo": "images/nearby/attractions/수원광교박물관.jpg"
        },
        {
          "id": "everland",
          "name": "에버랜드",
          "name_en": "Everland",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min",
            "valueTo": 30
          },
          "url": "https://naver.me/x2jQdLls",
          "description": "1년 365일 계절별 다채롭게 펼쳐지는 축제와 어트랙션, 동물, 식물 등 다양한 시설로 즐거운 휴식과 기쁨을 선사하는 테마파크",
          "description_en": "Korea's largest theme park, with seasonal festivals, rides, a zoo and gardens delivering fun and relaxation all year round.",
          "photo": "images/nearby/attractions/에버랜드.jpg"
        },
        {
          "id": "caribbean-bay",
          "name": "캐리비안 베이",
          "name_en": "Caribbean Bay",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min",
            "valueTo": 30
          },
          "url": "https://naver.me/xWT3WiEM",
          "description": "대한민국에서 두 번째로 큰 워터파크며, 카리브해를 재현한 워터파크로, 1996년 5월 21일에 개장한 국내 최초의 워터파크다.",
          "description_en": "Korea's first water park, opened in May 1996 and now the country's second largest — a Caribbean-themed world of pools and slides.",
          "photo": "images/nearby/attractions/캐리비안베이.jpg"
        },
        {
          "id": "gwanggyo-lake-park",
          "name": "광교호수공원",
          "name_en": "Gwanggyo Lake Park",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/20815787?lng=127.0696711&lat=37.2826146&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161000%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "신대호수와 원천호수를 아우르는 거대한 공원으로, 국내 최고 수준의 아름다운 호수 야경을 자랑합니다.",
          "description_en": "A vast park spanning Sindae and Woncheon lakes, famous for having some of the most beautiful lake night views in Korea.",
          "photo": "images/nearby/attractions/광교호수공원.jpg"
        },
        {
          "id": "ilwol-arboretum",
          "name": "일월수목원",
          "name_en": "Ilwol Arboretum",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1751677198?lng=126.9760421&lat=37.2883577&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161001%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "도심 속 평온한 오아시스 같은 곳으로, 예쁜 온실과 산책로가 조성되어 있습니다.",
          "description_en": "A peaceful oasis in the middle of the city, with a lovely greenhouse and walking trails.",
          "photo": "images/nearby/attractions/일월수목원.jpg"
        },
        {
          "id": "yeongheung-arboretum",
          "name": "영흥수목원",
          "name_en": "Yeongheung Arboretum",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/37562565?lng=127.0711629&lat=37.2636683&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "숲을 보존하며 다채로운 정원을 가꾼 정원형 수목원입니다.",
          "description_en": "A garden-style arboretum that preserves the original forest while cultivating a variety of themed gardens.",
          "photo": "images/nearby/attractions/영흥수목원.jpg"
        },
        {
          "id": "wolhwawon-garden",
          "name": "효원공원월화원",
          "name_en": "Wolhwawon Garden, Hyowon Park",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/13447998?lng=127.0379325&lat=37.2651597&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161005%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "중국 전통 정원으로, 이국적인 분위기 덕분에 촬영지로도 자주 쓰입니다.",
          "description_en": "A traditional Chinese garden whose exotic atmosphere makes it a popular filming and photo location.",
          "photo": "images/nearby/attractions/효원공원월화원.jpg"
        },
        {
          "id": "yeonmudae",
          "name": "연무대",
          "name_en": "Yeonmudae Training Ground",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%EC%97%B0%EB%AC%B4%EB%8C%80/place/1352017539?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%EC%97%B0%EB%AC%B4%EB%8C%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607160948%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%EC%97%B0%EB%AC%B4%EB%8C%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "군사들이 무예를 연마하던 곳으로, 국궁(활쏘기) 체험이 가능합니다.",
          "description_en": "The historic martial arts training ground of Hwaseong, where visitors can try traditional Korean archery.",
          "photo": "images/nearby/attractions/연무대.jpg"
        },
        {
          "id": "hwangguji-stream",
          "name": "황구지천",
          "name_en": "Hwangguji Stream",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%99%A9%EA%B5%AC%EC%A7%80%EC%B2%9C/place/19203880?placePath=?bk_query=%ED%99%A9%EA%B5%AC%EC%A7%80%EC%B2%9C&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "봄이 되면 끝없이 이어지는 벚꽃 터널을 감상할 수 있는 숨은 벚꽃 명소입니다.",
          "description_en": "A hidden cherry blossom spot where an endless tunnel of blossoms opens up every spring.",
          "photo": "images/nearby/attractions/황구지천.jpg"
        },
        {
          "id": "manseok-park",
          "name": "만석공원",
          "name_en": "Manseok Park",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min",
            "valueTo": 25
          },
          "url": "https://map.naver.com/p/entry/place/13281108?lng=127.0005267&lat=37.3016596&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "커다란 저수지(만석거)를 중심으로 벚꽃길과 산책로가 잘 정비된 시민들의 휴식처입니다.",
          "description_en": "A favorite local retreat built around the large Manseokgeo reservoir, with well-kept cherry blossom paths and walking trails.",
          "photo": "images/nearby/attractions/만석공원.jpg"
        },
        {
          "id": "haengridan-gil",
          "name": "행리단길",
          "name_en": "Haengridan-gil Street",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1220976474?lng=127.0129785&lat=37.2852994&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161013%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "행궁동 성곽 안팎의 오래된 주택을 개조한 감성 카페, 소품숍, 맛집들이 모여 있는 수원의 대표 핫플입니다.",
          "description_en": "Suwon's trendiest neighborhood — old houses in and around the Haenggung-dong fortress walls, remade into stylish cafés, boutiques and restaurants.",
          "photo": "images/nearby/attractions/행리단길.jpg"
        },
        {
          "id": "flying-suwon",
          "name": "플라잉수원",
          "name_en": "Flying Suwon Balloon",
          "distance": {
            "mode": "car",
            "value": 17,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1317848971?lng=127.0263972&lat=37.2866553&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "커다란 계류식 헬륨 기구를 타고 수원화성 일대를 상공 150m 위에서 내려다보는 특별한 경험을 할 수 있습니다.",
          "description_en": "A tethered helium balloon ride that lifts you 150 m above the ground for a rare aerial view over Hwaseong Fortress.",
          "photo": "images/nearby/attractions/플라잉수원.jpg"
        },
        {
          "id": "suwon-museum-of-art",
          "name": "수원시립미술관",
          "name_en": "Suwon Museum of Art",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%8B%9C%EB%A6%BD%EB%AF%B8%EC%88%A0%EA%B4%80/place/36513873?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EC%8B%9C%EB%A6%BD%EB%AF%B8%EC%88%A0%EA%B4%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161030%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%EC%8B%9C%EB%A6%BD%EB%AF%B8%EC%88%A0%EA%B4%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "행궁 바로 옆에 위치해 있으며, 모던한 건축미와 현대 미술 전시를 함께 즐길 수 있습니다.",
          "description_en": "Right beside Haenggung Palace, combining striking modern architecture with contemporary art exhibitions.",
          "photo": "images/nearby/attractions/수원시립미술관.jpg"
        },
        {
          "id": "haewoojae-museum",
          "name": "해우재박물관",
          "name_en": "Haewoojae Museum (Toilet Museum)",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/19931510?lng=126.9780125&lat=37.3192333&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "세계 최초의 변기 모양 박물관으로, 아이들과 함께 가볍고 유쾌하게 방문하기 좋은 이색 공간입니다.",
          "description_en": "The world's first toilet-shaped museum — a light-hearted, quirky stop that children especially enjoy.",
          "photo": "images/nearby/attractions/해우재박물관.jpg"
        },
        {
          "id": "haenggung-mural-village",
          "name": "행궁동벽화마을",
          "name_en": "Haenggung-dong Mural Village",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/36733772?lng=127.0165972&lat=37.285537&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161039%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "따뜻하고 정겨운 그림들이 좁은 골목길을 채우고 있어 조용히 산책하며 사진 남기기 좋습니다.",
          "description_en": "Warm, charming paintings fill the narrow alleys, perfect for a quiet stroll and photographs.",
          "photo": "images/nearby/attractions/행궁동벽화마을.jpg"
        },
        {
          "id": "sindong-waterside-park",
          "name": "신동수변공원",
          "name_en": "Sindong Waterside Park",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%8B%A0%EB%8F%99%EC%88%98%EB%B3%80%EA%B3%B5%EC%9B%90/place/330862615?placePath=%2Fhome%3Fbk_query%3D%EC%8B%A0%EB%8F%99%EC%88%98%EB%B3%80%EA%B3%B5%EC%9B%90%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161047%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%8B%A0%EB%8F%99%EC%88%98%EB%B3%80%EA%B3%B5%EC%9B%90&placeSearchOption=bk_query%3D%25EC%258B%25A0%25EB%258F%2599%25EC%2588%2598%25EB%25B3%2580%25EA%25B3%25B5%25EC%259B%2590%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EC%258B%25A0%25EB%258F%2599%25EC%2588%2598%25EB%25B3%2580%25EA%25B3%25B5%25EC%259B%2590%26x%3D127.057454%26y%3D37.235530&searchType=place",
          "description": "영통구 신동카페거리 바로 옆에 흐르는 하천을 따라 조성된 산책로입니다.",
          "description_en": "A walking trail laid out along the stream right next to Sindong Café Street in Yeongtong-gu.",
          "photo": "images/nearby/attractions/신동수변공원.jpg"
        },
        {
          "id": "map-museum",
          "name": "지도박물관 (국토지리정보원)",
          "name_en": "Map Museum (National Geographic Information Institute)",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11783082?lng=127.0551&lat=37.276125&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161051%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "우리나라 지도의 역사와 측량 기술의 발달 과정을 한눈에 볼 수 있는 곳입니다.",
          "description_en": "See at a glance how Korean cartography and surveying technology developed over the centuries.",
          "photo": "images/nearby/attractions/지도박물관.jpg"
        },
        {
          "id": "gyeonggi-arts-centre",
          "name": "경기아트센터",
          "name_en": "Gyeonggi Arts Centre",
          "distance": {
            "mode": "car",
            "value": 12,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EC%95%84%ED%8A%B8%EC%84%BC%ED%84%B0/place/13281060?placePath=/home?bk_query=%EA%B2%BD%EA%B8%B0%EC%95%84%ED%8A%B8%EC%84%BC%ED%84%B0&entry=pll&from=map&fromNxList=true&fromPanelNum=2&timestamp=202607161052&locale=ko&svcName=map_pcv5&searchText=%EA%B2%BD%EA%B8%B0%EC%95%84%ED%8A%B8%EC%84%BC%ED%84%B0&searchType=place&c=15.00,0,0,0,dh",
          "description": "클래식, 연극, 무용 등 다양한 기획 공연이 열리는 경기도 문화의 중심입니다.",
          "description_en": "The cultural heart of Gyeonggi Province, hosting classical concerts, theatre, dance and other productions.",
          "photo": "images/nearby/attractions/경기아트센터.jpg"
        },
        {
          "id": "gwanggyo-forest-library",
          "name": "광교푸른숲도서관",
          "name_en": "Gwanggyo Green Forest Library",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B4%91%EA%B5%90%ED%91%B8%EB%A5%B8%EC%88%B2%EB%8F%84%EC%84%9C%EA%B4%80/place/1967683169?placePath=%2Fhome%3Fbk_query%3D%EA%B4%91%EA%B5%90%ED%91%B8%EB%A5%B8%EC%88%B2%EB%8F%84%EC%84%9C%EA%B4%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161101%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B4%91%EA%B5%90%ED%91%B8%EB%A5%B8%EC%88%B2%EB%8F%84%EC%84%9C%EA%B4%80&placeSearchOption=bk_query%3D%25EA%25B4%2591%25EA%25B5%2590%25ED%2591%25B8%25EB%25A5%25B8%25EC%2588%25B2%25EB%258F%2584%25EC%2584%259C%25EA%25B4%2580%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EA%25B4%2591%25EA%25B5%2590%25ED%2591%25B8%25EB%25A5%25B8%25EC%2588%25B2%25EB%258F%2584%25EC%2584%259C%25EA%25B4%2580%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "광교호수공원 산책로와 연결된 숲속 도서관으로 자연 속에서 독서하기 좋습니다.",
          "description_en": "A library in the woods connected to the Gwanggyo Lake Park trails — a lovely place to read surrounded by nature.",
          "photo": "images/nearby/attractions/광교푸른숲도서관.jpg"
        },
        {
          "id": "aquaplanet-gwanggyo",
          "name": "아쿠아플라넷 광교",
          "name_en": "Aqua Planet Gwanggyo",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B4%91%EA%B5%90%20%EC%95%84%EC%BF%A0%EC%95%84%EB%A6%AC%EC%9B%80/place/1375547224?placePath=?bk_query=%EA%B4%91%EA%B5%90%20%EC%95%84%EC%BF%A0%EC%95%84%EB%A6%AC%EC%9B%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "갤러리아 광교 파사쥬 지하에 위치한 트렌디한 도심형 아쿠아리움입니다.",
          "description_en": "A trendy urban aquarium on the lower level of the Galleria Gwanggyo Passage.",
          "photo": "images/nearby/attractions/아쿠아플라넷광교.jpg"
        },
        {
          "id": "national-agriculture-museum",
          "name": "국립농업박물관",
          "name_en": "National Agriculture Museum",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1573431930?lng=126.982093&lat=37.2759795&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "한국 농업의 모든 역사가 담긴 공간",
          "description_en": "A museum devoted to the full history of Korean agriculture.",
          "photo": "images/nearby/attractions/국립농업박물관.jpg"
        },
        {
          "id": "yonghwasa-temple",
          "name": "수원용화사",
          "name_en": "Yonghwasa Temple",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%EC%9A%A9%ED%99%94%EC%82%AC/place/32098597?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%EC%9A%A9%ED%99%94%EC%82%AC%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607180215%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%EC%9A%A9%ED%99%94%EC%82%AC&placeSearchOption=bk_query%3D%25EC%2588%2598%25EC%259B%2590%2520%25EC%259A%25A9%25ED%2599%2594%25EC%2582%25AC%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EC%2588%2598%25EC%259B%2590%2520%25EC%259A%25A9%25ED%2599%2594%25EC%2582%25AC%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "석불로 유명한 용화사",
          "description_en": "A Suwon temple known for its stone Buddha statue.",
          "photo": "images/nearby/attractions/수원용화사.jpg"
        },
        {
          "id": "bongnyeongsa-temple",
          "name": "대한불교조계종 봉녕사",
          "name_en": "Bongnyeongsa Temple",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://naver.me/FO9KrHKJ",
          "description": "수원에서 가장 오래된 사찰",
          "description_en": "The oldest Buddhist temple in Suwon.",
          "photo": "images/nearby/attractions/대한불교조계종봉녕사.jpg"
        },
        {
          "id": "gwanggyo-childrens-observatory",
          "name": "광교어린이천문대",
          "name_en": "Gwanggyo Children's Observatory",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://naver.me/xpBvgS50",
          "description": "대한민국 최초로 개발된 4년 과정의 체계적인 천문 프로그램을 통해 우주 속에 숨은 과학적 지식을 나누며 어두운 밤길을 걸으며 하늘에 있는 별에 관해서 이야기 나눌 수 있는 정보를 제공",
          "description_en": "Home to Korea's first four-year structured astronomy program for children — share the science hidden in the night sky and talk about the stars on an evening walk.",
          "photo": "images/nearby/attractions/광교어린이천문대.jpg"
        },
        {
          "id": "kbs-suwon-drama-center",
          "name": "KBS 수원드라마제작센터",
          "name_en": "KBS Suwon Drama Production Center",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/KBS%20%EC%88%98%EC%9B%90%EB%93%9C%EB%9D%BC%EB%A7%88%EC%A0%9C%EC%9E%91%EC%84%BC%ED%84%B0/place/19211605?placePath=%2Fhome%3Fbk_query%3DKBS%20%EC%88%98%EC%9B%90%EB%93%9C%EB%9D%BC%EB%A7%88%EC%A0%9C%EC%9E%91%EC%84%BC%ED%84%B0%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161054%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3DKBS%20%EC%88%98%EC%9B%90%EB%93%9C%EB%9D%BC%EB%A7%88%EC%A0%9C%EC%9E%91%EC%84%BC%ED%84%B0&placeSearchOption=bk_query%3DKBS%2520%25EC%2588%2598%25EC%259B%2590%25EB%2593%259C%25EB%259D%25BC%25EB%25A7%2588%25EC%25A0%259C%25EC%259E%2591%25EC%2584%25BC%25ED%2584%25B0%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3DKBS%2520%25EC%2588%2598%25EC%259B%2590%25EB%2593%259C%25EB%259D%25BC%25EB%25A7%2588%25EC%25A0%259C%25EC%259E%2591%25EC%2584%25BC%25ED%2584%25B0%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "수많은 사극과 현대극이 촬영된 세트장으로, 사전 예약 시 투어가 가능합니다.",
          "description_en": "The backlot where countless historical and modern Korean dramas were filmed; tours available with advance booking."
        },
        {
          "id": "cheongmyeongsan",
          "name": "청명산",
          "name_en": "Cheongmyeongsan Mountain",
          "distance": {
            "mode": "car",
            "value": 14,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B2%AD%EB%AA%85%EC%82%B0/place/19295695?placePath=%2Fphoto%3Fbk_query%3D%EC%B2%AD%EB%AA%85%EC%82%B0%26entry%3Dpll%26fromNxList%3Dtrue%26fromPanelNum%3D2%26timestamp%3D202607161056%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%AD%EB%AA%85%EC%82%B0%26filterType%3D%EC%97%85%EC%B2%B4&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.15,0,0,0,dh",
          "description": "영통 도심을 품고 있는 걷기 좋은 도심 속 숲길입니다.",
          "description_en": "An easy forest trail in the middle of the city, wrapping around downtown Yeongtong."
        },
        {
          "id": "yeongtongsa-temple",
          "name": "영통사",
          "name_en": "Yeongtongsa Temple",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%98%81%ED%86%B5%20%EC%A0%88/place/20127096?searchType=place&placePath=%2Fhome%3Fentry%3Dpll%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161057%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%81%ED%86%B5%20%EC%A0%88&lng=127.078131&lat=37.2581297&c=15.00,0,0,0,dh",
          "description": "도심 속에 있는 절로, 접근성이 편합니다.",
          "description_en": "A temple right in the city, so it is very easy to reach."
        },
        {
          "id": "gwanggyosan",
          "name": "광교산",
          "name_en": "Gwanggyosan Mountain",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min",
            "valueTo": 25
          },
          "url": "https://map.naver.com/p/entry/place/13491517?lng=127.0344274&lat=37.3449278&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "수원 시민들이 가장 사랑하는 등산로로, 형제봉까지 오르면 수원 시내가 한눈에 보입니다.",
          "description_en": "Suwon's best-loved hiking course — climb to Hyeongjebong Peak for a full view over the city."
        }
      ]
    },
    {
      "id": "restaurants",
      "label": "음식점",
      "label_en": "Restaurants",
      "places": [
        {
          "id": "hwahong-kalguksu",
          "name": "화홍칼국수",
          "name_en": "Hwahong Kalguksu",
          "distance": {
            "mode": "walk",
            "value": 1,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/2023614566?c=18.11,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161112%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "진한 닭육수로 완성된 녹진한 한 그릇",
          "description_en": "A rich, hearty bowl of hand-cut noodles in deep chicken broth.",
          "photo": "images/nearby/restaurants/hwahong.jpg"
        },
        {
          "id": "kkachi-sikdang",
          "name": "까치식당 망포점",
          "name_en": "Kkachi Sikdang (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1858733778?c=18.55,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161116%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "정갈한 밑반찬과 함께하는 행복한 한끼",
          "description_en": "A satisfying Korean home-style meal served with neat, well-made side dishes.",
          "photo": "images/nearby/restaurants/kkachi.jpg"
        },
        {
          "id": "myeonggawon-seolnongtang",
          "name": "명가원설농탕신영통점",
          "name_en": "Myeonggawon Seolleongtang (Sinyeongtong)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/18278098?c=18.55,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161118%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "가족 모두 만족하는 설렁탕, 갈비탕",
          "description_en": "Ox bone soup and galbitang that the whole family can enjoy.",
          "photo": "images/nearby/restaurants/myeonggawon.jpg"
        },
        {
          "id": "baeseobang-jokbal",
          "name": "배서방족발집 망포본점",
          "name_en": "Bae Seobang Jokbal (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/20430725?c=19.99,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161120%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "따뜻한 족발은 언제나 옳다",
          "description_en": "Warm braised pig's trotters — always a good idea.",
          "photo": "images/nearby/restaurants/baeseo-jokbal.jpg"
        },
        {
          "id": "ginza-sinyeongtong",
          "name": "긴자 신영통점",
          "name_en": "Ginza (Sinyeongtong)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/35228977?c=19.99,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161121",
          "description": "편안한 분위기 좋은 일식",
          "description_en": "Japanese food in a relaxed, comfortable setting.",
          "photo": "images/nearby/restaurants/ginza.jpg"
        },
        {
          "id": "cheonaebuhisyou",
          "name": "천애부히쇼우 망포 본점",
          "name_en": "Cheonae Buhisyou (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1731985891?c=19.56,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161123%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "깔끔한 우동과 푸짐한 덮밥",
          "description_en": "Clean-tasting udon and generously topped rice bowls.",
          "photo": "images/nearby/restaurants/cheonae-hisho.jpg"
        },
        {
          "id": "jeonju-kongnamul-gukbap",
          "name": "24시전주명가콩나물국밥 망포점",
          "name_en": "Jeonju Myeongga Bean Sprout Gukbap 24h (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/37334768?c=18.54,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161126%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26filterType%3DAI%20View%26subFilter%3DMENU_NAME%3A%EA%B5%AD%EB%B0%A5",
          "description": "24시 언제나 따뜻한 콩나물 국밥",
          "description_en": "Warm bean sprout soup with rice, served 24 hours a day.",
          "photo": "images/nearby/restaurants/jeongju-kongnamul.jpg"
        },
        {
          "id": "podongine-sushi",
          "name": "포동이네 수원본점",
          "name_en": "Podongine (Suwon)",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/38338093?c=19.41,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161132%26reviewSort%3Drecent",
          "description": "두툼하고 행복한 초밥시간",
          "description_en": "Thick-cut, generous sushi — a happy hour at the counter.",
          "photo": "images/nearby/restaurants/podo-sushi.jpg"
        },
        {
          "id": "susan-pocha-cheonghae",
          "name": "수산포차청해",
          "name_en": "Susan Pocha Cheonghae",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/19215161?c=18.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161135%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "망포 회는 무조건 여기",
          "description_en": "The place for raw fish in Mangpo, hands down.",
          "photo": "images/nearby/restaurants/susanpocha.jpg"
        },
        {
          "id": "byeongcheon-sundaeguk",
          "name": "병천청년순대국 수원망포점",
          "name_en": "Byeongcheon Cheongnyeon Sundae Gukbap (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/24%EC%8B%9C%20%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1106478427?placePath=/home?bk_query=24%EC%8B%9C%20%EC%9D%8C%EC%8B%9D%EC%A0%90&entry=pll&from=map&fromNxList=true&fromPanelNum=2&timestamp=202607161254&locale=ko&svcName=map_pcv5&searchText=24%EC%8B%9C%20%EC%9D%8C%EC%8B%9D%EC%A0%90&searchType=place&c=19.55,0,0,0,dh",
          "description": "24시 언제나 따뜻한 순대국밥",
          "description_en": "Warm sundae (blood sausage) soup with rice, open 24 hours.",
          "photo": "images/nearby/restaurants/byeongcheon.jpg"
        },
        {
          "id": "fried-chamjal",
          "name": "후라이드참잘하는집 망포반월점",
          "name_en": "Fried Chamjalhaneunjip (Mangpo Banwol)",
          "distance": {
            "mode": "walk",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1909964825?c=20.00,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161247%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161332%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "맥주를 부르는 매콤한 염지",
          "description_en": "Spicy marinated fried chicken that calls for a cold beer.",
          "photo": "images/nearby/restaurants/fried-chicken.jpg"
        },
        {
          "id": "burger-king-mangpo",
          "name": "버거킹 수원망포점",
          "name_en": "Burger King (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/36667545?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161334%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "불맛나는 와퍼는 언제나 맛있다",
          "description_en": "The flame-grilled Whopper is always a safe bet.",
          "photo": "images/nearby/restaurants/burgerking.jpg"
        },
        {
          "id": "taejang-sikdang",
          "name": "태장식당 망포 직영점",
          "name_en": "Taejang Sikdang (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1809563305?c=19.11,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161336%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "만족스러운 냉삼 맛집",
          "description_en": "A reliable spot for thin-sliced frozen pork belly.",
          "photo": "images/nearby/restaurants/taejang.jpg"
        },
        {
          "id": "yeopgi-tteokbokki",
          "name": "동대문엽기떡볶이 수원망포점",
          "name_en": "Dongdaemun Yeopgi Tteokbokki (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/37085991?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161338%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "떡볶이는 엽떡",
          "description_en": "When you want tteokbokki, this is the one.",
          "photo": "images/nearby/restaurants/yeolgi-tteokbokki.jpg"
        },
        {
          "id": "somunnan-daegu-jjim",
          "name": "소문난대구왕뽈찜",
          "name_en": "Somunnan Daegu Wang Ppoljjim",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/13441970?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161339%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "부드러운 대구살과 쫄깃한 아구의 조화",
          "description_en": "Tender cod paired with chewy monkfish in a spicy braise.",
          "photo": "images/nearby/restaurants/somunan-daegu.jpg"
        },
        {
          "id": "55-dakgalbi",
          "name": "5.5닭갈비 경기지사",
          "name_en": "5.5 Dakgalbi (Gyeonggi)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/21074163?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161340%26filterType%3D%ED%81%B4%EB%A6%BD",
          "description": "철판닭갈비 전통의 강자",
          "description_en": "A long-standing favorite for griddle-cooked spicy chicken.",
          "photo": "images/nearby/restaurants/55-dakgalbi.jpg"
        },
        {
          "id": "gwonseon-hwangso-gopchang",
          "name": "권선동황소곱창2호점",
          "name_en": "Gwonseon-dong Hwangso Gopchang (Branch 2)",
          "distance": {
            "mode": "walk",
            "value": 6,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1291900721?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161344%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "소곱창의 정석",
          "description_en": "Beef tripe done exactly the way it should be.",
          "photo": "images/nearby/restaurants/gwonseon-gopchang2.jpg"
        },
        {
          "id": "march-third",
          "name": "3월3일 반월 본점",
          "name_en": "March 3rd (Banwol)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1608648066?c=19.28,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161345%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "워터에이징 숙성고기의 깊은 맛",
          "description_en": "The deep flavor of water-aged beef.",
          "photo": "images/nearby/restaurants/3wol3il.jpg"
        },
        {
          "id": "meokgoboja-yangkkochi",
          "name": "먹고보자양꼬치 신영통점",
          "name_en": "Meokgoboja Lamb Skewers (Sinyeongtong)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1296768195?c=19.28,0,0,0,dh&placePath=%2Fmenu%3Fentry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161401%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "양꼬치와 요리 모두 만족스러운",
          "description_en": "Both the lamb skewers and the cooked dishes deliver.",
          "photo": "images/nearby/restaurants/meokgoboja.jpg"
        },
        {
          "id": "useolhwa",
          "name": "우설화 신영통점",
          "name_en": "Useolhwa (Sinyeongtong)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/34013227?c=19.38,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161410%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "정갈한 소고기집",
          "description_en": "A tidy, well-run beef restaurant.",
          "photo": "images/nearby/restaurants/useolhwa.jpg"
        },
        {
          "id": "sillim-baeksundae",
          "name": "본가신림동백순대맛집 본점",
          "name_en": "Bonga Sillim-dong Baek Sundae",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1215060774?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161411%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "맛있는 철판 순대볶음",
          "description_en": "Delicious stir-fried sundae on a hot griddle.",
          "photo": "images/nearby/restaurants/bonga-sundae.jpg"
        },
        {
          "id": "jeongcheol-gopchang",
          "name": "정철황소곱창 본점",
          "name_en": "Jeongcheol Hwangso Gopchang",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/34484553?c=19.53,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161412%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "모둠으로 만나는 다채로운맛",
          "description_en": "Order the combo for the full range of flavors.",
          "photo": "images/nearby/restaurants/jeongcheol-gopchang.jpg"
        },
        {
          "id": "hangari-bossam",
          "name": "항아리보쌈본점",
          "name_en": "Hangari Bossam",
          "distance": {
            "mode": "walk",
            "value": 6,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/18277434?c=19.23,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161414%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "우리가 아는 그 항아리 보쌈 본점",
          "description_en": "The original branch of the pot-steamed bossam you already know.",
          "photo": "images/nearby/restaurants/hangari-bossam.jpg"
        },
        {
          "id": "byeokjeokgol-gopchang",
          "name": "벽적골황소곱창 망포본점",
          "name_en": "Byeokjeokgol Hwangso Gopchang (Mangpo)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/35117452?lng=127.0575818&lat=37.2465415&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161415%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "망포 곱창 = 이곳",
          "description_en": "Gopchang in Mangpo means this place.",
          "photo": "images/nearby/restaurants/byeokjeokgol.jpg"
        },
        {
          "id": "sipnyeon-hanwoo",
          "name": "십년한우실비집 수원망포점",
          "name_en": "Sipnyeon Hanwoo Silbijip (Suwon Mangpo)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%8B%AD%EB%85%84%ED%95%9C%EC%9A%B0%EC%8B%A4%EB%B9%84%EC%A7%91/place/1941852090?placePath=?bk_query=%EC%8B%AD%EB%85%84%ED%95%9C%EC%9A%B0%EC%8B%A4%EB%B9%84%EC%A7%91&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "다양한 메뉴로 즐기는 한우의 매력",
          "description_en": "Discover the appeal of Korean hanwoo beef across a wide menu.",
          "photo": "images/nearby/restaurants/sipnyeon-hanwoo.jpg"
        },
        {
          "id": "ilbo-sushi",
          "name": "일보스시 망포점",
          "name_en": "Ilbo Sushi (Mangpo)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1909152644?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161423%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "깔끔한 초밥의 정석",
          "description_en": "Clean, classic sushi done properly.",
          "photo": "images/nearby/restaurants/ilbo-sushi.jpg"
        },
        {
          "id": "geumhwaru",
          "name": "금화루",
          "name_en": "Geumhwaru",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/30941919?c=19.23,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161425%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "간짜장 좋아하시면 무조건 추천",
          "description_en": "A must if you like gan-jjajang (stir-fried black bean noodles).",
          "photo": "images/nearby/restaurants/geumhwaru.jpg"
        },
        {
          "id": "gamachi-tongdak",
          "name": "가마치통닭 수원망포역점",
          "name_en": "Gamachi Tongdak (Mangpo Station)",
          "distance": "도보 15분 (차량 5분)",
          "distance_en": "15 min walk (5 min by car)",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1069450520?c=18.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161426%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "짭짤한 옛날통닭과 생맥주 한잔",
          "description_en": "Savory old-style whole fried chicken with a glass of draft beer.",
          "photo": "images/nearby/restaurants/gamachi.jpg"
        },
        {
          "id": "dalguun-baram-galbi",
          "name": "달구운바람 돼지갈비 영통망포점",
          "name_en": "Dalguun Baram Pork Galbi (Yeongtong Mangpo)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1269776772?c=18.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161427%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "편하게 먹는 원적외선 직화 돼지갈비",
          "description_en": "Easygoing pork ribs grilled over far-infrared open flame.",
          "photo": "images/nearby/restaurants/dalguunbaram.jpg"
        },
        {
          "id": "baeknyeon-sundaeguk",
          "name": "백년광명순대국 망포본점",
          "name_en": "Baeknyeon Gwangmyeong Sundae Gukbap (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1706822340?c=17.20,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161110%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "잡내 없이 깔끔한 순대국의 정석",
          "description_en": "Clean, never gamey — sundae gukbap the way it should taste."
        }
      ]
    },
    {
      "id": "cafes",
      "label": "카페·베이커리",
      "label_en": "Cafés & Bakeries",
      "places": [
        {
          "id": "mega-coffee-mangpo",
          "name": "메가MGC커피 망포늘푸른벽산점",
          "name_en": "Mega MGC Coffee (Mangpo Neulpureun Byeoksan)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1871534625?c=18.97,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161428%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "언제 어디서나, 부담스럽지 않은 가격과 대용량으로 모든 사람들에게 사랑받는",
          "description_en": "Loved everywhere for easy prices and generous cup sizes.",
          "photo": "images/nearby/cafes/mega-mgc.jpg"
        },
        {
          "id": "about-coffee-mangpo",
          "name": "에이바우트커피 망포점",
          "name_en": "A Bout Coffee (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1744379259?c=18.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161431%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "새벽 1시까지 영업하는 카페",
          "description_en": "A café that stays open until 1 a.m.",
          "photo": "images/nearby/cafes/about-coffee.jpg"
        },
        {
          "id": "gongcha-taejang",
          "name": "공차 수원태장점",
          "name_en": "Gong Cha (Suwon Taejang)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1565662461?c=19.30,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161437%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "대만의 작은 버블티 매장에서 시작해, 지금은 전 세계 2,100개가 넘는 매장을 운영하는 공차",
          "description_en": "Started as a small bubble tea shop in Taiwan and now runs more than 2,100 stores worldwide.",
          "photo": "images/nearby/cafes/gongcha.jpg"
        },
        {
          "id": "paris-baguette-yeongtong",
          "name": "파리바게뜨 영통벽산점",
          "name_en": "Paris Baguette (Yeongtong Byeoksan)",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/19420029?c=18.43,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161443%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "1988년부터 익숙한 프랜차이즈 브랜드인 파리바게뜨",
          "description_en": "The familiar Korean bakery franchise, serving since 1988.",
          "photo": "images/nearby/cafes/paris-baguette.jpg"
        },
        {
          "id": "manwolgyeong-cafe",
          "name": "카페 만월경 망포마을점",
          "name_en": "Cafe Manwolgyeong (Mangpo Maeul)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1143181159?c=18.13,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%B9%B4%ED%8E%98%26svcName%3Dmap_pcv5%26timestamp%3D202607161443",
          "description": "24시 무인카페",
          "description_en": "An unstaffed self-service café open 24 hours.",
          "photo": "images/nearby/cafes/manwol.jpg"
        },
        {
          "id": "ediya-mangpo",
          "name": "이디야 수원망포점",
          "name_en": "Ediya Coffee (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/21535989?c=17.22,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161445%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "커피 한 잔 속에 담긴 수많은 전문가의 노력",
          "description_en": "The work of many specialists in every single cup.",
          "photo": "images/nearby/cafes/ediya.jpg"
        },
        {
          "id": "mo-3-5",
          "name": "엠오삼오",
          "name_en": "MO 3 5",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1081422489?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161455%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "고소한 풍미의 깊은 맛 아메리카노",
          "description_en": "A deep, nutty americano with real body.",
          "photo": "images/nearby/cafes/m035.jpg"
        },
        {
          "id": "baekeok-coffee",
          "name": "백억커피 태장사거리점",
          "name_en": "Baekeok Coffee (Taejang Intersection)",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1432406367?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161456%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "좋은 이름처럼 좋은 커피도\n사람들의 하루를 기분 좋게 만드는",
          "description_en": "Good coffee to match the good name — the kind that lifts your whole day.",
          "photo": "images/nearby/cafes/baekok-coffee.jpg"
        },
        {
          "id": "gabiang",
          "name": "가비앙",
          "name_en": "Gabiang",
          "distance": {
            "mode": "walk",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/36648807?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161501%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "뜨개인 환영카페",
          "description_en": "A café that welcomes knitters.",
          "photo": "images/nearby/cafes/gabian.jpg"
        },
        {
          "id": "ttadeut-craft-cafe",
          "name": "따듯 공방카페",
          "name_en": "Ttadeut Craft Cafe",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1487214431?c=17.79,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161503%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "뜨개와 커피가 공존하는 아늑한 공간",
          "description_en": "A cozy space where knitting and coffee live side by side.",
          "photo": "images/nearby/cafes/ttadut.jpg"
        },
        {
          "id": "walkin-cafe",
          "name": "워킨",
          "name_en": "Walkin",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1602309691?c=18.04,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161504%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "버터향 가득한 소금빵의 유혹",
          "description_en": "Hard to resist the buttery aroma of the salt bread.",
          "photo": "images/nearby/cafes/workin.jpg"
        },
        {
          "id": "woodbear-mangpo",
          "name": "우드베어 망포",
          "name_en": "Woodbear (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1446951188?c=17.58,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161504%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "깔끔한 산미 없는 아이스 아메리카노",
          "description_en": "A clean iced americano with no sourness.",
          "photo": "images/nearby/cafes/woodbear.jpg"
        },
        {
          "id": "cafe-west-roasters",
          "name": "Cafe West Roasters",
          "name_en": "Cafe West Roasters",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1379904004?c=17.99,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161506%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "카페라떼가 시그니처인",
          "description_en": "The café latte is the signature here.",
          "photo": "images/nearby/cafes/cafe-west-roasters.jpg"
        },
        {
          "id": "twosome-taejang",
          "name": "투썸플레이스 태장사거리점",
          "name_en": "A Twosome Place (Taejang Intersection)",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1265276570?c=18.12,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161507%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "투썸의 아이덴티티에는 커피와 케이크의 만남",
          "description_en": "Twosome is built on the pairing of coffee and cake.",
          "photo": "images/nearby/cafes/twosome.jpg"
        },
        {
          "id": "fudgy-days",
          "name": "퍼지데이즈",
          "name_en": "Fudgy Days",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/2099076443?c=19.13,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161509%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "촉촉한 도넛과 커피의 달콤한 만남",
          "description_en": "A sweet meeting of moist doughnuts and coffee.",
          "photo": "images/nearby/cafes/fuzzy-days.jpg"
        },
        {
          "id": "wooji-coffee",
          "name": "우지커피 수원망포점",
          "name_en": "Wooji Coffee (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/2050301958?c=19.13,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161509%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "누구나, 언제든, 부담없이 즐길 수 있는 좋은 커피",
          "description_en": "Good coffee anyone can enjoy, any time, without thinking twice.",
          "photo": "images/nearby/cafes/uji-coffee.jpg"
        },
        {
          "id": "papanoai",
          "name": "파파노아이",
          "name_en": "Papanoai",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1521428222?c=18.05,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161511%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "부드럽고 쫄깃한 탕종식빵의 매력",
          "description_en": "Soft, chewy tangzhong milk bread at its best.",
          "photo": "images/nearby/cafes/papa-noai.jpg"
        },
        {
          "id": "ojikyu-bakery",
          "name": "오직유과자집",
          "name_en": "Ojikyu Bakery",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/482389077?c=18.05,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161512%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "쿠키가 맛있는",
          "description_en": "The cookies are the reason to come.",
          "photo": "images/nearby/cafes/ojik-sweets.jpg"
        },
        {
          "id": "hanabi-cafe",
          "name": "하나비",
          "name_en": "Hanabi",
          "distance": {
            "mode": "car",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/2022373368?c=16.40,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161513%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "흑임자 크림라떼로 느끼는 고소한 시간",
          "description_en": "A nutty, comforting break with a black sesame cream latte.",
          "photo": "images/nearby/cafes/hanabi.jpg"
        },
        {
          "id": "yogurt-home-mangpo",
          "name": "요거트홈 망포점",
          "name_en": "Yogurt Home (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1574700346?c=18.62,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%B9%B4%ED%8E%98%26svcName%3Dmap_pcv5%26timestamp%3D202607161513",
          "description": "그릭요거트 맛집",
          "description_en": "The local favorite for Greek yogurt.",
          "photo": "images/nearby/cafes/yogurt-home.jpg"
        },
        {
          "id": "kingdom-cafe",
          "name": "킹덤카페",
          "name_en": "Kingdom Cafe",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1998419431?c=19.09,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161515%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "달콤한 코코넛커피의 힐링 타임",
          "description_en": "Healing time over a sweet coconut coffee.",
          "photo": "images/nearby/cafes/kingdom-cafe.jpg"
        },
        {
          "id": "the-liter-taejang",
          "name": "더리터 태장초점",
          "name_en": "The Liter (Taejangcho)",
          "distance": {
            "mode": "car",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1650668624?c=17.98,0,0,0,dh&placePath=%2Freview%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%B9%B4%ED%8E%98%26svcName%3Dmap_pcv5%26timestamp%3D202607161516",
          "description": "압도적인 양",
          "description_en": "Portions that are hard to beat.",
          "photo": "images/nearby/cafes/the-liter.jpg"
        },
        {
          "id": "kiki-dessert",
          "name": "키키디저트",
          "name_en": "Kiki Dessert",
          "distance": {
            "mode": "car",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1255681557?c=17.83,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161518%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "디저트는 이곳",
          "description_en": "For dessert, come here.",
          "photo": "images/nearby/cafes/kiki-dessert.jpg"
        },
        {
          "id": "coffeekong",
          "name": "커피콩",
          "name_en": "Coffee Kong",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1363578879?c=17.85,0,0,0,dh&placePath=%2Fmenu%3FfromPanelNum%3D2%26timestamp%3D202607161521%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "핸드드립커피가 맛있는",
          "description_en": "Excellent hand-drip coffee.",
          "photo": "images/nearby/cafes/coffeekong.jpg"
        },
        {
          "id": "kuroishiro",
          "name": "쿠로이시로",
          "name_en": "Kuroishiro",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1315056034?c=18.06,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161522%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "특색있는 빙수가 있는",
          "description_en": "Distinctive takes on Korean shaved-ice bingsu.",
          "photo": "images/nearby/cafes/kuroishiro.jpg"
        },
        {
          "id": "haru-bake-mangpo",
          "name": "하루베이크 망포점",
          "name_en": "Haru Bake (Mangpo)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1055822445?c=18.06,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161523%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "에그타르트와 커피의 완벽 조화",
          "description_en": "Egg tarts and coffee in perfect balance.",
          "photo": "images/nearby/cafes/haru-bake.jpg"
        },
        {
          "id": "yogurt-icecream-jeongseok",
          "name": "요거트아이스크림의정석 망포반월동점",
          "name_en": "Yogurt Ice Cream Jeongseok (Mangpo Banwol)",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1093533148?c=18.35,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161524%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "언제 어디서나 내맘대로 요거트 아이스크림",
          "description_en": "Build your own frozen yogurt, any time you like.",
          "photo": "images/nearby/cafes/yogurt-ice.jpg"
        },
        {
          "id": "starbucks-sinyeongtong-dt",
          "name": "스타벅스 신영통DT점",
          "name_en": "Starbucks (Sinyeongtong DT)",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/37408371?c=17.46,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161526%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "커피 이상의 특별한 경험을 소개합니다",
          "description_en": "An experience that goes beyond the coffee itself.",
          "photo": "images/nearby/cafes/starbucks.jpg"
        },
        {
          "id": "whiterie-mangpo",
          "name": "화이트리에 망포점",
          "name_en": "Whiterie (Mangpo)",
          "distance": {
            "mode": "car",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1647867911?c=16.68,0,0,0,dh&placePath=%2Fmenu%3Fentry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161527%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "여기서 식빵 드시면, 다른곳에서 못드십니다.",
          "description_en": "Once you try the milk bread here, nowhere else compares.",
          "photo": "images/nearby/cafes/white-rie.jpg"
        },
        {
          "id": "hayan-poongcha",
          "name": "하얀풍차제과점 망포역점",
          "name_en": "Hayan Poongcha Bakery (Mangpo Station)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/32290219?c=16.68,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161528%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "수원빵집 = 하얀풍차",
          "description_en": "In Suwon, bakery means Hayan Poongcha.",
          "photo": "images/nearby/cafes/white-windmill.jpg"
        }
      ]
    },
    {
      "id": "convenience",
      "label": "편의시설",
      "label_en": "Convenience",
      "places": [
        {
          "id": "gs25-mangpo",
          "name": "GS25 망포벽산점",
          "name_en": "GS25 (Mangpo Byeoksan)",
          "distance": {
            "mode": "walk",
            "value": 1,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1726472319?c=17.42,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161532%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 편의점",
          "description_en": "The closest convenience store to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/gs25.jpg"
        },
        {
          "id": "cu-mangpo",
          "name": "CU 망포자이점",
          "name_en": "CU (Mangpo Xi)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1875601367?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161533%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 CU",
          "description_en": "The closest CU convenience store to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/cu.jpg"
        },
        {
          "id": "emart24-yeongtong",
          "name": "이마트24 영통벽산점",
          "name_en": "emart24 (Yeongtong Byeoksan)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1425012127?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161534%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 이마트24",
          "description_en": "The closest emart24 to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/emart24.jpg"
        },
        {
          "id": "seven-eleven-mangpo",
          "name": "세븐일레븐 망포원룸점",
          "name_en": "7-Eleven (Mangpo Wonroom)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1529569483?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161535%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 세븐일레븐",
          "description_en": "The closest 7-Eleven to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/seven-eleven.jpg"
        },
        {
          "id": "winia-laundry",
          "name": "위니아24크린샵 망포점",
          "name_en": "Winia 24 Clean Shop (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1203732209?c=15.74,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161538%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 코인세탁소 (24시영업)",
          "description_en": "The closest self-service laundromat to INSTA Hotel Flagship, open 24 hours.",
          "photo": "images/nearby/convenience/winia-laundry.jpg"
        },
        {
          "id": "olive-young-mangpo",
          "name": "올리브영 수원망포점",
          "name_en": "Olive Young (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%98%AC%EB%A6%AC%EB%B8%8C%EC%98%81/place/38737607?c=16.66,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dpll%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161539%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%AC%EB%A6%AC%EB%B8%8C%EC%98%81",
          "description": "호텔인스타 본점에서 가장 가까운 올리브영",
          "description_en": "The closest Olive Young health & beauty store to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/oliveyoung.jpg"
        },
        {
          "id": "nonghyup-mangpo",
          "name": "태안농협 망포지점",
          "name_en": "Taean Nonghyup Bank (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 1,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%80%ED%96%89/place/18279425?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161541%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 농협",
          "description_en": "The closest Nonghyup Bank branch to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/taean-nonghyup.jpg"
        },
        {
          "id": "hana-bank-sinyeongtong",
          "name": "하나은행 신영통지점",
          "name_en": "Hana Bank (Sinyeongtong)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%80%ED%96%89/place/11774200?c=18.22,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161542%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 하나은행",
          "description_en": "The closest Hana Bank branch to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/hana-bank.jpg"
        },
        {
          "id": "shinhan-bank-sinyeongtong",
          "name": "신한은행 신영통",
          "name_en": "Shinhan Bank (Sinyeongtong)",
          "distance": {
            "mode": "walk",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89/place/11774960?c=17.25,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161545%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 신한은행",
          "description_en": "The closest Shinhan Bank branch to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/shinhan-bank.jpg"
        },
        {
          "id": "kb-bank-mangpo",
          "name": "KB국민은행 망포역",
          "name_en": "KB Kookmin Bank (Mangpo Station)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89/place/11759985?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161547%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 국민은행",
          "description_en": "The closest KB Kookmin Bank branch to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/kb-bank.jpg"
        },
        {
          "id": "woori-bank-mangpo",
          "name": "우리은행 망포역지점",
          "name_en": "Woori Bank (Mangpo Station)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89/place/31697349?c=18.66,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161549%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 우리은행",
          "description_en": "The closest Woori Bank branch to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/woori-bank.jpg"
        },
        {
          "id": "ibk-bank-yeongtong",
          "name": "IBK기업은행 영통",
          "name_en": "IBK Industrial Bank (Yeongtong)",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B8%B0%EC%97%85%EC%9D%80%ED%96%89/place/11760393?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EA%B8%B0%EC%97%85%EC%9D%80%ED%96%89%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161550%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B8%B0%EC%97%85%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 기업은행",
          "description_en": "The closest IBK Industrial Bank branch to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/ibk-bank.jpg"
        },
        {
          "id": "mangpo-pharmacy",
          "name": "망포약국",
          "name_en": "Mangpo Pharmacy",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%95%BD%EA%B5%AD/place/13228683?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161551%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%95%BD%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 약국",
          "description_en": "The closest pharmacy to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/mangpo-pharmacy.jpg"
        },
        {
          "id": "suwon-large-pharmacy",
          "name": "수원대형약국",
          "name_en": "Suwon Daehyeong Pharmacy",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD/place/2049521535?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161555%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 창고형 약국",
          "description_en": "The closest warehouse-style pharmacy to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/suwon-pharmacy.jpg"
        },
        {
          "id": "daiso-mangpo",
          "name": "다이소 수원망포점",
          "name_en": "Daiso (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD/place/20245675?c=17.22,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161556%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 다이소",
          "description_en": "The closest Daiso variety store to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/daiso.jpg"
        },
        {
          "id": "emart-everyday-sinyeongtong",
          "name": "이마트에브리데이 신영통점",
          "name_en": "emart everyday (Sinyeongtong)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1924820406?c=17.22,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161616%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 마트",
          "description_en": "The closest supermarket to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/emart-everyday.jpg"
        },
        {
          "id": "traders-suwon",
          "name": "트레이더스 홀세일클럽 수원점",
          "name_en": "Traders Wholesale Club (Suwon)",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/35458026?c=15.72,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161617%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 창고형 마트",
          "description_en": "The closest warehouse club store to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/emart-traders.jpg"
        },
        {
          "id": "speedmate-mangpo",
          "name": "스피드메이트 수원망포점",
          "name_en": "SpeedMate Auto Service (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 30,
            "unit": "sec"
          },
          "url": "https://map.naver.com/p/entry/place/1259964301?c=17.18,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161618%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 자동차 정비소",
          "description_en": "The closest car repair shop to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/speedmate.jpg"
        },
        {
          "id": "hd-hyundai-oilbank",
          "name": "HD현대오일뱅크 나눔에너지",
          "name_en": "HD Hyundai Oilbank (Nanum Energy)",
          "distance": {
            "mode": "car",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%A3%BC%EC%9C%A0%EC%86%8C/place/13208463?c=17.02,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161620%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%A3%BC%EC%9C%A0%EC%86%8C",
          "description": "호텔인스타 본점에서 가장 가까운 주유소",
          "description_en": "The closest petrol station to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/hd-oilbank.jpg"
        },
        {
          "id": "mangpo1-community-center",
          "name": "망포1동행정복지센터",
          "name_en": "Mangpo 1-dong Community Service Center",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%96%89%EC%A0%95%EB%B3%B5%EC%A7%80%EC%84%BC%ED%84%B0/place/1085954702?c=16.63,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%ED%96%89%EC%A0%95%EB%B3%B5%EC%A7%80%EC%84%BC%ED%84%B0%26entry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161623%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%96%89%EC%A0%95%EB%B3%B5%EC%A7%80%EC%84%BC%ED%84%B0",
          "description": "호텔인스타 본점에서 가장 가까운 행정복지센터",
          "description_en": "The closest community service center to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/mangpo-admin.jpg"
        },
        {
          "id": "yeongtong-post-office",
          "name": "수원영통동우체국",
          "name_en": "Suwon Yeongtong-dong Post Office",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9A%B0%EC%B2%B4%EA%B5%AD/place/13288594?c=13.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161626%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9A%B0%EC%B2%B4%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 우체국",
          "description_en": "The closest post office to INSTA Hotel Flagship.",
          "photo": "images/nearby/convenience/suwon-post.jpg"
        },
        {
          "id": "lg-laundry",
          "name": "엘지세탁소",
          "name_en": "LG Dry Cleaners",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%84%B8%ED%83%81/place/38582622?c=16.96,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161537%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%84%B8%ED%83%81",
          "description": "호텔인스타 본점에서 가장 가까운 세탁소",
          "description_en": "The closest dry cleaner to INSTA Hotel Flagship."
        },
        {
          "id": "ev-charging-newlg",
          "name": "수원뉴엘지프라자 전기차충전소",
          "name_en": "Suwon New LG Plaza EV Charging Station",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%A0%84%EA%B8%B0%EC%B0%A8%EC%B6%A9%EC%A0%84%EC%86%8C/place/1214934455?c=16.33,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161715%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%A0%84%EA%B8%B0%EC%B0%A8%EC%B6%A9%EC%A0%84%EC%86%8C",
          "description": "호텔인스타 본점에서 가장 가까운 전기차충전소",
          "description_en": "The closest electric vehicle charging station to INSTA Hotel Flagship."
        }
      ]
    },
    {
      "id": "medical",
      "label": "병원·예식장",
      "label_en": "Medical & Wedding Halls",
      "places": [
        {
          "id": "hallym-dongtan-hospital",
          "name": "한림대학교동탄성심병원",
          "name_en": "Hallym University Dongtan Sacred Heart Hospital",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%91%EA%B8%89%EC%9D%98%EB%A3%8C%EC%8B%9C%EC%84%A4/place/1543285256?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%9D%91%EA%B8%89%EC%9D%98%EB%A3%8C%EC%8B%9C%EC%84%A4%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161721%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%91%EA%B8%89%EC%9D%98%EB%A3%8C%EC%8B%9C%EC%84%A4",
          "description": "호텔인스타 본점에서 가장 가까운 응급실운영병원",
          "description_en": "The closest hospital with an emergency room to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/hallym-hospital.jpg"
        },
        {
          "id": "ajou-university-hospital",
          "name": "아주대학교병원",
          "name_en": "Ajou University Hospital",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/12131117?lng=127.0476837&lat=37.2794612&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161907%26locale%3Dko%26svcName%3Dmap_pcv5&searchType=place&c=15.00,0,0,0,dh",
          "description": "경기 남부권역을 커버하는 핵심 권역응급의료센터이자 최고 수준의 중증 질환 치료 병원",
          "description_en": "The key regional emergency medical center for southern Gyeonggi and a top-tier hospital for serious conditions.",
          "photo": "images/nearby/medical/ajou-hospital.jpg"
        },
        {
          "id": "maedeup-hospital",
          "name": "매듭병원",
          "name_en": "Maedeup Hospital",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C/place/1854424335?c=16.52,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C%26svcName%3Dmap_pcv5%26timestamp%3D202607161716",
          "description": "호텔인스타 본점에서 가장 가까운 야간진료 정형외과 (24시 응급실 운영)",
          "description_en": "The closest orthopedic clinic with night hours to INSTA Hotel Flagship, with a 24-hour emergency room.",
          "photo": "images/nearby/medical/maedeup-hospital.jpg"
        },
        {
          "id": "365-healing-clinic",
          "name": "365힐링의원",
          "name_en": "365 Healing Clinic",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C/place/31357760?c=16.52,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161718%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C",
          "description": "호텔인스타 본점에서 가장 가까운 야간진료 내과",
          "description_en": "The closest internal medicine clinic with night hours to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/clinic-365.jpg"
        },
        {
          "id": "sinyeongtong-yonsei-dental",
          "name": "신영통연세치과의원",
          "name_en": "Sinyeongtong Yonsei Dental Clinic",
          "distance": {
            "mode": "walk",
            "value": 1,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/13228680?c=19.74,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161634%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 치과",
          "description_en": "The closest dental clinic to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/yonsei-dental.jpg"
        },
        {
          "id": "yeongtong-yonsei-family-clinic",
          "name": "영통연세가정의학과의원",
          "name_en": "Yeongtong Yonsei Family Medicine Clinic",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/13228777?c=17.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161637%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 의원",
          "description_en": "The closest general medical clinic to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/yonsei-family.jpg"
        },
        {
          "id": "yonsei-chambit-eye-clinic",
          "name": "연세참빛안과의원",
          "name_en": "Yonsei Chambit Eye Clinic",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/19878056?c=17.82,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161644%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 안과",
          "description_en": "The closest ophthalmology clinic to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/yonsei-eye.jpg"
        },
        {
          "id": "kyunghee-ondam-oriental-clinic",
          "name": "경희온담한의원 수원망포",
          "name_en": "Kyung Hee Ondam Korean Medicine Clinic (Suwon Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/50771081?c=17.30,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161709%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 한의원",
          "description_en": "The closest traditional Korean medicine clinic to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/kyunghee-oriental.jpg"
        },
        {
          "id": "jangjueun-dermatology",
          "name": "장주은피부과의원",
          "name_en": "Jang Ju-eun Dermatology Clinic",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/13228685?c=19.77,0,0,0,dh&placePath=%2Freview%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EB%B3%91%EC%9B%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161711",
          "description": "호텔인스타 본점에서 가장 가까운 피부과의원",
          "description_en": "The closest dermatology clinic to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/jang-dermatology.jpg"
        },
        {
          "id": "kimkyunghee-obgyn",
          "name": "김경희산부인과의원",
          "name_en": "Kim Kyung-hee OB/GYN Clinic",
          "distance": {
            "mode": "walk",
            "value": 6,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/21560093?c=18.71,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161713%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 산부인과 의원",
          "description_en": "The closest obstetrics and gynecology clinic to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/kim-obgyn.jpg"
        },
        {
          "id": "rehab-plus-nursing-home",
          "name": "재활플러스 요양원",
          "name_en": "Rehab Plus Nursing Home",
          "distance": {
            "mode": "walk",
            "value": 1,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/264650210?c=18.26,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161636%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 요양원",
          "description_en": "The closest nursing home to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/rehab-plus.jpg"
        },
        {
          "id": "yeongtong-hyo-hospital",
          "name": "영통효요양병원",
          "name_en": "Yeongtong Hyo Convalescent Hospital",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/1955486200?c=17.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161638%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 요양병원",
          "description_en": "The closest convalescent hospital to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/hyo-nursing.jpg"
        },
        {
          "id": "sinyeongtong-animal-hospital",
          "name": "신영통동물병원",
          "name_en": "Sinyeongtong Animal Hospital",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/18278127?c=17.98,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%EB%B3%91%EC%9B%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161639",
          "description": "호텔인스타 본점에서 가장 가까운 동물병원",
          "description_en": "The closest veterinary clinic to INSTA Hotel Flagship.",
          "photo": "images/nearby/medical/vet-clinic.jpg"
        },
        {
          "id": "sy-convention-wedding",
          "name": "SY컨벤션 웨딩홀",
          "name_en": "SY Convention Wedding Hall",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%98%88%EC%8B%9D%EC%9E%A5/place/1724383702?c=12.98,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%98%88%EC%8B%9D%EC%9E%A5%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161909%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%88%EC%8B%9D%EC%9E%A5",
          "description": "영통역 주변에 위치한 예식장",
          "description_en": "A wedding hall near Yeongtong Station.",
          "photo": "images/nearby/medical/sy-convention.jpg"
        },
        {
          "id": "patium-house-suwon",
          "name": "파티움하우스 수원",
          "name_en": "Patium House Suwon",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%98%88%EC%8B%9D%EC%9E%A5/place/12055125?c=14.20,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%98%88%EC%8B%9D%EC%9E%A5%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161913%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%88%EC%8B%9D%EC%9E%A5",
          "description": "수원시청역 주변에 위치한 예식장",
          "description_en": "A wedding hall near Suwon City Hall Station.",
          "photo": "images/nearby/medical/partium-house.jpg"
        },
        {
          "id": "aston-wedding-house",
          "name": "애스톤웨딩하우스",
          "name_en": "Aston Wedding House",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%98%88%EC%8B%9D%EC%9E%A5/place/13332693?c=13.25,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161915%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%88%EC%8B%9D%EC%9E%A5",
          "description": "동탄에 위치한 예식장",
          "description_en": "A wedding hall located in Dongtan.",
          "photo": "images/nearby/medical/aston-wedding.jpg"
        },
        {
          "id": "samsung-medical-orthopedic",
          "name": "삼성메디칼정형외과의원",
          "name_en": "Samsung Medical Orthopedic Clinic",
          "distance": {
            "mode": "walk",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/11619795?c=17.54,0,0,0,dh&placePath=%2Freview%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EB%B3%91%EC%9B%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161641",
          "description": "호텔인스타 본점에서 가장 가까운 정형외과",
          "description_en": "The closest orthopedic clinic to INSTA Hotel Flagship."
        }
      ]
    },
    {
      "id": "schools",
      "label": "학교",
      "label_en": "Schools",
      "places": [
        {
          "id": "kyunghee-univ-global",
          "name": "경희대학교 국제캠퍼스",
          "name_en": "Kyung Hee University, Global Campus",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11591495?c=15.45,0,0,0,dh&placePath=%2Fhome%3FadditionalHeight%3D76%26fromPanelNum%3D1%26locale%3Dko%26svcName%3Dmap_pcv5%26timestamp%3D202607171024%26type%3Dlist",
          "description": "호텔인스타 본점에서 가까운 대학교",
          "description_en": "A university close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/kyunghee-univ.jpg"
        },
        {
          "id": "ajou-university",
          "name": "아주대학교",
          "name_en": "Ajou University",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90/place/11591599?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171033%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 대학교",
          "description_en": "A university close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/ajou-univ.jpg"
        },
        {
          "id": "kyonggi-univ-suwon",
          "name": "경기대학교 수원캠퍼스",
          "name_en": "Kyonggi University, Suwon Campus",
          "distance": {
            "mode": "car",
            "value": 30,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90/place/11591483?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171035%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 대학교",
          "description_en": "A university close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/kyonggi-univ.jpg"
        },
        {
          "id": "mangpo-middle-school",
          "name": "망포중학교",
          "name_en": "Mangpo Middle School",
          "distance": {
            "mode": "walk",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031445?c=16.24,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161920%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가장 가까운 학교",
          "description_en": "The closest school to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/mangpo-middle.jpg"
        },
        {
          "id": "taejang-elementary",
          "name": "태장초등학교",
          "name_en": "Taejang Elementary School",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031330?c=16.38,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161922%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/taejang-elem.jpg"
        },
        {
          "id": "jamwon-elementary",
          "name": "잠원초등학교",
          "name_en": "Jamwon Elementary School",
          "distance": {
            "mode": "walk",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031267?c=15.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161923%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/jamwon-elem.jpg"
        },
        {
          "id": "jamwon-middle-school",
          "name": "잠원중학교",
          "name_en": "Jamwon Middle School",
          "distance": {
            "mode": "car",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12413494?c=15.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161923%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/jamwon-middle.jpg"
        },
        {
          "id": "mangpo-elementary",
          "name": "망포초등학교",
          "name_en": "Mangpo Elementary School",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/37446311?c=15.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161925%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/mangpo-elem.jpg"
        },
        {
          "id": "yeongdong-middle-school",
          "name": "영동중학교",
          "name_en": "Yeongdong Middle School",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031892?c=16.04,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170936%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/yeongdong-middle.jpg"
        },
        {
          "id": "daeseon-elementary",
          "name": "대선초등학교",
          "name_en": "Daeseon Elementary School",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12352544?c=15.45,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%ED%95%99%EA%B5%90%26svcName%3Dmap_pcv5%26timestamp%3D202607170937%26type%3Dlist",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/daeseon-elem.jpg"
        },
        {
          "id": "donghak-middle-school",
          "name": "동학중학교",
          "name_en": "Donghak Middle School",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12061073?c=15.45,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170953%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/donghak-middle.jpg"
        },
        {
          "id": "seocheon-high-school",
          "name": "서천고등학교",
          "name_en": "Seocheon High School",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/31848390?c=15.17,0,0,0,dh&placePath=%2Freview%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%ED%95%99%EA%B5%90%26svcName%3Dmap_pcv5%26timestamp%3D202607170956%26type%3Dlist",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/seocheon-high.jpg"
        },
        {
          "id": "donghak-elementary",
          "name": "동학초등학교",
          "name_en": "Donghak Elementary School",
          "distance": {
            "mode": "car",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12176374?c=15.02,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170958%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/donghak-elem.jpg"
        },
        {
          "id": "seocheon-elementary",
          "name": "서천초등학교",
          "name_en": "Seocheon Elementary School",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12061073?c=15.02,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170959%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171001%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/seocheon-elem.jpg"
        },
        {
          "id": "seocheon-middle-school",
          "name": "서천중학교",
          "name_en": "Seocheon Middle School",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/19758611?c=15.45,0,0,0,dh&placePath=%2Freview%3Ftype%3Dlist",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship.",
          "photo": "images/nearby/schools/seocheon-middle.jpg"
        },
        {
          "id": "yulmok-elementary",
          "name": "율목초등학교",
          "name_en": "Yulmok Elementary School",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12446144?c=15.45,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170954%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "description_en": "A school close to INSTA Hotel Flagship."
        }
      ]
    },
    {
      "id": "business",
      "label": "회사·비즈니스",
      "label_en": "Business",
      "places": [
        {
          "id": "suwon-convention-center",
          "name": "수원컨벤션센터",
          "name_en": "Suwon Convention Center",
          "distance": {
            "mode": "car",
            "value": 17,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%BB%A8%EB%B2%A4%EC%85%98%EC%84%BC%ED%84%B0/place/1269127432?placePath=?bk_query=%EC%88%98%EC%9B%90%EC%BB%A8%EB%B2%A4%EC%85%98%EC%84%BC%ED%84%B0&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "다양한 산업 전시회, 박람회, 그리고 대형 팝업 행사가 수시로 열리는 마이스(MICE) 산업의 중심지",
          "description_en": "A hub of the MICE industry, hosting industry exhibitions, trade fairs and large pop-up events year-round.",
          "photo": "images/nearby/business/suwon-convention.jpg"
        },
        {
          "id": "suwon-messe",
          "name": "수원 메쎄",
          "name_en": "Suwon Messe",
          "distance": {
            "mode": "car",
            "value": 17,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%EB%A9%94%EC%8E%84/place/1074049310?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%EB%A9%94%EC%8E%84%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161108%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%EB%A9%94%EC%8E%84&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원 대형 전시컨벤션센터",
          "description_en": "A large exhibition and convention center in Suwon.",
          "photo": "images/nearby/business/suwon-masse.jpg"
        },
        {
          "id": "samsung-digital-city",
          "name": "삼성전자 수원 디지털시티",
          "name_en": "Samsung Electronics Suwon Digital City",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "description": "삼성전자 본사 및 연구개발 중심지. 호텔의 가장 중요한 비즈니스 목적지",
          "description_en": "Samsung Electronics headquarters and R&D hub — the hotel's single most important business destination.",
          "photo": "images/nearby/business/samsung-digital-city.jpg"
        },
        {
          "id": "samsung-electro-mechanics",
          "name": "삼성전기 수원사업장·본사",
          "name_en": "Samsung Electro-Mechanics Suwon Campus & HQ",
          "distance": {
            "mode": "car",
            "value": 12,
            "unit": "min"
          },
          "description": "MLCC, 카메라 모듈, 반도체 기판 등 전자부품 기업",
          "description_en": "An electronic components maker producing MLCCs, camera modules and semiconductor substrates.",
          "photo": "images/nearby/business/samsung-electro-suwon.jpg"
        },
        {
          "id": "samsung-hwaseong-campus",
          "name": "삼성전자 화성캠퍼스",
          "name_en": "Samsung Electronics Hwaseong Campus",
          "distance": {
            "mode": "car",
            "value": 6,
            "unit": "min"
          },
          "description": "삼성전자 DS부문의 주요 반도체 생산·연구 사업장",
          "description_en": "A principal semiconductor production and research site of Samsung's Device Solutions division.",
          "photo": "images/nearby/business/samsung-hwaseong.jpg"
        },
        {
          "id": "samsung-giheung-campus",
          "name": "삼성전자 기흥캠퍼스",
          "name_en": "Samsung Electronics Giheung Campus",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "description": "삼성 반도체의 핵심 연구·생산 거점",
          "description_en": "A core research and production base for Samsung Semiconductor.",
          "photo": "images/nearby/business/samsung-giheung.jpg"
        },
        {
          "id": "samsung-display-giheung",
          "name": "삼성디스플레이 기흥사업장",
          "name_en": "Samsung Display Giheung Campus",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "description": "OLED·디스플레이 연구개발의 거점",
          "description_en": "A center for OLED and display R&D.",
          "photo": "images/nearby/business/samsung-display-giheung.jpg"
        },
        {
          "id": "sait",
          "name": "삼성종합기술원 SAIT",
          "name_en": "Samsung Advanced Institute of Technology (SAIT)",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "description": "삼성의 미래기술·첨단소재·반도체 연구기관",
          "description_en": "Samsung's research institute for future technologies, advanced materials and semiconductors.",
          "photo": "images/nearby/business/samsung-sait.jpg"
        },
        {
          "id": "samsung-sdi-giheung",
          "name": "삼성SDI 기흥본사",
          "name_en": "Samsung SDI Giheung Headquarters",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "description": "삼성SDI 본사와 연구개발 기능이 위치한 사업장",
          "description_en": "The site housing Samsung SDI's headquarters and R&D functions.",
          "photo": "images/nearby/business/samsung-sdi-giheung.jpg"
        },
        {
          "id": "samsung-sdi-suwon",
          "name": "삼성SDI 수원연구소",
          "name_en": "Samsung SDI Suwon Research Center",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "description": "배터리·전자재료 관련 연구 거점. 삼성 디지털시티 바로 인근",
          "description_en": "A research base for batteries and electronic materials, right next to Samsung Digital City.",
          "photo": "images/nearby/business/samsung-sdi-suwon.jpg"
        },
        {
          "id": "samsung-dsr-tower",
          "name": "삼성전자 화성 DSR타워",
          "name_en": "Samsung Electronics Hwaseong DSR Tower",
          "distance": {
            "mode": "car",
            "value": 8,
            "unit": "min"
          },
          "description": "반도체 연구개발 인력이 근무하는 대표적인 업무시설",
          "description_en": "A landmark office building housing semiconductor R&D staff.",
          "photo": "images/nearby/business/samsung-dsr-tower.jpg"
        },
        {
          "id": "asml-korea",
          "name": "ASML Korea 화성 본사",
          "name_en": "ASML Korea Hwaseong Headquarters",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "description": "세계적인 반도체 노광장비 기업의 한국 본사, 삼성과 긴밀히 협업관계",
          "description_en": "The Korean headquarters of the world-leading semiconductor lithography equipment maker, working closely with Samsung.",
          "photo": "images/nearby/business/asml-korea.jpg"
        },
        {
          "id": "tokyo-electron-korea",
          "name": "도쿄일렉트론코리아",
          "name_en": "Tokyo Electron Korea",
          "distance": {
            "mode": "car",
            "value": 12,
            "unit": "min"
          },
          "description": "반도체 제조장비 연구·개발 및 기술지원 기업",
          "description_en": "Semiconductor manufacturing equipment R&D and technical support.",
          "photo": "images/nearby/business/tokyo-electron.jpg"
        },
        {
          "id": "applied-materials-korea",
          "name": "어플라이드 머티어리얼즈 코리아",
          "name_en": "Applied Materials Korea",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "description": "반도체·디스플레이 장비 및 기술지원 기업",
          "description_en": "Semiconductor and display equipment with technical support services.",
          "photo": "images/nearby/business/applied-materials.jpg"
        },
        {
          "id": "asm-korea",
          "name": "ASM Korea 화성사업장",
          "name_en": "ASM Korea Hwaseong Campus",
          "distance": {
            "mode": "car",
            "value": 13,
            "unit": "min"
          },
          "description": "반도체 증착장비 기업",
          "description_en": "A semiconductor deposition equipment company.",
          "photo": "images/nearby/business/asm-korea.jpg"
        },
        {
          "id": "lam-research-korea",
          "name": "램리서치 코리아테크놀로지센터",
          "name_en": "Lam Research Korea Technology Center",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "description": "반도체 식각·증착 장비 연구개발 시설",
          "description_en": "An R&D facility for semiconductor etch and deposition equipment.",
          "photo": "images/nearby/business/lam-research.jpg"
        },
        {
          "id": "sfa",
          "name": "에스에프에이 SFA",
          "name_en": "SFA Engineering",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "description": "반도체·디스플레이·이차전지 자동화 장비와 스마트팩토리 기업",
          "description_en": "Automation equipment and smart factory solutions for semiconductors, displays and secondary batteries.",
          "photo": "images/nearby/business/sfa.jpg"
        },
        {
          "id": "psk",
          "name": "피에스케이 PSK",
          "name_en": "PSK Inc.",
          "distance": {
            "mode": "car",
            "value": 10,
            "unit": "min"
          },
          "description": "반도체 전공정 장비 전문기업으로 드라이 스트립·세정 장비 등을 생산하는 국내 대표 장비기업",
          "description_en": "A leading Korean front-end semiconductor equipment maker specializing in dry strip and cleaning systems.",
          "photo": "images/nearby/business/psk.jpg"
        },
        {
          "id": "tes-dongtan",
          "name": "테스 TES 동탄사무소",
          "name_en": "TES (Dongtan Office)",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "description": "반도체·디스플레이 장비 기업",
          "description_en": "A semiconductor and display equipment company.",
          "photo": "images/nearby/business/tes-dongtan.jpg"
        },
        {
          "id": "kla-korea-dongtan",
          "name": "KLA Korea 동탄사업장",
          "name_en": "KLA Korea Dongtan Campus",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "description": "반도체 검사·계측 장비 기업",
          "description_en": "A semiconductor inspection and metrology equipment company."
        }
      ]
    },
    {
      "id": "transit",
      "label": "대중교통",
      "label_en": "Transit",
      "places": [
        {
          "id": "city-bus-hotel-stop",
          "name": "시내버스 (호텔 앞 정류장)",
          "name_en": "City Buses (stop in front of the hotel)",
          "distance": "7-1 / 7-1A (동탄1차고지↔경기대정문 등) · 13-5 (동탄1차고지↔당수동) · 20-2 (망포역↔신영통현대아파트단지 순환) · 34 / 34-1 (수원동부차고지↔병점역/왕림리) · 62-1 (동탄↔성균관대역) · 92-1 (동탄차고지↔성균관대역) · 98 (이목동차고지↔반월동)",
          "distance_en": "Routes 7-1 / 7-1A (Dongtan 1st Depot ↔ Kyonggi Univ. Main Gate) · 13-5 (Dongtan 1st Depot ↔ Dangsu-dong) · 20-2 (Mangpo Stn ↔ Sinyeongtong Hyundai Apt, loop) · 34 / 34-1 (Suwon East Depot ↔ Byeongjeom Stn / Wangnim-ri) · 62-1 (Dongtan ↔ Sungkyunkwan Univ. Stn) · 92-1 (Dongtan Depot ↔ Sungkyunkwan Univ. Stn) · 98 (Imok-dong Depot ↔ Banwol-dong)"
        },
        {
          "id": "mangpo-station",
          "name": "망포역",
          "name_en": "Mangpo Station (Suin-Bundang Line)",
          "distance": "도보 이동 가능 · 버스 5분 · 차량 3분",
          "distance_en": "Walkable · 5 min by bus · 3 min by car"
        },
        {
          "id": "incheon-airport",
          "name": "인천공항",
          "name_en": "Incheon International Airport",
          "distance": "망포역 7번 출구 공항버스정류장 4100번",
          "distance_en": "Airport bus 4100 from the bus stop at Mangpo Station Exit 7"
        },
        {
          "id": "gimpo-airport",
          "name": "김포공항",
          "name_en": "Gimpo International Airport",
          "distance": {
            "mode": "car",
            "value": 1,
            "unit": "hour"
          }
        },
        {
          "id": "dongtan-station",
          "name": "동탄역 (SRT)",
          "name_en": "Dongtan Station (SRT)",
          "distance": {
            "mode": "car",
            "value": 17,
            "unit": "min"
          }
        },
        {
          "id": "suwon-station",
          "name": "수원역 (KTX)",
          "name_en": "Suwon Station (KTX)",
          "distance": {
            "mode": "car",
            "value": 17,
            "unit": "min"
          }
        },
        {
          "id": "gangnam-station",
          "name": "강남역",
          "name_en": "Gangnam Station, Seoul",
          "distance": "호텔 앞 정류장 1550-1번 직행버스 · 30분",
          "distance_en": "Express bus 1550-1 from the stop in front of the hotel · 30 min"
        },
        {
          "id": "namsan-tower",
          "name": "남산타워",
          "name_en": "Namsan Seoul Tower",
          "distance": {
            "mode": "car",
            "value": 40,
            "unit": "min"
          }
        },
        {
          "id": "samseong-coex",
          "name": "삼성역·코엑스",
          "name_en": "Samseong Station / COEX",
          "distance": {
            "mode": "car",
            "value": 40,
            "unit": "min"
          }
        },
        {
          "id": "myeongdong",
          "name": "명동",
          "name_en": "Myeongdong",
          "distance": {
            "mode": "car",
            "value": 40,
            "unit": "min"
          }
        },
        {
          "id": "hongdae",
          "name": "홍대입구역",
          "name_en": "Hongik University Station (Hongdae)",
          "distance": {
            "mode": "car",
            "value": 50,
            "unit": "min"
          }
        },
        {
          "id": "jongno",
          "name": "종로",
          "name_en": "Jongno",
          "distance": {
            "mode": "car",
            "value": 40,
            "unit": "min"
          }
        },
        {
          "id": "gwanghwamun",
          "name": "광화문",
          "name_en": "Gwanghwamun",
          "distance": {
            "mode": "car",
            "value": 45,
            "unit": "min"
          }
        },
        {
          "id": "itaewon",
          "name": "이태원",
          "name_en": "Itaewon",
          "distance": {
            "mode": "car",
            "value": 45,
            "unit": "min"
          }
        },
        {
          "ref": "hwaseong-fortress"
        },
        {
          "ref": "hwaseong-haenggung"
        },
        {
          "ref": "korean-folk-village"
        },
        {
          "ref": "paldalmun-gate"
        },
        {
          "ref": "hwaseong-museum"
        },
        {
          "ref": "samsung-innovation-museum"
        },
        {
          "ref": "suwon-museum"
        },
        {
          "ref": "gwanggyo-museum"
        },
        {
          "ref": "everland"
        },
        {
          "ref": "caribbean-bay"
        },
        {
          "ref": "gwanggyo-lake-park"
        },
        {
          "ref": "ilwol-arboretum"
        },
        {
          "ref": "yeongheung-arboretum"
        },
        {
          "ref": "wolhwawon-garden"
        },
        {
          "ref": "yeonmudae"
        },
        {
          "ref": "hwangguji-stream"
        },
        {
          "ref": "manseok-park"
        },
        {
          "ref": "haengridan-gil"
        },
        {
          "ref": "flying-suwon"
        },
        {
          "ref": "suwon-museum-of-art"
        },
        {
          "ref": "haewoojae-museum"
        },
        {
          "ref": "haenggung-mural-village"
        },
        {
          "ref": "sindong-waterside-park"
        },
        {
          "ref": "map-museum"
        },
        {
          "ref": "gyeonggi-arts-centre"
        },
        {
          "ref": "gwanggyo-forest-library"
        },
        {
          "ref": "aquaplanet-gwanggyo"
        },
        {
          "ref": "national-agriculture-museum"
        },
        {
          "ref": "yonghwasa-temple"
        },
        {
          "ref": "bongnyeongsa-temple"
        },
        {
          "ref": "gwanggyo-childrens-observatory"
        },
        {
          "ref": "kbs-suwon-drama-center"
        },
        {
          "ref": "cheongmyeongsan"
        },
        {
          "ref": "yeongtongsa-temple"
        },
        {
          "ref": "gwanggyosan"
        },
        {
          "ref": "hwahong-kalguksu"
        },
        {
          "ref": "kkachi-sikdang"
        },
        {
          "ref": "myeonggawon-seolnongtang"
        },
        {
          "ref": "baeseobang-jokbal"
        },
        {
          "ref": "ginza-sinyeongtong"
        },
        {
          "ref": "cheonaebuhisyou"
        },
        {
          "ref": "jeonju-kongnamul-gukbap"
        },
        {
          "ref": "podongine-sushi"
        },
        {
          "ref": "susan-pocha-cheonghae"
        },
        {
          "ref": "byeongcheon-sundaeguk"
        },
        {
          "ref": "fried-chamjal"
        },
        {
          "ref": "burger-king-mangpo"
        },
        {
          "ref": "taejang-sikdang"
        },
        {
          "ref": "yeopgi-tteokbokki"
        },
        {
          "ref": "somunnan-daegu-jjim"
        },
        {
          "ref": "55-dakgalbi"
        },
        {
          "ref": "gwonseon-hwangso-gopchang"
        },
        {
          "ref": "march-third"
        },
        {
          "ref": "meokgoboja-yangkkochi"
        },
        {
          "ref": "useolhwa"
        },
        {
          "ref": "sillim-baeksundae"
        },
        {
          "ref": "jeongcheol-gopchang"
        },
        {
          "ref": "hangari-bossam"
        },
        {
          "ref": "byeokjeokgol-gopchang"
        },
        {
          "ref": "sipnyeon-hanwoo"
        },
        {
          "ref": "ilbo-sushi"
        },
        {
          "ref": "geumhwaru"
        },
        {
          "ref": "gamachi-tongdak"
        },
        {
          "ref": "dalguun-baram-galbi"
        },
        {
          "ref": "baeknyeon-sundaeguk"
        },
        {
          "ref": "mega-coffee-mangpo"
        },
        {
          "ref": "about-coffee-mangpo"
        },
        {
          "ref": "gongcha-taejang"
        },
        {
          "ref": "paris-baguette-yeongtong"
        },
        {
          "ref": "manwolgyeong-cafe"
        },
        {
          "ref": "ediya-mangpo"
        },
        {
          "ref": "mo-3-5"
        },
        {
          "ref": "baekeok-coffee"
        },
        {
          "ref": "gabiang"
        },
        {
          "ref": "ttadeut-craft-cafe"
        },
        {
          "ref": "walkin-cafe"
        },
        {
          "ref": "woodbear-mangpo"
        },
        {
          "ref": "cafe-west-roasters"
        },
        {
          "ref": "twosome-taejang"
        },
        {
          "ref": "fudgy-days"
        },
        {
          "ref": "wooji-coffee"
        },
        {
          "ref": "papanoai"
        },
        {
          "ref": "ojikyu-bakery"
        },
        {
          "ref": "hanabi-cafe"
        },
        {
          "ref": "yogurt-home-mangpo"
        },
        {
          "ref": "kingdom-cafe"
        },
        {
          "ref": "the-liter-taejang"
        },
        {
          "ref": "kiki-dessert"
        },
        {
          "ref": "coffeekong"
        },
        {
          "ref": "kuroishiro"
        },
        {
          "ref": "haru-bake-mangpo"
        },
        {
          "ref": "yogurt-icecream-jeongseok"
        },
        {
          "ref": "starbucks-sinyeongtong-dt"
        },
        {
          "ref": "whiterie-mangpo"
        },
        {
          "ref": "hayan-poongcha"
        },
        {
          "ref": "gs25-mangpo"
        },
        {
          "ref": "cu-mangpo"
        },
        {
          "ref": "emart24-yeongtong"
        },
        {
          "ref": "seven-eleven-mangpo"
        },
        {
          "ref": "winia-laundry"
        },
        {
          "ref": "olive-young-mangpo"
        },
        {
          "ref": "nonghyup-mangpo"
        },
        {
          "ref": "hana-bank-sinyeongtong"
        },
        {
          "ref": "shinhan-bank-sinyeongtong"
        },
        {
          "ref": "kb-bank-mangpo"
        },
        {
          "ref": "woori-bank-mangpo"
        },
        {
          "ref": "ibk-bank-yeongtong"
        },
        {
          "ref": "mangpo-pharmacy"
        },
        {
          "ref": "suwon-large-pharmacy"
        },
        {
          "ref": "daiso-mangpo"
        },
        {
          "ref": "emart-everyday-sinyeongtong"
        },
        {
          "ref": "traders-suwon"
        },
        {
          "ref": "speedmate-mangpo"
        },
        {
          "ref": "hd-hyundai-oilbank"
        },
        {
          "ref": "mangpo1-community-center"
        },
        {
          "ref": "yeongtong-post-office"
        },
        {
          "ref": "lg-laundry"
        },
        {
          "ref": "ev-charging-newlg"
        },
        {
          "ref": "hallym-dongtan-hospital"
        },
        {
          "ref": "ajou-university-hospital"
        },
        {
          "ref": "maedeup-hospital"
        },
        {
          "ref": "365-healing-clinic"
        },
        {
          "ref": "sinyeongtong-yonsei-dental"
        },
        {
          "ref": "yeongtong-yonsei-family-clinic"
        },
        {
          "ref": "yonsei-chambit-eye-clinic"
        },
        {
          "ref": "kyunghee-ondam-oriental-clinic"
        },
        {
          "ref": "jangjueun-dermatology"
        },
        {
          "ref": "kimkyunghee-obgyn"
        },
        {
          "ref": "rehab-plus-nursing-home"
        },
        {
          "ref": "yeongtong-hyo-hospital"
        },
        {
          "ref": "sinyeongtong-animal-hospital"
        },
        {
          "ref": "sy-convention-wedding"
        },
        {
          "ref": "patium-house-suwon"
        },
        {
          "ref": "aston-wedding-house"
        },
        {
          "ref": "samsung-medical-orthopedic"
        },
        {
          "ref": "kyunghee-univ-global"
        },
        {
          "ref": "ajou-university"
        },
        {
          "ref": "kyonggi-univ-suwon"
        },
        {
          "ref": "mangpo-middle-school"
        },
        {
          "ref": "taejang-elementary"
        },
        {
          "ref": "jamwon-elementary"
        },
        {
          "ref": "jamwon-middle-school"
        },
        {
          "ref": "mangpo-elementary"
        },
        {
          "ref": "yeongdong-middle-school"
        },
        {
          "ref": "daeseon-elementary"
        },
        {
          "ref": "donghak-middle-school"
        },
        {
          "ref": "seocheon-high-school"
        },
        {
          "ref": "donghak-elementary"
        },
        {
          "ref": "seocheon-elementary"
        },
        {
          "ref": "seocheon-middle-school"
        },
        {
          "ref": "yulmok-elementary"
        },
        {
          "ref": "suwon-convention-center"
        },
        {
          "ref": "suwon-messe"
        },
        {
          "ref": "samsung-digital-city"
        },
        {
          "ref": "samsung-electro-mechanics"
        },
        {
          "ref": "samsung-hwaseong-campus"
        },
        {
          "ref": "samsung-giheung-campus"
        },
        {
          "ref": "samsung-display-giheung"
        },
        {
          "ref": "sait"
        },
        {
          "ref": "samsung-sdi-giheung"
        },
        {
          "ref": "samsung-sdi-suwon"
        },
        {
          "ref": "samsung-dsr-tower"
        },
        {
          "ref": "asml-korea"
        },
        {
          "ref": "tokyo-electron-korea"
        },
        {
          "ref": "applied-materials-korea"
        },
        {
          "ref": "asm-korea"
        },
        {
          "ref": "lam-research-korea"
        },
        {
          "ref": "sfa"
        },
        {
          "ref": "psk"
        },
        {
          "ref": "tes-dongtan"
        },
        {
          "ref": "kla-korea-dongtan"
        },
        {
          "ref": "kt-wiz-park"
        },
        {
          "ref": "suwon-sports-complex"
        },
        {
          "ref": "suwon-world-cup-stadium"
        },
        {
          "ref": "allright-gym"
        },
        {
          "ref": "twoperson-gym"
        },
        {
          "ref": "dallajim-pilates"
        },
        {
          "ref": "meggul-diet-gym"
        },
        {
          "ref": "mangpo-power-jump"
        },
        {
          "ref": "kind-gym-24"
        },
        {
          "ref": "suwon-indoor-gymnasium"
        },
        {
          "ref": "chilbo-gymnasium"
        },
        {
          "ref": "yongin-mir-stadium"
        },
        {
          "ref": "suwon-cc"
        },
        {
          "ref": "gold-cc"
        },
        {
          "ref": "korea-cc"
        },
        {
          "ref": "korea-public-cc"
        },
        {
          "ref": "lakeside-cc"
        },
        {
          "ref": "hwaseong-sangnok-gc"
        },
        {
          "ref": "hanwon-cc"
        },
        {
          "ref": "namseoul-cc"
        },
        {
          "ref": "taekwang-cc"
        },
        {
          "ref": "giheung-cc"
        },
        {
          "ref": "toer-ballet"
        },
        {
          "ref": "wild-boxing-gym"
        },
        {
          "ref": "taihorn-muaythai"
        },
        {
          "ref": "cheongpa-kumdo"
        },
        {
          "ref": "mr-shark-mma"
        },
        {
          "ref": "maum-meditation-yeongtong"
        },
        {
          "ref": "epic-climb"
        },
        {
          "ref": "taepung-taekwondo"
        },
        {
          "ref": "starfield-suwon"
        },
        {
          "ref": "galleria-gwanggyo"
        },
        {
          "ref": "fantasium"
        },
        {
          "ref": "golden-square"
        },
        {
          "ref": "fore-square"
        },
        {
          "ref": "uniqlo-mangpo"
        },
        {
          "ref": "timevillas-suwon"
        },
        {
          "ref": "ak-plaza-suwon"
        },
        {
          "ref": "nc-suwon-terminal"
        },
        {
          "ref": "newcore-dongsuwon"
        },
        {
          "ref": "emart-suwon"
        },
        {
          "ref": "lotte-mall-gwanggyo"
        },
        {
          "ref": "avenue-france-gwanggyo"
        },
        {
          "ref": "alleyway-gwanggyo"
        },
        {
          "ref": "lotte-dongtan"
        },
        {
          "ref": "lotte-premium-giheung"
        },
        {
          "ref": "topten-mangpo"
        },
        {
          "ref": "suwon-premium-outlet"
        },
        {
          "ref": "the-y-square"
        },
        {
          "ref": "bluekey"
        }
      ]
    },
    {
      "id": "fitness",
      "label": "운동시설·경기장·골프CC",
      "label_en": "Sports, Stadiums & Golf",
      "places": [
        {
          "id": "kt-wiz-park",
          "name": "수원KT위즈파크",
          "name_en": "Suwon KT Wiz Park",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/13491582?lng=127.0096587&lat=37.300096&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171127%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "KT 위즈의 홈구장",
          "description_en": "Home stadium of the KT Wiz baseball club.",
          "photo": "images/nearby/fitness/kt-wiz-park.jpg"
        },
        {
          "id": "suwon-sports-complex",
          "name": "수원종합운동장",
          "name_en": "Suwon Sports Complex",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%A2%85%ED%95%A9%EC%9A%B4%EB%8F%99%EC%9E%A5/place/20127073?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EC%A2%85%ED%95%A9%EC%9A%B4%EB%8F%99%EC%9E%A5%26entry%3Dpll%26fromNxList%3Dtrue%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%88%98%EC%9B%90%EC%A2%85%ED%95%A9%EC%9A%B4%EB%8F%99%EC%9E%A5%26svcName%3Dmap_pcv5%26timestamp%3D202607171115&entry=pll&from=nx&fromNxList=true&searchType=place&c=16.92,0,0,0,dh",
          "description": "수원FC, 수원FC위민의 홈구장",
          "description_en": "Home ground of Suwon FC and Suwon FC Women.",
          "photo": "images/nearby/fitness/suwon-stadium.jpg"
        },
        {
          "id": "suwon-world-cup-stadium",
          "name": "수원월드컵경기장(빅버드)",
          "name_en": "Suwon World Cup Stadium (Big Bird)",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11622953?lng=127.036915&lat=37.2865317&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171113%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원삼성블루윙즈의 홈구장",
          "description_en": "Home ground of Suwon Samsung Bluewings.",
          "photo": "images/nearby/fitness/worldcup-stadium.jpg"
        },
        {
          "id": "allright-gym",
          "name": "올라잇짐 헬스&PT 망포점",
          "name_en": "All Right Gym & PT (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/2072429164?c=18.14,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171054%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타 본점 주변 가장 유명한 헬스장",
          "description_en": "The best-known gym in the neighborhood around INSTA Hotel Flagship.",
          "photo": "images/nearby/fitness/alright-gym.jpg"
        },
        {
          "id": "twoperson-gym",
          "name": "투펄슨짐 피트니스 PT 헬스 망포점",
          "name_en": "Two Person Gym Fitness & PT (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 1,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1938896285?c=18.01,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171041%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타 본점에서 가장 가까운 헬스장",
          "description_en": "The closest gym to INSTA Hotel Flagship.",
          "photo": "images/nearby/fitness/tupulson-gym.jpg"
        },
        {
          "id": "dallajim-pilates",
          "name": "달라짐 PT 헬스 필라테스 수원망포역점",
          "name_en": "Dallajim PT & Pilates (Suwon Mangpo Station)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1945327159?c=18.16,0,0,0,dh&placePath=%2Fphoto%3FfromPanelNum%3D2%26timestamp%3D202607171044%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5%26filterType%3D%EC%97%85%EC%B2%B4",
          "description": "호텔인스타 본점에서 가장 가까운 필라테스",
          "description_en": "The closest pilates studio to INSTA Hotel Flagship.",
          "photo": "images/nearby/fitness/dalrajim-pt.jpg"
        },
        {
          "id": "meggul-diet-gym",
          "name": "메꿀다이어트짐 피트니스 PT 망포점",
          "name_en": "Meggul Diet Gym Fitness & PT (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 2,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1532087709?c=18.16,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171046%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타에서 가까운 헬스장",
          "description_en": "A gym close to INSTA Hotel Flagship.",
          "photo": "images/nearby/fitness/mekkul-gym.jpg"
        },
        {
          "id": "mangpo-power-jump",
          "name": "점핑다이어트 망포파워점프",
          "name_en": "Jumping Diet Mangpo Power Jump",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1270858642?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dple",
          "description": "호텔인스타 본점에서 가장 가까운 점핑 다이어트",
          "description_en": "The closest jumping-fitness studio to INSTA Hotel Flagship.",
          "photo": "images/nearby/fitness/jumping-diet.jpg"
        },
        {
          "id": "kind-gym-24",
          "name": "카인드짐24시 헬스&PT 망포점",
          "name_en": "Kind Gym 24h & PT (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1383920987?c=18.14,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171055%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타 본점에서 가장 가까운 24시운영 헬스장",
          "description_en": "The closest 24-hour gym to INSTA Hotel Flagship.",
          "photo": "images/nearby/fitness/kind-gym.jpg"
        },
        {
          "id": "suwon-indoor-gymnasium",
          "name": "수원종합운동장실내체육관",
          "name_en": "Suwon Sports Complex Indoor Gymnasium",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/13445049?placePath=%2Fhome%3Fentry%3Dplt%26from%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171117%26locale%3Dko%26svcName%3Dmap_pcv5&searchType=place&lng=127.0090851&lat=37.2983797&c=15.44,0,0,0,dh",
          "description": "남자배구 한국전력, 여자배구 현대건설의 홈구장",
          "description_en": "Home court of KEPCO Vixtorm (men's volleyball) and Hyundai E&C Hillstate (women's volleyball).",
          "photo": "images/nearby/fitness/suwon-indoor-gym.jpg"
        },
        {
          "id": "chilbo-gymnasium",
          "name": "서수원칠보체육관",
          "name_en": "Seo-Suwon Chilbo Gymnasium",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%84%9C%EC%88%98%EC%9B%90%EC%B9%A0%EB%B3%B4%EC%B2%B4%EC%9C%A1%EA%B4%80/place/37568341?placePath=?bk_query=%EC%84%9C%EC%88%98%EC%9B%90%EC%B9%A0%EB%B3%B4%EC%B2%B4%EC%9C%A1%EA%B4%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원 KT 소닉붐의 홈구장",
          "description_en": "Home court of the Suwon KT Sonicboom basketball club.",
          "photo": "images/nearby/fitness/seosuwon-chilbo.jpg"
        },
        {
          "id": "yongin-mir-stadium",
          "name": "용인미르스타디움",
          "name_en": "Yongin Mir Stadium",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/19282938?c=12.87,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171125%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "용인FC의 홈구장",
          "description_en": "Home ground of Yongin FC.",
          "photo": "images/nearby/fitness/yongin-mir.jpg"
        },
        {
          "id": "suwon-cc",
          "name": "수원CC",
          "name_en": "Suwon Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%BB%A8%ED%8A%B8%EB%A6%AC%ED%81%B4%EB%9F%BD/place/13374607?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EC%BB%A8%ED%8A%B8%EB%A6%AC%ED%81%B4%EB%9F%BD%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171302%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%EC%BB%A8%ED%8A%B8%EB%A6%AC%ED%81%B4%EB%9F%BD",
          "description": "프라이빗 골프장",
          "description_en": "A private golf course.",
          "photo": "images/nearby/fitness/suwon-cc.jpg"
        },
        {
          "id": "gold-cc",
          "name": "골드CC",
          "name_en": "Gold Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11612751?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171333%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "경기 남부의 대표적인 구장",
          "description_en": "One of the best-known courses in southern Gyeonggi.",
          "photo": "images/nearby/fitness/gold-cc.jpg"
        },
        {
          "id": "korea-cc",
          "name": "코리아CC",
          "name_en": "Korea Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11614135?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171334%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "골드CC 바로 옆에 위치하며 접근성이 좋음",
          "description_en": "Right next to Gold CC and easy to reach.",
          "photo": "images/nearby/fitness/korea-cc.jpg"
        },
        {
          "id": "korea-public-cc",
          "name": "코리아퍼블릭CC",
          "name_en": "Korea Public Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/13534320?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171336%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "퍼블릭 골프장으로 보다 캐주얼하게 즐기기 좋음",
          "description_en": "A public course for a more casual round.",
          "photo": "images/nearby/fitness/korea-public-cc.jpg"
        },
        {
          "id": "lakeside-cc",
          "name": "레이크사이드CC",
          "name_en": "Lakeside Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/37775677?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171338%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "대규모 코스를 자랑하는 골프장",
          "description_en": "A golf club known for its large-scale course layout.",
          "photo": "images/nearby/fitness/lakeside-cc.jpg"
        },
        {
          "id": "hwaseong-sangnok-gc",
          "name": "화성상록GC",
          "name_en": "Hwaseong Sangnok Golf Club",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/12375785?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171342%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "공무원연금공단에서 운영하여 관리가 철저한 구장",
          "description_en": "Operated by the Government Employees Pension Service and kept in meticulous condition.",
          "photo": "images/nearby/fitness/hwaseong-gc.jpg"
        },
        {
          "id": "hanwon-cc",
          "name": "한원CC",
          "name_en": "Hanwon Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1764292119?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171345%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "전통 있는 코스로 골퍼들에게 인기가 많음",
          "description_en": "A course with real heritage, long popular among golfers.",
          "photo": "images/nearby/fitness/hanwon-cc.jpg"
        },
        {
          "id": "namseoul-cc",
          "name": "남서울CC",
          "name_en": "Nam Seoul Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11612879?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171347%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "대회를 개최하는 골프장",
          "description_en": "A tournament-hosting golf course.",
          "photo": "images/nearby/fitness/namseoull-cc.jpg"
        },
        {
          "id": "taekwang-cc",
          "name": "태광CC",
          "name_en": "Taekwang Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11614136?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171349%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "흥덕지구 인근에 위치하여 망포에서 이동이 매우 편리",
          "description_en": "Located near the Heungdeok district, making it very convenient from Mangpo.",
          "photo": "images/nearby/fitness/taekwang-cc.jpg"
        },
        {
          "id": "giheung-cc",
          "name": "기흥CC",
          "name_en": "Giheung Country Club",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/21399220?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171350%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "울창한 수림이 특징",
          "description_en": "Known for its dense, mature woodland.",
          "photo": "images/nearby/fitness/giheung-cc.jpg"
        },
        {
          "id": "toer-ballet",
          "name": "토에르발레학원",
          "name_en": "Toer Ballet Academy",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/2039700791?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171058%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 발레학원",
          "description_en": "The closest ballet academy to INSTA Hotel Flagship."
        },
        {
          "id": "wild-boxing-gym",
          "name": "와일드복싱짐 본관",
          "name_en": "Wild Boxing Gym (Main)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/20421173?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171100%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 복싱장",
          "description_en": "The closest boxing gym to INSTA Hotel Flagship."
        },
        {
          "id": "taihorn-muaythai",
          "name": "타이혼스포츠아카데미 망포점",
          "name_en": "Taihorn Sports Academy (Mangpo)",
          "distance": {
            "mode": "walk",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/1376191623?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171107%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 무에타이",
          "description_en": "The closest Muay Thai gym to INSTA Hotel Flagship."
        },
        {
          "id": "cheongpa-kumdo",
          "name": "대한검도회 청파검도관",
          "name_en": "Cheongpa Kumdo Dojang (Korea Kumdo Association)",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/18278638?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171107%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 검도관",
          "description_en": "The closest kumdo dojang to INSTA Hotel Flagship."
        },
        {
          "id": "mr-shark-mma",
          "name": "미스터샤크MMA주짓수킥복싱멀티짐",
          "name_en": "Mr. Shark MMA, Jiu-Jitsu & Kickboxing Multi Gym",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/38781012?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171108%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 MMA",
          "description_en": "The closest MMA gym to INSTA Hotel Flagship."
        },
        {
          "id": "maum-meditation-yeongtong",
          "name": "마음수련 명상센터 영통점",
          "name_en": "Maum Meditation Center (Yeongtong)",
          "distance": {
            "mode": "walk",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/18281752?c=16.93,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171109%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 명상센터",
          "description_en": "The closest meditation center to INSTA Hotel Flagship."
        },
        {
          "id": "epic-climb",
          "name": "에픽클라임",
          "name_en": "Epic Climb",
          "distance": {
            "mode": "walk",
            "value": 3,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%81%B4%EB%9D%BC%EC%9D%B4%EB%B0%8D/place/1693141492?c=17.67,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171110%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%81%B4%EB%9D%BC%EC%9D%B4%EB%B0%8D",
          "description": "호텔인스타 본점에서 가장 가까운 클라이밍",
          "description_en": "The closest climbing gym to INSTA Hotel Flagship."
        },
        {
          "id": "taepung-taekwondo",
          "name": "태풍태권도",
          "name_en": "Taepung Taekwondo",
          "distance": {
            "mode": "walk",
            "value": 4,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%ED%83%9C%EA%B6%8C%EB%8F%84/place/1832674691?c=16.82,0,0,0,dh&placePath=%2Fphoto%3FfromPanelNum%3D2%26timestamp%3D202607171111%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%83%9C%EA%B6%8C%EB%8F%84",
          "description": "호텔인스타 본점에서 가장 가까운 태권도장",
          "description_en": "The closest taekwondo dojang to INSTA Hotel Flagship."
        }
      ]
    },
    {
      "id": "shopping",
      "label": "쇼핑몰",
      "label_en": "Shopping",
      "places": [
        {
          "id": "starfield-suwon",
          "name": "스타필드 수원",
          "name_en": "Starfield Suwon",
          "distance": {
            "mode": "car",
            "value": 22,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1045275610?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171155%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "수원에서 가장 핫한 초대형 복합 쇼핑몰",
          "description_en": "The hottest large-scale mixed-use shopping mall in Suwon.",
          "photo": "images/nearby/shopping/starfield-suwon.jpg"
        },
        {
          "id": "galleria-gwanggyo",
          "name": "갤러리아백화점",
          "name_en": "Galleria Department Store Gwanggyo",
          "distance": {
            "mode": "car",
            "value": 17,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EA%B4%91%EA%B5%90%EA%B0%A4%EB%9F%AC%EB%A6%AC%EC%95%84%EB%B0%B1%ED%99%94%EC%A0%90/place/1027110301?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171354%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B4%91%EA%B5%90%EA%B0%A4%EB%9F%AC%EB%A6%AC%EC%95%84%EB%B0%B1%ED%99%94%EC%A0%90",
          "description": "광교 신도시의 랜드마크이자 쇼핑몰",
          "description_en": "A landmark of Gwanggyo New Town as well as a shopping destination.",
          "photo": "images/nearby/shopping/galleria.jpg"
        },
        {
          "id": "fantasium",
          "name": "판타지움",
          "name_en": "Fantasium",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%ED%8C%90%ED%83%80%EC%A7%80%EC%9B%80/place/37994161?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%ED%8C%90%ED%83%80%EC%A7%80%EC%9B%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171138%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%ED%8C%90%ED%83%80%EC%A7%80%EC%9B%80&placeSearchOption=bk_query%3D%25EC%2588%2598%25EC%259B%2590%2520%25ED%258C%2590%25ED%2583%2580%25EC%25A7%2580%25EC%259B%2580%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EC%2588%2598%25EC%259B%2590%2520%25ED%258C%2590%25ED%2583%2580%25EC%25A7%2580%25EC%259B%2580%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "망포역 인근에서 가장 사랑받는 도심형 엔터테인먼트 복합 상업시설",
          "description_en": "The best-loved urban entertainment and retail complex near Mangpo Station.",
          "photo": "images/nearby/shopping/fantazium.jpg"
        },
        {
          "id": "golden-square",
          "name": "골든스퀘어",
          "name_en": "Golden Square",
          "distance": {
            "mode": "car",
            "value": 5,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/18276557?c=15.00,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171143%26locale%3Dko%26svcName%3Dmap_pcv5%26filterType%3D%EC%97%85%EC%B2%B4",
          "description": "망포역 바로 앞에 위치한 대형 복합 상가 건물",
          "description_en": "A large mixed-use retail building directly in front of Mangpo Station.",
          "photo": "images/nearby/shopping/golden-square.jpg"
        },
        {
          "id": "fore-square",
          "name": "포레스퀘어",
          "name_en": "Fore Square",
          "distance": {
            "mode": "car",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1904731154?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171147%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "깔끔한 인테리어가 돋보이는 망포동 일대의 중형 상업 시설",
          "description_en": "A mid-sized retail complex in the Mangpo-dong area with notably clean, modern interiors.",
          "photo": "images/nearby/shopping/fore-square.jpg"
        },
        {
          "id": "uniqlo-mangpo",
          "name": "유니클로 수원망포점",
          "name_en": "UNIQLO (Suwon Mangpo)",
          "distance": {
            "mode": "car",
            "value": 6,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/36132922?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171153%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "단독 매장으로 운영되어 매우 넓고 쾌적한 쇼핑 환경",
          "description_en": "A stand-alone store, so it is spacious and pleasant to shop in.",
          "photo": "images/nearby/shopping/uniqlo.jpg"
        },
        {
          "id": "timevillas-suwon",
          "name": "타임빌라스 수원",
          "name_en": "Time Villas Suwon",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/36011321?c=14.85,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171157%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "롯데백화점이 새롭게 리뉴얼하여 선보인 프리미엄 쇼핑 공간",
          "description_en": "A premium shopping space newly reimagined by Lotte Department Store.",
          "photo": "images/nearby/shopping/timevilas-suwon.jpg"
        },
        {
          "id": "ak-plaza-suwon",
          "name": "AK플라자 수원",
          "name_en": "AK Plaza Suwon",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/36097531?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171158%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "수원역과 직접 연결되어 있어 수십 년간 수원의 대표 쇼핑 랜드마크",
          "description_en": "Directly connected to Suwon Station and a defining Suwon shopping landmark for decades.",
          "photo": "images/nearby/shopping/ak-plaza.jpg"
        },
        {
          "id": "nc-suwon-terminal",
          "name": "NC백화점 수원터미널점",
          "name_en": "NC Department Store (Suwon Terminal)",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/19206564?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171200%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "수원종합버스터미널과 연결되어 있어 편리한 쇼핑",
          "description_en": "Connected to Suwon Bus Terminal for easy, convenient shopping.",
          "photo": "images/nearby/shopping/nc-dept.jpg"
        },
        {
          "id": "newcore-dongsuwon",
          "name": "뉴코아아울렛 동수원점",
          "name_en": "NewCore Outlet (Dong-Suwon)",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11625349?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171229%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "인계동에 위치해서 둘러보기 좋은",
          "description_en": "Located in Ingye-dong and pleasant to browse.",
          "photo": "images/nearby/shopping/newcore-outlet.jpg"
        },
        {
          "id": "emart-suwon",
          "name": "이마트 수원점",
          "name_en": "emart (Suwon)",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/search/%EC%9D%B4%EB%A7%88%ED%8A%B8%20%EC%88%98%EC%9B%90%EC%A0%90/place/11605020?c=15.00,0,0,0,dh&isCorrectAnswer=true",
          "description": "수원종합버스터미널 근처에 위치",
          "description_en": "Located near Suwon Bus Terminal.",
          "photo": "images/nearby/shopping/emart-suwon.jpg"
        },
        {
          "id": "lotte-mall-gwanggyo",
          "name": "롯데몰 광교점",
          "name_en": "Lotte Mall Gwanggyo",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/31564934?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171232%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "광교중앙역 인근에 위치한 백화점",
          "description_en": "A department store near Gwanggyo Jungang Station.",
          "photo": "images/nearby/shopping/lotte-mall-gwanggyo.jpg"
        },
        {
          "id": "avenue-france-gwanggyo",
          "name": "아브뉴프랑 광교",
          "name_en": "Avenue France Gwanggyo",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/36668603?c=15.00,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171234%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "이국적인 분위기를 연출하는 스트리트형 쇼핑몰",
          "description_en": "A street-style shopping mall with a distinctly European atmosphere.",
          "photo": "images/nearby/shopping/avenue-franc.jpg"
        },
        {
          "id": "alleyway-gwanggyo",
          "name": "앨리웨이 광교",
          "name_en": "Alleyway Gwanggyo",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1410191638?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171235%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "광교호수공원 바로 옆에 위치하여 멋진 경관을 자랑하는 쇼핑센터",
          "description_en": "A shopping center right beside Gwanggyo Lake Park with lovely views.",
          "photo": "images/nearby/shopping/alleyway-gwanggyo.jpg"
        },
        {
          "id": "lotte-dongtan",
          "name": "롯데백화점 동탄점",
          "name_en": "Lotte Department Store Dongtan",
          "distance": {
            "mode": "car",
            "value": 20,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1438057579?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171252%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "큰규모와 감각적인 아트 전시가 결합된 경기 남부의 대형 백화점",
          "description_en": "A large southern-Gyeonggi department store combining scale with stylish art exhibitions.",
          "photo": "images/nearby/shopping/lotte-dept-dongtan.jpg"
        },
        {
          "id": "lotte-premium-giheung",
          "name": "롯데프리미엄아울렛 기흥",
          "name_en": "Lotte Premium Outlets Giheung",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1586416290?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171254%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "드넓은 부지 위에 자연 친화적인 컨셉으로 지어진 프리미엄 교외형 아울렛",
          "description_en": "A premium suburban outlet built on a broad site with a nature-friendly concept.",
          "photo": "images/nearby/shopping/lotte-premium-giheung.jpg"
        },
        {
          "id": "topten-mangpo",
          "name": "탑텐 수원망포점",
          "name_en": "TOPTEN (Suwon Mangpo)",
          "distance": {
            "mode": "car",
            "value": 7,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1264759163?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171255%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "넓은 건물과 다양한 상품",
          "description_en": "A spacious building with a wide product range.",
          "photo": "images/nearby/shopping/topten-mangpo.jpg"
        },
        {
          "id": "suwon-premium-outlet",
          "name": "수원프리미엄아울렛",
          "name_en": "Suwon Premium Outlet",
          "distance": {
            "mode": "car",
            "value": 15,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/11667794?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171256%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "골프웨어와 아웃도어 브랜드를 둘러보기 좋은 쇼핑 공간",
          "description_en": "A good place to browse golf wear and outdoor brands.",
          "photo": "images/nearby/shopping/suwon-premium-outlet.jpg"
        },
        {
          "id": "the-y-square",
          "name": "더와이스퀘어",
          "name_en": "The Y Square",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1749742847?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171257%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "용인 처인구청 인근의 랜드마크로 떠오른 쾌적한 복합 상업 시설",
          "description_en": "A comfortable retail complex that has become a landmark near Yongin Cheoin-gu Office.",
          "photo": "images/nearby/shopping/the-y-square.jpg"
        },
        {
          "id": "bluekey",
          "name": "블루키",
          "name_en": "Bluekey",
          "distance": {
            "mode": "car",
            "value": 25,
            "unit": "min"
          },
          "url": "https://map.naver.com/p/entry/place/1004753432?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171259%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "용인 동백지구에 위치한 중대형 복합 쇼핑 테마파크",
          "description_en": "A mid-to-large shopping theme park in the Dongbaek district of Yongin.",
          "photo": "images/nearby/shopping/bluekey.jpg"
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined') { module.exports = nearbyData; }
