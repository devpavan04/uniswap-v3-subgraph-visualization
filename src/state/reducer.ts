import { combineReducers } from 'redux';
import bankReducer from './bank/reducer';

const rootReducer = combineReducers({
  bank: bankReducer,
});

export default rootReducer;
