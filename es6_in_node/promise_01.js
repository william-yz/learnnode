var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  fs = require('fs'),
  os = require('os'),
  path = require('path');

// Connection URL
var url = 'mongodb://localhost:27017/demo';



// Use connect method to connect to the Server
function display() {
  console.log('login success!');
}
function writeLog(filename, msg) {
  fs.writeFile(path.join('./',filename), msg + os.EOL, { encoding: 'utf8', mode: 0o666, flag: 'a' })
}
function login(user) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error(err.message);
    }
    var collection = db.collection('users');
    //find user
    collection.findOne(user, function(err, result) {
      //err write log
      if (err) {
        throw new Error(err.message);
      } else {
        //user exist
        if (result) {
          //display write log
          
      } else {
        //insert user
        collection.insertOne(user, function(err, result) {
          //err
          if (err) {
            throw new Error(err.message);
          } else {
            // insert success
            display();
            writeLog('regist.log',user.username + 'regist.');
            writeLog('login.log',user.username + 'logined.');
          }
          db.close();
        })
      }
      }
    });
  
});
}

var connect = new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        throw new Error(err.message);
      }
      resolve(db.collection('users'));
    });
  });

function loginWithPromise(user) {
  var findUser = function(user) {
    return new Promise(function(resolve, reject) {
        collection.findOne(user, function(err, result) {
          if (err) {
            throw new Error(err.message);
          } else {
            if (result) {
              resolve(result);
            } else {
              reject(collection);
            }
          }
        });
      });
  };

  var insertUser = function(connection) {
    return new Promise(function(resolve, reject) {
      collection.insertOne(user, function(err, result) {
        if (err) {
          throw new Error(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  var successLogin = function() {
    display()
    writeLog('login.log',user.username + 'logined.');
  }

  var successRegister = function() {
    display();
    writeLog('regist.log',user.username + 'regist.');
    writeLog('login.log',user.username + 'logined.');
  }

  return findUser(user)
    .then(
      successLogin)
    ;
}

 var user = {username:'william200', password : '123'};
 connect.then(loginWithPromise(user))
  .catch(function(errMsg) {
      writeLog('error.log', errMsg);
    })
// login(user);