// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_API_JSON = 'GET_API_JSON';
export const REQUEST_API = 'REQUEST_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_INFO = 'ADD_INFO';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const addEmail = (emailValue) => ({
  type: ADD_EMAIL,
  emailValue,
});

export const addInfo = (value) => ({
  type: ADD_INFO,
  value,
});

export const removeItem = (value) => ({
  type: REMOVE_ITEM,
  value,
});

function getCurrency(json) {
  return { type: GET_API_JSON, payload: json };
}

function requestApi() {
  return { type: REQUEST_API };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function walletDataApi() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currency) => dispatch(getCurrency(currency)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
