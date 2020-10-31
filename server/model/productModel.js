const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name!'],
  },

  price: {
    type: Number,
    required: [true, 'Please provide price!'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category!'],
  },
  description: {
    type: String,
    required: [true, 'Please provide description!'],
  },

  avgRating: {
    type: Number,
    default: 40,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  productImages: {
    type: [String],
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
