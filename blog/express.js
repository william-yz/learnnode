'use strict'
const express = require('express');
const app = express();
const path = require('path');
require('./mongoose')();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')());

app.use('/',express.static(path.join(__dirname, 'node_modules')));
app.use('/secure',express.static(path.join(__dirname, 'node_modules')));

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'public'));


app.use('/secure', function(req, res, next) {
  if (req.cookies.id === 'william') {
    next();
  } else {
    var key = req.query.key,
        now = new Date(),
        token = now.getHours() + now.getMinutes();
    if (Math.abs(key - token) < 1) {
      res.cookie('id', 'william');
      next();
    } else {
      res.end('Authentication Failed');
    }
  }
});

//router
const router = require('./server/router');
app.get('/home', router.home);
app.get('/secure/home', router.secureHome);
app.get('/secure/edit', router.edit);

//api
const api = require('./server/api');
// app.get('/api/:domain', api.list);
// app.get('/api/:domain/:_id', api.find);
// app.post('/api/:domain', api.update);
app.get(/^(\/secure)?\/api\/(\w+)$/, api.list);
app.get(/^(\/secure)?\/api\/(\w+)\/(\w+)$/, api.find);
app.post(/^(\/secure)?\/api\/(\w+)$/, api.save);

module.exports = app;