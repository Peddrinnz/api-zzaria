const express = require('express');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.delete('/profile', authMiddleware, userController.deleteAccount);

module.exports = router;