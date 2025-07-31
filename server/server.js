const express = require('express')
const { Sequelize, Model, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');


const app = express()
const port = 4000

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


// its model
class Song extends Model {}
Song.init({
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  album: DataTypes.STRING,
  gener: DataTypes.STRING,
  year: DataTypes.INTEGER
}, { sequelize, modelName: 'song' });


// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CRUD routes for Music Model
app.get('/songs', async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
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