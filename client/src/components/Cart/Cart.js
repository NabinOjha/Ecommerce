import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Cart.scss';

import Table from './../Table/Table';
import { getCart, updateProductQuantity } from '../../redux/actions/action';
import { Link } from 'react-router-dom';
import selectCart from '../../redux/selectors/cartSelector';

const selectCartLoading = (state) =>
  state.loading.GET_CART === undefined ? true : state.loading.GET_CART;

const Cart = () => {
  const dispatch = useDispatch();
  const cartLoading = useSelector(selectCartLoading);

  const handleProductQunatityChange = (prodId, value) => {
    dispatch(updateProductQuantity(prodId, value));
  };

  const { cart, totalPrice, totalItems } = useSelector(selectCart);

  const cartBody = cart.map((item) => {
    const copy = {
      ...item,
      itemQuantity: (
        <input
          className='quantity-input'
          type='number'
          value={item.itemQuantity || 1}
          min={1}
          onChange={(e) => {
            const { value } = e.target;
            handleProductQunatityChange(item.id, value);
          }}
          style={{
            display: 'inline-block',
            border: 'none',
            outline: 'none',
            height: '100%',
            padding: '0 .3rem ',
          }}
        />
      ),
    };
    delete copy.image;
    delete copy.id;
    return copy;
  });

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    !cartLoading.loading && (
      <div className='cart'>
        <Table
          tableData={{
            headings: ['S.Q', 'Name', 'Price', 'Category', 'Quantity', 'Total'],
            body: cartBody,
          }}
          pagination={false}
        />
        <div className='cart-details'>
          <span className='cart-details__label'>Total Price</span>
          <span className='cart-deatils__value'>Rs: {totalPrice}</span>
        </div>
        <div className='cart-details'>
          <span className='cart-details__label'>Total Items</span>
          <span className='cart-deatils__value'>{totalItems}</span>
        </div>
        <div className='cart-checkout-container'>
          <Link to='/checkout' className='cart-checkout'>
            Checkout
          </Link>
        </div>
      </div>
    )
  );
};

export default Cart;
