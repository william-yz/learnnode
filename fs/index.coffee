fs = require 'fs'
log = console.log

# copy a file
# r, r+, rs, rs+   w, wx, w+, a, a+, ax+

copyFile1 = (from, to, cb) ->
  fs.open from, 'r', (err, oldFd) ->
    fs.fstat oldFd, (err, stat) ->
      fileSize = stat.size
      buffer = new Buffer fileSize
      fs.read oldFd, buffer, 0, fileSize, null, (err, bytesRead, readBuffer) ->
        fs.open to, 'w+', (err, newFd) ->
          fs.write newFd, readBuffer, 0, fileSize, ->
            fs.close(oldFd);
            fs.close(newFd);
            log 'copyFile1 done'
            return
          return
        return
      return
    return
  return

copyFile2 = (from, to) ->
  fs.readFile from, (err, data) ->
    fs.writeFile to, data, ->
      log 'copyFile2 done'
      return
    return
  return

copyFile3 = (from, to) ->
  readStream = fs.createReadStream from
  writeSteam = fs.createWriteStream to
  readStream.on 'data', (data) ->
    writeSteam.write data
    return
  readStream.on 'end', ->
    writeSteam.end()
    log 'copyFile3 done'
    return
  return

copyFile4 = (from, to) ->
  fs.createReadStream(from).pipe fs.createWriteStream to
  return

#copyFile1 'oldFile', 'newFile1'
#copyFile2 'newFile1', 'newFile2'
#copyFile3 'newFile2', 'newFile3'
copyFile4 'newFile3', 'newFile4'

#fs.watchFile 'test.txt', (curr, prev) ->
#  log curr
#  log prev
#  return

#fs.watch './', (event, file) ->
#  if event is 'change'
#    log file
#  return
