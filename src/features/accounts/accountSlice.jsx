// const accountInitialState = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: '',
//   isLoading: false,
// };

import { createSlice } from '@reduxjs/toolkit';

// export default function accountReducer(state = accountInitialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case 'account/withdraw':
//       return {
//         ...state,
//         balance:
//           action.payload > state.balance
//             ? state.balance
//             : state.balance - action.payload,
//       };
//     case 'account/requestLoan':
//       return {
//         ...state,
//         loan: state.loan > 0 ? state.loan : action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: state.balance >= state.loan ? 0 : state.loan,
//         loanPurpose: '',
//         balance:
//           state.balance >= state.loan
//             ? state.balance - state.loan
//             : state.balance,
//       };
//     case 'account/currencyConverting':
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// //! action creators
// export function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: 'account/currencyConverting' });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//     return dispatch({ type: 'account/deposit', payload: converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount, purpose },
//   };
// }

// export function payLoan() {
//   return {
//     type: 'account/payLoan',
//   };
// }

// new one

const accountInitialState = {
  balance: 0,
  purposeOfloan: '',
  loan: 0,
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState: accountInitialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdrawal(state, action) {
      state.balance =
        state.balance >= action.payload
          ? state.balance - action.payload
          : state.balance;
    },
    requestloan: {
      prepare(amount, purposeOfloan) {
        return {
          payload: { amount, purposeOfloan },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan += action.payload.amount;
        state.purposeOfloan = action.payload.purposeOfloan;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.purposeOfloan = '';
      state.balance =
        state.balance >= state.loan
          ? state.balance - state.loan
          : state.balance;
      state.loan = state.balance >= state.loan ? 0 : state.loan;
    },
    currencyConversion(state) {
      state.isLoading = true;
    },
  },
});
export const { payLoan, requestloan, withdrawal } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  return async function (dispatch) {
    dispatch({ type: 'account/currencyConversion' });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedCurrency = await data.rates.USD;
    // console.log(convertedCurrency);
    return dispatch({ type: 'account/deposit', payload: convertedCurrency });
  };
}

// reducer
export const accountReducer = accountSlice.reducer;

// old action creators
// export function accountReducer(state = accountInitialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         isLoading: false,
//         balance: state.balance + action.payload,
//       };
//     case 'account/withdrawal':
//       return {
//         ...state,
//         balance:
//           state.balance >= action.payload
//             ? state.balance - action.payload
//             : state.balance,
//       };
//     case 'account/requestloan':
//       return {
//         ...state,
//         loan: state.loan > 0 ? state.loan : state.loan + action.payload.amount,
//         purposeOfloan: action.payload.purposeOfloan,
//         balance:
//           state.loan > 0
//             ? state.balance
//             : state.balance + action.payload.amount,
//       };
//     case 'account/payloan':
//       return {
//         ...state,
//         loan: state.balance >= state.loan ? 0 : state.loan,
//         purposeOfloan: '',
//         balance:
//           state.balance >= state.loan
//             ? state.balance - state.loan
//             : state.balance,
//       };
//     case 'account/currencyConversion':
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// // action creators
// export function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };
//   return async function (dispatch) {
//     dispatch({ type: 'account/currencyConversion' });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const convertedCurrency = await data.rates.USD;
//     // console.log(convertedCurrency);
//     return dispatch({ type: 'account/deposit', payload: convertedCurrency });
//   };
// }

// export function withdrawal(amount) {
//   return { type: 'account/withdrawal', payload: amount };
// }

// export function requestOfLoan(loanAmount, reason) {
//   return {
//     type: 'account/requestloan',
//     payload: {
//       amount: loanAmount,
//       purposeOfloan: reason,
//     },
//   };
// }

// export function payLoan() {
//   return { type: 'account/payloan' };
// }
