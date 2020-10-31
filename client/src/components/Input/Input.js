import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import colourStyles from './selectStyles';

import './Input.scss';

const Input = ({
  label,
  type,
  id,
  placeholder,
  inputChangeHandler,
  onBlur,
  errorText,
  options,
  values,
  initialSelectValue,
  required,
}) => {
  const error = values ? !values[id].isValid && values[id].touched : '';

  const [selectValue, setSelectValue] = useState(null);
  const [selectTouched, setSelectTouched] = useState(false);
  const [selectError, setSelectError] = useState('');

  useEffect(() => {
    if (!selectValue && selectTouched) {
      setSelectError('Please select a category');
    } else {
      setSelectError('');
    }
  }, [selectValue, selectTouched, selectError]);

  const handleChange = (value) => {
    setSelectValue(value);
    inputChangeHandler(value);
  };

  const renderInputField = () => {
    if (type === 'select') {
      return (
        <Select
          value={
            initialSelectValue && initialSelectValue.value
              ? initialSelectValue
              : selectValue
          }
          defaultValue='Select category'
          label='Select category'
          onChange={handleChange}
          options={options}
          onBlur={() => setSelectTouched(true)}
          styles={colourStyles}
        />
      );
    } else {
      return (
        <input
          type={type}
          className='form-input'
          id={id}
          name={id}
          placeholder={placeholder}
          onChange={inputChangeHandler}
          onBlur={onBlur}
          value={values[id].value}
          required={required}
        />
      );
    }
  };

  return (
    <div
      className={`form-control ${
        error || (selectError && !initialSelectValue) ? 'error' : ''
      }`}
    >
      <label htmlFor='form-input'>{label}</label>
      {renderInputField()}
      {error ? <span className='error-text'>{errorText}</span> : null}
      {selectError && !initialSelectValue ? (
        <span className='error-text'>{selectError}</span>
      ) : null}
    </div>
  );
};

export default Input;
