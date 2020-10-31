import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FaShoppingCart } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

import './Navigation.scss';

import { currentUserSelector } from '../../redux/selectors/userSelectors';
import { getCart } from './../../redux/actions/action';

const Navigation = () => {
  const [showBurgerMenuItems, setShowBurgerMenuItems] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserSelector);

  const cartLength = useSelector((state) => {
    if (state.cart) {
      return state.cart.products.length;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(getCart());
    }
  }, [dispatch, currentUser]);

  return (
    <ul className={`nav ${showBurgerMenuItems ? 'show' : ''}`}>
      <div className={`burger-menu ${showBurgerMenuItems && 'menu-open'}`}>
        <div
          className='burger-menu-container'
          onClick={() => setShowBurgerMenuItems((prevState) => !prevState)}
        ></div>
      </div>

      <li className='nav-item'>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/shop'>Shop</NavLink>
      </li>
      {!currentUser ? (
        <>
          <li className='nav-item'>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/signup'>Signup</NavLink>
          </li>
        </>
      ) : (
        <>
          <li className='nav-item'>
            <NavLink to='/user/cart'>
              <FaShoppingCart />
              <div className='cart-items__count'>
                <FiMessageSquare />
                <span>{cartLength}</span>
              </div>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/dashboard'>{currentUser.username}</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navigation;
