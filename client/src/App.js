import React, { useLayoutEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Router } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import Shop from './pages/Shop/Shop';

import './App.scss';
import { getCurrentUser } from './redux/actions/action';
import { currentUserSelector } from './redux/selectors/userSelectors';

import history from './util/history';

import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import DashBoard from './pages/DashBoard/DashBoard';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import Checkout from './components/Checkout/Checkout';
import MyOrders from './components/MyOrders/MyOrders';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  useLayoutEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Router history={history}>
      <Navigation />
      <div className='app'>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/shop'>
            <Shop />
          </Route>
          <Route
            path='/signup'
            render={(props) =>
              !currentUser ? (
                <Signup {...props} />
              ) : (
                <Redirect to='/' {...props} />
              )
            }
          ></Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/user/cart'>
            <Cart />
          </Route>
          <PrivateRoute path='/dashboard' Component={DashBoard} />
          <PrivateRoute path='/products/:prodId' Component={ProductDetails} />
          <PrivateRoute path='/checkout' Component={Checkout} />
          <PrivateRoute path='/orders' Component={MyOrders} />
        </Switch>
        <footer>@Copyright</footer>
      </div>
    </Router>
  );
};

export default App;
