// Salvar informações do login
export const ADD_USER = 'ADD_USER';
export const ADD_SCORE = 'ADD_SCORE';
export const GET_API_TOKEN = 'GET_API_TOKEN';
export const REQUEST_API_TOKEN = 'REQUEST_API_TOKEN';
export const FAILED_REQUEST_TOKEN = 'FAILED_REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_ASSERTOS = 'ADD_ASSERTOS';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const addAssertos = (assertions) => ({
  type: ADD_ASSERTOS,
  assertions,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const receiveQuestions = (payload) => ({
  type: RECEIVE_QUESTIONS,
  payload,
});

const failedRequestQuestions = (payload) => ({
  type: FAILED_REQUEST,
  payload,
});

export const fetchTriviaQuestions = (token) => (dispatch) => {
  dispatch(requestQuestions());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => dispatch(receiveQuestions(data)))
    .catch((error) => dispatch(failedRequestQuestions(error)));
};

function getToken(json) {
  return { type: GET_API_TOKEN, payload: json };
}

function requestApi() {
  return { type: REQUEST_API_TOKEN };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST_TOKEN, payload: error };
}

export function getTokenApi() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((token) => dispatch(getToken(token)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
