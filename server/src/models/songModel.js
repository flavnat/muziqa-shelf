const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  year: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
