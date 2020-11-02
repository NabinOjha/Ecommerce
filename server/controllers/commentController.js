const catchAsync = require('./../utils/catchAsync');
const Comment = require('./../model/commentModel');
const Product = require('./../model/productModel');
const AppError = require('./../utils/AppError');
const util = require('util');

const createComment = catchAsync(async (req, res, next) => {
  const { prodId } = req.params;

  const comment = await Comment.create({
    value: req.body.comment,
    product: prodId,
    user: req.user._id,
  });

  res.status(200).json({
    data: { ...comment._doc, user: req.user },
    message: 'Success',
  });
});

const getComments = catchAsync(async (req, res, next) => {
  const { prodId } = req.params;

  const comments = await Comment.find({ product: prodId }).populate('user');

  res.status(200).json({
    data: comments || [],
    message: 'Success',
  });
});

module.exports = {
  createComment,
  getComments,
};
