import counterReducer from './counter';
import loggedReducer from './isLogged';
import listManagerReducer from './listManager';
import fileListReducer from './fileLists';
import {combineReducers} from 'redux';

  //counter: counterReducer
const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  listManager: listManagerReducer,
  fileLists: fileListReducer,
})
export default allReducers;