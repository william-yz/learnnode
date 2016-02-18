const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function initModels() {
  var ArticleSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      default: '',
      trim: true,
      required: 'Title cannot be blank'
    },
    content: {
      type: String,
      default: '',
      trim: true
    },
    tags : {
      type : Array
    }
  });

  mongoose.model('article', ArticleSchema);
}

module.exports = function() {
  const db = mongoose.connect('mongodb://localhost:27017/blog');

  mongoose.connection.on('error', function () {
    console.log('Connect to DB  error!');
  });

  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected');
  });

  initModels();


  return db;
}
