import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from './../../redux/actions/action';

import {
  selectProductsCount,
  selectCurrentFilter,
} from './../../redux/selectors/productSelector';

import './Pagination.scss';

const Pagination = ({ limit }) => {
  const dispatch = useDispatch();

  const docsCount = useSelector(selectProductsCount);
  const currentFilter = useSelector(selectCurrentFilter);

  const handlePrevious = () => {
    if (docsCount.page > 1) {
      dispatch(getProducts(docsCount.page - 1, limit, currentFilter)).then(
        () => {
          dispatch({ type: 'PAGE', payload: docsCount.page - 1 });
        }
      );
    }
  };

  const handleNext = () => {
    if (docsCount.page * limit < docsCount.count) {
      dispatch(getProducts(docsCount.page + 1, limit, currentFilter)).then(
        () => {
          dispatch({ type: 'PAGE', payload: docsCount.page + 1 });
        }
      );
    } else {
      dispatch({ type: 'PAGE', payload: 1 });
    }
  };

  const handlePageClick = (pageNumber) => {
    dispatch(getProducts(pageNumber, limit, currentFilter)).then(() => {
      dispatch({ type: 'PAGE', payload: pageNumber });
    });
  };

  const renderPageNumber = () => {
    const pageNumberArray = [];
    const remainder = docsCount % limit;

    const maxPageNumer =
      remainder !== 0
        ? Math.ceil(docsCount.count / limit)
        : docsCount.count / limit;

    for (let i = 0; i <= maxPageNumer - 1; i++) {
      pageNumberArray.push(
        <td
          className={`paginate__data ${
            docsCount.page === i + 1 ? 'active' : ''
          }`}
          key={i}
          onClick={() => handlePageClick(i + 1)}
        >
          {i + 1}
        </td>
      );
    }
    return pageNumberArray;
  };

  return (
    <div className='paginate'>
      {docsCount.count > 0 && (
        <button
          className='paginate__btn paginate__btn--prev'
          onClick={handlePrevious}
          disabled={docsCount.page <= 1}
        >
          Prev
        </button>
      )}
      <table className='paginate__pages'>
        <tbody className='paginate__nums'>
          <tr className='paginate__row'>
            {docsCount ? renderPageNumber() : null}
          </tr>
        </tbody>
      </table>
      {docsCount.count > 0 && (
        <button
          className='paginate__btn paginate__btn--next'
          onClick={handleNext}
          disabled={docsCount.page * limit >= docsCount.count}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
