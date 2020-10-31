const catchAsync = require('./../utils/catchAsync');
const Rating = require('../model/ratingModel');
const Product = require('./../model/productModel');
const AppError = require('../utils/AppError');

exports.createRating = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const ratingData = {
    value: req.body.rating,
    user: userId,
    product: req.body.prodId,
  };

  const rating = await Rating.create(ratingData);

  res.status(200).json({
    data: rating,
    message: 'Success',
  });
});

exports.getProductRating = catchAsync(async (req, res, next) => {
  const { prodId } = req.params;
  const ratings = await Rating.find({ product: prodId });

  if (!ratings)
    return next(
      new AppError('Ratings not found.Please try again later!!!', 404)
    );

  res.status(200).json({
    data: ratings,
    message: 'Success',
  });
});
