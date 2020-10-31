const INITIAL_STATE = [];

const ratingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_RATING_SUCCESS':
      return [...state, action.payload];

    default:
      return state;
  }
};

export default ratingReducer;
