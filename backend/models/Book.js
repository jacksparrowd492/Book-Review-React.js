const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  publishedYear: { type: Number },
  genre: { type: String },
  thumbnail: { type: String }
});

module.exports = mongoose.model('Book', bookSchema);
