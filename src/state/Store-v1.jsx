import { combineReducers, legacy_createStore as createStore } from 'redux';
import { v4 as uuid } from 'uuid';

const accountInitialState = {
  balance: 0,
  purposeOfloan: '',
  loan: 0,
};

const customerInitailState = {
  fullName: '',
  createdAt: '',
  nationalId: '',
};

function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'account/withdrawal':
      return {
        ...state,
        balance:
          state.balance > 0 ? state.balance - action.payload : state.balance,
      };
    case 'account/requestloan':
      return {
        ...state,
        loan: state.loan > 0 ? state.loan : state.loan + action.payload.amount,
        purposeOfloan: action.payload.purposeOfloan,
        balance:
          state.loan > 0
            ? state.balance
            : state.balance + action.payload.amount,
      };
    case 'account/payloan':
      return {
        ...state,
        loan: state.loan >= state.balance ? 0 : state.loan,
        purposeOfloan: '',
        balance:
          state.loan >= state.balance
            ? state.balance - state.loan
            : state.balance,
      };
    default:
      return state;
  }
}

// customer reducer
function customerReducer(state = customerInitailState, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateCustomer':
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdrawal(amount) {
  return { type: 'account/withdrawal', payload: amount };
}

function requestOfLoan(loanAmount, reason) {
  return {
    type: 'account/requestloan',
    payload: {
      amount: loanAmount,
      purposeOfloan: reason,
    },
  };
}

function payLoan() {
  return { type: 'account/payloan' };
}

// store.dispatch(deposit(500));
// console.log(store.getState());

// customer actions
function createCustomer(fullName) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalId: uuid().toString().slice(0, 20),
      createdAt: Date.now().toString(),
    },
  };
}

function updateCustomer(fullName) {
  return {
    type: 'customer/updateCustomer',
    payload: fullName,
  };
}



