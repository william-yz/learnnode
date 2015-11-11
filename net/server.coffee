net = require 'net'
os = require 'os'
fs = require 'fs'
users = require './users'

log = console.log


UserManager =
  users : users

  register : (username, password) ->
    @users[username] = password
    @save()

  login : (username, password) ->
    if !password?
      return false
    if @users[username] is password then true else false

  save : ->
    fs.writeFile './users.json', JSON.stringify(@users), ->
      log 'Save success'

  currUsers : {}

  say : (username, msg) ->
    for name, conn of @currUsers
      if name isnt username
        conn.write username + ' says : ' + msg + '\r\n'


class Connection

  BEFORE_LOGIN = 'BEFORE_LOGIN'
  LOGINING = 'LOGINING'
  LOGINED = 'LOGINED'
  REGISTING = 'REGISTING'

  constructor : (@conn) ->
    @write = @conn.write.bind(@conn)
    @status = BEFORE_LOGIN
    @username = ''
    @msg = ''

  proceed : ->
    f = (data) ->
      @processMsg data
#      if data is os.EOL
#        @processMsg @msg
#        @msg = ''
#      else if data is new Buffer([0x08]).toString()
#        @msg = @msg.substr(0, @msg.length - 1)
#      else
#        @msg += data
    f2 = (data) ->
      delete UserManager.currUsers[@username]
    @conn.on 'data', f.bind(@)
    @conn.on 'end', f2.bind(@)




  processMsg : (msg) ->
    if @status is LOGINED
      UserManager.say @username, msg

    else if @status is BEFORE_LOGIN
      if msg is '1'
        @status = LOGINING
        @write 'Input your username and password (username:password) : '
      else if msg is '2'
        @status = REGISTING
        @write 'Input your username and password (username:password) for resgiter : '
      else
        @write 'Invalid input ! Please select 1 or 2: \r\n 1.Login \r\n 2.Register \r\n'

    else if @status is LOGINING
      user = msg.split(':')
      if UserManager.login user[0],user[1]
        @status = LOGINED
        UserManager.currUsers[user[0]] = @
        @username = user[0]
        @write "Welcome,#{user[0]}. \r\n"
      else
        @status = BEFORE_LOGIN
        @write "Username or password is wrong. \r\n Please select 1 or 2: \r\n 1.Login \r\n 2.Register \r\n"

    else if @status is REGISTING
      user = msg.split(':')
      @status = LOGINED
      UserManager.register(user[0],user[1])
      UserManager.currUsers[user[0]] = @
      @username = user[0]
      @write "Regist success! Welcome,#{user[0]}. \r\n"


server = net.createServer (connection) ->
  connection.setEncoding 'utf8'
  connection.write 'Welcome!Please select : \r\n 1.Login \r\n 2.Register \r\n'
  connection.on 'error', (err) ->
    log err
  conn = new Connection(connection)
  conn.proceed()




server.listen 1234, ->
  log 'server listenint on port 1234'