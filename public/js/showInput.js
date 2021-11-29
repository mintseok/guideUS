function showDate(){
  const element = document.getElementById("search-list")
  const dateBox = document.querySelector("#finalBox");
  if (element.childNodes.length > 0){
    dateBox.classList.remove('invisible');
  }
  else{
    dateBox.classList.add('invisible');
  }
}

function dateInput(){
  var date = document.getElementById('date').value;
  if(date){
    localStorage.setItem("date", JSON.stringify(date))
    return 1
  }
  else{
    alert('출발시간을 입력해주세요!!')
    return 0
  }
}

function one_deparr(){ // 출발지 도착지는 하나여야만함
  var d = 0
  var a = 0
  for (var i = 0; i < localStorage.length; i++){
    if (localStorage.key(i) !== "date"){    
        var obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
        if (obj[4] == -3) { // 출발지인경우
          d++;
        }
        else if(obj[4] == -1) { // 도착지인경우
          a++;
        }
    }
  }
  if (d > 1 || a > 1) {
    alert("출발지와 도착지는 각각 1개만 입력해주세요!")
    return 0
  }

  else if (d == 0 || a == 0) {
    alert("출발지와 도착지는 각각 최소 1개씩 입력해야 합니다.")
    return 0
  }

  else if(d == 1 && a == 1){
    return 1
  }
  
  else {
    alert("정의되지 않은 에러")
    return 0
  }
}

function addPlace(index, arr) {
  const seachList = document.getElementById("search-list")
  const SEARCH_KEY = index

  function saveSearchs() {
    localStorage.setItem(SEARCH_KEY, JSON.stringify(arr))
  }

  paintSearch(SEARCH_KEY, arr[0])
  saveSearchs()

  function paintSearch(k, newSearch) {
    const li = document.createElement("li");
    li.setAttribute("class", "slist");
    li.id = k
    const span = document.createElement("span")
    span.innerText = newSearch
    span.setAttribute("id", "placeName")
    const dep = document.createElement("input")
    dep.setAttribute("type", "radio")

    const lii = document.createElement("li")
    lii.id = k
    lii.setAttribute("class", "deparr")
    lii.setAttribute("onclick", "deparr(this)")
    var n = 'rd' + li.id
    dep.setAttribute("name", n)
    dep.setAttribute("value", "rd1")
    const depsapn = document.createElement("span")
    depsapn.innerText = "  출발지    "
    const arr = document.createElement("input")
    arr.setAttribute("type", "radio")
    arr.setAttribute("name", n)
    arr.setAttribute("value", "rd2")
    const arrspan = document.createElement("sapn")
    arrspan.innerText = "도착지    "
    const pass = document.createElement("input")
    pass.setAttribute("type", "radio")
    pass.setAttribute("name", n)
    pass.setAttribute("value", "rd3")
    const passspan = document.createElement("span")
    passspan.innerText = "  경유지"
    // const deselectbtn = document.createElement("input")
    // deselectbtn.setAttribute("type", "button")
    // deselectbtn.setAttribute("onclick", "deselect(this)")
    // deselectbtn.setAttribute("value", "일괄해제")
    lii.appendChild(dep)
    lii.appendChild(depsapn)
    lii.appendChild(arr)
    lii.appendChild(arrspan)
    lii.appendChild(pass)
    lii.appendChild(passspan)
    // lii.appendChild(deselectbtn)

    const inputBtn = document.createElement("input")
    inputBtn.setAttribute("type", "button");
    inputBtn.setAttribute("value", "➖")
    inputBtn.setAttribute("id", "minusplace");
    inputBtn.setAttribute("onclick","remove(this)");
    const inputTime = document.createElement("input")
    inputTime.setAttribute("type", "number")
    inputTime.setAttribute("min", "0")
    inputTime.setAttribute("max", "1440")
    inputTime.setAttribute("placeholder", "시간(분)");
    inputTime.setAttribute("id", "time")
    inputTime.setAttribute("onclick", "savetime(this)")

    li.appendChild(span)
    li.appendChild(inputTime)
    li.appendChild(inputBtn)
    li.appendChild(lii)

    seachList.appendChild(li)
  }

  showDate();
}
const remove = (obj) => {
  localStorage.removeItem(obj.parentNode.id)
  document.getElementById('search-list').removeChild(obj.parentNode); 
  showDate();
}

const savetime = (obj) => {
  var t = obj.parentNode.childNodes[1].value
  var getinfo = JSON.parse(localStorage.getItem(obj.parentNode.id))
  if (getinfo.length === 3) {
    getinfo.push(Number(t*60)) // 분 대신 초 를 필요로 함 -> 60 곱함
  }
  else {
    if (getinfo.length === 5) {
      getinfo.pop()
      getinfo.pop()
      var rd1 = obj.parentNode.childNodes[3].childNodes[0] 
      var rd2 = obj.parentNode.childNodes[3].childNodes[2] 
      var rd3 = obj.parentNode.childNodes[3].childNodes[4]
      rd1.checked = false; 
      rd2.checked = false; 
      rd3.checked = false; 
    }
    else if(getinfo.length === 4){
      getinfo.pop()
    }
    getinfo.push(Number(t*60))
  }
  localStorage.setItem(obj.parentNode.id, JSON.stringify(getinfo));
}

const deparr = (obj) => {
  var getinfo = JSON.parse(localStorage.getItem(obj.parentNode.id))
  var t = -99
  if (getinfo.length > 3){
    if (getinfo.length === 4){
      if (obj.childNodes[0].checked){ // 출발지인 경우
        t = -3
        getinfo.push(t)
      }
      else if(obj.childNodes[2].checked){ // 도착지인 경우
        t = -1
        getinfo.push(t)
      }
      else if(obj.childNodes[4].checked){ // 경유지인 경우
        t = -2
        getinfo.push(t)
      }
    }
    else{
      getinfo.pop()
      if (obj.childNodes[0].checked){ // 출발지인 경우
        t = -3
        getinfo.push(t)
      }
      else if(obj.childNodes[2].checked){ // 도착지인 경우
        t = -1
        getinfo.push(t)
      }
      else if(obj.childNodes[4].checked){ // 경유지인 경우
        t = -2
        getinfo.push(t)
      }
    }
    localStorage.setItem(obj.parentNode.id, JSON.stringify(getinfo))
  }
  else{
    alert("시간을 먼저 입력해주세요!")
    var rd1 = obj.childNodes[0]
    var rd2 = obj.childNodes[2]
    var rd3 = obj.childNodes[4]
    rd1.checked = false;
    rd2.checked = false;
    rd3.checked = false;
  }
}

// const deselect = (obj) => {
//   var getinfo = JSON.parse(localStorage.getItem(obj.parentNode.id))
//   var rd1 = obj.parentNode.childNodes[0]
//   var rd2 = obj.parentNode.childNodes[2]
//   var rd3 = obj.parentNode.childNodes[4]
//   rd1.checked = false;
//   rd2.checked = false;
//   rd3.checked = false;


//   if (getinfo.length === 5) {
//     getinfo.pop()
//     localStorage.setItem(obj.parentNode.id, JSON.stringify(getinfo));
//   }
// }

// const inputDate = document.createElement("input")
// inputDate.setAttribute("type", "datetime-local")