// Generated by CoffeeScript 1.10.0
(function() {
  var Connection, UserManager, fs, log, net, os, server, users;

  net = require('net');

  os = require('os');

  fs = require('fs');

  users = require('./users');

  log = console.log;

  UserManager = {
    users: users,
    register: function(username, password) {
      this.users[username] = password;
      return this.save();
    },
    login: function(username, password) {
      if (password == null) {
        return false;
      }
      if (this.users[username] === password) {
        return true;
      } else {
        return false;
      }
    },
    save: function() {
      return fs.writeFile('./users.json', JSON.stringify(this.users), function() {
        return log('Save success');
      });
    },
    currUsers: {},
    say: function(username, msg) {
      var conn, name, ref, results;
      ref = this.currUsers;
      results = [];
      for (name in ref) {
        conn = ref[name];
        if (name !== username) {
          results.push(conn.write(username + ' says : ' + msg + '\r\n'));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  Connection = (function() {
    var BEFORE_LOGIN, LOGINED, LOGINING, REGISTING;

    BEFORE_LOGIN = 'BEFORE_LOGIN';

    LOGINING = 'LOGINING';

    LOGINED = 'LOGINED';

    REGISTING = 'REGISTING';

    function Connection(conn1) {
      this.conn = conn1;
      this.write = this.conn.write.bind(this.conn);
      this.status = BEFORE_LOGIN;
      this.username = '';
      this.msg = '';
    }

    Connection.prototype.proceed = function() {
      var f, f2;
      f = function(data) {
        return this.processMsg(data);
      };
      f2 = function(data) {
        return delete UserManager.currUsers[this.username];
      };
      this.conn.on('data', f.bind(this));
      return this.conn.on('end', f2.bind(this));
    };

    Connection.prototype.processMsg = function(msg) {
      var user;
      if (this.status === LOGINED) {
        return UserManager.say(this.username, msg);
      } else if (this.status === BEFORE_LOGIN) {
        if (msg === '1') {
          this.status = LOGINING;
          return this.write('Input your username and password (username:password) : ');
        } else if (msg === '2') {
          this.status = REGISTING;
          return this.write('Input your username and password (username:password) for resgiter : ');
        } else {
          return this.write('Invalid input ! Please select 1 or 2: \r\n 1.Login \r\n 2.Register \r\n');
        }
      } else if (this.status === LOGINING) {
        user = msg.split(':');
        if (UserManager.login(user[0], user[1])) {
          this.status = LOGINED;
          UserManager.currUsers[user[0]] = this;
          this.username = user[0];
          return this.write("Welcome," + user[0] + ". \r\n");
        } else {
          this.status = BEFORE_LOGIN;
          return this.write("Username or password is wrong. \r\n Please select 1 or 2: \r\n 1.Login \r\n 2.Register \r\n");
        }
      } else if (this.status === REGISTING) {
        user = msg.split(':');
        this.status = LOGINED;
        UserManager.register(user[0], user[1]);
        UserManager.currUsers[user[0]] = this;
        this.username = user[0];
        return this.write("Regist success! Welcome," + user[0] + ". \r\n");
      }
    };

    return Connection;

  })();

  server = net.createServer(function(connection) {
    var conn;
    connection.setEncoding('utf8');
    connection.write('Welcome!Please select : \r\n 1.Login \r\n 2.Register \r\n');
    connection.on('error', function(err) {
      return log(err);
    });
    conn = new Connection(connection);
    return conn.proceed();
  });

  server.listen(1234, function() {
    return log('server listenint on port 1234');
  });

}).call(this);

//# sourceMappingURL=server.js.map