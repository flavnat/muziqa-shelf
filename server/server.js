const express = require('express')
const { Sequelize, Model, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');

const app = express()
const port = 4000

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});


// its model
class Song extends Model { }
Song.init({
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  album: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.INTEGER
}, { sequelize, modelName: 'song' });


// Sync models with database
sequelize.sync();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());




app.get('/songs', async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/song/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  res.json(song);
});

app.post('/song', async (req, res) => {
  const song = await Song.create(req.body);
  res.json(song);
});

app.put('/song/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (song) {
    await song.update(req.body);
    res.json(song);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});


app.delete('/song/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (song) {
    await song.destroy();
    res.json({ message: 'Song deleted' });
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});