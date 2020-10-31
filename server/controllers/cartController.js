const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);
const util = require('util');
const Cart = require('./../model/cartModel');
const Order = require('./../model/orderModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.getCart = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const cart = await Cart.findOne({ user: userId }).populate('products.prod');

  res.status(200).json({
    message: 'Succcess',
    data: cart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { prodId, itemQuantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    const newCart = await Cart.create({
      user: userId,
      products: [{ prod: prodId, itemQuantity: itemQuantity || 1 }],
    });

    return res.status(200).json({
      message: 'Succcess',
      data: newCart,
    });
  }

  if (await Cart.userAlreadyHasProduct(userId, prodId)) {
    cart.products = cart.products.map((prod) => {
      if (prod.prod.toString() === prodId) {
        prod.itemQuantity = prod.itemQuantity + (itemQuantity || 1);
        return prod;
      } else {
        return prod;
      }
    });
  } else {
    cart.products = [
      ...cart.products,
      { prod: prodId, itemQuantity: itemQuantity || 1 },
    ];
  }

  const updatedCart = await cart.save();

  return res.status(200).json({
    message: 'Success',
    data: updatedCart,
  });
});

exports.deleteFromCart = catchAsync(async (req, res, next) => {
  const { prodId } = req.params;

  await Cart.findOneAndDelete(
    { user: userId },
    { $pull: { products: prodId } }
  );

  res.status(200).json({
    message: 'Success',
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const currentUserId = req.user._id;

  const updatedCart = await Cart.findOneAndUpdate(
    {
      user: currentUserId,
    },
    { $set: { 'products.$[element].itemQuantity': req.body.value } },
    { arrayFilters: [{ 'element.prod': req.params.prodId }], new: true }
  ).populate('products.prod');

  if (!updatedCart)
    return next(new AppError('Cart update failed.Please try again later!!'));

  res.status(200).json({
    message: 'Success',
    data: updatedCart,
  });
});

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'products.prod'
  );

  if (!cart.products || cart.products.length === 0) {
    return next(new AppError('No items present in the cart!'));
  }
  const line_items = cart.products.map((item, index) => {
    const line_item = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.prod.name,
        },
        unit_amount: item.prod.price * 1,
      },
      quantity: item.itemQuantity * 1,
    };
    return line_item;
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    // customer_email: req.user.email,
    // client_reference_id: cart._id,
    success_url: `http://localhost:3000/orders?cartId=${cart._id}&userEmail=${req.user.email}`,
    cancel_url: 'http://localhost:3000/orders',
  });

  res.status(200).json({
    message: 'Success',
    data: session.id,
  });
});

///////////////////////////////////////
////orders controller
///////////////////////////////////////

exports.createOrder = catchAsync(async (req, res, next) => {
  const { products } = await Cart.findById(req.body.cartId);

  const userOrder = await Order.create({
    products: products.map((item) => item.prod),
    user: req.user._id,
    shipping: req.body.shippingData,
  });

  res.status(200).json({
    message: 'Success',
    data: userOrder,
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.userId }).populate(
    'user products'
  );

  if (!orders)
    return next(
      new AppError('Orders not found! Please add an order first!', 400)
    );

  res.status(200).json({
    message: 'Success',
    data: orders,
  });
});
