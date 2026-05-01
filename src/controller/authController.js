const authService = require('../service/authService');
const userService = require('../service/userService');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({ message: 'Login realizado com sucesso', user, token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
