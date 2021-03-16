import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux'
import allReducer from './reduxs/reducers';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom' 

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Router>
    <Switch>
      <Provider store={store}>
        <React.StrictMode>
              <App />
        </React.StrictMode>
      </Provider>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





// //STORE -> GLOBALIZED STATE
// // let store = createStore(reducer)
// //ACTION INCREMENT
// const increment = () =>{
//   return {
//     type: 'INCREMENT'
//   }
// }
// const decrement = () =>{
//   return {
//     type: 'DECREMENT'
//   }
// }

// //REDUCER 
// const counter = (state = 0, action) =>{
//   switch(action.type){
//     case "INCREMENT":
//       return state + 1;
//     case "DECREMENT":
//       return state -1;
//   }
// };

// let store = createStore(counter);

// //Display it in the console
// store.subscribe(()=>console.log(store.getState()));

// //DISPATCH
// store.dispatch(increment());
// store.dispatch(decrement());
// store.dispatch(decrement());