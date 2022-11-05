import { configureStore } from '@reduxjs/toolkit';
import bankReducer from './bank/bank.slice';

export const store = configureStore({
  reducer: {
    bank: bankReducer,
  },
});

export type AppStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
