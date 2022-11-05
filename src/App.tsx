import { useSelector, useDispatch } from 'react-redux';
import { AppStateType, depositMoney, withdrawMoney, bankrupt } from './state';

const App = () => {
  const { value } = useSelector((state: AppStateType) => state.bank);
  const dispatch = useDispatch();

  return (
    <>
      <div>Value: {value}</div>
      <br />
      <button onClick={() => dispatch(depositMoney(100))}>Deposit</button>
      <button onClick={() => dispatch(withdrawMoney(50))}>Withdraw</button>
      <button onClick={() => dispatch(bankrupt())}>Bankrupt</button>
    </>
  );
};

export default App;
