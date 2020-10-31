import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { FaFacebook, FaGoogle } from 'react-icons/fa';

import './Signup.scss';

import Form from './../../components/Form/Form';
import Input from './../../components/Input/Input';
import useForm from '../../hooks/form-hook';
import { REQUIRE, MINLENGTH, ISEMAIL } from '../../util/validator';
import authContext from './../../context/auth';
import { signup } from './../../redux/actions/action';

const Signup = () => {
  const auth = useContext(authContext);
  const dispatch = useDispatch();

  const initialFormValues = {
    username: {
      value: '',
      validationInput: [REQUIRE()],
      isValid: false,
    },
    email: {
      value: '',
      validationInput: [ISEMAIL()],
      isValid: false,
    },
    password: {
      value: '',
      validationInput: [MINLENGTH(6)],
      isValid: false,
    },
    confirmPassword: {
      value: '',
      validationInput: [MINLENGTH(6)],
      isValid: false,
    },
  };

  const onSubmit = (values) => {
    const userData = {
      username: values.username.value,
      email: values.email.value,
      password: values.password.value,
      confirmPassword: values.confirmPassword.value,
    };
    dispatch(signup(userData));
    auth.login(userData);
    resetValues(initialFormValues);
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    resetValues,
  } = useForm({
    initialValues: initialFormValues,
    onSubmit,
  });

  const formValid =
    values.username.isValid &&
    values.email.isValid &&
    values.password.isValid &&
    values.confirmPassword.isValid;

  const socialMedia = (
    <div className='socials-container'>
      <a
        className='google-signup'
        href='http://localhost:5000/api/v1/users/signup/google'
      >
        <FaGoogle />
        <small>Signup with google</small>
      </a>

      <a
        className='fb-signup'
        href='http://localhost:5000/api/v1/users/signup/facebook'
      >
        <FaFacebook />
        <small>Signup with Facebook</small>
      </a>
    </div>
  );

  return (
    <React.Fragment>
      <Form
        headerText='Signup'
        buttonText='Signup'
        handleSubmit={handleSubmit}
        buttondisable={formValid}
        socialMedia={socialMedia}
      >
        <Input
          id='username'
          placeholder='Username'
          type='text'
          label='Username'
          inputChangeHandler={handleChange}
          onBlur={handleBlur}
          errorText='Please provide a valid username!'
          values={values}
        />
        <Input
          id='email'
          placeholder='Email'
          type='text'
          label='Email'
          inputChangeHandler={handleChange}
          onBlur={handleBlur}
          errorText='Please provide an valid email!'
          values={values}
        />
        <Input
          id='password'
          placeholder='Password'
          type='password'
          label='Password'
          inputChangeHandler={handleChange}
          onBlur={handleBlur}
          errorText='Please provide a valid password with length larger than 6 characters!'
          values={values}
        />
        <Input
          id='confirmPassword'
          placeholder='Confirm password'
          type='password'
          label='Confirm password'
          inputChangeHandler={handleChange}
          onBlur={handleBlur}
          errorText='Please provide a valid password with length larger than 6 characters!'
          values={values}
        />
      </Form>
    </React.Fragment>
  );
};

export default Signup;
