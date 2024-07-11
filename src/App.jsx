import { useSelector } from 'react-redux';
import AccountOperations from './features/accounts/AccountOperations';
import BalanceDisplay from './features/accounts/BalanceDisplay';
import CreateCustomer from './features/customers/CreateCustomer';
import Customer from './features/customers/Customer';

function App() {
  const customer = useSelector((state) => state.customer.fullName);
  // console.log(customer)
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customer.length === 0 ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
