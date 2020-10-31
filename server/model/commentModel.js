const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
    type: String,
    required: [true, 'Please provide a comment!!'],
  },
});

commentSchema.index({ product: 1, user: 1 }, { unique: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
