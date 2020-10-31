const express = require('express');

const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/create-checkout-session')
  .post(cartController.createCheckoutSession);

router.route('/').get(cartController.getCart).post(cartController.addToCart);

router
  .route('/:prodId')
  .delete(cartController.deleteFromCart)
  .patch(cartController.updateCart);

module.exports = router;
