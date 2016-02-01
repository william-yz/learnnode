'use strict';

const http = require('http'),
  path = require('path'),
  fs = require('fs');
  
let server = http.createServer(function(req, res) {
  let basePath = path.join(__dirname, '../')
  if (req.method === 'GET') {
    let htmlTemplate = path.join(basePath,req.url);
    console.log(htmlTemplate);
    fs.access(htmlTemplate,fs.R_OK,function(err) {
      if (!err) {
        fs.createReadStream(path.join(basePath,req.url)).pipe(res);
      } else {
        res.end();
      }
    })
    
  }
});
server.listen(3000);