import counterReducer from './counter';
import loggedReducer from './isLogged';
import listManagerReducer from './listManager';
import fileListReducer from './fileList';
import {combineReducers} from 'redux';

  //counter: counterReducer
const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  listManager: listManagerReducer,
  fileList: fileListReducer,
})
export default allReducers;