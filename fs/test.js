const fs = require('fs');
const readline = require('readline');
const os = require('os');





const rl = readline.createInterface({
  input : fs.createReadStream('./ACM data1.txt')
});

var ws = fs.createWriteStream('./new.txt');


rl.on('line', function(line) {
  ws.write(line.substring(0,10) + os.EOL);
});
