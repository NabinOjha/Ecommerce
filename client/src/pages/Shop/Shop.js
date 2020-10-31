import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Range, createSliderWithTooltip } from 'rc-slider';

import 'rc-slider/assets/index.css';
import './Shop.scss';

import {
  getCategories,
  getProducts,
  getMinMaxPrice,
} from '../../redux/actions/action';
import { selectCategory } from '../../redux/selectors/categroySelector';
import { selectMinMaxPrice } from '../../redux/selectors/productSelector';
import { selectCurrentFilter } from '../../redux/selectors/productSelector';
import { selectShopPageLoading } from '../../redux/selectors/loadingSelector';

import ItemList from '../../components/ItemsList/ItemList';
import withLoading from './../../util/LoadingHOC';

Range = createSliderWithTooltip(Range);
const RangeSlider = ({ onChange, minMaxPrice }) => {
  return (
    <Range
      className='range-slider'
      min={0}
      max={(minMaxPrice && minMaxPrice.maxPrice) || 0}
      defaultValue={[0, (minMaxPrice && minMaxPrice.maxPrice) || 0]}
      onChange={(value) => onChange(value)}
    />
  );
};

const Shop = ({ setLoadingState, isLoading }) => {
  const [productLimit] = useState(6);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);
  const minMaxPrice = useSelector(selectMinMaxPrice);
  const { loading } = useSelector(selectShopPageLoading);

  const currentFilter = useSelector(selectCurrentFilter);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getMinMaxPrice());
    return () => {
      dispatch({ type: 'REMOVE_CURRENT_FILTER' });
      dispatch({ type: 'CLEAR_PRODUCTS' });
    };
  }, [dispatch]);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading, setLoadingState]);

  useEffect(() => {
    if (Object.keys(currentFilter).length !== 0) {
      dispatch(getProducts(1, productLimit, currentFilter));
    }
  }, [dispatch, currentFilter, productLimit]);

  const handlePriceChange = useCallback(
    (range) => {
      const gte = range[0];
      const lte = range[1];

      dispatch({ type: 'CURRENT_FILTER', payload: { price: { lte, gte } } });
    },
    [dispatch]
  );

  const handleCategoryFilter = (categoryName) => {
    dispatch({
      type: 'CURRENT_FILTER',
      payload: { category: categoryName },
    });
  };

  const renderCategoryItem = categories.map((category, i) => (
    <li
      className='filter-category-list__item'
      key={i}
      onClick={() => handleCategoryFilter(category.name)}
    >
      {category.value}
    </li>
  ));

  return (
    !isLoading && (
      <div className='shop'>
        <aside className='shop-sidebar'>
          <h3 className='filters'>Filter Items</h3>
          <div className='filter-price'>
            <span className='filter-price-label'>By price</span>
            <RangeSlider
              onChange={handlePriceChange}
              minMaxPrice={minMaxPrice}
            />
          </div>
          <div className='filter-category'>
            <span className='filter-category-label'>By category</span>
            <ul className='filter-category-list'>{renderCategoryItem}</ul>
          </div>
        </aside>
        <ItemList limit={productLimit} />
      </div>
    )
  );
};

export default withLoading(Shop);
