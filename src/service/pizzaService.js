const Pizza = require('../model/Pizza');

class PizzaService {
  async createPizza(pizzaData) {
    const pizza = new Pizza(pizzaData);
    await pizza.save();
    return pizza;
  }

  async getAllPizzas() {
    return await Pizza.find({ available: true });
  }

  async getPizzaById(id) {
    return await Pizza.findById(id);
  }

  async updatePizza(id, updateData) {
    return await Pizza.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deletePizza(id) {
    return await Pizza.findByIdAndDelete(id);
  }
}

module.exports = new PizzaService();