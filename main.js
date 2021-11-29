// [main.js]
const express = require('express');
const app = express();
const port = 3000;
var path = require('path');
var template = require('./lib/template.js');
var homeRouter = require('./routes/home');

// app.use()를 통해 middleware 장착!
app.use(express.static('public')); // css 파일 장착!
app.use(express.json());
//
app.use(function(req,res,next){setTimeout(next,1500)}); // 1초 기다리도록 -> debugging용 -> 완료되면 없애셈
app.use('/', homeRouter);

// error handling 404가 먼저 -> 그 다음에 500
app.use(function(req, res, next){
    res.status(404).send('Sorry, Cannot find that!')
  })
  
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })