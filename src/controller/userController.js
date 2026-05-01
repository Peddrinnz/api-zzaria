const userService = require('../service/userService');

class UserController {
  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login(email, password);
      res.json({ message: 'Login realizado com sucesso', user, token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user._id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  }

  async updateProfile(req, res) {
    try {
      const user = await userService.updateUser(req.user._id, req.body);
      res.json({ message: 'Perfil atualizado com sucesso', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteAccount(req, res) {
    try {
      await userService.deleteUser(req.user._id);
      res.json({ message: 'Conta deletada com sucesso' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();