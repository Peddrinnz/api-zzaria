const Order = require('../model/Order');
const Pizza = require('../model/Pizza');

class OrderService {
  async createOrder(userId, orderData) {
    let total = 0;
    for (const item of orderData.items) {
      const pizza = await Pizza.findById(item.pizza);
      if (!pizza) throw new Error('Pizza não encontrada');
      item.price = pizza.price;
      total += pizza.price * item.quantity;
    }
    orderData.total = total;
    orderData.user = userId;
    const order = new Order(orderData);
    await order.save();
    return await order.populate('items.pizza user');
  }

  async getOrdersByUser(userId, limit = 10, offset = 0) {
    return await Order.find({ user: userId })
      .populate('items.pizza')
      .limit(limit)
      .skip(offset);
  }

  async getAllOrders(limit = 10, offset = 0) {
    return await Order.find()
      .populate('items.pizza user')
      .limit(limit)
      .skip(offset);
  }

  async getOrderById(id) {
    return await Order.findById(id).populate('items.pizza user');
  }

  async updateOrderStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { returnDocument: 'after' }).populate('items.pizza user');
  }

  async deleteOrder(id) {
    return await Order.findByIdAndDelete(id);
  }
}

module.exports = new OrderService();