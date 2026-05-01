const express = require('express');
const orderController = require('../controller/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateOrder, validateId } = require('../middleware/validationMiddleware');
const paginationMiddleware = require('../middleware/paginationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, validateOrder, orderController.createOrder);
router.get('/my', authMiddleware, paginationMiddleware, orderController.getUserOrders);
router.get('/', authMiddleware, paginationMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, validateId, orderController.getOrderById);
router.put('/:id/status', authMiddleware, validateId, orderController.updateOrderStatus);
router.delete('/:id', authMiddleware, validateId, orderController.deleteOrder);

module.exports = router;