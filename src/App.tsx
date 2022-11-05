import { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelectors';
import { AppStateType } from './state';

const App = () => {
  const { depositMoney, withdrawMoney, bankrupt } = useActions();

  const { balance } = useTypedSelector((state: AppStateType) => state.bank);

  useEffect(() => {}, []);

  return (
    <>
      <h1>Hello, World!</h1>
      <div>Value: {balance}</div>
      <br />
      <button onClick={() => depositMoney(100)}>Deposit</button>
      <button onClick={() => withdrawMoney(50)}>Withdraw</button>
      <button onClick={() => bankrupt()}>Bankrupt</button>
    </>
  );
};

export default App;
