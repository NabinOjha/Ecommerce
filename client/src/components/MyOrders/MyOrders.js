import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './MyOrders.scss';

import { createOrder, getMyOrders } from './../../redux/actions/action';

const MyOrders = (props) => {
  const dispatch = useDispatch();
  const userId = props.currentUser._id;

  const search = props.history.location.search;
  const { history } = props;

  useEffect(() => {
    const createMyOrderFn = async () => {
      const shippingData = JSON.parse(localStorage.getItem('shippingData'));
      if (search && shippingData) {
        const searchItems = search.split('?')[1].split('&');
        const cartId = searchItems[0].split('=')[1];
        const userEmail = searchItems[1].split('=')[1];
        await dispatch(createOrder({ cartId, userEmail, shippingData }));
        localStorage.removeItem('shippingData');
        history.push('/orders?');
      } else {
        await dispatch(getMyOrders(userId));
      }
    };
    createMyOrderFn();
  }, [dispatch, search, userId, history]);

  return <div className='orders'>My Order</div>;
};

export default MyOrders;
