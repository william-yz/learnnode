const DB = require('./db');

module.exports.list = function(req, res) {
  const db = DB(req.params[1]);
  db.findAll({created : -1})
    .then((result) => {
      res.json(result);
    })
};

module.exports.find = function(req, res) {
  const params =  req.params;
  const db = DB(params[1]);
  db.find({_id : params[2]})
    .then((result) => {
      res.json(result[0]);
    })
};

module.exports.save = function(req, res) {
  const db = DB(req.params[1]);
  console.log(req.body);
  db.save(req.body)
    .then((result) => {
      res.json({success : true});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
};