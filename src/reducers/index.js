import { combineReducers } from 'redux';
import triviaReducer from './triviaReducer';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';

/**
 * Store do Redux:
 *
 * store: {
 *   player: { name: '', assertions: '', score: 0, gravatarEmail: '' },
 *   token: '',
 *   trivia: { }
 * }
 *
 * localStorage:
 *   ranking: { name: '', score: 0, picture: '' },
 */

const rootReducer = combineReducers({
  player: playerReducer,
  trivia: triviaReducer,
  token: tokenReducer,
});

export default rootReducer;
