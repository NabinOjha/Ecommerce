import FETCH from './../../util/Fetch';
import history from './../../util/history';

const factoryFunction = (fn) => {
  return async (dispatch) => {
    await fn(dispatch).catch((err) => {
      console.log(err.response);
    });
  };
};

const requestActionType = (prefix) => {
  return `${prefix}_REQUEST`;
};

const successActionType = (prefix) => {
  return `${prefix}_SUCCESS`;
};

const setLocalStorageToken = () => {
  localStorage.setItem('authenticated', true);
};

const removeLocalStorageItem = () => {
  localStorage.removeItem('authenticated', false);
};

const appendToFormData = (data) => {
  let formData = new FormData();
  for (let key in data) {
    if (key === 'productImages' && data[key].length > 0) {
      data[key].forEach((productImage) => {
        formData.append('productImages', productImage);
      });
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

///////////////////////////
//User actions
//////////////////////////

export const signup = (data) => {
  return factoryFunction(async (dispatch) => {
    const response = await FETCH('/users/signup/email', 'POST', data);
    dispatch({ type: 'SET_CURRENTUSER', payload: response.data.data });
    setLocalStorageToken();
  });
};

export const login = (data) => {
  return factoryFunction(async (dispatch) => {
    const type = 'LOGIN';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/users/login/email', 'POST', data);
    dispatch({ type: successActionType(type), payload: response.data.data });
    history.push('/dashboard');
  });
};

export const getCurrentUser = () => {
  return factoryFunction(async (dispatch) => {
    const type = 'GET_CURRENTUSER';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/users/currentUser');
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const logout = () => {
  return factoryFunction(async (dispatch) => {
    await FETCH('/users/logout');
    dispatch({ type: 'LOGOUT' });
    removeLocalStorageItem();
    history.push('/');
  });
};

////////////////////////
//Prooduct actions
/////////////////////////

export const createProduct = (data) => {
  return factoryFunction(async (dispatch) => {
    const formAppendedData = appendToFormData(data);
    const type = 'CREATE_PRODUCT';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/products', 'POST', formAppendedData);

    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const getProduct = (id) => {
  return factoryFunction(async (dispatch) => {
    const type = 'GET_PRODUCT';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH(`/products/${id}`);
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const editProduct = (data, id) => {
  return factoryFunction(async (dispatch) => {
    const type = 'EDIT_PRODUCT';
    dispatch({ type: requestActionType(type) });
    const formAppendedData = appendToFormData(data);
    const response = await FETCH(`/products/${id}`, 'PUT', formAppendedData);
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const getProducts = (page, limit, filter = {}) => {
  return factoryFunction(async (dispatch) => {
    const type = 'GET_PRODUCTS';

    let reqUrl = `/products/?page=${page}&limit=${limit}`;

    for (let [key, value] of Object.entries(filter)) {
      if (key === 'category') {
        reqUrl = reqUrl.concat(`&category=${value}`);
      } else if (key === 'price') {
        if (value.lte === value.gte) {
          reqUrl = reqUrl.concat(`&price=${value.lte}`);
        } else {
          reqUrl = reqUrl.concat(
            `&price[lte]=${value.lte}&price[gte]=${value.gte}`
          );
        }
      }
    }

    dispatch({ type: requestActionType(type) });
    const response = await FETCH(reqUrl);

    dispatch({
      type: successActionType(type),
      payload: { data: response.data.data, count: response.data.docCount },
    });
    return response;
  });
};

export const deleteProduct = (id, remainingProducts) => {
  return factoryFunction(async (dispatch) => {
    const type = 'DELETE_PRODUCT';
    if (remainingProducts > 1) {
      dispatch({ type: requestActionType(type) });
    }
    await FETCH(`/products/${id}`, 'DELETE');
    dispatch({ type: successActionType(type), payload: id });
  });
};

export const getMinMaxPrice = () => {
  return factoryFunction(async (dispatch) => {
    const type = 'MAX_PRICE';

    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/products/price');
    dispatch({ type: successActionType(type), payload: response.data.data[0] });
  });
};

////////////////////////
//Category Actions
/////////////////////////

export const createCategory = (data) => {
  return factoryFunction(async (dispatch) => {
    const appendedData = appendToFormData(data);
    const type = 'CREATE_CATEGORY';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/category', 'POST', appendedData);
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const getCategories = () => {
  return factoryFunction(async (dispatch) => {
    const type = 'GET_CATEGORIES';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/category');
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

/////////////////////
////Rating Actions
////////////////////

export const createRating = (data) => {
  return factoryFunction(async (dispatch) => {
    const type = 'CREATE_RATING';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/ratings', 'POST', data);
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

//////////////////////////
///Comment Actions
/////////////////////////

export const createComment = (comment, prodId) => {
  return factoryFunction(async (dispatch) => {
    const type = 'CREATE_COMMENT';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH(`/comments/${prodId}`, 'POST', { comment });

    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const getComments = (prodId) => {
  return factoryFunction(async (dispatch) => {
    const type = 'GET_COMMENTS';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH(`/comments/${prodId}`);
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

///////////////////////
////Cart Action
//////////////////////

export const addToCart = (prodId) => {
  return factoryFunction(async (dispatch) => {
    const type = 'ADD_TO_CART';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH('/cart', 'POST', { prodId });
    console.log(response.data.data);
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const getCart = () => {
  return factoryFunction(async (dispatch) => {
    const type = 'GET_CART';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH(`/cart/`);
    if (response.data.data) {
      dispatch({ type: successActionType(type), payload: response.data.data });
    }
  });
};

export const updateProductQuantity = (prodId, value) => {
  return factoryFunction(async (dispatch) => {
    const type = 'UPDATE_QUANTIY';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH(`/cart/${prodId}`, 'PATCH', { value });
    dispatch({ type: successActionType(type), payload: response.data.data });
  });
};

export const deleteFromCart = (prodId, userId) => {
  return factoryFunction(async (dispatch) => {
    const type = 'DELETE_FROM_CART';
    dispatch({ type: requestActionType(type) });
    await FETCH(`/cart/${prodId}`, 'DELETE');
    dispatch({ type: successActionType(type), payload: userId });
  });
};

export const createOrder = (data) => {
  return factoryFunction(async (dispatch) => {
    const type = 'CREATE_ORDER';
    dispatch({ type: requestActionType(type) });
    await FETCH(`/orders`, 'POST', data);
    return;
  });
};

export const getMyOrders = (userId) => {
  return factoryFunction(async (dispatch) => {
    const type = 'FETCH_ORDER';
    dispatch({ type: requestActionType(type) });
    const response = await FETCH(`/orders/${userId}`);
    console.log(response);
    dispatch({ type: successActionType, data: response.data.data });
  });
};
