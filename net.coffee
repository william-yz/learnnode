var http = require('http');

var proxy = http.createServer(function(request, response) {

    var options = {
    host: 'localhost',
    port: 8888,
    path: request.url,
    method: request.method
};

var req = http.request(options, function(req, res) {
res.pipe(response);    // ??pipe???
console.log(req.url);
}).end();

}).listen(8080);