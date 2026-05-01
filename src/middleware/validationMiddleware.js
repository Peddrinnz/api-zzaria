const { Types } = require('mongoose');

// Validação de Usuário
const validateUser = (req, res, next) => {
  const errors = [];

  if (!req.body.name || req.body.name.trim() === '') {
    errors.push('name');
  }

  if (!req.body.email || req.body.email.trim() === '') {
    errors.push('email');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    errors.push('email (formato inválido)');
  }

  if (!req.body.password || req.body.password.trim() === '') {
    errors.push('password');
  } else if (req.body.password.length < 6) {
    errors.push('password (mínimo 6 caracteres)');
  }

  if (errors.length === 0) {
    return next();
  }

  return res.status(400).send({
    message: errors.length > 1 
      ? `Os campos ${errors.join(', ')} precisam ser preenchidos corretamente!`
      : `O campo ${errors[0]} precisa ser preenchido corretamente!`
  });
};

// Validação de Pizza
const validatePizza = (req, res, next) => {
  const errors = [];

  if (!req.body.name || req.body.name.trim() === '') {
    errors.push('name');
  }

  if (!req.body.description || req.body.description.trim() === '') {
    errors.push('description');
  }

  if (!req.body.price || req.body.price <= 0) {
    errors.push('price (deve ser maior que 0)');
  }

  if (!Array.isArray(req.body.ingredients) || req.body.ingredients.length === 0) {
    errors.push('ingredients (deve ser um array não vazio)');
  }

  if (errors.length === 0) {
    return next();
  }

  return res.status(400).send({
    message: errors.length > 1 
      ? `Os campos ${errors.join(', ')} precisam ser preenchidos corretamente!`
      : `O campo ${errors[0]} precisa ser preenchido corretamente!`
  });
};

// Validação de Pedido
const validateOrder = (req, res, next) => {
  const errors = [];

  if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
    errors.push('items (deve ser um array não vazio)');
  } else {
    req.body.items.forEach((item, index) => {
      if (!item.pizza) {
        errors.push(`items[${index}].pizza`);
      }
      if (!item.quantity || item.quantity <= 0) {
        errors.push(`items[${index}].quantity (deve ser maior que 0)`);
      }
    });
  }

  if (!req.body.deliveryAddress) {
    errors.push('deliveryAddress');
  } else {
    if (!req.body.deliveryAddress.street) errors.push('deliveryAddress.street');
    if (!req.body.deliveryAddress.city) errors.push('deliveryAddress.city');
    if (!req.body.deliveryAddress.zipCode) errors.push('deliveryAddress.zipCode');
  }

  if (errors.length === 0) {
    return next();
  }

  return res.status(400).send({
    message: errors.length > 1 
      ? `Os campos ${errors.join(', ')} precisam ser preenchidos corretamente!`
      : `O campo ${errors[0]} precisa ser preenchido corretamente!`
  });
};

// Validação de ID válido
const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'ID inválido! Deve ser um ObjectId válido do MongoDB'
    });
  }

  next();
};

// Validação de Login
const validateLogin = (req, res, next) => {
  const errors = [];

  if (!req.body.email || req.body.email.trim() === '') {
    errors.push('email');
  }

  if (!req.body.password || req.body.password.trim() === '') {
    errors.push('password');
  }

  if (errors.length === 0) {
    return next();
  }

  return res.status(400).send({
    message: errors.length > 1 
      ? `Os campos ${errors.join(', ')} precisam ser preenchidos!`
      : `O campo ${errors[0]} precisa ser preenchido!`
  });
};

module.exports = {
  validateUser,
  validatePizza,
  validateOrder,
  validateId,
  validateLogin
};
