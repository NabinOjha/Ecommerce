import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './HomePage.scss';

import { getCategories, getProducts } from './../../redux/actions/action';
import { selectHomePageLoading } from '../../redux/selectors/loadingSelector';

import withLoading from './../../util/LoadingHOC';
import Banner from '../../components/Banner/Banner';
import Featured from './../../components/Featured/Featured';
import CategorySection from './../../components/CategoryList/CategorySection';
import { selectProducts } from '../../redux/selectors/productSelector';

const HomePage = (props) => {
  const { setLoadingState, isLoading } = props;

  const dispatch = useDispatch();

  const { loading } = useSelector(selectHomePageLoading);
  const { products } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading, setLoadingState]);

  return (
    !isLoading && (
      <div className='homepage'>
        <Banner />
        <Featured products={products} />
        <CategorySection />
      </div>
    )
  );
};

export default withLoading(HomePage);
