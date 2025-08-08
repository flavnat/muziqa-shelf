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


exports.getSongStats = async (req, res) => {
  try {
    const stats = await Song.aggregate([
      {
        $facet: {
          byGenre: [
            { $group: { _id: "$genre", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          byYear: [
            { $group: { _id: "$year", count: { $sum: 1 } } },
            { $sort: { _id: -1 } }
          ],
          byArtist: [
            { $group: { _id: "$artist", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          byAlbum: [
            { $group: { _id: "$album", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          totalSongs: [
            { $count: "total" }
          ]
        }
      },
      {
        $project: {
          byGenre: {
            $map: {
              input: "$byGenre",
              as: "item",
              in: { genre: "$$item._id", count: "$$item.count" }
            }
          },
          byYear: {
            $map: {
              input: "$byYear",
              as: "item",
              in: { year: "$$item._id", count: "$$item.count" }
            }
          },
          byArtist: {
            $map: {
              input: "$byArtist",
              as: "item",
              in: { artist: "$$item._id", count: "$$item.count" }
            }
          },
          byAlbum: {
            $map: {
              input: "$byAlbum",
              as: "item",
              in: { album: "$$item._id", count: "$$item.count" }
            }
          },
          totalSongs: { $arrayElemAt: ["$totalSongs.total", 0] }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        byGenre: [],
        byYear: [],
        byArtist: [],
        byAlbum: [],
        totalSongs: 0
      }
    });
  } catch (error) {
    console.error('Error in getSongStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching song statistics',
      error: error.message
    });
  }
};


// Controller to get individual songs added by a user
exports.getUserSongs = async (req, res) => {
  try {
    // Assume userId is passed in the request (e.g., from auth middleware or params)
    const userId = req.user?._id || req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const songs = await Song.find({ user: userId })
      .select('title artist album genre year createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        songs,
        total: songs.length
      }
    });
  } catch (error) {
    console.error('Error in getUserSongs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user songs',
      error: error.message
    });
  }
};


exports.getUserSongStats = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from JWT via middleware

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const stats = await Song.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $facet: {
          byGenre: [
            { $group: { _id: "$genre", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          byYear: [
            { $group: { _id: "$year", count: { $sum: 1 } } },
            { $sort: { _id: -1 } }
          ],
          byArtist: [
            { $group: { _id: "$artist", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          byAlbum: [
            { $group: { _id: "$album", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          totalSongs: [
            { $count: "total" }
          ]
        }
      },
      {
        $project: {
          byGenre: {
            $map: {
              input: "$byGenre",
              as: "item",
              in: { genre: "$$item._id", count: "$$item.count" }
            }
          },
          byYear: {
            $map: {
              input: "$byYear",
              as: "item",
              in: { year: "$$item._id", count: "$$item.count" }
            }
          },
          byArtist: {
            $map: {
              input: "$byArtist",
              as: "item",
              in: { artist: "$$item._id", count: "$$item.count" }
            }
          },
          byAlbum: {
            $map: {
              input: "$byAlbum",
              as: "item",
              in: { album: "$$item._id", count: "$$item.count" }
            }
          },
          totalSongs: { $arrayElemAt: ["$totalSongs.total", 0] }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        byGenre: [],
        byYear: [],
        byArtist: [],
        byAlbum: [],
        totalSongs: 0
      }
    });
  } catch (error) {
    console.error('Error in getUserSongStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user song statistics',
      error: error.message
    });
  }
};