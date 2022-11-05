import { AppStateType, AppDispatchType } from '../index';
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
} from './types';

export const depositMoney = (amount: number) => {
  return async (dispatch: AppDispatchType, getState: () => AppStateType) => {
    dispatch({
      type: DEPOSIT_MONEY,
    });

    try {
      const { balance: currentBalance } = getState().bank;
      const newBalance = currentBalance + amount;

      dispatch({
        type: DEPOSIT_MONEY_SUCCESS,
        payload: newBalance,
      });

      return newBalance;
    } catch (e: any) {
      dispatch({
        type: DEPOSIT_MONEY_ERROR,
        payload: e.message,
      });
    }
  };
};

export const withdrawMoney = (amount: number) => {
  return async (dispatch: AppDispatchType, getState: () => AppStateType) => {
    dispatch({
      type: WITHDRAW_MONEY,
    });

    try {
      const { balance: currentBalance } = getState().bank;
      const newBalance = currentBalance - amount;

      dispatch({
        type: WITHDRAW_MONEY_SUCCESS,
        payload: newBalance,
      });

      return newBalance;
    } catch (e: any) {
      dispatch({
        type: WITHDRAW_MONEY_ERROR,
        payload: e.message,
      });
    }
  };
};

export const bankrupt = () => {
  return async (dispatch: AppDispatchType, getState: () => AppStateType) => {
    dispatch({
      type: BANKRUPT,
    });

    try {
      dispatch({
        type: BANKRUPT_SUCCESS,
        payload: 0,
      });

      return 0;
    } catch (e: any) {
      dispatch({
        type: BANKRUPT_ERROR,
        payload: e.message,
      });
    }
  };
};
