const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  year: Number,
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
