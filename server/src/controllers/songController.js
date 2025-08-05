const { default: mongoose } = require('mongoose');
const Song = require('../models/songModel');
const handleResponse = require('../utils/handleResponse');


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
    const totalPages = Math.ceil(total / limit)
    handleResponse(res, 200, 'Song Fetched Successfully', {
      data,
      total,
      page,
      limit,
      totalPages
    })
  } catch (err) {
    console.error('Error fetching songs:', err);
    handleResponse(res, 500, 'Internal server error');
  }
};


exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      handleResponse(res, 200, 'Song fetched successfully', song);
    } else {
      handleResponse(res, 404, 'Song not found');

    }
  } catch (err) {
    // Handle invalid ObjectId
    if (err.name === 'CastError') {
      return handleResponse(res, 400, 'Invalid ID format');
    }
    handleResponse(res, 500, 'Internal server error');
  }
};

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    const savedSong = await song.save();
    handleResponse(res, 201, 'Song created successfully', savedSong)
  } catch (err) {
    handleResponse(res, 400, err.message); // Validation errors,
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // return updated doc
      runValidators: true, // validate update
    });

    if (song) {
      handleResponse(res, 200, 'Song updated successfully', song);
    } else {
      handleResponse(res, 404, 'Song not found');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return handleResponse(res, 400, 'Invalid ID format');
    }
    handleResponse(res, 400, err.message);
  }
};


exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (song) {
      handleResponse(res, 200, 'Song deleted successfully');
    } else {
      handleResponse(res, 404, 'Song not found');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return handleResponse(res, 400, 'Invalid ID format');
    }
    handleResponse(res, 500, 'Internal server error');
  }
};




exports.mySongStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // from verifyJwt

    const stats = await Song.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get song stats",
    });
  }
};