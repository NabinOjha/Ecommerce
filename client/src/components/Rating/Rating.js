import React, { useEffect, useState } from 'react';

import Rating from 'react-rating';
import { MdStar } from 'react-icons/md';

const RatingComponent = ({
  readOnly,
  initialRating,
  initialFill,
  handleRating,
}) => {
  const [ratingChange, setRatingChange] = useState(0);
  const [rating, setRating] = useState(initialRating);
  const emptySymbolFill = initialFill || '#fff';

  const handleRatingChange = (value) => {
    setRating(value);
    handleRating(value);
  };
  const handleRatingHover = (value) => {
    setRatingChange(value / 10);
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <>
      <Rating
        start={0}
        stop={50}
        step={10}
        fractions={10}
        readonly={readOnly}
        initialRating={rating}
        onChange={handleRatingChange}
        onHover={handleRatingHover}
        emptySymbol={
          <MdStar style={{ fill: emptySymbolFill, fontSize: '1.3rem' }} />
        }
        fullSymbol={<MdStar style={{ fill: '#FFC48C', fontSize: '1.3rem' }} />}
      />
      <span
        className='rating-num'
        style={{
          display: 'inline-block',
          padding: '.3rem .5rem',
          width: '1rem',
          fontSize: '.8rem',
          marginBottom: '.1rem',
        }}
      >
        {!readOnly && (ratingChange || rating / 10)}
      </span>
    </>
  );
};

export default RatingComponent;
