import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export const store = configureStore({
  reducer: rootReducer,
});
export type AppStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
