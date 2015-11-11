log = console.log

log 'a starting'
exports.done = false
b = require './b'
log 'in a, b.done = %s', b.done
exports.done = true
log 'a done'
