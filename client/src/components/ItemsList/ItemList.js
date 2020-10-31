import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ItemList.scss';

import history from './../../util/history';
import { getProducts } from './../../redux/actions/action';
import { selectProducts } from './../../redux/selectors/productSelector';
import { productsLoadingSelector } from './../../redux/selectors/loadingSelector';

import Item from '../Item/Item';
import Pagination from '../Pagination/Pagination';
import withLoading from './../../util/LoadingHOC';

const ItemList = ({ setLoadingState, isLoading, limit }) => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const { loading } = useSelector(productsLoadingSelector);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading, setLoadingState]);

  useEffect(() => {
    dispatch(getProducts(1, limit));
  }, [dispatch, limit]);

  const renderProducts = products.products
    .filter((p, index) => index + 1 <= limit)
    .map((prod, index) => (
      <div
        className='item'
        style={{ width: '20rem' }}
        key={index}
        onClick={() => history.push(`/products/${prod._id}`)}
      >
        <Item item={prod} />
      </div>
    ));

  return (
    !isLoading && (
      <div className='shop-main'>
        {renderProducts}
        <div className='list__pagination'>
          <Pagination limit={limit} />
        </div>
      </div>
    )
  );
};

export default withLoading(ItemList);
