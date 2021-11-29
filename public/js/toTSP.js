function showPlace(theform){
    if (localStorage.length === 0){
        console.log("EMPTY");
    }
    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) !== "date"){
            console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        else{
            console.log(localStorage.getItem(localStorage.key(i)));
        }
    }
    theform.submit();
    return true;
}
