const express = require('express');
const pizzaController = require('../controller/pizzaController');
const authMiddleware = require('../middleware/authMiddleware');
const { validatePizza, validateId } = require('../middleware/validationMiddleware');
const paginationMiddleware = require('../middleware/paginationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, validatePizza, pizzaController.createPizza);
router.get('/', paginationMiddleware, pizzaController.getAllPizzas);
router.get('/:id', validateId, pizzaController.getPizzaById);
router.put('/:id', authMiddleware, validateId, validatePizza, pizzaController.updatePizza);
router.delete('/:id', authMiddleware, validateId, pizzaController.deletePizza);

module.exports = router;