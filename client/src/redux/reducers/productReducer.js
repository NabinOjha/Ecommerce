const INITIAL_STATE = {
  products: [],
  currentProduct: null,
  minMaxPrice: {},
  filter: {},
  count: 0,
  page: 1,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT_SUCCESS':
      return {
        ...state,
        count: ++state.count,
        products: [action.payload, ...state.products],
      };
    case 'GET_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: [...action.payload.data],
        count: action.payload.count,
      };
    case 'GET_PRODUCT_SUCCESS':
      return {
        ...state,
        currentProduct: action.payload,
      };
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        count: --state.count,
        products: state.products.filter((prod) => prod._id !== action.payload),
      };

    case 'MAX_PRICE_SUCCESS':
      return {
        ...state,
        minMaxPrice: action.payload,
      };
    case 'CLEAR_PRODUCTS':
      return {
        ...state,
        products: [],
      };

    case 'PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'CURRENT_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    case 'REMOVE_CURRENT_FILTER':
      return {
        ...state,
        filter: {},
      };
    case 'CREATE_RATING_SUCCESS':
      return { ...state, currentProduct: action.payload };
    default:
      return state;
  }
};

export default productReducer;
