// processing 버튼 누를 시 loading 화면 띄어주기
var loadingBox = document.getElementById('loading');
loadingBox.classList.add('loadingBox');

// xmlhttp -> client에서 서버로 데이터로 보내 줄 수 있는 친구 (HTTP Request instance를 생성해준다)

var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
function sendJSON(){
    loadingBox.classList.remove('loadingBox');
    var theUrl = "/processing";
    var jsonPlaces = new Array;    
    var jsonTime = new Object();
    var jsonDepart = new Object();
    var jsonArrive = new Object();

    for (var i = 0; i < localStorage.length; i++){
        var jsonPlace = new Object();
        if (localStorage.key(i) !== "date"){
            var Values = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (!(Values[4]===-3 || Values[4]===-1)){
                jsonPlace.name = Values[0];
                jsonPlace.lng = Values[1];
                jsonPlace.lat = Values[2];
                jsonPlace.sec = Values[3];  //  -3 : 출발지 -2: 경유지 -1: 도착지
                jsonPlaces.push(jsonPlace);
            }            
            else if (Values[4]===-3){ // 출발지 또는 도착지라면
                jsonDepart.name = Values[0];
                jsonDepart.lng = Values[1];
                jsonDepart.lat = Values[2];
                jsonDepart.sec = 0;
            }
            else if (Values[4]===-1){ // 출발지 또는 도착지라면
                jsonArrive.name = Values[0];
                jsonArrive.lng = Values[1];
                jsonArrive.lat = Values[2];
                jsonArrive.sec = 0;
            }
        }
        else{
            jsonTime.info = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(localStorage.getItem(localStorage.key(i)))
        }
    }
    jsonPlaces.unshift(jsonDepart);
    jsonPlaces.push(jsonArrive);
    jsonPlaces.unshift(jsonTime); // 따로 안하면, 순서가 엎치락 뒤치락이 되던데?
    var realText = JSON.stringify(jsonPlaces);
    console.log(realText);    
    console.log("sending request...");
    console.log(jsonDepart.name, jsonArrive.name);

    // 로딩창을 띄우는 함수 위치 
    getRoads(realText).then(()=>{       
        location.href="/result"+"?lat="+jsonDepart.lng+"&lng="+jsonDepart.lat;
        //loadingBox.classList.add('loadingBox'); 
    });

    // xmlhttp.open("POST", theUrl); // "/processing"으로 POST 요청 보냄! (비동기)
    // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");  
    // xmlhttp.send(realText); 
    // window.location.href="/result" // 이게 먹히긴 함!! 근데, 로드가 다 진행되지 않았는데도 페이지를 redirect 해줌..
    

}

async function getRoads(realText) {
    return fetch('http://localhost:3000/processing', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
            body: realText
        });
}