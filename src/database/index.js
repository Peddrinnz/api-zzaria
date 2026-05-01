const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI não está definido no .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
