log = console.log

log 'b starting'
exports.done = false
a = require './a'
log 'in b, a.done = %s', a.done
exports.done = true
log 'b done'
