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
      prod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Please provide a order!'],
      },
      itemQuantity: {
        type: Number,
        required: [true, 'Please provide item quantity!!'],
      },
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

orderSchema.post('save', async function () {
  await Cart.deleteMany({ user: this.user });
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
