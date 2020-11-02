const mongoose = require('mongoose');

const AppError = require('../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const Product = require('./../model/productModel');
const Cart = require('./../model/cartModel');
const Rating = require('./../model/ratingModel');
const Comment = require('./../model/commentModel');

exports.createProduct = catchAsync(async (req, res, next) => {
  let image;
  let productImages;

  if (req.files) {
    for (let key in req.files) {
      if (key === 'image') {
        image = req.files[key][0].filename;
      } else if (key === 'productImages') {
        productImages = req.files[key].map(
          (productImage) => productImage.filename
        );
      }
    }
  }

  const productData = { ...req.body, image, productImages };
  const product = await Product.create(productData);

  res.status(200).json({
    data: product,
    message: 'Success',
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query, Product)
    .filter()
    .paginate();

  const products = await apiFeature.query;
  const count = await apiFeature.count();

  if (!products) return next(new AppError('Products not found!', 404));
  res.status(200).json({
    docCount: count,

    data: products,
    message: 'Success',
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);
  await Rating.deleteMany({ product: id });

  await Cart.aggregate([
    {
      $match: { products: { $elemMatch: { id } } },
    },
    {
      $set: { products: { $pull: id } },
    },
    {
      $out: 'carts',
    },
  ]);

  await Comment.deleteMany({ product: id });

  res.status(200).json({
    data: null,
    message: 'success',
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  let image;
  let productImages;

  if (req.files) {
    for (let key in req.files) {
      if (key === 'image') {
        image = req.files[key][0].filename;
      } else if (key === 'productImages') {
        productImages = req.files[key].map(
          (productImage) => productImage.filename
        );
      }
    }
  }

  const productData = { ...req.body, image, productImages };

  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });

  res.status(200).json({
    data: updatedProduct,
    message: 'Success',
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) return next(new AppError('Product not found!', 404));
  res.status(200).json({
    message: 'Success',
    data: product,
  });
});

exports.FindMinMaxPrice = catchAsync(async (req, res, next) => {
  const minMaxPriceDocs = await Product.aggregate([
    {
      $group: {
        _id: 'minPrice',
        maxPrice: { $max: '$price' },
      },
    },
  ]);

  res.status(200).json({
    message: 'success',
    data: minMaxPriceDocs,
  });
});
