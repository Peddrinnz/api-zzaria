const Pizza = require('../model/Pizza');

class PizzaService {
  async createPizza(pizzaData) {
    const pizza = new Pizza(pizzaData);
    await pizza.save();
    return pizza;
  }

  async getAllPizzas(limit = 10, offset = 0) {
    return await Pizza.find({ available: true })
      .limit(limit)
      .skip(offset);
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