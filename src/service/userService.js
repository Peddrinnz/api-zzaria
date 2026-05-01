const User = require('../model/User');

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

  async getUserById(id) {
    return await User.findById(id).select('-password');
  }

  async getAllUsers(limit, offset) {
    return await User.find()
      .select('-password')
      .limit(limit)
      .skip(offset);
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async addAddress(userId, addressData) {
    return await User.findOneAndUpdate(
      { _id: userId },
      { $push: { addresses: addressData } },
      { new: true, rawResult: true }
    );
  }

  async removeAddress(userId, addressId) {
    return await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } },
      { new: true, rawResult: true }
    );
  }

  async addFavoritePizza(userId, pizzaData) {
    return await User.findOneAndUpdate(
      { _id: userId },
      { $push: { favoritePizzas: { _id: pizzaData._id } } },
      { new: true, rawResult: true }
    );
  }

  async removeFavoritePizza(userId, pizzaId) {
    return await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { favoritePizzas: { _id: pizzaId } } },
      { new: true, rawResult: true }
    );
  }
}

module.exports = new UserService();