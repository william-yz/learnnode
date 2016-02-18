module.exports.home = function(req, res) {
  res.render('./index.html', {isSecure: false});
}

module.exports.secureHome = function(req, res) {
  res.render('./index.html',{isSecure: true});
}

module.exports.edit = function(req, res) {
  res.render('./edit.html', {_id : req.query._id});
}