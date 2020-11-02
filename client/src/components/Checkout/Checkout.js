import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

import './Checkout.scss';

import Form from './../Form/Form';
import Input from './../Input/Input';
import { ISEMAIL, REQUIRE } from './../../util/validator';
import useForm from '../../hooks/form-hook';
import { getCart } from './../../redux/actions/action';
import selectCart from './../../redux/selectors/cartSelector';
import extractSubmitData from './../../util/extractSubmitData';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Checkout = () => {
  const dispatch = useDispatch();
  const [paymentMethod, setpaymentMethod] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { cart, totalPrice } = useSelector(selectCart);

  const initialValues = {
    email: {
      value: '',
      validationInput: [ISEMAIL()],
      isValid: false,
    },
    shipping_country: {
      value: '',
      validationInput: [REQUIRE()],
      isValid: false,
    },

    shipping_city: {
      value: '',
      validationInput: [REQUIRE()],
      isValid: false,
    },
    shipping_street: {
      value: '',
      validationInput: [REQUIRE()],
      isValid: false,
    },
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const onSubmit = async (values) => {
    const dataToSubmit = extractSubmitData(values);

    localStorage.setItem('shippingData', JSON.stringify(dataToSubmit));

    switch (paymentMethod) {
      // case 'ESEWA':
      //   return dispatch(handleEsewaPayment(dataToSubmit));

      case 'STRIPE':
        setPaymentLoading(true);
        const response = await fetch('/cart/create-checkout-session', {
          method: 'POST',
        });
        const responseData = await response.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: responseData.data });
        setPaymentLoading(false);
        resetValues(initialValues);
        break;
      default:
        return;
    }
  };
  const {
    handleBlur,
    handleChange,
    values,
    resetValues,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit,
  });

  const isValid =
    values.email.isValid &&
    values.shipping_country.isValid &&
    values.shipping_city.isValid &&
    values.shipping_street.isValid;

  const prependLabel = (label, value, className) => {
    return (
      <div className={`${className}`}>
        <span className='checkout__label'>{label}:</span>
        <span className='checkout__value'>{value}</span>
      </div>
    );
  };

  console.log(cart);

  const cartItems = cart.map((item, index) => (
    <li className='cartItem' key={index}>
      <img
        className='cartItem__image'
        alt='cartItem'
        src={`http://localhost:5000/image/${item.image}`}
      />
      <div className='cartItem__details'>
        {prependLabel('Name', `${item.name}`, ' cartItem__name')}
        {prependLabel('Quantity', item.itemQuantity, 'cartItem__quantity')}
        {prependLabel('Price', `Rs.${item.price}`, 'cartItem__price')}
        {prependLabel('Total', `Rs.${item.total}`, 'cartItem__total')}
      </div>
    </li>
  ));

  const buttons = (
    <>
      <button
        className={`button ${
          !isValid ? 'disabled' : ''
        } transac-btn transac-btn--esewa`}
        disabled={!isValid}
        onClick={() => setpaymentMethod('ESEWA')}
      >
        Purchase with esewa
      </button>
      <button
        className={`button ${
          !isValid ? 'disabled' : ''
        } transac-btn transac-btn--stripe`}
        disabled={!isValid}
        onClick={() => setpaymentMethod('STRIPE')}
      >
        Purchase with stripe
      </button>
    </>
  );

  if (!paymentLoading) {
    return (
      <div className='checkout'>
        <h3 className='checkout__title'>Checkout</h3>
        <div className='checkout__form'>
          <Form
            formStyle={{ width: '100%', background: 'transparent' }}
            containerClass='checkout-no-background'
            button={buttons}
            headerClass='checkout__title--form'
            headerText='Shipping Details'
            handleSubmit={handleSubmit}
          >
            <Input
              id='email'
              placeholder='Email'
              type='email'
              label='Email'
              inputChangeHandler={handleChange}
              onBlur={handleBlur}
              errorText='Please provide a valid email!'
              values={values}
            />
            <Input
              id='shipping_country'
              placeholder='Country'
              type='text'
              label='Country'
              inputChangeHandler={handleChange}
              onBlur={handleBlur}
              errorText='Please provide a valid country!'
              values={values}
            />
            <Input
              id='shipping_city'
              placeholder='City'
              type='text'
              label='City'
              inputChangeHandler={handleChange}
              onBlur={handleBlur}
              errorText='Please provide a valid city!'
              values={values}
            />
            <Input
              id='shipping_street'
              placeholder='Street Address'
              type='text'
              label='Street Address'
              inputChangeHandler={handleChange}
              onBlur={handleBlur}
              errorText='Please provide a valid street!'
              values={values}
            />
          </Form>
        </div>

        <div className='bag'>
          <h3 className='bag__title'>Your Cart</h3>
          <ul className='bag__list'>{cartItems}</ul>
          <div className='total'>
            {prependLabel('Items Cost', `Rs.${totalPrice}`, 'Items cost')}
            {prependLabel('Shipping Cost', 'Rs.5000', 'Shipping cost')}
            {prependLabel('Total', `Rs.${5000 + totalPrice}`, 'Total cost')}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default Checkout;
