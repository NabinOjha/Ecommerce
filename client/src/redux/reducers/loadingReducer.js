const INITIAL_STATE = {};

const getActionName = (actionType) => {
  if (typeof actionType !== 'string') {
    return null;
  }
  return actionType.split('_').slice(0, -1).join('_');
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  const actionName = getActionName(action.type);
  if (type.endsWith('_REQUEST')) {
    return {
      ...state,
      [actionName]: {
        loading: true,
      },
    };
  } else if (type.endsWith('_SUCCESS') || type.endsWith('_ERROR')) {
    return {
      ...state,
      [actionName]: {
        loading: false,
      },
    };
  } else {
    return state;
  }
};

export default loadingReducer;
