const pizzaService = require('../service/pizzaService');

class PizzaController {
  async createPizza(req, res) {
    try {
      const pizza = await pizzaService.createPizza(req.body);
      res.status(201).json({ message: 'Pizza criada com sucesso', pizza });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllPizzas(req, res) {
    try {
      const { limit, offset } = req.pagination;
      const pizzas = await pizzaService.getAllPizzas(limit, offset);
      res.json(pizzas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPizzaById(req, res) {
    try {
      const pizza = await pizzaService.getPizzaById(req.params.id);
      if (!pizza) return res.status(404).json({ message: 'Pizza não encontrada' });
      res.json(pizza);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePizza(req, res) {
    try {
      const pizza = await pizzaService.updatePizza(req.params.id, req.body);
      if (!pizza) return res.status(404).json({ message: 'Pizza não encontrada' });
      res.json({ message: 'Pizza atualizada com sucesso', pizza });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePizza(req, res) {
    try {
      const pizza = await pizzaService.deletePizza(req.params.id);
      if (!pizza) return res.status(404).json({ message: 'Pizza não encontrada' });
      res.json({ message: 'Pizza deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PizzaController();