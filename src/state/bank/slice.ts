import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BankState } from './types';

const initialState: BankState = {
  value: 0,
};

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    depositMoney: (state, action: PayloadAction<number>) => {
      state.value = state.value + action.payload;
    },
    withdrawMoney: (state, action: PayloadAction<number>) => {
      state.value = state.value - action.payload;
    },
    bankrupt: (state) => {
      state.value = 0;
    },
  },
});

export const { depositMoney, withdrawMoney, bankrupt } = bankSlice.actions;

export default bankSlice.reducer;
