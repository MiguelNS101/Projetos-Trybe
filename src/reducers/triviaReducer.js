import { FAILED_REQUEST, RECEIVE_QUESTIONS, REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  response_code: 15,
  results: [],
  error: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      error: '',
      isFetching: false,
      response_code: action.payload.response_code,
      results: action.payload.results,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
      isFetching: false,
      responseCode: 2,
      results: [],
    };

  default:
    return state;
  }
};

export default triviaReducer;
