import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './ProductDetails.scss';

import history from './../../util/history';
import {
  deleteProduct,
  getProduct,
  createRating,
  createComment,
  getComments,
} from '../../redux/actions/action';
import { selectCurrentProductLoading } from '../../redux/selectors/loadingSelector';
import { selectCurrentProduct } from '../../redux/selectors/productSelector';
import { selectComments } from '../../redux/selectors/commentSelector';

import Rating from './../Rating/Rating';
import withLoading from './../../util/LoadingHOC';
import { addToCart } from './../../redux/actions/action';

const ProductDetails = ({ setLoadingState, isLoading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(0);
  const [activeImageIndex, setactiveImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [animationClassState, setAnimationClassState] = useState('');

  const { prodId } = useParams();
  const dispatch = useDispatch();

  const currentProduct = useSelector(selectCurrentProduct);

  let { loading } = useSelector((state) =>
    selectCurrentProductLoading(state, { loading: true })
  );

  const productComments = useSelector(selectComments);

  useEffect(() => {
    // dispatch(getComments(prodId));
    dispatch(getProduct(prodId));
  }, [dispatch, prodId]);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading, setLoadingState]);

  const handleRatingValue = (value) => {
    setRating(value);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    dispatch(createRating({ rating, prodId }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(comment, prodId));
  };

  const renderComments = () => {
    return (
      productComments.length > 0 &&
      productComments.map((comment, index) => {
        return (
          <li className='product-comments__item' key={index}>
            <span className='product-comments__username'>
              {comment.user.username}
            </span>
            <p className='product-comments__comment'>{comment.value}</p>
          </li>
        );
      })
    );
  };

  const renderDescription = () => {
    return (
      <div
        className='product-details__value'
        dangerouslySetInnerHTML={{ __html: currentProduct.description }}
      />
    );
  };

  const setAnimationClass = () => {
    if (prevImageIndex === null) {
      setAnimationClassState('product-images__banner--right');
    } else if (prevImageIndex > activeImageIndex) {
      setAnimationClassState('product-images__banner--right');
    } else if (prevImageIndex < activeImageIndex) {
      setAnimationClassState('product-images__banner--left');
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(prodId));
  };

  const renderProductImages = () => {
    return (
      currentProduct &&
      currentProduct.productImages.map((prodImage, index) => {
        return (
          <li
            className='product-images__item'
            key={index}
            onClick={() => {
              setactiveImageIndex(index);
              setPrevImageIndex(activeImageIndex);
              setAnimationClass();
            }}
          >
            <img
              className={`product-images__image ${
                activeImageIndex === index
                  ? 'product-images__image--active'
                  : null
              } `}
              src={currentProduct && `http://localhost:5000/image/${prodImage}`}
              alt='prodImage'
            />
          </li>
        );
      })
    );
  };

  return (
    !isLoading &&
    currentProduct && (
      <div className='product '>
        <div className='product-images__main'>
          <img
            className={`product-images__banner ${animationClassState}`}
            src={
              currentProduct &&
              `http://localhost:5000/image/${currentProduct.productImages[activeImageIndex]}`
            }
            alt='banner'
          />
        </div>
        <ul className='product-images__list'>{renderProductImages()}</ul>
        <div className='product-details'>
          <h3 className='product-details__name'> HP Laptop</h3>
          <div className='product-details__item'>
            <span className='product-details__title'>Rating</span>
            <p className='product-details__value'>
              <Rating
                readOnly={true}
                initialRating={currentProduct.avgRating}
              />
            </p>
          </div>
          <div className='product-details__item'>
            <span className='product-details__title'>Price</span>
            <p className='product-details__value'>Rs:{currentProduct.price}</p>
          </div>
          <div className='product-details__item'>
            <span className='product-details__title'>Catgory</span>
            <p className='product-details__value'>{currentProduct.category}</p>
          </div>
          <div className='product-details__item'>
            <span className='product-details__title'>Description</span>
            {renderDescription()}
          </div>
          <div className='product-actions'>
            <button
              className='product-actions__cart'
              onClick={() => handleAddToCart(currentProduct._id)}
            >
              Add to cart
            </button>
            <button
              className='product-actions__edit'
              onClick={() =>
                history.push('/dashboard', {
                  prodId,
                  activeContent: 'Edit-product',
                })
              }
            >
              Edit
            </button>
            <button
              className='product-actions__delete'
              onClick={() =>
                dispatch(deleteProduct(prodId)).then(() => {
                  history.push('/dashboard');
                })
              }
            >
              Delete
            </button>
          </div>
        </div>

        <div className='product-comments'>
          <h4 className='product-comments__add'>Add rating</h4>
          <form
            className='product-comments__form'
            onSubmit={handleRatingSubmit}
          >
            <Rating
              initialRating={0}
              initialFill='#ddd'
              handleRating={handleRatingValue}
            />
            <button className='product-comments__submit product-comments__submit--rating'>
              Rate
            </button>
          </form>
          <h4 className='product-comments__add'>Add comment</h4>

          <form
            className='product-comments__form'
            onSubmit={handleCommentSubmit}
          >
            <input
              className='product-comments__input'
              placeholder='Add a comment here!'
              onChange={(e) => setComment(e.target.value)}
            />
            <button className='product-comments__submit'>Add</button>
          </form>
          <ul className='product-comments__list'>{renderComments()}</ul>
        </div>
      </div>
    )
  );
};

export default withLoading(ProductDetails);
