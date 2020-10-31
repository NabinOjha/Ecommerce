const INITIAL_STATE = {
  categories: [],
  currentCategory: null,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: [...action.payload],
      };
    case 'CURRENT_CATEGORY':
      return {
        ...state,
        currentCategory: action.payload,
      };
    case 'REMOVE_CURRENT_CATEGORY':
      return {
        ...state,
        currentCategory: null,
      };
    default:
      return state;
  }
};

export default categoryReducer;
