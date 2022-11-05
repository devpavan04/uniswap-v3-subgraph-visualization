import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PoolsStateType } from './pools.types';

const initialState: PoolsStateType = {
  pools: [],
};

export const poolSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    getPools: (state) => {
      state.pools = [];
    },
  },
});

export const { getPools } = poolSlice.actions;

export default poolSlice.reducer;
