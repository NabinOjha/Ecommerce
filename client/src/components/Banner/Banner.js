import React, { useState } from 'react';

import './Banner.scss';
import BannerImage from '../../assets/images/undraw_business_shop_qw5t.svg';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    setSearchQuery('');
  };

  return (
    <div className='banner'>
      <div className='banner-form-container container'>
        <h1>Get the item you desire.</h1>
        <h4>Make your wish come true</h4>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            className='search-form__input'
            type='text'
            placeholder='Search an item'
            value={searchQuery}
            onChange={handleChange}
          />
          <button className='submit'>Search</button>
        </form>
      </div>
      <img className='banner-image' src={BannerImage} alt='banner' />
    </div>
  );
};

export default Banner;
