const Song = require('../models/songModel');

// Get all songs with pagination
exports.getSongs = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  try {

    const total = await Song.countDocuments();

    const data = await Song.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);

    res.json({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Error fetching songs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (err) {
    // Handle invalid ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(400).json({ error: err.message }); // Validation errors, etc.
  }
};

// Update song by ID
exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // return updated doc
      runValidators: true, // validate update
    });

    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    res.status(400).json({ error: err.message });
  }
};

// Delete song by ID
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (song) {
      res.json({ message: 'Song deleted' });
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};