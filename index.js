const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectMongoDB = require('./src/database');

dotenv.config();

const app = express();
app.use(express.json());

connectMongoDB().then(() => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const userRoutes = require('./src/router/userRoutes');
  const pizzaRoutes = require('./src/router/pizzaRoutes');
  const orderRoutes = require('./src/router/orderRoutes');

  app.use('/api/users', userRoutes);
  app.use('/api/pizzas', pizzaRoutes);
  app.use('/api/orders', orderRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});