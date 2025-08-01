const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/songs', songController.getSongs);
router.get('/song/:id', songController.getSongById);
router.post('/song', songController.createSong);
router.put('/song/:id', songController.updateSong);
router.delete('/song/:id', songController.deleteSong);

module.exports = router;
