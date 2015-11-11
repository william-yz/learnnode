// Generated by CoffeeScript 1.10.0
(function() {
  var copyFile1, copyFile2, copyFile3, fs, log;

  fs = require('fs');

  log = console.log;

  copyFile1 = function(from, to, cb) {
    fs.open(from, 'r', function(err, oldFd) {
      fs.fstat(oldFd, function(err, stat) {
        var buffer, fileSize;
        fileSize = stat.size;
        buffer = new Buffer(fileSize);
        fs.read(oldFd, buffer, 0, fileSize, null, function(err, bytesRead, readBuffer) {
          fs.open(to, 'w+', function(err, newFd) {
            fs.write(newFd, readBuffer, 0, fileSize, function() {
              fs.close(oldFd);
              fs.close(newFd);
              log('copyFile1 done');
            });
          });
        });
      });
    });
  };

  copyFile2 = function(from, to) {
    fs.readFile(from, function(err, data) {
      fs.writeFile(to, data, function() {
        log('copyFile2 done');
      });
    });
  };

  copyFile3 = function(from, to) {
    var readStream, writeSteam;
    readStream = fs.createReadStream(from);
    writeSteam = fs.createWriteStream(to);
    readStream.on('data', function(data) {
      writeSteam.write(data);
    });
    readStream.on('end', function() {
      writeSteam.end();
      log('copyFile3 done');
    });
  };

}).call(this);

//# sourceMappingURL=index.js.map