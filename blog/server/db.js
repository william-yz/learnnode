const mongoose = require('mongoose');


module.exports = function(model) {
  const Schema = mongoose.model(model);

  const find = function (query, order) {
    return new Promise((resolve, reject) => {
      Schema.find(query)
        .sort(order)
        .exec((err, result) => {
          if (err) reject(err);
          else resolve(result);
      })
     });
  };

  const findAll = function (order) {
    return find({}, order);
  };

  const save = function(data) {
    if (data._id !== undefined && data._id !== null) {
      return new Promise((resolve, reject) => {
        Schema.findByIdAndUpdate(data._id,data)
          .exec((err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
       });
    } else {
      return new Promise((resolve, reject) => {
        new Schema(data)
          .save((err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
       }); 
    }
  };
  
  return {
    findAll,
    save,
    find
  }
};
