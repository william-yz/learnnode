cluster = require 'cluster'
http = require 'http'
numCPUs = require('os').cpus().length;

log = console.log
if cluster.isMaster
  cluster.fork() for [1..numCPUs]

  listenter = (worker) -> worker.on 'message', (msg) ->
    log "recive message #{msg}, and kill it"
    worker.kill()
    setTimeout ->
      cluster.fork()
    , 2000

  listenter worker for _,worker of cluster.workers

  cluster.on 'listening', (worker, address) ->
    log "listening : work #{worker.process.pid}, address: #{address.address} : #{address.port}"
  cluster.on 'exit', (worker, code, signal) ->
    log "worker #{worker.process.pid} died"
else
  http.createServer (req, res) ->
    res.writeHead 200
    log "Worker #{cluster.worker.id} received!"
    setTimeout ->
      res.end "hello world\n"
      process.send "Working #{cluster.worker.id} is working!"
      return
    , 3000
    return
  .listen(8000)
