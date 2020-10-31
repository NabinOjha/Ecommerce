const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const CategoryModel = require('./../model/categoryModel');

exports.createCategory = catchAsync(async (req, res, next) => {
  let image;
  if (req.file) {
    image = req.file.filename;
  }
  const data = { ...req.body, image };
  const category = await CategoryModel.create(data);

  res.status(200).json({
    data: category,
    message: 'Success',
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await CategoryModel.find();
  if (!categories) return next(new AppError('Categories not found!', 404));

  res.status(200).json({
    data: categories,
    message: 'Success',
  });
});
