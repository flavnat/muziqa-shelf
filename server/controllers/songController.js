const Song = require('../models/songModel');

exports.getSongs = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Song.findAndCountAll({
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    res.json({
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSongById = async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (song) res.json(song);
  else res.status(404).json({ message: 'Song not found' });
};

exports.createSong = async (req, res) => {
  const song = await Song.create(req.body);
  res.json(song);
};

exports.updateSong = async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (song) {
    await song.update(req.body);
    res.json(song);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
};

exports.deleteSong = async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (song) {
    await song.destroy();
    res.json({ message: 'Song deleted' });
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
};
