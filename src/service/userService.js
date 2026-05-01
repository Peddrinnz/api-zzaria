const User = require('../model/User');
const jwt = require('jsonwebtoken');

class UserService {
  async register(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email já cadastrado');
      }
      throw error;
    }
  }

  async login(email, password) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Credenciais inválidas');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { user, token };
  }

  async getUserById(id) {
    return await User.findById(id).select('-password');
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserService();