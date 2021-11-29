module.exports = {
    HTML:function(){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>안내해조</title>
            <link rel="stylesheet" type="text/css" href="/css/main.css" />
        </head>
        <body>
        <div class="map_wrap">
            <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;">
            </div>
            <div id="menu_wrap" class="bg_white">
                <div id="finalBox" class="invisible">
                    <form id="finalForm" action="/processing" method="post">
                        <input type="datetime-local" id="date">
                        <button type="button" onclick="return (send() && showPlace(this.form));">Processing..</button> <!-- return &&를 사용하여 여러 함수 사용가능 -->
                    </form>
                </div>
                <div id="searchDiv">
                    <form id="searchBox" onsubmit="return false;">
                        <input type="search" placeholder="출발지" id="keyword" onKeyPress="if( event.keyCode==13 ){searchPlaces();}">
                    </form>
                </div>
                <div id="search-list"></div>
                <div id="recommend" class="invisible">
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </div>
        </div>

        <script type="text/javascript" 
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=60045a73cdd29c124e9060dc9b56435e&libraries=services"></script>
        <script src="/js/kakaoMap1.js"></script>
        <script src="/js/showList.js"></script>
        <script src="/js/showInput.js"></script>
        <script src="/js/send.js"></script>
        <script src="/js/toTSP.js"></script>
        <script src="/js/xmlhttp.js"></script>
        </body>
        </html>
        `
    },
    HTML_COPY:function(){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>안내해조</title>
            <link rel="stylesheet" type="text/css" href="/css/main.css" />
        </head>
        <body>
        <div id="loading" class="loadingBox">
            <img src="/data/loading.gif" id="loading-image" class="loadingImage" loop=infinite />
        </div>
        <div class="map_wrap">
            <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;">
            </div>
            <div id="menu_wrap" class="bg_white">
                <div id="finalBox" class="invisible">
                    <input type="datetime-local" id="date">
                    <button type="button" onclick="return (send() && sendJSON());">출발 !!</button> <!-- return &&를 사용하여 여러 함수 사용가능 -->
                </div>
                <div id="searchDiv">
                    <form id="searchBox" onsubmit="return false;">
                        <input type="search" placeholder="장소추가" id="keyword" onKeyPress="if( event.keyCode==13 ){searchPlaces();}">
                    </form>
                </div>
                <div id="search-list"></div>
                <div id="recommend" class="invisible">
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </div>
        </div>

        <script type="text/javascript" 
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=60045a73cdd29c124e9060dc9b56435e&libraries=services"></script>
        <script src="/js/kakaoMap1.js"></script>
        <script src="/js/showList.js"></script>
        <script src="/js/showInput.js"></script>
        <script src="/js/send.js"></script>
        <script src="/js/toTSP.js"></script>
        <script src="/js/xmlhttp.js"></script>
        </body>
        </html>
        `
    },
    HTML_COPY2:function(timeTaken, y,mon,d,h,m){
        return `
        <!DOCTYPE html> 
        <html>
        <head>
            <meta charset="utf-8">
            <title>안내해조</title>
            <link rel="stylesheet" type="text/css" href="/css/main.css" />
        </head>
        <body>
        <div class="map_wrap">
            <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;">
            </div>
            <div id="menu_wrap" class="bg_white">
                <div class="copy2_css">
                    <input type="text" value="예상 소요시간: ${timeTaken}" id="estimate_time" readonly>
                    <button onclick="window.location.href='/'" id="goback">검색창으로 돌아가기</button>
                    <input type="text" value="${y}년 ${mon}월 ${d}일 ${h}시 ${m}분 도착 예상" id="arrival_time" readonly>
                </div>
                <div id="search-list"></div>
                <div id="recommend" class="invisible">
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </div>
        </div>
        
        <script type="text/javascript" 
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=60045a73cdd29c124e9060dc9b56435e&libraries=services"></script>
        <script src="/js/kakaoMap2.js"></script>
        <script src="/js/showInput.js"></script>
        <script src="/js/send.js"></script>
        <script src="/js/toTSP.js"></script>
        <script src="/js/xmlhttp.js"></script>
        </body>
        </html>
        `
    },
    LOADING:function(){
        return`
        <!DOCTYPE html> 
        <html>
        <head>
            <meta charset="utf-8">
            <title>안내해조</title>
            <link rel="stylesheet" type="text/css" href="/css/main.css" />
        </head>
        <body>
        <div id="loading" class="loadingBox">
            <img src="/data/loading.gif" id="loading-image" class="loadingImage" loop=infinite />
        </div>
        
        <script type="text/javascript" 
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=60045a73cdd29c124e9060dc9b56435e&libraries=services"></script>
        <script src="/js/kakaoMap2.js"></script>
        <script src="/js/showInput.js"></script>
        <script src="/js/send.js"></script>
        <script src="/js/toTSP.js"></script>
        <script src="/js/xmlhttp.js"></script>
        </body>
        </html>
        `
    }
}