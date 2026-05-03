const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateUser, validateAddress, validateId, validateLogin } = require('../middleware/validationMiddleware');
const paginationMiddleware = require('../middleware/paginationMiddleware');

const router = express.Router();

router.post('/register', validateUser, authController.register);
router.post('/login', validateLogin, authController.login);

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, validateUser, userController.updateProfile);
router.delete('/profile', authMiddleware, userController.deleteAccount);

router.get('/', authMiddleware, paginationMiddleware, userController.getAllUsers);

router.post('/addresses', authMiddleware, validateAddress, userController.addAddress);
router.delete('/addresses/:addressId', authMiddleware, validateId, userController.removeAddress);

router.post('/favorites/:pizzaId', authMiddleware, validateId, userController.addFavoritePizza);
router.delete('/favorites/:pizzaId', authMiddleware, validateId, userController.removeFavoritePizza);

module.exports = router;