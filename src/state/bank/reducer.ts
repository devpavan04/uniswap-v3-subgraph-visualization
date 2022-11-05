import { PayloadAction } from '@reduxjs/toolkit';
import {
  DEPOSIT_MONEY,
  DEPOSIT_MONEY_SUCCESS,
  DEPOSIT_MONEY_ERROR,
  WITHDRAW_MONEY,
  WITHDRAW_MONEY_SUCCESS,
  WITHDRAW_MONEY_ERROR,
  BANKRUPT,
  BANKRUPT_SUCCESS,
  BANKRUPT_ERROR,
  BankStateType,
} from './types';

const initialState: BankStateType = {
  balance: 0,
  loading: false,
  error: false,
};

const bankReducer = (state = initialState, action: PayloadAction<number>): BankStateType => {
  switch (action.type) {
    case DEPOSIT_MONEY:
      return { balance: state.balance, loading: true, error: false };
    case DEPOSIT_MONEY_SUCCESS:
      return { balance: action.payload, loading: false, error: false };
    case DEPOSIT_MONEY_ERROR:
      return { balance: state.balance, loading: true, error: true };

    case WITHDRAW_MONEY:
      return { balance: state.balance, loading: true, error: false };
    case WITHDRAW_MONEY_SUCCESS:
      return { balance: action.payload, loading: false, error: false };
    case WITHDRAW_MONEY_ERROR:
      return { balance: state.balance, loading: true, error: true };

    case BANKRUPT:
      return { balance: state.balance, loading: true, error: false };
    case BANKRUPT_SUCCESS:
      return { balance: action.payload, loading: false, error: false };
    case BANKRUPT_ERROR:
      return { balance: state.balance, loading: true, error: true };
    default:
      return state;
  }
};

export default bankReducer;
