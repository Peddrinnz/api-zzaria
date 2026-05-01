const orderService = require('../service/orderService');

class OrderController {
  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.user._id, req.body);
      res.status(201).json({ message: 'Pedido criado com sucesso', order });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = await orderService.getOrdersByUser(req.user._id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status);
      if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
      res.json({ message: 'Status do pedido atualizado', order });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const order = await orderService.deleteOrder(req.params.id);
      if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
      res.json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();