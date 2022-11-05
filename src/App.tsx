import { RootState } from './state/store';
import { useSelector, useDispatch } from 'react-redux';
import { depositMoney, withdrawMoney, bankrupt } from './state/bank/slice';

const App = () => {
  const { value } = useSelector((state: RootState) => state.bank);
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
