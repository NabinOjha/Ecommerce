import React from 'react';
import { useSelector } from 'react-redux';

import './CategoryList.scss';

import { selectCategory } from './../../redux/selectors/categroySelector';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const categories = useSelector(selectCategory);
  return (
    <ul className='categorylist container'>
      {categories
        .filter((category, index) => index < 3)
        .map((category, index) => (
          <CategoryItem category={category} key={index} />
        ))}
    </ul>
  );
};

export default CategoryList;
