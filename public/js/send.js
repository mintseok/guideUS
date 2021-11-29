function send(){
    var signal_time_deparr = 0; // alert를 위한 변수
    var signal_date = dateInput()
    var signal_deparr = one_deparr()

    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) !== "date"){    
            var obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
            if (obj.length < 5){ // error 트리거
                signal_time_deparr++;
            }
        }
    }
    if (signal_time_deparr === 0 && signal_date === 1  && signal_deparr === 1){         
        // for (var i = 0; i < localStorage.length; i++){
        //     if (localStorage.key(i) !== "date"){
        //         console.log(JSON.parse(localStorage.getItem(localStorage.key(i))))
        //     }
        //     else{
        //         console.log(localStorage.getItem(localStorage.key(i)))
        //     }
        // }        
        //theform.submit();
        //console.log("send.js의 send() 실행됨 -> toTSP의 showPlace()가 실행될꺼임");

        
        return true;
    }
    else{
        if (signal_time_deparr > 0) {
            alert("입력창을 확인해주세요!")
        }
        
        return false; // alert인 경우 page redirect 안 해주기
    }

}