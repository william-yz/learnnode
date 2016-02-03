const fs = require('fs');

var path = process.argv[2];
fs.watchFile(path, (curr, prev) => {
  fs.open(path, 'r', (err, fd) => {
    var buffer = new Buffer(curr.size - prev.size);
    fs.read(fd, buffer, 0, curr.size - prev.size, prev.size, function(err, bytesRead, buffer) {
      console.log(buffer.toString());
    })
  })
});