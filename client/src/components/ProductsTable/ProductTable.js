import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaRegEdit, FaCartPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

import './ProductTable.scss';

import { deleteProduct, getProducts } from './../../redux/actions/action';
import { selectProducts } from './../../redux/selectors/productSelector';
import { productsLoadingSelector } from './../../redux/selectors/loadingSelector';
import Pagination from '../Pagination/Pagination';
import withLoading from './../../util/LoadingHOC';
import history from './../../util/history';

const ProductTable = ({
  setLoadingState,
  isLoading,
  setContent,
  currentUser,
}) => {
  const [productLimit] = useState(5);
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  let { loading } = useSelector(productsLoadingSelector);

  useEffect(() => {
    dispatch(getProducts(1, productLimit));

    return () => {
      dispatch({ type: 'REMOVE_CURRENT_CATEGORY' });
      dispatch({ type: 'CLEAR_PRODUCTS' });
    };
  }, [dispatch, productLimit]);

  useEffect(() => {
    if (products.products.length === 0 && products.count !== 0) {
      dispatch(getProducts(1, productLimit));
    }
    setLoadingState(loading);
  }, [
    dispatch,
    products.count,
    products.products.length,
    setLoadingState,
    loading,
    productLimit,
  ]);

  const handleDelete = (prodId) => {
    dispatch(deleteProduct(prodId));
  };
  const handleEdit = (prodId) => {
    setContent('Edit-product', prodId);
  };

  const handleProductDetails = (prodId) => {
    history.push(`/products/${prodId}`);
  };

  const renderActionHeading = () => {
    return currentUser.role === 'admin' ? (
      <>
        <th className='table-head__col'>Edit</th>
        <th className='table-head__col'>Delete</th>
      </>
    ) : (
      <th className='table-head__col'>Add to cart</th>
    );
  };

  const renderActions = (id) => {
    if (currentUser.role === 'admin') {
      return (
        <>
          <td className='table-body__cell'>
            <FaRegEdit
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(id);
              }}
            />
          </td>
          <td className='table-body__cell'>
            <AiFillDelete
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
            />
          </td>
        </>
      );
    } else {
      return (
        <td className='table-body__cell table-body__cell--cart'>
          <FaCartPlus />
        </td>
      );
    }
  };

  const renderProducts = products.products
    .filter((p, i) => i + 1 <= productLimit)
    .map(({ name, price, category, _id }, index) => (
      <tr
        className='table-body__row'
        key={index}
        onClick={(e) => handleProductDetails(_id)}
      >
        <td className='table-body__cell'>{index + 1}.</td>
        <td className='table-body__cell'>{name}</td>
        <td className='table-body__cell'>{price}</td>
        <td className='table-body__cell'>{category}</td>
        {renderActions(_id)}
      </tr>
    ));

  return (
    !isLoading && (
      <>
        <table className='table'>
          <thead className='table-head'>
            <tr className='table-head__row'>
              <th className='table-head__col'>S.Q.</th>
              <th className='table-head__col'>Name</th>
              <th className='table-head__col'>Price</th>
              <th className='table-head__col'>Category</th>
              {renderActionHeading()}
            </tr>
          </thead>
          <tbody className='table-body'>{renderProducts}</tbody>
        </table>
        <Pagination limit={productLimit} />
      </>
    )
  );
};

export default withLoading(ProductTable);
