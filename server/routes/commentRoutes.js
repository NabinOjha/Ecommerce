const express = require('express');

const authController = require('./../controllers/authController');
const commentController = require('./../controllers/commentController');

const router = express.Router();

router
  .route('/:prodId')
  .post(authController.protect, commentController.createComment)
  .get(commentController.getComments);

module.exports = router;
