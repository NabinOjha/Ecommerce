const express = require('express');

const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').post(cartController.createOrder);

router.route('/:userId').get(cartController.getMyOrders);

module.exports = router;