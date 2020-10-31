const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a valid username!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email!'],
    // unique: [true, 'Email already exist .Please use another mail!'],
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords do not match',
    },
  },

  image: {
    type: String,
  },
  googleId: String,
  facebookId: String,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.comparePassword = async function (
  passwordToCompare,
  currentPassword
) {
  return await bcrypt.compare(passwordToCompare, currentPassword);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
