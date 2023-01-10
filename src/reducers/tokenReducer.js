const INITIAL_TOKEN_STATE = '';

function tokenReducer(state = INITIAL_TOKEN_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API_TOKEN':
    return state;
  case 'GET_API_TOKEN':
    localStorage.setItem('token', action.payload.token);
    return action.payload.token;
  // case 'FAILED_REQUEST_TOKEN':
  //   return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default tokenReducer;
