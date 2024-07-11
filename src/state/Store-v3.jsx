import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../features/customers/customerSlice';
import accountReducer from '../features/accounts/accountSlice';

const state = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default state;
