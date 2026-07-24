// 호텔인스타 주변안내 데이터 (자동 생성)
// 카테고리 탭 + 카드 그리드용. 새 장소 추가 시 해당 category의 places 배열에 push.
const nearbyData = {
  "categories": [
    {
      "id": "attractions",
      "label": "관광지",
      "places": [
        {
          "name": "수원화성",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/13491459?lng=127.0116997&lat=37.2869919&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "성곽길을 따라 걸으며 수원의 전경을 한눈에 담을 수 있는 최고의 랜드마크입니다.",
          "photo": "images/nearby/attractions/수원화성.jpg"
        },
        {
          "name": "화성행궁",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/31169145?lng=127.0137602&lat=37.2818785&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607160944%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place",
          "description": "정조가 머물던 임시 궁궐로, 아름다운 건축미와 다양한 상설 공연을 즐길 수 있습니다.",
          "photo": "images/nearby/attractions/화성행궁.png"
        },
        {
          "name": "한국민속촌",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/entry/place/11620801?lng=127.1205573&lat=37.2594023&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607180158%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "선조들의 지혜와 슬기를 체험할 수 있는 국내 유일의 전통문화 테마파크",
          "photo": "images/nearby/attractions/한국민속촌.jpg"
        },
        {
          "name": "팔달문",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/19796543?lng=127.0167507&lat=37.2775465&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "수원의 중심에 우뚝 솟아 있는 보물 제402호 남문입니다.",
          "photo": "images/nearby/attractions/팔달문.jpg"
        },
        {
          "name": "수원화성박물관",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/13093608?lng=127.018934&lat=37.2826896&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "수원화성의 축성 과정과 정조의 사상을 깊이 있게 이해할 수 있는 전문 박물관입니다.",
          "photo": "images/nearby/attractions/수원화성박물관.jpg"
        },
        {
          "name": "수원박물관",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EB%B0%95%EB%AC%BC%EA%B4%80/place/2047361170?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EB%B0%95%EB%AC%BC%EA%B4%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607160954%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%EB%B0%95%EB%AC%BC%EA%B4%80&placeSearchOption=bk_query%3D%25EC%2588%2598%25EC%259B%2590%25EB%25B0%2595%25EB%25AC%25BC%25EA%25B4%2580%26entry%3Dpll%26fromNxList%3Dtrue&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원의 고대 역사부터 근현대사까지 한눈에 볼 수 있는 곳입니다",
          "photo": "images/nearby/attractions/수원박물관.jpg"
        },
        {
          "name": "수원광교박물관",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/20597182?lng=127.0514217&lat=37.2963487&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "광교 신도시 개발 중 발굴된 유물과 기증 유물을 전시하는 차분한 공간입니다.",
          "photo": "images/nearby/attractions/수원광교박물관.jpg"
        },
        {
          "name": "에버랜드",
          "distance": "차량 25~30분",
          "url": "https://naver.me/x2jQdLls",
          "description": "1년 365일 계절별 다채롭게 펼쳐지는 축제와 어트랙션, 동물, 식물 등 다양한 시설로 즐거운 휴식과 기쁨을 선사하는 테마파크",
          "photo": "images/nearby/attractions/에버랜드.jpg"
        },
        {
          "name": "캐리비안 베이",
          "distance": "차량 25~30분",
          "url": "https://naver.me/xWT3WiEM",
          "description": "대한민국에서 두 번째로 큰 워터파크며, 카리브해를 재현한 워터파크로, 1996년 5월 21일에 개장한 국내 최초의 워터파크다.",
          "photo": "images/nearby/attractions/캐리비안베이.jpg"
        },
        {
          "name": "광교호수공원",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/entry/place/20815787?lng=127.0696711&lat=37.2826146&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161000%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "신대호수와 원천호수를 아우르는 거대한 공원으로, 국내 최고 수준의 아름다운 호수 야경을 자랑합니다.",
          "photo": "images/nearby/attractions/광교호수공원.jpg"
        },
        {
          "name": "일월수목원",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/1751677198?lng=126.9760421&lat=37.2883577&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161001%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "도심 속 평온한 오아시스 같은 곳으로, 예쁜 온실과 산책로가 조성되어 있습니다.",
          "photo": "images/nearby/attractions/일월수목원.jpg"
        },
        {
          "name": "영흥수목원",
          "distance": "차량 10분",
          "url": "https://map.naver.com/p/entry/place/37562565?lng=127.0711629&lat=37.2636683&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "숲을 보존하며 다채로운 정원을 가꾼 정원형 수목원입니다.",
          "photo": "images/nearby/attractions/영흥수목원.jpg"
        },
        {
          "name": "효원공원월화원",
          "distance": "차량 10분",
          "url": "https://map.naver.com/p/entry/place/13447998?lng=127.0379325&lat=37.2651597&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161005%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "중국 전통 정원으로, 이국적인 분위기 덕분에 촬영지로도 자주 쓰입니다.",
          "photo": "images/nearby/attractions/효원공원월화원.jpg"
        },
        {
          "name": "연무대",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%EC%97%B0%EB%AC%B4%EB%8C%80/place/1352017539?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%EC%97%B0%EB%AC%B4%EB%8C%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607160948%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%EC%97%B0%EB%AC%B4%EB%8C%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "군사들이 무예를 연마하던 곳으로, 국궁(활쏘기) 체험이 가능합니다.",
          "photo": "images/nearby/attractions/연무대.jpg"
        },
        {
          "name": "황구지천",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%ED%99%A9%EA%B5%AC%EC%A7%80%EC%B2%9C/place/19203880?placePath=?bk_query=%ED%99%A9%EA%B5%AC%EC%A7%80%EC%B2%9C&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "봄이 되면 끝없이 이어지는 벚꽃 터널을 감상할 수 있는 숨은 벚꽃 명소입니다.",
          "photo": "images/nearby/attractions/황구지천.jpg"
        },
        {
          "name": "만석공원",
          "distance": "차량 20~25분",
          "url": "https://map.naver.com/p/entry/place/13281108?lng=127.0005267&lat=37.3016596&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "커다란 저수지(만석거)를 중심으로 벚꽃길과 산책로가 잘 정비된 시민들의 휴식처입니다.",
          "photo": "images/nearby/attractions/만석공원.jpg"
        },
        {
          "name": "행리단길",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/1220976474?lng=127.0129785&lat=37.2852994&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161013%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "행궁동 성곽 안팎의 오래된 주택을 개조한 감성 카페, 소품숍, 맛집들이 모여 있는 수원의 대표 핫플입니다.",
          "photo": "images/nearby/attractions/행리단길.jpg"
        },
        {
          "name": "플라잉수원",
          "distance": "차량 17분",
          "url": "https://map.naver.com/p/entry/place/1317848971?lng=127.0263972&lat=37.2866553&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "커다란 계류식 헬륨 기구를 타고 수원화성 일대를 상공 150m 위에서 내려다보는 특별한 경험을 할 수 있습니다.",
          "photo": "images/nearby/attractions/플라잉수원.jpg"
        },
        {
          "name": "수원시립미술관",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%8B%9C%EB%A6%BD%EB%AF%B8%EC%88%A0%EA%B4%80/place/36513873?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EC%8B%9C%EB%A6%BD%EB%AF%B8%EC%88%A0%EA%B4%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161030%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%EC%8B%9C%EB%A6%BD%EB%AF%B8%EC%88%A0%EA%B4%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "행궁 바로 옆에 위치해 있으며, 모던한 건축미와 현대 미술 전시를 함께 즐길 수 있습니다.",
          "photo": "images/nearby/attractions/수원시립미술관.jpg"
        },
        {
          "name": "해우재박물관",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/19931510?lng=126.9780125&lat=37.3192333&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "세계 최초의 변기 모양 박물관으로, 아이들과 함께 가볍고 유쾌하게 방문하기 좋은 이색 공간입니다.",
          "photo": "images/nearby/attractions/해우재박물관.jpg"
        },
        {
          "name": "행궁동벽화마을",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/36733772?lng=127.0165972&lat=37.285537&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161039%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "따뜻하고 정겨운 그림들이 좁은 골목길을 채우고 있어 조용히 산책하며 사진 남기기 좋습니다.",
          "photo": "images/nearby/attractions/행궁동벽화마을.jpg"
        },
        {
          "name": "신동수변공원",
          "distance": "차량 8분",
          "url": "https://map.naver.com/p/search/%EC%8B%A0%EB%8F%99%EC%88%98%EB%B3%80%EA%B3%B5%EC%9B%90/place/330862615?placePath=%2Fhome%3Fbk_query%3D%EC%8B%A0%EB%8F%99%EC%88%98%EB%B3%80%EA%B3%B5%EC%9B%90%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161047%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%8B%A0%EB%8F%99%EC%88%98%EB%B3%80%EA%B3%B5%EC%9B%90&placeSearchOption=bk_query%3D%25EC%258B%25A0%25EB%258F%2599%25EC%2588%2598%25EB%25B3%2580%25EA%25B3%25B5%25EC%259B%2590%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EC%258B%25A0%25EB%258F%2599%25EC%2588%2598%25EB%25B3%2580%25EA%25B3%25B5%25EC%259B%2590%26x%3D127.057454%26y%3D37.235530&searchType=place",
          "description": "영통구 신동카페거리 바로 옆에 흐르는 하천을 따라 조성된 산책로입니다.",
          "photo": "images/nearby/attractions/신동수변공원.jpg"
        },
        {
          "name": "삼성이노베이션뮤지엄 (SIM)",
          "distance": "차량 8분",
          "url": "https://map.naver.com/p/entry/place/34761205?lng=127.055628&lat=37.2576968&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161050%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "전자산업의 역사와 미래 기술을 체험할 수 있는 세계 최대 규모의 전자산업사 박물관입니다.",
          "photo": "images/nearby/attractions/삼성이노베이션뮤지엄.jpg"
        },
        {
          "name": "지도박물관 (국토지리정보원)",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/entry/place/11783082?lng=127.0551&lat=37.276125&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161051%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "우리나라 지도의 역사와 측량 기술의 발달 과정을 한눈에 볼 수 있는 곳입니다.",
          "photo": "images/nearby/attractions/지도박물관.jpg"
        },
        {
          "name": "경기아트센터",
          "distance": "차량 12분",
          "url": "https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EC%95%84%ED%8A%B8%EC%84%BC%ED%84%B0/place/13281060?placePath=/home?bk_query=%EA%B2%BD%EA%B8%B0%EC%95%84%ED%8A%B8%EC%84%BC%ED%84%B0&entry=pll&from=map&fromNxList=true&fromPanelNum=2&timestamp=202607161052&locale=ko&svcName=map_pcv5&searchText=%EA%B2%BD%EA%B8%B0%EC%95%84%ED%8A%B8%EC%84%BC%ED%84%B0&searchType=place&c=15.00,0,0,0,dh",
          "description": "클래식, 연극, 무용 등 다양한 기획 공연이 열리는 경기도 문화의 중심입니다.",
          "photo": "images/nearby/attractions/경기아트센터.jpg"
        },
        {
          "name": "KBS 수원드라마제작센터",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/search/KBS%20%EC%88%98%EC%9B%90%EB%93%9C%EB%9D%BC%EB%A7%88%EC%A0%9C%EC%9E%91%EC%84%BC%ED%84%B0/place/19211605?placePath=%2Fhome%3Fbk_query%3DKBS%20%EC%88%98%EC%9B%90%EB%93%9C%EB%9D%BC%EB%A7%88%EC%A0%9C%EC%9E%91%EC%84%BC%ED%84%B0%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161054%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3DKBS%20%EC%88%98%EC%9B%90%EB%93%9C%EB%9D%BC%EB%A7%88%EC%A0%9C%EC%9E%91%EC%84%BC%ED%84%B0&placeSearchOption=bk_query%3DKBS%2520%25EC%2588%2598%25EC%259B%2590%25EB%2593%259C%25EB%259D%25BC%25EB%25A7%2588%25EC%25A0%259C%25EC%259E%2591%25EC%2584%25BC%25ED%2584%25B0%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3DKBS%2520%25EC%2588%2598%25EC%259B%2590%25EB%2593%259C%25EB%259D%25BC%25EB%25A7%2588%25EC%25A0%259C%25EC%259E%2591%25EC%2584%25BC%25ED%2584%25B0%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "수많은 사극과 현대극이 촬영된 세트장으로, 사전 예약 시 투어가 가능합니다.",
          "photo": ""
        },
        {
          "name": "청명산",
          "distance": "차량 14분",
          "url": "https://map.naver.com/p/search/%EC%B2%AD%EB%AA%85%EC%82%B0/place/19295695?placePath=%2Fphoto%3Fbk_query%3D%EC%B2%AD%EB%AA%85%EC%82%B0%26entry%3Dpll%26fromNxList%3Dtrue%26fromPanelNum%3D2%26timestamp%3D202607161056%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%AD%EB%AA%85%EC%82%B0%26filterType%3D%EC%97%85%EC%B2%B4&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.15,0,0,0,dh",
          "description": "영통 도심을 품고 있는 걷기 좋은 도심 속 숲길입니다.",
          "photo": ""
        },
        {
          "name": "영통사",
          "distance": "차량 8분",
          "url": "https://map.naver.com/p/search/%EC%98%81%ED%86%B5%20%EC%A0%88/place/20127096?searchType=place&placePath=%2Fhome%3Fentry%3Dpll%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161057%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%81%ED%86%B5%20%EC%A0%88&lng=127.078131&lat=37.2581297&c=15.00,0,0,0,dh",
          "description": "도심 속에 있는 절로, 접근성이 편합니다.",
          "photo": ""
        },
        {
          "name": "광교푸른숲도서관",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/search/%EA%B4%91%EA%B5%90%ED%91%B8%EB%A5%B8%EC%88%B2%EB%8F%84%EC%84%9C%EA%B4%80/place/1967683169?placePath=%2Fhome%3Fbk_query%3D%EA%B4%91%EA%B5%90%ED%91%B8%EB%A5%B8%EC%88%B2%EB%8F%84%EC%84%9C%EA%B4%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161101%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B4%91%EA%B5%90%ED%91%B8%EB%A5%B8%EC%88%B2%EB%8F%84%EC%84%9C%EA%B4%80&placeSearchOption=bk_query%3D%25EA%25B4%2591%25EA%25B5%2590%25ED%2591%25B8%25EB%25A5%25B8%25EC%2588%25B2%25EB%258F%2584%25EC%2584%259C%25EA%25B4%2580%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EA%25B4%2591%25EA%25B5%2590%25ED%2591%25B8%25EB%25A5%25B8%25EC%2588%25B2%25EB%258F%2584%25EC%2584%259C%25EA%25B4%2580%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "광교호수공원 산책로와 연결된 숲속 도서관으로 자연 속에서 독서하기 좋습니다.",
          "photo": "images/nearby/attractions/광교푸른숲도서관.jpg"
        },
        {
          "name": "광교산",
          "distance": "차량 20~25분",
          "url": "https://map.naver.com/p/entry/place/13491517?lng=127.0344274&lat=37.3449278&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "수원 시민들이 가장 사랑하는 등산로로, 형제봉까지 오르면 수원 시내가 한눈에 보입니다.",
          "photo": ""
        },
        {
          "name": "아쿠아플라넷 광교",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/search/%EA%B4%91%EA%B5%90%20%EC%95%84%EC%BF%A0%EC%95%84%EB%A6%AC%EC%9B%80/place/1375547224?placePath=?bk_query=%EA%B4%91%EA%B5%90%20%EC%95%84%EC%BF%A0%EC%95%84%EB%A6%AC%EC%9B%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "갤러리아 광교 파사쥬 지하에 위치한 트렌디한 도심형 아쿠아리움입니다.",
          "photo": "images/nearby/attractions/아쿠아플라넷광교.jpg"
        },
        {
          "name": "국립농업박물관",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/1573431930?lng=126.982093&lat=37.2759795&placePath=%2Fhome&entry=plt&searchType=place",
          "description": "한국 농업의 모든 역사가 담긴 공간",
          "photo": "images/nearby/attractions/국립농업박물관.jpg"
        },
        {
          "name": "수원용화사",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%EC%9A%A9%ED%99%94%EC%82%AC/place/32098597?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%EC%9A%A9%ED%99%94%EC%82%AC%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607180215%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%EC%9A%A9%ED%99%94%EC%82%AC&placeSearchOption=bk_query%3D%25EC%2588%2598%25EC%259B%2590%2520%25EC%259A%25A9%25ED%2599%2594%25EC%2582%25AC%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EC%2588%2598%25EC%259B%2590%2520%25EC%259A%25A9%25ED%2599%2594%25EC%2582%25AC%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "석불로 유명한 용화사",
          "photo": "images/nearby/attractions/수원용화사.jpg"
        },
        {
          "name": "대한불교조계종 봉녕사",
          "distance": "차량 20분",
          "url": "https://naver.me/FO9KrHKJ",
          "description": "수원에서 가장 오래된 사찰",
          "photo": "images/nearby/attractions/대한불교조계종봉녕사.jpg"
        },
        {
          "name": "광교어린이천문대",
          "distance": "차량 25분",
          "url": "https://naver.me/xpBvgS50",
          "description": "대한민국 최초로 개발된 4년 과정의 체계적인 천문 프로그램을 통해 우주 속에 숨은 과학적 지식을 나누며 어두운 밤길을 걸으며 하늘에 있는 별에 관해서 이야기 나눌 수 있는 정보를 제공",
          "photo": "images/nearby/attractions/광교어린이천문대.jpg"
        }
      ]
    },
    {
      "id": "restaurants",
      "label": "음식점",
      "places": [
        {
          "name": "백년광명순대국 망포본점",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1706822340?c=17.20,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161110%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "잡내 없이 깔끔한 순대국의 정석",
          "photo": ""
        },
        {
          "name": "화홍칼국수",
          "distance": "도보 1분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/2023614566?c=18.11,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161112%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "진한 닭육수로 완성된 녹진한 한 그릇",
          "photo": "images/nearby/restaurants/hwahong.jpg"
        },
        {
          "name": "까치식당 망포점",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1858733778?c=18.55,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161116%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "정갈한 밑반찬과 함께하는 행복한 한끼",
          "photo": "images/nearby/restaurants/kkachi.jpg"
        },
        {
          "name": "명가원설농탕신영통점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/18278098?c=18.55,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161118%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "가족 모두 만족하는 설렁탕, 갈비탕",
          "photo": "images/nearby/restaurants/myeonggawon.jpg"
        },
        {
          "name": "배서방족발집 망포본점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/20430725?c=19.99,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161120%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "따뜻한 족발은 언제나 옳다",
          "photo": "images/nearby/restaurants/baeseo-jokbal.jpg"
        },
        {
          "name": "긴자 신영통점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/35228977?c=19.99,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161121",
          "description": "편안한 분위기 좋은 일식",
          "photo": "images/nearby/restaurants/ginza.jpg"
        },
        {
          "name": "천애부히쇼우 망포 본점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1731985891?c=19.56,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161123%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "깔끔한 우동과 푸짐한 덮밥",
          "photo": "images/nearby/restaurants/cheonae-hisho.jpg"
        },
        {
          "name": "24시전주명가콩나물국밥 망포점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/37334768?c=18.54,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161126%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26filterType%3DAI%20View%26subFilter%3DMENU_NAME%3A%EA%B5%AD%EB%B0%A5",
          "description": "24시 언제나 따뜻한 콩나물 국밥",
          "photo": "images/nearby/restaurants/jeongju-kongnamul.jpg"
        },
        {
          "name": "포동이네 수원본점",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/38338093?c=19.41,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161132%26reviewSort%3Drecent",
          "description": "두툼하고 행복한 초밥시간",
          "photo": "images/nearby/restaurants/podo-sushi.jpg"
        },
        {
          "name": "수산포차청해",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/19215161?c=18.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161135%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "망포 회는 무조건 여기",
          "photo": "images/nearby/restaurants/susanpocha.jpg"
        },
        {
          "name": "병천청년순대국 수원망포점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/24%EC%8B%9C%20%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1106478427?placePath=/home?bk_query=24%EC%8B%9C%20%EC%9D%8C%EC%8B%9D%EC%A0%90&entry=pll&from=map&fromNxList=true&fromPanelNum=2&timestamp=202607161254&locale=ko&svcName=map_pcv5&searchText=24%EC%8B%9C%20%EC%9D%8C%EC%8B%9D%EC%A0%90&searchType=place&c=19.55,0,0,0,dh",
          "description": "24시 언제나 따뜻한 순대국밥",
          "photo": "images/nearby/restaurants/byeongcheon.jpg"
        },
        {
          "name": "후라이드참잘하는집 망포반월점",
          "distance": "도보 4분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1909964825?c=20.00,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161247%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161332%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "맥주를 부르는 매콤한 염지",
          "photo": "images/nearby/restaurants/fried-chicken.jpg"
        },
        {
          "name": "버거킹 수원망포점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/36667545?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161334%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "불맛나는 와퍼는 언제나 맛있다",
          "photo": "images/nearby/restaurants/burgerking.jpg"
        },
        {
          "name": "태장식당 망포 직영점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1809563305?c=19.11,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161336%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "만족스러운 냉삼 맛집",
          "photo": "images/nearby/restaurants/taejang.jpg"
        },
        {
          "name": "동대문엽기떡볶이 수원망포점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/37085991?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161338%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "떡볶이는 엽떡",
          "photo": "images/nearby/restaurants/yeolgi-tteokbokki.jpg"
        },
        {
          "name": "소문난대구왕뽈찜",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/13441970?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161339%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "부드러운 대구살과 쫄깃한 아구의 조화",
          "photo": "images/nearby/restaurants/somunan-daegu.jpg"
        },
        {
          "name": "5.5닭갈비 경기지사",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/21074163?c=20.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161340%26filterType%3D%ED%81%B4%EB%A6%BD",
          "description": "철판닭갈비 전통의 강자",
          "photo": "images/nearby/restaurants/55-dakgalbi.jpg"
        },
        {
          "name": "권선동황소곱창2호점",
          "distance": "도보 6분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1291900721?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161344%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "소곱창의 정석",
          "photo": "images/nearby/restaurants/gwonseon-gopchang2.jpg"
        },
        {
          "name": "3월3일 반월 본점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1608648066?c=19.28,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161345%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "워터에이징 숙성고기의 깊은 맛",
          "photo": "images/nearby/restaurants/3wol3il.jpg"
        },
        {
          "name": "먹고보자양꼬치 신영통점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1296768195?c=19.28,0,0,0,dh&placePath=%2Fmenu%3Fentry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161401%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "양꼬치와 요리 모두 만족스러운",
          "photo": "images/nearby/restaurants/meokgoboja.jpg"
        },
        {
          "name": "우설화 신영통점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/34013227?c=19.38,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161410%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "정갈한 소고기집",
          "photo": "images/nearby/restaurants/useolhwa.jpg"
        },
        {
          "name": "본가신림동백순대맛집 본점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1215060774?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161411%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "맛있는 철판 순대볶음",
          "photo": "images/nearby/restaurants/bonga-sundae.jpg"
        },
        {
          "name": "정철황소곱창 본점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/34484553?c=19.53,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161412%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "모둠으로 만나는 다채로운맛",
          "photo": "images/nearby/restaurants/jeongcheol-gopchang.jpg"
        },
        {
          "name": "항아리보쌈본점",
          "distance": "도보 6분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/18277434?c=19.23,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161414%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "우리가 아는 그 항아리 보쌈 본점",
          "photo": "images/nearby/restaurants/hangari-bossam.jpg"
        },
        {
          "name": "벽적골황소곱창 망포본점",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/entry/place/35117452?lng=127.0575818&lat=37.2465415&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161415%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "망포 곱창 = 이곳",
          "photo": "images/nearby/restaurants/byeokjeokgol.jpg"
        },
        {
          "name": "십년한우실비집 수원망포점",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%8B%AD%EB%85%84%ED%95%9C%EC%9A%B0%EC%8B%A4%EB%B9%84%EC%A7%91/place/1941852090?placePath=?bk_query=%EC%8B%AD%EB%85%84%ED%95%9C%EC%9A%B0%EC%8B%A4%EB%B9%84%EC%A7%91&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "다양한 메뉴로 즐기는 한우의 매력",
          "photo": "images/nearby/restaurants/sipnyeon-hanwoo.jpg"
        },
        {
          "name": "일보스시 망포점",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1909152644?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161423%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "깔끔한 초밥의 정석",
          "photo": "images/nearby/restaurants/ilbo-sushi.jpg"
        },
        {
          "name": "금화루",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/30941919?c=19.23,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161425%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "간짜장 좋아하시면 무조건 추천",
          "photo": "images/nearby/restaurants/geumhwaru.jpg"
        },
        {
          "name": "가마치통닭 수원망포역점",
          "distance": "도보 15분 (차량 5분)",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1069450520?c=18.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161426%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "짭짤한 옛날통닭과 생맥주 한잔",
          "photo": "images/nearby/restaurants/gamachi.jpg"
        },
        {
          "name": "달구운바람 돼지갈비 영통망포점",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/place/1269776772?c=18.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161427%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%8C%EC%8B%9D%EC%A0%90",
          "description": "편하게 먹는 원적외선 직화 돼지갈비",
          "photo": "images/nearby/restaurants/dalguunbaram.jpg"
        }
      ]
    },
    {
      "id": "cafes",
      "label": "카페·베이커리",
      "places": [
        {
          "name": "메가MGC커피 망포늘푸른벽산점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1871534625?c=18.97,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161428%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "언제 어디서나, 부담스럽지 않은 가격과 대용량으로 모든 사람들에게 사랑받는",
          "photo": ""
        },
        {
          "name": "에이바우트커피 망포점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1744379259?c=18.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161431%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "새벽 1시까지 영업하는 카페",
          "photo": ""
        },
        {
          "name": "공차 수원태장점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1565662461?c=19.30,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161437%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "대만의 작은 버블티 매장에서 시작해, 지금은 전 세계 2,100개가 넘는 매장을 운영하는 공차",
          "photo": ""
        },
        {
          "name": "파리바게뜨 영통벽산점",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/19420029?c=18.43,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161443%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "1988년부터 익숙한 프랜차이즈 브랜드인 파리바게뜨",
          "photo": ""
        },
        {
          "name": "카페 만월경 망포마을점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1143181159?c=18.13,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%B9%B4%ED%8E%98%26svcName%3Dmap_pcv5%26timestamp%3D202607161443",
          "description": "24시 무인카페",
          "photo": ""
        },
        {
          "name": "이디야 수원망포점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/21535989?c=17.22,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161445%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "커피 한 잔 속에 담긴 수많은 전문가의 노력",
          "photo": ""
        },
        {
          "name": "엠오삼오",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1081422489?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161455%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "고소한 풍미의 깊은 맛 아메리카노",
          "photo": ""
        },
        {
          "name": "백억커피 태장사거리점",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1432406367?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161456%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "좋은 이름처럼 좋은 커피도\n사람들의 하루를 기분 좋게 만드는",
          "photo": ""
        },
        {
          "name": "가비앙",
          "distance": "도보 8분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/36648807?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161501%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "뜨개인 환영카페",
          "photo": ""
        },
        {
          "name": "따듯 공방카페",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1487214431?c=17.79,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161503%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "뜨개와 커피가 공존하는 아늑한 공간",
          "photo": ""
        },
        {
          "name": "워킨",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1602309691?c=18.04,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161504%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "버터향 가득한 소금빵의 유혹",
          "photo": ""
        },
        {
          "name": "우드베어 망포",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1446951188?c=17.58,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161504%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "깔끔한 산미 없는 아이스 아메리카노",
          "photo": ""
        },
        {
          "name": "Cafe West Roasters",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1379904004?c=17.99,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161506%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "카페라떼가 시그니처인",
          "photo": ""
        },
        {
          "name": "투썸플레이스 태장사거리점",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1265276570?c=18.12,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161507%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "투썸의 아이덴티티에는 커피와 케이크의 만남",
          "photo": ""
        },
        {
          "name": "퍼지데이즈",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/2099076443?c=19.13,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161509%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "촉촉한 도넛과 커피의 달콤한 만남",
          "photo": ""
        },
        {
          "name": "우지커피 수원망포점",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/2050301958?c=19.13,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161509%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "누구나, 언제든, 부담없이 즐길 수 있는 좋은 커피",
          "photo": ""
        },
        {
          "name": "파파노아이",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1521428222?c=18.05,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161511%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "부드럽고 쫄깃한 탕종식빵의 매력",
          "photo": ""
        },
        {
          "name": "오직유과자집",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/482389077?c=18.05,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161512%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "쿠키가 맛있는",
          "photo": ""
        },
        {
          "name": "하나비",
          "distance": "차량 4분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/2022373368?c=16.40,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161513%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "흑임자 크림라떼로 느끼는 고소한 시간",
          "photo": ""
        },
        {
          "name": "요거트홈 망포점",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1574700346?c=18.62,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%B9%B4%ED%8E%98%26svcName%3Dmap_pcv5%26timestamp%3D202607161513",
          "description": "그릭요거트 맛집",
          "photo": ""
        },
        {
          "name": "킹덤카페",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1998419431?c=19.09,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161515%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "달콤한 코코넛커피의 힐링 타임",
          "photo": ""
        },
        {
          "name": "더리터 태장초점",
          "distance": "차량 4분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1650668624?c=17.98,0,0,0,dh&placePath=%2Freview%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%B9%B4%ED%8E%98%26svcName%3Dmap_pcv5%26timestamp%3D202607161516",
          "description": "압도적인 양",
          "photo": ""
        },
        {
          "name": "키키디저트",
          "distance": "차량 4분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1255681557?c=17.83,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161518%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "디저트는 이곳",
          "photo": ""
        },
        {
          "name": "커피콩",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1363578879?c=17.85,0,0,0,dh&placePath=%2Fmenu%3FfromPanelNum%3D2%26timestamp%3D202607161521%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "핸드드립커피가 맛있는",
          "photo": ""
        },
        {
          "name": "쿠로이시로",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1315056034?c=18.06,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161522%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "특색있는 빙수가 있는",
          "photo": ""
        },
        {
          "name": "하루베이크 망포점",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1055822445?c=18.06,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161523%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "에그타르트와 커피의 완벽 조화",
          "photo": ""
        },
        {
          "name": "요거트아이스크림의정석 망포반월동점",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1093533148?c=18.35,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161524%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "언제 어디서나 내맘대로 요거트 아이스크림",
          "photo": ""
        },
        {
          "name": "스타벅스 신영통DT점",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/37408371?c=17.46,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161526%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "커피 이상의 특별한 경험을 소개합니다",
          "photo": ""
        },
        {
          "name": "화이트리에 망포점",
          "distance": "차량 7분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/1647867911?c=16.68,0,0,0,dh&placePath=%2Fmenu%3Fentry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161527%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "여기서 식빵 드시면, 다른곳에서 못드십니다.",
          "photo": ""
        },
        {
          "name": "하얀풍차제과점 망포역점",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98/place/32290219?c=16.68,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161528%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B9%B4%ED%8E%98",
          "description": "수원빵집 = 하얀풍차",
          "photo": ""
        }
      ]
    },
    {
      "id": "convenience",
      "label": "편의시설",
      "places": [
        {
          "name": "GS25 망포벽산점",
          "distance": "도보 1분",
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1726472319?c=17.42,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161532%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 편의점",
          "photo": ""
        },
        {
          "name": "CU 망포자이점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1875601367?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161533%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 CU",
          "photo": ""
        },
        {
          "name": "이마트24 영통벽산점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1425012127?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161534%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 이마트24",
          "photo": ""
        },
        {
          "name": "세븐일레븐 망포원룸점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%ED%8E%B8%EC%9D%98%EC%A0%90/place/1529569483?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161535%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%8E%B8%EC%9D%98%EC%A0%90",
          "description": "호텔인스타 본점에서 가장 가까운 세븐일레븐",
          "photo": ""
        },
        {
          "name": "엘지세탁소",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%84%B8%ED%83%81/place/38582622?c=16.96,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161537%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%84%B8%ED%83%81",
          "description": "호텔인스타 본점에서 가장 가까운 세탁소",
          "photo": ""
        },
        {
          "name": "위니아24크린샵 망포점",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/entry/place/1203732209?c=15.74,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161538%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 코인세탁소 (24시영업)",
          "photo": ""
        },
        {
          "name": "올리브영 수원망포점",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%98%AC%EB%A6%AC%EB%B8%8C%EC%98%81/place/38737607?c=16.66,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dpll%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161539%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%AC%EB%A6%AC%EB%B8%8C%EC%98%81",
          "description": "호텔인스타 본점에서 가장 가까운 올리브영",
          "photo": ""
        },
        {
          "name": "태안농협 망포지점",
          "distance": "도보 1분",
          "url": "https://map.naver.com/p/search/%EC%9D%80%ED%96%89/place/18279425?c=20.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161541%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 농협",
          "photo": ""
        },
        {
          "name": "하나은행 신영통지점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%9D%80%ED%96%89/place/11774200?c=18.22,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161542%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 하나은행",
          "photo": ""
        },
        {
          "name": "신한은행 신영통",
          "distance": "도보 8분",
          "url": "https://map.naver.com/p/search/%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89/place/11774960?c=17.25,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161545%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 신한은행",
          "photo": ""
        },
        {
          "name": "KB국민은행 망포역",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89/place/11759985?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161547%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 국민은행",
          "photo": ""
        },
        {
          "name": "우리은행 망포역지점",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89/place/31697349?c=18.66,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161549%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 우리은행",
          "photo": ""
        },
        {
          "name": "IBK기업은행 영통",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EA%B8%B0%EC%97%85%EC%9D%80%ED%96%89/place/11760393?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EA%B8%B0%EC%97%85%EC%9D%80%ED%96%89%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161550%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B8%B0%EC%97%85%EC%9D%80%ED%96%89",
          "description": "호텔인스타 본점에서 가장 가까운 기업은행",
          "photo": ""
        },
        {
          "name": "망포약국",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EC%95%BD%EA%B5%AD/place/13228683?c=17.50,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161551%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%95%BD%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 약국",
          "photo": ""
        },
        {
          "name": "수원대형약국",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD/place/2049521535?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161555%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 창고형 약국",
          "photo": ""
        },
        {
          "name": "다이소 수원망포점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD/place/20245675?c=17.22,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161556%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B0%BD%EA%B3%A0%ED%98%95%EC%95%BD%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 다이소",
          "photo": ""
        },
        {
          "name": "이마트에브리데이 신영통점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/entry/place/1924820406?c=17.22,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161616%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 마트",
          "photo": ""
        },
        {
          "name": "트레이더스 홀세일클럽 수원점",
          "distance": "차량 10분",
          "url": "https://map.naver.com/p/entry/place/35458026?c=15.72,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161617%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 창고형 마트",
          "photo": ""
        },
        {
          "name": "스피드메이트 수원망포점",
          "distance": "도보 30초",
          "url": "https://map.naver.com/p/entry/place/1259964301?c=17.18,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161618%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "호텔인스타 본점에서 가장 가까운 자동차 정비소",
          "photo": ""
        },
        {
          "name": "HD현대오일뱅크 나눔에너지",
          "distance": "차량 3분",
          "url": "https://map.naver.com/p/search/%EC%A3%BC%EC%9C%A0%EC%86%8C/place/13208463?c=17.02,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161620%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%A3%BC%EC%9C%A0%EC%86%8C",
          "description": "호텔인스타 본점에서 가장 가까운 주유소",
          "photo": ""
        },
        {
          "name": "망포1동행정복지센터",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%ED%96%89%EC%A0%95%EB%B3%B5%EC%A7%80%EC%84%BC%ED%84%B0/place/1085954702?c=16.63,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%ED%96%89%EC%A0%95%EB%B3%B5%EC%A7%80%EC%84%BC%ED%84%B0%26entry%3Dbmp%26fromPanelNum%3D2%26timestamp%3D202607161623%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%96%89%EC%A0%95%EB%B3%B5%EC%A7%80%EC%84%BC%ED%84%B0",
          "description": "호텔인스타 본점에서 가장 가까운 행정복지센터",
          "photo": ""
        },
        {
          "name": "수원영통동우체국",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%9A%B0%EC%B2%B4%EA%B5%AD/place/13288594?c=13.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161626%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9A%B0%EC%B2%B4%EA%B5%AD",
          "description": "호텔인스타 본점에서 가장 가까운 우체국",
          "photo": ""
        },
        {
          "name": "수원뉴엘지프라자 전기차충전소",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%A0%84%EA%B8%B0%EC%B0%A8%EC%B6%A9%EC%A0%84%EC%86%8C/place/1214934455?c=16.33,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161715%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%A0%84%EA%B8%B0%EC%B0%A8%EC%B6%A9%EC%A0%84%EC%86%8C",
          "description": "호텔인스타 본점에서 가장 가까운 전기차충전소",
          "photo": ""
        }
      ]
    },
    {
      "id": "medical",
      "label": "병원·예식장",
      "places": [
        {
          "name": "신영통연세치과의원",
          "distance": "도보 1분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/13228680?c=19.74,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161634%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 치과",
          "photo": ""
        },
        {
          "name": "영통연세가정의학과의원",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/13228777?c=17.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161637%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 의원",
          "photo": ""
        },
        {
          "name": "삼성메디칼정형외과의원",
          "distance": "도보 4분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/11619795?c=17.54,0,0,0,dh&placePath=%2Freview%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EB%B3%91%EC%9B%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161641",
          "description": "호텔인스타 본점에서 가장 가까운 정형외과",
          "photo": ""
        },
        {
          "name": "연세참빛안과의원",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/19878056?c=17.82,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161644%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 안과",
          "photo": ""
        },
        {
          "name": "경희온담한의원 수원망포",
          "distance": "도보 4분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/50771081?c=17.30,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161709%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 한의원",
          "photo": ""
        },
        {
          "name": "장주은피부과의원",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/13228685?c=19.77,0,0,0,dh&placePath=%2Freview%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EB%B3%91%EC%9B%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161711",
          "description": "호텔인스타 본점에서 가장 가까운 피부과의원",
          "photo": ""
        },
        {
          "name": "김경희산부인과의원",
          "distance": "도보 6분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/21560093?c=18.71,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161713%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 산부인과 의원",
          "photo": ""
        },
        {
          "name": "매듭병원",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C/place/1854424335?c=16.52,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C%26svcName%3Dmap_pcv5%26timestamp%3D202607161716",
          "description": "호텔인스타 본점에서 가장 가까운 야간진료 정형외과 (24시 응급실 운영)",
          "photo": ""
        },
        {
          "name": "365힐링의원",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C/place/31357760?c=16.52,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161718%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%95%BC%EA%B0%84%EC%A7%84%EB%A3%8C",
          "description": "호텔인스타 본점에서 가장 가까운 야간진료 내과",
          "photo": ""
        },
        {
          "name": "한림대학교동탄성심병원",
          "distance": "차량 10분",
          "url": "https://map.naver.com/p/search/%EC%9D%91%EA%B8%89%EC%9D%98%EB%A3%8C%EC%8B%9C%EC%84%A4/place/1543285256?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%9D%91%EA%B8%89%EC%9D%98%EB%A3%8C%EC%8B%9C%EC%84%A4%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161721%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%9D%91%EA%B8%89%EC%9D%98%EB%A3%8C%EC%8B%9C%EC%84%A4",
          "description": "호텔인스타 본점에서 가장 가까운 응급실운영병원",
          "photo": ""
        },
        {
          "name": "아주대학교병원",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/12131117?lng=127.0476837&lat=37.2794612&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607161907%26locale%3Dko%26svcName%3Dmap_pcv5&searchType=place&c=15.00,0,0,0,dh",
          "description": "경기 남부권역을 커버하는 핵심 권역응급의료센터이자 최고 수준의 중증 질환 치료 병원",
          "photo": ""
        },
        {
          "name": "재활플러스 요양원",
          "distance": "도보 1분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/264650210?c=18.26,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161636%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 요양원",
          "photo": ""
        },
        {
          "name": "영통효요양병원",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/1955486200?c=17.24,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161638%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EB%B3%91%EC%9B%90",
          "description": "호텔인스타 본점에서 가장 가까운 요양병원",
          "photo": ""
        },
        {
          "name": "신영통동물병원",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EB%B3%91%EC%9B%90/place/18278127?c=17.98,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%EB%B3%91%EC%9B%90%26svcName%3Dmap_pcv5%26timestamp%3D202607161639",
          "description": "호텔인스타 본점에서 가장 가까운 동물병원",
          "photo": ""
        },
        {
          "name": "SY컨벤션 웨딩홀",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/search/%EC%98%88%EC%8B%9D%EC%9E%A5/place/1724383702?c=12.98,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%98%88%EC%8B%9D%EC%9E%A5%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161909%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%88%EC%8B%9D%EC%9E%A5",
          "description": "영통역 주변에 위치한 예식장",
          "photo": ""
        },
        {
          "name": "파티움하우스 수원",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%98%88%EC%8B%9D%EC%9E%A5/place/12055125?c=14.20,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%98%88%EC%8B%9D%EC%9E%A5%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161913%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%88%EC%8B%9D%EC%9E%A5",
          "description": "수원시청역 주변에 위치한 예식장",
          "photo": ""
        },
        {
          "name": "애스톤웨딩하우스",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/search/%EC%98%88%EC%8B%9D%EC%9E%A5/place/13332693?c=13.25,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161915%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%88%EC%8B%9D%EC%9E%A5",
          "description": "동탄에 위치한 예식장",
          "photo": ""
        }
      ]
    },
    {
      "id": "schools",
      "label": "학교",
      "places": [
        {
          "name": "망포중학교",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031445?c=16.24,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161920%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가장 가까운 학교",
          "photo": ""
        },
        {
          "name": "태장초등학교",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031330?c=16.38,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161922%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "잠원초등학교",
          "distance": "도보 10분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031267?c=15.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161923%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "잠원중학교",
          "distance": "도보 15분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12413494?c=15.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161923%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "망포초등학교",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/37446311?c=15.79,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161925%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "영동중학교",
          "distance": "차량 10분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12031892?c=16.04,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170936%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "대선초등학교",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12352544?c=15.45,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%ED%95%99%EA%B5%90%26svcName%3Dmap_pcv5%26timestamp%3D202607170937%26type%3Dlist",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "동학중학교",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12061073?c=15.45,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170953%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "율목초등학교",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12446144?c=15.45,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170954%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "서천고등학교",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/31848390?c=15.17,0,0,0,dh&placePath=%2Freview%3FfromPanelNum%3D2%26locale%3Dko%26searchText%3D%ED%95%99%EA%B5%90%26svcName%3Dmap_pcv5%26timestamp%3D202607170956%26type%3Dlist",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "동학초등학교",
          "distance": "차량 3분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12176374?c=15.02,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170958%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "서천초등학교",
          "distance": "차량 8분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/12061073?c=15.02,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607170959%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171001%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%95%99%EA%B5%90",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "서천중학교",
          "distance": "차량 8분",
          "url": "https://map.naver.com/p/search/%ED%95%99%EA%B5%90/place/19758611?c=15.45,0,0,0,dh&placePath=%2Freview%3Ftype%3Dlist",
          "description": "호텔인스타 본점에서 가까운 학교",
          "photo": ""
        },
        {
          "name": "경희대학교 국제캠퍼스",
          "distance": "차량 10분",
          "url": "https://map.naver.com/p/entry/place/11591495?c=15.45,0,0,0,dh&placePath=%2Fhome%3FadditionalHeight%3D76%26fromPanelNum%3D1%26locale%3Dko%26svcName%3Dmap_pcv5%26timestamp%3D202607171024%26type%3Dlist",
          "description": "영통 최대 대학가",
          "photo": ""
        },
        {
          "name": "아주대학교",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/search/%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90/place/11591599?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171033%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90",
          "description": "수원에서 가장 유명한 대학가",
          "photo": ""
        },
        {
          "name": "경기대학교 수원캠퍼스",
          "distance": "차량 30분",
          "url": "https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90/place/11591483?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171035%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90",
          "description": "서울가는 길에있는 대학교",
          "photo": ""
        }
      ]
    },
    {
      "id": "business",
      "label": "회사·비즈니스",
      "places": [
        {
          "name": "수원컨벤션센터",
          "distance": "차량 17분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%BB%A8%EB%B2%A4%EC%85%98%EC%84%BC%ED%84%B0/place/1269127432?placePath=?bk_query=%EC%88%98%EC%9B%90%EC%BB%A8%EB%B2%A4%EC%85%98%EC%84%BC%ED%84%B0&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "다양한 산업 전시회, 박람회, 그리고 대형 팝업 행사가 수시로 열리는 마이스(MICE) 산업의 중심지",
          "photo": ""
        },
        {
          "name": "수원 메쎄",
          "distance": "차량 17분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%EB%A9%94%EC%8E%84/place/1074049310?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%EB%A9%94%EC%8E%84%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607161108%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%EB%A9%94%EC%8E%84&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원 대형 전시컨벤션센터",
          "photo": ""
        },
        {
          "name": "삼성전자 수원 디지털시티",
          "distance": "차량 8분",
          "url": "",
          "description": "삼성전자 본사 및 연구개발 중심지. 호텔의 가장 중요한 비즈니스 목적지",
          "photo": ""
        },
        {
          "name": "삼성전기 수원사업장·본사",
          "distance": "차량 12분",
          "url": "",
          "description": "MLCC, 카메라 모듈, 반도체 기판 등 전자부품 기업",
          "photo": ""
        },
        {
          "name": "삼성SDI 수원연구소",
          "distance": "차량 8분",
          "url": "",
          "description": "배터리·전자재료 관련 연구 거점. 삼성 디지털시티 바로 인근",
          "photo": ""
        },
        {
          "name": "삼성전자 기흥캠퍼스",
          "distance": "차량 10분",
          "url": "",
          "description": "삼성 반도체의 핵심 연구·생산 거점",
          "photo": ""
        },
        {
          "name": "삼성디스플레이 기흥사업장",
          "distance": "차량 10분",
          "url": "",
          "description": "OLED·디스플레이 연구개발의 거점",
          "photo": ""
        },
        {
          "name": "삼성종합기술원 SAIT",
          "distance": "차량 8분",
          "url": "",
          "description": "삼성의 미래기술·첨단소재·반도체 연구기관",
          "photo": ""
        },
        {
          "name": "삼성SDI 기흥본사",
          "distance": "차량 15분",
          "url": "",
          "description": "삼성SDI 본사와 연구개발 기능이 위치한 사업장",
          "photo": ""
        },
        {
          "name": "삼성전자 화성캠퍼스",
          "distance": "차량 6분",
          "url": "",
          "description": "삼성전자 DS부문의 주요 반도체 생산·연구 사업장",
          "photo": ""
        },
        {
          "name": "삼성전자 화성 DSR타워",
          "distance": "차량 8분",
          "url": "",
          "description": "반도체 연구개발 인력이 근무하는 대표적인 업무시설",
          "photo": ""
        },
        {
          "name": "ASML Korea 화성 본사",
          "distance": "차량 20분",
          "url": "",
          "description": "세계적인 반도체 노광장비 기업의 한국 본사, 삼성과 긴밀히 협업관계",
          "photo": ""
        },
        {
          "name": "도쿄일렉트론코리아",
          "distance": "차량 12분",
          "url": "",
          "description": "반도체 제조장비 연구·개발 및 기술지원 기업",
          "photo": ""
        },
        {
          "name": "어플라이드 머티어리얼즈 코리아",
          "distance": "차량 10분",
          "url": "",
          "description": "반도체·디스플레이 장비 및 기술지원 기업",
          "photo": ""
        },
        {
          "name": "KLA Korea 동탄사업장",
          "distance": "차량 15분",
          "url": "",
          "description": "반도체 검사·계측 장비 기업",
          "photo": ""
        },
        {
          "name": "ASM Korea 화성사업장",
          "distance": "차량 13분",
          "url": "",
          "description": "반도체 증착장비 기업",
          "photo": ""
        },
        {
          "name": "램리서치 코리아테크놀로지센터",
          "distance": "차량 20분",
          "url": "",
          "description": "반도체 식각·증착 장비 연구개발 시설",
          "photo": ""
        },
        {
          "name": "에스에프에이 SFA",
          "distance": "차량 20분",
          "url": "",
          "description": "반도체·디스플레이·이차전지 자동화 장비와 스마트팩토리 기업",
          "photo": ""
        },
        {
          "name": "피에스케이 PSK",
          "distance": "차량 10분",
          "url": "",
          "description": "반도체 전공정 장비 전문기업으로 드라이 스트립·세정 장비 등을 생산하는 국내 대표 장비기업",
          "photo": ""
        },
        {
          "name": "테스 TES 동탄사무소",
          "distance": "차량 15분",
          "url": "",
          "description": "반도체·디스플레이 장비 기업",
          "photo": ""
        }
      ]
    },
    {
      "id": "transit",
      "label": "대중교통",
      "places": []
    },
    {
      "id": "fitness",
      "label": "운동시설·경기장",
      "places": [
        {
          "name": "수원KT위즈파크",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/13491582?lng=127.0096587&lat=37.300096&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171127%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "KT 위즈의 홈구장",
          "photo": ""
        },
        {
          "name": "수원종합운동장",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%A2%85%ED%95%A9%EC%9A%B4%EB%8F%99%EC%9E%A5/place/20127073?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EC%A2%85%ED%95%A9%EC%9A%B4%EB%8F%99%EC%9E%A5%26entry%3Dpll%26fromNxList%3Dtrue%26fromPanelNum%3D2%26locale%3Dko%26searchText%3D%EC%88%98%EC%9B%90%EC%A2%85%ED%95%A9%EC%9A%B4%EB%8F%99%EC%9E%A5%26svcName%3Dmap_pcv5%26timestamp%3D202607171115&entry=pll&from=nx&fromNxList=true&searchType=place&c=16.92,0,0,0,dh",
          "description": "수원FC, 수원FC위민의 홈구장",
          "photo": ""
        },
        {
          "name": "수원월드컵경기장(빅버드)",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/11622953?lng=127.036915&lat=37.2865317&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171113%26locale%3Dko%26svcName%3Dmap_pcv5&entry=plt&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원삼성블루윙즈의 홈구장",
          "photo": ""
        },
        {
          "name": "올라잇짐 헬스&PT 망포점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/2072429164?c=18.14,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171054%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타 본점 주변 가장 유명한 헬스장",
          "photo": ""
        },
        {
          "name": "투펄슨짐 피트니스 PT 헬스 망포점",
          "distance": "도보 1분",
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1938896285?c=18.01,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171041%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타 본점에서 가장 가까운 헬스장",
          "photo": ""
        },
        {
          "name": "달라짐 PT 헬스 필라테스 수원망포역점",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1945327159?c=18.16,0,0,0,dh&placePath=%2Fphoto%3FfromPanelNum%3D2%26timestamp%3D202607171044%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5%26filterType%3D%EC%97%85%EC%B2%B4",
          "description": "호텔인스타 본점에서 가장 가까운 필라테스",
          "photo": ""
        },
        {
          "name": "메꿀다이어트짐 피트니스 PT 망포점",
          "distance": "도보 2분",
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1532087709?c=18.16,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171046%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타에서 가까운 헬스장",
          "photo": ""
        },
        {
          "name": "점핑다이어트 망포파워점프",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1270858642?c=17.27,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dple",
          "description": "호텔인스타 본점에서 가장 가까운 점핑 다이어트",
          "photo": ""
        },
        {
          "name": "카인드짐24시 헬스&PT 망포점",
          "distance": "도보 5분",
          "url": "https://map.naver.com/p/search/%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5/place/1383920987?c=18.14,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171055%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B7%BC%EC%B2%98%ED%97%AC%EC%8A%A4%EC%9E%A5",
          "description": "호텔인스타 본점에서 가장 가까운 24시운영 헬스장",
          "photo": ""
        },
        {
          "name": "토에르발레학원",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/2039700791?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171058%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 발레학원",
          "photo": ""
        },
        {
          "name": "와일드복싱짐 본관",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/20421173?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171100%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 복싱장",
          "photo": ""
        },
        {
          "name": "타이혼스포츠아카데미 망포점",
          "distance": "도보 4분",
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/1376191623?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171107%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 무에타이",
          "photo": ""
        },
        {
          "name": "대한검도회 청파검도관",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/18278638?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171107%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 검도관",
          "photo": ""
        },
        {
          "name": "미스터샤크MMA주짓수킥복싱멀티짐",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/38781012?c=17.41,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171108%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 MMA",
          "photo": ""
        },
        {
          "name": "마음수련 명상센터 영통점",
          "distance": "도보 7분",
          "url": "https://map.naver.com/p/search/%EC%B2%B4%EC%9C%A1%EA%B4%80/place/18281752?c=16.93,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171109%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%B2%B4%EC%9C%A1%EA%B4%80",
          "description": "호텔인스타 본점에서 가장 가까운 명상센터",
          "photo": ""
        },
        {
          "name": "에픽클라임",
          "distance": "도보 3분",
          "url": "https://map.naver.com/p/search/%ED%81%B4%EB%9D%BC%EC%9D%B4%EB%B0%8D/place/1693141492?c=17.67,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171110%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%81%B4%EB%9D%BC%EC%9D%B4%EB%B0%8D",
          "description": "호텔인스타 본점에서 가장 가까운 클라이밍",
          "photo": ""
        },
        {
          "name": "태풍태권도",
          "distance": "도보 4분",
          "url": "https://map.naver.com/p/search/%ED%83%9C%EA%B6%8C%EB%8F%84/place/1832674691?c=16.82,0,0,0,dh&placePath=%2Fphoto%3FfromPanelNum%3D2%26timestamp%3D202607171111%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%ED%83%9C%EA%B6%8C%EB%8F%84",
          "description": "호텔인스타 본점에서 가장 가까운 태권도장",
          "photo": ""
        },
        {
          "name": "수원종합운동장실내체육관",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/13445049?placePath=%2Fhome%3Fentry%3Dplt%26from%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171117%26locale%3Dko%26svcName%3Dmap_pcv5&searchType=place&lng=127.0090851&lat=37.2983797&c=15.44,0,0,0,dh",
          "description": "남자배구 한국전력, 여자배구 현대건설의 홈구장",
          "photo": ""
        },
        {
          "name": "서수원칠보체육관",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%84%9C%EC%88%98%EC%9B%90%EC%B9%A0%EB%B3%B4%EC%B2%B4%EC%9C%A1%EA%B4%80/place/37568341?placePath=?bk_query=%EC%84%9C%EC%88%98%EC%9B%90%EC%B9%A0%EB%B3%B4%EC%B2%B4%EC%9C%A1%EA%B4%80&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh",
          "description": "수원 KT 소닉붐의 홈구장",
          "photo": ""
        },
        {
          "name": "용인미르스타디움",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/19282938?c=12.87,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171125%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "용인FC의 홈구장",
          "photo": ""
        },
        {
          "name": "수원CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%EC%BB%A8%ED%8A%B8%EB%A6%AC%ED%81%B4%EB%9F%BD/place/13374607?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%EC%BB%A8%ED%8A%B8%EB%A6%AC%ED%81%B4%EB%9F%BD%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171302%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%EC%BB%A8%ED%8A%B8%EB%A6%AC%ED%81%B4%EB%9F%BD",
          "description": "프라이빗 골프장",
          "photo": ""
        },
        {
          "name": "골드CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/11612751?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171333%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "경기 남부의 대표적인 구장",
          "photo": ""
        },
        {
          "name": "코리아CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/11614135?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171334%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "골드CC 바로 옆에 위치하며 접근성이 좋음",
          "photo": ""
        },
        {
          "name": "코리아퍼블릭CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/13534320?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171336%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "퍼블릭 골프장으로 보다 캐주얼하게 즐기기 좋음",
          "photo": ""
        },
        {
          "name": "레이크사이드CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/37775677?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171338%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "대규모 코스를 자랑하는 골프장",
          "photo": ""
        },
        {
          "name": "화성상록GC",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/12375785?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171342%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "공무원연금공단에서 운영하여 관리가 철저한 구장",
          "photo": ""
        },
        {
          "name": "한원CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/1764292119?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171345%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "전통 있는 코스로 골퍼들에게 인기가 많음",
          "photo": ""
        },
        {
          "name": "남서울CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/11612879?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171347%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "대회를 개최하는 골프장",
          "photo": ""
        },
        {
          "name": "태광CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/11614136?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171349%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "흥덕지구 인근에 위치하여 망포에서 이동이 매우 편리",
          "photo": ""
        },
        {
          "name": "기흥CC",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/21399220?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171350%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "울창한 수림이 특징",
          "photo": ""
        }
      ]
    },
    {
      "id": "shopping",
      "label": "쇼핑몰",
      "places": [
        {
          "name": "스타필드 수원",
          "distance": "차량 22분",
          "url": "https://map.naver.com/p/entry/place/1045275610?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171155%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "수원에서 가장 핫한 초대형 복합 쇼핑몰",
          "photo": ""
        },
        {
          "name": "갤러리아백화점",
          "distance": "차량 17분",
          "url": "https://map.naver.com/p/search/%EA%B4%91%EA%B5%90%EA%B0%A4%EB%9F%AC%EB%A6%AC%EC%95%84%EB%B0%B1%ED%99%94%EC%A0%90/place/1027110301?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171354%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EA%B4%91%EA%B5%90%EA%B0%A4%EB%9F%AC%EB%A6%AC%EC%95%84%EB%B0%B1%ED%99%94%EC%A0%90",
          "description": "광교 신도시의 랜드마크이자 쇼핑몰",
          "photo": ""
        },
        {
          "name": "판타지움",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/search/%EC%88%98%EC%9B%90%20%ED%8C%90%ED%83%80%EC%A7%80%EC%9B%80/place/37994161?placePath=%2Fhome%3Fbk_query%3D%EC%88%98%EC%9B%90%20%ED%8C%90%ED%83%80%EC%A7%80%EC%9B%80%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607171138%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%88%98%EC%9B%90%20%ED%8C%90%ED%83%80%EC%A7%80%EC%9B%80&placeSearchOption=bk_query%3D%25EC%2588%2598%25EC%259B%2590%2520%25ED%258C%2590%25ED%2583%2580%25EC%25A7%2580%25EC%259B%2580%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EC%2588%2598%25EC%259B%2590%2520%25ED%258C%2590%25ED%2583%2580%25EC%25A7%2580%25EC%259B%2580%26x%3D127.057454%26y%3D37.235530&searchType=place&c=15.00,0,0,0,dh",
          "description": "망포역 인근에서 가장 사랑받는 도심형 엔터테인먼트 복합 상업시설",
          "photo": ""
        },
        {
          "name": "골든스퀘어",
          "distance": "차량 5분",
          "url": "https://map.naver.com/p/entry/place/18276557?c=15.00,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171143%26locale%3Dko%26svcName%3Dmap_pcv5%26filterType%3D%EC%97%85%EC%B2%B4",
          "description": "망포역 바로 앞에 위치한 대형 복합 상가 건물",
          "photo": ""
        },
        {
          "name": "포레스퀘어",
          "distance": "차량 7분",
          "url": "https://map.naver.com/p/entry/place/1904731154?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171147%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "깔끔한 인테리어가 돋보이는 망포동 일대의 중형 상업 시설",
          "photo": ""
        },
        {
          "name": "유니클로 수원망포점",
          "distance": "차량 6분",
          "url": "https://map.naver.com/p/entry/place/36132922?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171153%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "단독 매장으로 운영되어 매우 넓고 쾌적한 쇼핑 환경",
          "photo": ""
        },
        {
          "name": "타임빌라스 수원",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/36011321?c=14.85,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171157%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "롯데백화점이 새롭게 리뉴얼하여 선보인 프리미엄 쇼핑 공간",
          "photo": ""
        },
        {
          "name": "AK플라자 수원",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/36097531?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171158%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "수원역과 직접 연결되어 있어 수십 년간 수원의 대표 쇼핑 랜드마크",
          "photo": ""
        },
        {
          "name": "NC백화점 수원터미널점",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/entry/place/19206564?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171200%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "수원종합버스터미널과 연결되어 있어 편리한 쇼핑",
          "photo": ""
        },
        {
          "name": "뉴코아아울렛 동수원점",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/11625349?c=14.85,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171229%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "인계동에 위치해서 둘러보기 좋은",
          "photo": ""
        },
        {
          "name": "이마트 수원점",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/search/%EC%9D%B4%EB%A7%88%ED%8A%B8%20%EC%88%98%EC%9B%90%EC%A0%90/place/11605020?c=15.00,0,0,0,dh&isCorrectAnswer=true",
          "description": "수원종합버스터미널 근처에 위치",
          "photo": ""
        },
        {
          "name": "롯데몰 광교점",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/31564934?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171232%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "광교중앙역 인근에 위치한 백화점",
          "photo": ""
        },
        {
          "name": "아브뉴프랑 광교",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/36668603?c=15.00,0,0,0,dh&placePath=%2Fhome%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171234%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "이국적인 분위기를 연출하는 스트리트형 쇼핑몰",
          "photo": ""
        },
        {
          "name": "앨리웨이 광교",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/1410191638?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171235%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "광교호수공원 바로 옆에 위치하여 멋진 경관을 자랑하는 쇼핑센터",
          "photo": ""
        },
        {
          "name": "롯데백화점 동탄점",
          "distance": "차량 20분",
          "url": "https://map.naver.com/p/entry/place/1438057579?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171252%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "큰규모와 감각적인 아트 전시가 결합된 경기 남부의 대형 백화점",
          "photo": ""
        },
        {
          "name": "롯데프리미엄아울렛 기흥",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/entry/place/1586416290?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171254%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "드넓은 부지 위에 자연 친화적인 컨셉으로 지어진 프리미엄 교외형 아울렛",
          "photo": ""
        },
        {
          "name": "탑텐 수원망포점",
          "distance": "차량 7분",
          "url": "https://map.naver.com/p/entry/place/1264759163?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171255%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "넓은 건물과 다양한 상품",
          "photo": ""
        },
        {
          "name": "수원프리미엄아울렛",
          "distance": "차량 15분",
          "url": "https://map.naver.com/p/entry/place/11667794?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171256%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "골프웨어와 아웃도어 브랜드를 둘러보기 좋은 쇼핑 공간",
          "photo": ""
        },
        {
          "name": "더와이스퀘어",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/1749742847?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171257%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "용인 처인구청 인근의 랜드마크로 떠오른 쾌적한 복합 상업 시설",
          "photo": ""
        },
        {
          "name": "블루키",
          "distance": "차량 25분",
          "url": "https://map.naver.com/p/entry/place/1004753432?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607171259%26locale%3Dko%26svcName%3Dmap_pcv5",
          "description": "용인 동백지구에 위치한 중대형 복합 쇼핑 테마파크",
          "photo": ""
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined') { module.exports = nearbyData; }
