import counterReducer from './counter';
import loggedReducer from './isLogged';
import listManagerReducer from './listManager';
import {combineReducers} from 'redux';

  //counter: counterReducer
const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  listManager: listManagerReducer,
})
export default allReducers;