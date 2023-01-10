// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'GET_API_JSON':
    return { ...state, currencies: action.payload, isFetching: false };
  case 'FAILED_REQUEST':
    return { ...state, error: action.payload, isFetching: false };
  case 'ADD_INFO':
    return { ...state, expenses: [...state.expenses, action.value] };
  case 'REMOVE_ITEM':
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.value.id),
    };
  default:
    return state;
  }
}

export default wallet;
