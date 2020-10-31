const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    sparse: true,
    required: [true, 'Please provide a category name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description!'],
  },
  image: {
    type: String,
    required: [true, 'Please provid a image!'],
  },
});

const CategoryModel = mongoose.model('category', categorySchema);

module.exports = CategoryModel;
