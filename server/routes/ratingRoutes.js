const express = require('express');

const ratingController = require('./../controllers/ratingController');
const authController = require('./../controllers/authController');


const router = express.Router();

router
.route('/')
.post(authController.protect, ratingController.createRating);

router
.route('/:prodId')
.get(ratingController.getProductRating);




module.exports = router;