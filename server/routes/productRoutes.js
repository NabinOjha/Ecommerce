const express = require('express');

const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
const uploads = require('./../utils/upload');

const router = express.Router();

router.route('/').post(
  authController.protect,
  uploads.fields([
    { name: 'image', maxCount: 1 },
    { name: 'productImages', maxCount: 10 },
  ]),

  productController.createProduct
);

router.route('/price').get(productController.FindMinMaxPrice);
router.route('/').get(productController.getAllProducts);

router.route('/:id').put(
  authController.protect,
  uploads.fields([
    { name: 'image', maxCount: 1 },
    { name: 'productImages', maxCount: 4 },
  ]),
  productController.editProduct
);

router
  .route('/:id')
  .delete(productController.deleteProduct)
  .get(productController.getProduct);

module.exports = router;
