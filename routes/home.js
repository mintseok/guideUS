var express = require('express');
var template = require('../lib/template.js');
var fs = require("fs");
let iconv = require('iconv-lite'); // used to read python std.out
const spawn = require('child_process').spawn; // getting Python SHELL -> spawn은 express에서 안 먹힌다. -> 그냥 node.js에서는 먹히지만,,, exec이 먹힘
const exec = require('child_process').exec; // getting Python SHELL ㄴ> 위의 코멘트와 관련하여 안 먹힌 이유 -> async 식으로 비동기식으로 작동하는데, callback()이 끝나기도 전에 express가 함수를 끝내버림? or child process를 

var router = express.Router();

router.get('/', (request, response) => {
    fs.unlink("./public/data/routes_1.txt", (err1)=>{
        if(err1){
            console.log(err1);
        }});
    fs.unlink("./public/data/routes_Seq.txt", (err2)=>{
        if(err2){
            console.log(err2);
        }})
    fs.unlink("./public/data/arrivalTime.txt", (err3)=>{
        if(err3){
            console.log(err3);
        }})
    var html = template.HTML_COPY();
    //var html = template.HTML();
    response.send(html);
});

router.post('/processing', (request, response) => {    
    const destinations = request.body;
    const departTime = destinations[0].info;
    
    const param = ['./public/py/TSP_algorithm_modified.py',];

    param.push(departTime);
    for (let i=0; i<destinations.length-1; i++){ // JSON을 param으로 못 보내겠음.
        param.push(destinations[i+1].name);
        param.push(destinations[i+1].lng);
        param.push(destinations[i+1].lat);
        param.push(destinations[i+1].sec);
        }
    //console.log(destinations);
    
    let utf8Str;
    const resultpy = spawn('python', param); // 파이썬 실행
    resultpy.stdout.on('data', (result)=>{
        utf8Str = iconv.decode(result, 'euc-kr');
        console.log(utf8Str);
    });
    resultpy.on('close', (code) => {
        console.log("done");
        return response.sendStatus(200);
        })

    // response.redirect('/result');    // <<<<-------- 이 친구가 작동을 안합니다! 
});

router.get('/result', (request, response) => {
    fs.readFile('./public/data/arrivalTime.txt', 'utf8', function(err, data){
        if (err) throw(err);
        //console.log(data);
        startTime = data.slice(0, 12);
        endTime = data.slice(12, 24);
        timeTaken = Number(endTime) - Number(startTime);
        console.log(startTime, endTime, timeTaken);
        var y = endTime.slice(0, 4);
        var mon = endTime.slice(4, 6);
        var d = endTime.slice(6, 8);
        var h = endTime.slice(8, 10);
        var m = endTime.slice(10, 12);
        if (timeTaken >= 60){
            var hour = parseInt(timeTaken / 60).toString();
            var minute = (timeTaken % 60).toString();
            timeTaken = hour+"시 "+minute+"분";
        } else{
            timeTaken = timeTaken.toString()+"분";
        }
        var html = template.HTML_COPY2(timeTaken, y,mon,d,h,m);
        response.send(html);
    });
});

router.get('/loading', (request, response) => {
    var html = template.LOADING();
    response.send(html);
})

module.exports = router;



// <             code from route.get('/processing')                    >
// const python = exec('python ./public/py/example.py'); // <--------- 아래 두 가지 경우 모두 먹힘 => spawn, exec but, param을 전달해주기 위해 spawn 사용

// python.stdout.on('data', (data) => {
//     console.log(data.toString());
// })
// console.log("passed");

// let dataToSend;
// const python1 = spawn('python', ['./public/py/example.py']);
// python1.stdout.on('data', (data) => {
//     dataToSend = data.toString();
// })
// python1.on('close', (code) => {
//     console.log(dataToSend);
// })    

//console.log(request.body);