import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './CreateCategory.scss';

import Form from '../Form';
import Input from '../../Input/Input';
import useForm from '../../../hooks/form-hook';
import { REQUIRE } from '../../../util/validator';
import { createCategory } from './../../../redux/actions/action';
import ReactQuill from './../../QuillEditor/QuillEditor';
import DropZone from './../../DropZone/DropZone';

const CreateProduct = () => {
  const [editorValue, setEditorValue] = useState('');
  const [categoryImage, setCategoryImage] = useState([]);
  const initialValues = {
    name: {
      value: '',
      isValid: false,
      validationInput: [REQUIRE()],
    },
  };

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = {
      name: values.name.value,
      description: editorValue,
      image: categoryImage[0],
    };
    dispatch(createCategory(data));
    resetValues(initialValues);
    setCategoryImage([]);
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    resetValues,
  } = useForm({ initialValues, onSubmit });

  const isValid =
    values.name.isValid && editorValue && categoryImage.length > 0;

  return (
    <Form
      headerText='Create Category'
      headerClass='linear-header'
      buttonText='Submit'
      handleSubmit={handleSubmit}
      buttondisable={isValid}
      containerClass='no-background'
      formStyle={{ width: '80%', paddingBottom: '2rem' }}
    >
      <Input
        label='Name'
        type='text'
        id='name'
        placeholder='Name'
        inputChangeHandler={handleChange}
        onBlur={handleBlur}
        errorText='Please provide a name!'
        values={values}
      />
      <ReactQuill
        handleChange={setEditorValue}
        placeholder='Description'
        id='description'
        value={editorValue}
      />

      <DropZone
        label='Catgory Image'
        setImages={setCategoryImage}
        currentImages={categoryImage}
        multiple={false}
        required={true}
      />
    </Form>
  );
};

export default CreateProduct;
