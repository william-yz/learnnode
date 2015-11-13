var http = require('http'),
    fs = require('fs'),
    https = require('https');
//
//
var log = console.log
//
//var server = http.createServer(function(req, res) {
//    log(req.url);
//
//    res.end();
//});
//
//server.listen(1234,function() {
//    log('ok');
//});




var writeStream = fs.createWriteStream('./node-v5.0.0-x64.msi');
var client = https.get('https://nodejs.org/dist/latest/node-v5.0.0-x64.msi', function(res) {
    res.pipe(writeStream);
});