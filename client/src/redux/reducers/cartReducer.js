const INITIAL_STATE = {
  userId: null,
  products: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TO_CART_SUCCESS':
      return action.payload;
    case 'GET_CART_SUCCESS':
      return action.payload;
    case 'DELETE_FROM_CART_SUCCESS':
      return {
        ...state,
        products: state.filter((item) => item._id !== action.payload),
      };
    case 'UPDATE_QUANTIY_SUCCESS':
      return { userId: action.payload.user, products: action.payload.products };

    default:
      return state;
  }
};

export default cartReducer;
