import React from 'react';

import './CatgoryItem.scss';

const CategoryItem = ({ category }) => {
  return (
    <li className='category-item'>
      <h3 className='category-item__title'>{category.name.toUpperCase()}</h3>
      <span className='category-item__count'>50 pieces</span>
    </li>
  );
};

export default CategoryItem;
