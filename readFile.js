let iconv = require('iconv-lite');
let fs = require('fs');

// 처음 로딩시 enc-kr 파일
let content = fs.readFileSync('routes.txt');
//console.log(content.toString());

var roads = content.toString();
//console.log(roads);
console.log(typeof(roads));
// utf-8 text로 저장
//fs.writeFileSync('content-utf-8.txt', utf8Str, { encoding: 'utf8' });

var roads_1 = roads.slice(1, roads.length-1);
//console.log(roads_1);
const arr = roads_1.split(', ');    // 배열 ['h', 'e', 'l', 'l', 'o']
const str = arr,
    numbers = arr.map(Number);
console.log(typeof(numbers));
console.log(typeof([1252.788]));
