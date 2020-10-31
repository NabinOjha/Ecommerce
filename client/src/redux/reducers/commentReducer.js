const INITIAL_STATE = [];

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_COMMENT_SUCCESS':
      return [...state, action.payload];
    case 'GET_COMMENTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default commentReducer;
