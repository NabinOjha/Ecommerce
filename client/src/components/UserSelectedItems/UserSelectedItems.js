import React from 'react';

import './UserSelectedItems.scss';

const UserSelectedItems = ({ itemsList, totalPrice, title }) => {
  const prependLabel = (label, value, className) => {
    return (
      <div className={`${className}`}>
        <span className='checkout__label'>{label}:</span>
        <span className='checkout__value'>{value}</span>
      </div>
    );
  };

  const cartItems = itemsList.map((item, index) => (
    <li className='cartItem' key={index}>
      <img
        className='cartItem__image'
        alt='cartItem'
        src={`http://localhost:5000/image/${item.image}`}
      />
      <div className='cartItem__details'>
        {prependLabel('Name', `${item.name}`, ' cartItem__name')}
        {prependLabel('Quantity', item.itemQuantity, 'cartItem__quantity')}
        {prependLabel('Price', `Rs.${item.price}`, 'cartItem__price')}
        {prependLabel('Total', `Rs.${item.total}`, 'cartItem__total')}
      </div>
    </li>
  ));

  return (
    <div className='bag'>
      <h3 className='bag__title'>{title}</h3>
      <ul className='bag__list'>{cartItems}</ul>
      <div className='total'>
        {prependLabel('Items Cost', `Rs.${totalPrice}`, 'Items cost')}
        {prependLabel('Shipping Cost', 'Rs.5000', 'Shipping cost')}
        {prependLabel('Total', `Rs.${5000 + totalPrice}`, 'Total cost')}
      </div>
    </div>
  );
};

export default UserSelectedItems;
