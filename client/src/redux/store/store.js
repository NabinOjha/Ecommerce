import { combineReducers } from 'redux';

import userReducer from './../reducers/userReducer';
import loadingReducer from './../reducers/loadingReducer';
import productReducer from './../reducers/productReducer';
import categoryReducer from './../reducers/categoryReducer';
import commentReducer from './../reducers/commentReducer';
import cartReducer from './../reducers/cartReducer';

const rootReducer = combineReducers({
  users: userReducer,
  products: productReducer,
  loading: loadingReducer,
  category: categoryReducer,
  comments: commentReducer,
  cart: cartReducer,
});

export default rootReducer;
