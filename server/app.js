const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config.env' });

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/ordersRoutes');

require('./utils/passport');
require('./utils/db');

const { PORT } = process.env;

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

//body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

// test middleware
// app.use((req, res, next) => {
//   console.log(req.body);
//   console.log(req.originalUrl);
//   next();
// });

//route mounting
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/ratings', ratingRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders/', orderRoutes);

app.use((err, req, res, next) => {
  const error = { ...err };
  console.log(err);
  error.message = err.message || 'Something went wrong';
  error.statusCode = err.statusCode || 500;
  res.status(error.statusCode).json({
    status: 'fail',
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
