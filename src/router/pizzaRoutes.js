const express = require('express');
const pizzaController = require('../controller/pizzaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, pizzaController.createPizza);
router.get('/', pizzaController.getAllPizzas);
router.get('/:id', pizzaController.getPizzaById);
router.put('/:id', authMiddleware, pizzaController.updatePizza);
router.delete('/:id', authMiddleware, pizzaController.deletePizza);

module.exports = router;