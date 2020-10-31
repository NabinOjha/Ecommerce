const INITIAL_STATE = {
  currentUser: null,
  users: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CURRENTUSER_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
