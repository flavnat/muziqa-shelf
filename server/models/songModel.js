const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Song extends Model {}

Song.init({
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  album: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'song',
});

module.exports = Song;
