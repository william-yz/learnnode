const MongoClient = require('mongodb').MongoClient;


var url = 'mongodb://localhost:27017/demo';

function login(user) {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var collection = db.collection('users');
      collection.findOne(user, function(err, doc) {
        if (!err) {
          if (doc) {
            console.log('Welcome' + doc.username);
            db.close();
            console.log('Login or register complate!')
          } else {
            collection.insertOne(user, function(err, result) {
              console.log('New user inserted.');
              db.close('Login or register complate!');
            });
          }
        }
      });
    }
  });
}

function login2(user) {
  var connect = function() {
    return new Promise(function(resolve) {
      MongoClient.connect(url, function(err, conn) {
        if (err) {
          throw new Error(err.messge);
        } else {
          resolve(conn);
        }
      });
    });
  };
  var find = function(conn) {
    return new Promise(function(resolve, reject) {
      var collection = conn.collection('users')
      collection.findOne(user, function(err, doc) {
        if (err) {
          throw new Error(err.messge);
        } else {
          if (doc) {
            resolve({conn,doc});
          } else {
            reject({conn,collection});
          }
        }
      });
    })
  };
  var loginSuccess = function(result) {
    return new Promise(function(resolve) {
      console.log('Welcome ' + result.doc.username);
      resolve(result.conn);
    }) 
  }
  var register = function(result) {
    return new Promise(function(resolve) {
      result.collection.insertOne(user, function(err, doc) {
        console.log('New user inserted.');
        resolve(result.conn);
      });
    });
  };
  var closeConnection = function(conn) {
    conn.close();
  };
  var response = function() {
    console.log('Login or register complate!');
  }

  return connect()
          .then(find)
          .then(loginSuccess, register)
          .then(closeConnection)
          .then(response)
          .catch(function(err) {
            console.log(err);
          });
}


login2({
  username : 'aabbcc123',
  password : '123'
  });