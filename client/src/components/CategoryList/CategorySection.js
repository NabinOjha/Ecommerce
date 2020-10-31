import React from 'react';

import './CategorySection.scss';

import CategoryList from './CategoryList';

const CategorySection = () => {
  return (
    <div className='category'>
      <h2 className='category-title'>Browse By Category</h2>
      <CategoryList />
      <button className='category-btn'>Browse categories</button>
    </div>
  );
};

export default CategorySection;
