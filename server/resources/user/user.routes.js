const express = require('express');
const router = express.Router();
const userController = require('./user.controllers');
const { authorize, isAdmin } = require('../../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users',  userController.getUsers);
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;