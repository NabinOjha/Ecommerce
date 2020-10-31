const mongoose = require('mongoose');

const ratingCommentSchema = new mongoose.Schema({
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
});

module.exports = ratingCommentSchema;
