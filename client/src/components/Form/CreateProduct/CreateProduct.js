import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './CreateProduct.scss';

import Form from '../Form';
import Input from '../../Input/Input';
import withLoading from '../../../util/LoadingHOC';
import DropZone from './../../DropZone/DropZone';
import ReactQuill from './../../QuillEditor/QuillEditor';
import useForm from '../../../hooks/form-hook';
import { REQUIRE } from '../../../util/validator';
import {
  createProduct,
  getCategories,
  editProduct,
  getProduct,
} from './../../../redux/actions/action';
import { selectCategory } from './../../../redux/selectors/categroySelector';
import { selectCurrentProduct } from './../../../redux/selectors/productSelector';
import { selectCurrentProductLoading } from '../../../redux/selectors/loadingSelector';

const CreateProduct = ({ id, setContent, setLoadingState, isLoading }) => {
  const [editorValue, setEditorValue] = useState('');
  const [selectValue, setSelectValue] = useState(null);
  const [productBanner, setProductBanner] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);
  const currentProduct = useSelector(selectCurrentProduct);

  const { loading } = useSelector((state) =>
    selectCurrentProductLoading(state, { loading: null })
  );

  const memoizedInitialValues = useMemo(
    () => ({
      name: {
        value: '',
        isValid: false,
        validationInput: [REQUIRE()],
      },
      price: {
        value: '',
        isValid: false,
        validationInput: [REQUIRE()],
      },
      description: {
        value: '',
        isValid: false,
        validationInput: [REQUIRE()],
      },
    }),
    []
  );

  const onSubmit = (values) => {
    const productValues = {
      name: values.name.value,
      price: values.price.value,
      category: selectValue,
      description: editorValue,
      image: productBanner[0],
      productImages: productImages,
    };

    if (id && currentProduct) {
      dispatch(editProduct(productValues, id)).then(() => {
        resetValues(memoizedInitialValues);
        setContent('ProductTable');
      });
    } else {
      dispatch(createProduct(productValues)).then(() => {
        resetValues(memoizedInitialValues);
        setContent('ProductTable');
      });
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    resetValues,
  } = useForm({ memoizedInitialValues, onSubmit });

  useEffect(() => {
    if (currentProduct && id) {
      resetValues({
        name: {
          value: currentProduct.name,
          isValid: true,
          validationInput: [REQUIRE()],
        },
        price: {
          value: currentProduct.price,
          isValid: true,
          validationInput: [REQUIRE()],
        },
      });

      setProductImages(currentProduct.productImages);
      setProductBanner([currentProduct.image]);
      setEditorValue(currentProduct.description);
      setSelectValue(currentProduct.category);
    }
  }, [currentProduct, id, resetValues]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    } else {
      setContent('Create-Product');
      resetValues(memoizedInitialValues);
      setEditorValue('');
      setSelectValue(null);
      setProductBanner([]);
      setProductImages([])
    }
  }, [id, dispatch, setContent, memoizedInitialValues, resetValues]);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading, setLoadingState]);

  const handleChangeSelect = (value) => {
    setSelectValue(value.value);
  };

  const isValid =
    values.name.isValid && values.price.isValid && editorValue && selectValue && productBanner.length>0;

  const requiredLabel =(label)=>{
    return <span style={{position: "relative"}}>
              {label}
              <sub style={
                {display: "inline-block",
                 position:" absolute",
                 right: "-1rem",
                 top: "20%",
                 paddingBottom: "1px", color: "red"}
                }
              >
                *
              </sub>
            </span>
  }

  return (
    !isLoading && (
      <Form
        headerText={`${id ? 'Edit Product' : 'Create Product'}`}
        headerClass='linear-header'
        buttonText='Submit'
        handleSubmit={handleSubmit}
        buttondisable={isValid}
        containerClass='no-background'
        formStyle={{ width: '80%', paddingBottom: '2rem' }}
      >
        <Input
          label={requiredLabel('Name')}
          type='text'
          id='name'
          placeholder='Name'
          inputChangeHandler={handleChange}
          onBlur={handleBlur}
          errorText='Please provide a name!'
          values={values}
        />

        <Input
          label={requiredLabel('Price')}
          type='number'
          id='price'
          placeholder='Price'
          inputChangeHandler={handleChange}
          onBlur={handleBlur}
          errorText='Please provide a Price!'
          values={values}
        />
        <Input
          label={requiredLabel('Category')}
          type='select'
          id='category'
          placeholder='Select category'
          inputChangeHandler={handleChangeSelect}
          options={categories}
          onBlur={handleBlur}
          initialSelectValue={{
            value: selectValue,
            label: selectValue,
          }}
          errorText='Please provide a category!'
        />
        <ReactQuill
          handleChange={setEditorValue}
          placeholder='Description'
          id='description'
          value={editorValue}
          label={requiredLabel("Description")}
        />
        <DropZone
          label={requiredLabel('Product Banner')}
          setImages={setProductBanner}
          currentImages={productBanner}
          multiple={false}
          required={true}
         
        />
        <DropZone
          label='Product Images'
          setImages={setProductImages}
          currentImages={productImages}
          multiple={true}
        />
      </Form>
    )
  );
};

export default withLoading(CreateProduct);
