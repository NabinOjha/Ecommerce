const mongoose = require('mongoose');
const Product = require('./productModel');

const ratingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product!!'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user!!'],
  },
  value: {
    type: Number,
    required: [true, 'Please provide a value!!'],
  },
});

ratingSchema.index({ product: 1, user: 1 }, { unique: true });

ratingSchema.statics.calculateAverage = async function (prodId) {
  const averageRatingStat = await this.aggregate([
    {
      $match: {
        product: prodId,
      },
    },
    {
      $group: {
        _id: '$product',
        totalRating: { $sum: 1 },
        averageRating: { $avg: '$value' },
      },
    },
  ]);

  if (averageRatingStat.length > 0) {
    await Product.findByIdAndUpdate(prodId, {
      avgRating: averageRatingStat[0].averageRating,
      ratingQuantity: averageRatingStat[0].totalRating,
    });
  } else {
    await Product.findByIdAndUpdate(prodId, {
      averageRating: 45,
      ratingQuantity: 0,
    });
  }
};

ratingSchema.post('save', async function () {
  await this.constructor.calculateAverage(this.product);
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
