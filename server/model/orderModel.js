const mongoose = require('mongoose');

const Cart = require('./cartModel');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User missing.Please provide a user!'],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Please provide a order!'],
    },
  ],
  shipping: new Schema({
    shipping_country: {
      type: String,
      required: [true, 'Please provide all the shipping details'],
    },
    shipping_city: {
      type: String,
      required: [true, 'Please provide all the shipping details'],
    },
    shipping_street: {
      type: String,
      required: [true, 'Please provide all the shipping details'],
    },
  }),
});

orderSchema.post('save', async function (next) {
  await Cart.deleteMany({ user: this.user });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
