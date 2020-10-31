const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user!!'],
  },
  products: [
    {
      prod: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      itemQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

cartSchema.statics.userAlreadyHasProduct = async function (userId, prodId) {
  const cart = await this.findOne({
    $and: [{ user: userId }, { products: { $elemMatch: { prod: prodId } } }],
  });

  return cart ? true : false;
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
