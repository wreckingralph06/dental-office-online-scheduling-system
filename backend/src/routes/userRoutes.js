const express = require('express');
const { getUserHandler, createUserHandler } = require('controllers/userController');

const router = express.Router();

router.get('/users/:userId', getUserHandler);
router.post('/users', createUserHandler);

module.exports = router;