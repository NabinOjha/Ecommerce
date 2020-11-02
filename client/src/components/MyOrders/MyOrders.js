/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './MyOrders.scss';

import { createOrder, getMyOrders } from './../../redux/actions/action';
import UserSelectedItems from '../UserSelectedItems/UserSelectedItems';

const getOrder = (state) => {
  const mergedOrders = state.cart.order.reduce(
    (acc, item) => [...acc, ...item.products],
    []
  );
  const customizedOrders = [];
  for (let i = 0; i < mergedOrders.length; i++) {
    let itemQuantity = mergedOrders[i].itemQuantity;
    for (let j = i + 1; j < mergedOrders.length; j++) {
      if ((mergedOrders[i].prod._id = mergedOrders[j].prod._id)) {
        itemQuantity = itemQuantity + mergedOrders[j].itemQuantity;
      }
    }
    if (
      !customizedOrders.find(
        (productDetail) => productDetail.prod._id === mergedOrders[i].prod._id
      )
    ) {
      customizedOrders.push({ ...mergedOrders[i], itemQuantity: itemQuantity });
    }
  }
  return customizedOrders.map(
    ({ prod: { name, _id, category, image, price }, itemQuantity }, index) => ({
      id: _id,
      index: index + 1,
      name,
      image,
      category,
      price,
      itemQuantity,
      total: itemQuantity * 1 * price * 1,
    })
  );
};

const MyOrders = (props) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => getOrder(state));
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
        history.push('/orders');
      } else {
        await dispatch(getMyOrders(userId));
      }
    };
    createMyOrderFn();
  }, [dispatch, search, userId, history]);

  const orderTotalPrice = order.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className='orders'>
      <UserSelectedItems
        itemsList={order}
        totalPrice={orderTotalPrice}
        title='Your order'
      />
    </div>
  );
};

export default MyOrders;
