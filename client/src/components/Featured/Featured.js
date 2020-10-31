import React from 'react';

import './Featured.scss';

import Slider from './../Slider/Slider';

const FeaturedList = ({ products }) => {
  console.log(products);
  return (
    <div className='featured'>
      <h2 className='featured__title'>Featured List</h2>
      <p>Get the featured items here!</p>
      <Slider products={products} />
    </div>
  );
};

export default FeaturedList;
