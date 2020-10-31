import React from 'react';

import { FaCartPlus } from 'react-icons/fa';

import './Item.scss';

import Rating from './../Rating/Rating';

const Item = ({ item }) => {
  const renderRating = () => {
    return <Rating readOnly={true} initialRating={item.avgRating} />;
  };
  return (
    <>
      <div className='item__image-container'>
        <img
          className='item__image'
          src={`http://localhost:5000/image/${item.image}`}
          alt='item'
        />
      </div>
      <div className='item__content'>
        <h3 className='item__name'>{(item && item.name) || 'name'}</h3>
        <span className='item__price'>
          Price: {(item && item.price) || 5000}
        </span>
        <div className='item__logos'>
          <div className='item__rating'>{renderRating()}</div>
          <div className='item__cart'>
            <FaCartPlus />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
