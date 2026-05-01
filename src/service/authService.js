const User = require('../model/User');
const jwt = require('jsonwebtoken');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Credenciais inválidas');
    }

    const token = this.generateToken(user._id);
    
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  generateToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
}

module.exports = new AuthService();
