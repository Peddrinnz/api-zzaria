const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/.+@.+\..+/, 'Email inválido'] },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [
    {
      street: { type: String, required: true, trim: true },
      number: { type: Number, required: true },
      complement: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      zipCode: { type: String, required: true, trim: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  favoritePizzas: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', unique: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);