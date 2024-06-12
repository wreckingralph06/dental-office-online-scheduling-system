const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demoController');

router.get('/', demoController.getExample);

module.exports = router;