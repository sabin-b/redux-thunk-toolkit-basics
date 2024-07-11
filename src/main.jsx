import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/state/Store-new.jsx';
import App from './App.jsx';
import './index.css';

// import "./state/Store-v1.jsx"; // ? just run the file
// import state from './state/Store-v3.jsx';
// console.log(state.getState());
import './features/accounts/accountSlice.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
