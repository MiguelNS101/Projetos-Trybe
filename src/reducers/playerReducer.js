import { ADD_USER, ADD_SCORE, ADD_ASSERTOS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  case ADD_ASSERTOS:
    return {
      ...state,
      assertions: state.assertions + action.assertions,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default playerReducer;
