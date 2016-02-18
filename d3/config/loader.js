const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

var obj = xlsx.parse(path.join(__dirname, 'datas.xlsx'));

console.log(obj[0].data[0]);