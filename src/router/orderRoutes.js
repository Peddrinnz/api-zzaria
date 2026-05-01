const express = require('express');
const orderController = require('../controller/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/my', authMiddleware, orderController.getUserOrders);
router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;