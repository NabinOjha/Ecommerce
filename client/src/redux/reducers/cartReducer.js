const INITIAL_STATE = {
  user: null,
  products: [],
  order: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TO_CART_SUCCESS':
      return { ...state, ...action.payload };
    case 'GET_CART_SUCCESS':
      return { ...state, ...action.payload };
    case 'DELETE_FROM_CART_SUCCESS':
      return {
        ...state,
        products: state.filter((item) => item._id !== action.payload),
      };
    case 'CLEAR_USER_CART':
      return { ...state, products: [] };
    case 'UPDATE_QUANTIY_SUCCESS':
      return { userId: action.payload.user, products: action.payload.products };
    case 'FETCH_ORDER_SUCCESS' || 'CREATE_ORDER_SUCCESS':
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
