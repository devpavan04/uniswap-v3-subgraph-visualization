export const DEPOSIT_MONEY = '@bank/depositMoney';
export const DEPOSIT_MONEY_SUCCESS = '@bank/depositMoneySuccess';
export const DEPOSIT_MONEY_ERROR = '@bank/depositMoneyError';

export const WITHDRAW_MONEY = '@bank/withdrawMoney';
export const WITHDRAW_MONEY_SUCCESS = '@bank/withdrawMoneySuccess';
export const WITHDRAW_MONEY_ERROR = '@bank/withdrawMoneyError';

export const BANKRUPT = '@bank/bankrupt';
export const BANKRUPT_SUCCESS = '@bank/bankruptSuccess';
export const BANKRUPT_ERROR = '@bank/bankruptError';

export type BankStateType = {
  balance: number;
  loading: boolean;
  error: boolean;
};
