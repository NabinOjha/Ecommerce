import React from 'react';
import { useDispatch } from 'react-redux';

import './Login.scss';

import Form from './../../components/Form/Form';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/form-hook';
import { REQUIRE, ISEMAIL } from '../../util/validator';
import { login } from './../../redux/actions/action';

const Login = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: {
      value: '',
      validationInput: [ISEMAIL()],
      isValid: false,
    },
    password: {
      value: '',
      validationInput: [REQUIRE()],
      isValid: false,
    },
  };

  const onSubmit = (values) => {
    const data = {};
    data.email = values.email.value;
    data.password = values.password.value;
    dispatch(login(data));
    resetValues(initialValues);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    resetValues,
  } = useForm({
    initialValues,
    onSubmit,
  });

  const formValid = values.email.isValid && values.password.isValid;
  return (
    <Form
      headerText='Login'
      buttonText='Login'
      handleSubmit={handleSubmit}
      buttondisable={formValid}
    >
      <Input
        id='email'
        type='email'
        placeholder='Email'
        label='Email'
        values={values}
        inputChangeHandler={handleChange}
        onBlur={handleBlur}
        errorText='Please provide an valid email!'
      />
      <Input
        id='password'
        type='password'
        placeholder='password'
        label='Password'
        values={values}
        inputChangeHandler={handleChange}
        onBlur={handleBlur}
        errorText='Please provide a password!'
      />
    </Form>
  );
};

export default Login;
