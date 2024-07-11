import { useSelector } from 'react-redux';

function Customer() {
  let { fullName } = useSelector((state) => state.customer);
  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
