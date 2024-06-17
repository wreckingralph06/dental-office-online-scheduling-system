const express = require('express');
const { getUserHandler, createUserHandler, updateUserHandler, deleteUserHandler } = require('controllers/userController');

const router = express.Router();

router.get('/users/:userId', getUserHandler);
router.post('/users', createUserHandler);
router.put('/users/:userId', updateUserHandler);
router.delete('/users/:userId', deleteUserHandler);

router.post('/signup', createUserHandler);

module.exports = router;