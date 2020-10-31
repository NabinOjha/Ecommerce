const express = require('express');

const categoryController = require('./../controllers/categoryController');
const authController = require('./../controllers/authController');
const upload = require('./../utils/upload');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    upload.single('image'),
    categoryController.createCategory
  );

router.route('/').get(categoryController.getCategories);

module.exports = router;
