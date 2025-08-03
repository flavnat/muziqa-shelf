const express = require('express');
const logoutController = require('../controllers/logoutController');
const router = express.Router();

router.get('/auth/logout',logoutController);

module.exports = router;