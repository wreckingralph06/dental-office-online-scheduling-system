const express = require('express');
const { signInHandler } = require('controllers/authController');

const router = express.Router();

router.post('/signin', signInHandler);

module.exports = router;