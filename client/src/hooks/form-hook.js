import { useReducer, useCallback } from 'react';
import { validate } from '../util/validator';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'TOUCH':
      return {
        ...state,
        [action.payload]: { ...state[action.payload], touched: true },
      };
    case 'CHANGE':
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          value: action.payload.value,
          isValid: validate(action.payload.value, action.payload.validators),
        },
      };

    case 'RESET':
      return { ...action.payload };
    default:
      return state;
  }
};

const useForm = ({ memoizedInitialValues, initialValues, onSubmit }) => {
  const [values, dispatch] = useReducer(
    formReducer,
    memoizedInitialValues || initialValues
  );

  const handleChange = useCallback(
    (e) => {
      dispatch({
        type: 'CHANGE',
        payload: {
          name: e.target.name,
          value: e.target.files ? e.target.files[0] : e.target.value,
          validators: values[e.target.name].validationInput
            ? values[e.target.name].validationInput
            : null,
        },
      });
    },
    [values]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleBlur = useCallback((e) => {
    dispatch({ type: 'TOUCH', payload: e.target.name });
  }, []);

  const resetValues = useCallback((values) => {
    dispatch({ type: 'RESET', payload: values });
  }, []);

  return { values, handleChange, handleSubmit, handleBlur, resetValues };
};

export default useForm;
