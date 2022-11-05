import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bankActions } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Object.assign({}, bankActions), dispatch);
};
