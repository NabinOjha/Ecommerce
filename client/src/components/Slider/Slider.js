import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { GoArrowSmallRight, GoArrowSmallLeft } from 'react-icons/go';

import history from './../../util/history';
import { selectProducts } from './../../redux/selectors/productSelector';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slider.scss';

import Item from './../Item/Item';

function LeftArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GoArrowSmallLeft
      className={className}
      onClick={onClick}
      style={{
        ...style,
        height: '3rem',
        width: '3rem',
        fill: '#130f40',
        display: 'block',
        marginRight: '2rem',
        paddingRight: '2rem',
      }}
    />
  );
}

function RightArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GoArrowSmallRight
      className={className}
      onClick={onClick}
      style={{
        ...style,
        height: '3rem',
        width: '3rem',
        fill: '#130f40',
        paddingLeft: '2rem',
      }}
    />
  );
}

const SliderComponent = () => {
  const products = useSelector(selectProducts);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: products.products.length < 3 ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderSlides = () => {
    return products.products.map((item, index) => {
      return (
        <div
          className='item'
          key={index}
          onClick={() => history.push(`/products/${item._id}`)}
        >
          <Item item={item} />
        </div>
      );
    });
  };
  return (
    <Slider
      {...settings}
      style={{ width: '90vw', margin: '0  auto', padding: '1rem 0' }}
    >
      {renderSlides()}
    </Slider>
  );
};

export default SliderComponent;
