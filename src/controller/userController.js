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

  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user._id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  }

  async getAllUsers(req, res) {
    try {
      const { limit, offset } = req.pagination;
      const users = await userService.getAllUsers(limit, offset);
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
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

  async addAddress(req, res) {
    try {
      const result = await userService.addAddress(req.user._id, req.body);
      if (result.value) {
        res.status(201).json({ message: 'Endereço adicionado com sucesso', user: result.value });
      } else {
        res.status(400).json({ message: 'Erro ao adicionar endereço' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async removeAddress(req, res) {
    try {
      const result = await userService.removeAddress(req.user._id, req.params.addressId);
      if (result.value) {
        res.json({ message: 'Endereço removido com sucesso' });
      } else {
        res.status(404).json({ message: 'Endereço não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async addFavoritePizza(req, res) {
    try {
      const result = await userService.addFavoritePizza(req.user._id, req.body);
      if (result.value) {
        res.status(201).json({ message: 'Pizza adicionada aos favoritos', user: result.value });
      } else {
        res.status(400).json({ message: 'Erro ao adicionar pizza aos favoritos' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async removeFavoritePizza(req, res) {
    try {
      const result = await userService.removeFavoritePizza(req.user._id, req.params.pizzaId);
      if (result.value) {
        res.json({ message: 'Pizza removida dos favoritos' });
      } else {
        res.status(404).json({ message: 'Pizza não encontrada nos favoritos' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();