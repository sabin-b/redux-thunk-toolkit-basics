// import { composeWithDevTools } from '@redux-devtools/extension';
// import {
//   applyMiddleware,
//   combineReducers,
//   legacy_createStore as createStore,
// } from 'redux';
// import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
// import { accountReducer } from '../features/accounts/accountSlice';
import { accountReducer } from '../features/accounts/accountSlice';
import { customerReducer } from '../features/customers/customerSlice';
// const rootReducers = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });
// export const store = createStore(
//   rootReducers,
//   composeWithDevTools(applyMiddleware(thunk))
// );

export const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
