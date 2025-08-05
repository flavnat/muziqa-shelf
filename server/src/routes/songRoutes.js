const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const verifyJwt = require('../middlewares/verifyJWT')

router.get('/songs', songController.getSongs);
router.get('/song/:id', songController.getSongById);
router.post('/song', songController.createSong);
router.put('/song/:id', songController.updateSong);
router.delete('/song/:id', songController.deleteSong);
router.get('/songs/mystats', verifyJwt, songController.mySongStats);
module.exports = router;
