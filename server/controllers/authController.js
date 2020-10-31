const jwt = require('jsonwebtoken');

const User = require('./../model/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

const createSendTokenAndCookie = async (res, user, message) => {
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60 * 1000,
  });

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.json({
    data: user,
    token,
    message,
  });
};

exports.signUp = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(
      new AppError('User already exist.Please use another email!', 400)
    );
  }
  const newUser = await User.create(req.body);
  await createSendTokenAndCookie(res, newUser, 'Success');
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new AppError('User does not exist.Please try again later!', 400)
    );
  }

  if (!(await user.comparePassword(password, user.password))) {
    return next(new AppError('Passwords do not match!', 400));
  }
  await createSendTokenAndCookie(res, user, 'Success');
});

exports.protect = catchAsync(async (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      const {
        cookies: { jwt },
      } = req;

      if (!jwt) {
        return next(
          new AppError(
            'You are not logged in. Please login to access this route'
          )
        );
      }
      token = jwt;
    }

    if (!token) return next(new AppError('Please login to get access!', 401));

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user)
      return next(new AppError('The user with this id no longer exist', 401));

    req.user = user;

    next();
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return next(
        new AppError('You cannot access this route.Please try again!')
      );
    }
  };
};

exports.currentUser = catchAsync(async (req, res, next) => {
  let user;
  if (req.user) {
    user = req.user;
  } else {
    if (req.cookies.jwt) {
      const token = req.cookies.jwt;
      if (!token) return next();
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id);
    }
  }

  if (!user) return res.status(200).json({ message: 'No logged In User' });

  res.status(200).json({ data: user });
});

exports.logout = (req, res, next) => {
  if (req.logout) {
    req.logout();
    res.cookie('jwt', 'LOGOUT', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      messsage: 'Success',
    });
  } else {
    res.cookie('jwt', 'LOGOUT', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      messsage: 'Success',
    });
  }
};
