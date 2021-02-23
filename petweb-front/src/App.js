import React from 'react';
import './App.css'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './actions';
import Sidebar from './Sidebar'
import Headerbar from './Headerbar'
import {Dashboard, Upload, View, Analysis, Setting} from './sidebar/'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 

function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  return (
    <Router>
      <div className="App">
        <Headerbar/>
        <Sidebar/>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/upload" exact component={Upload}/>
          <Route path="/View" exact component={View}/>
          <Route path="/Analysis" exact component={Analysis}/>
          <Route path="/Setting" exact component={Setting}/>
        </Switch>

        {/* <h1>Counter!: {counter}</h1>
        <button onClick={()=> dispatch(increment(1))}>+</button>
        <button onClick={()=> dispatch(decrement(2))}>-</button>
        {isLogged ? <h3>Valueable Information I shouldn't see</h3> : ''} */}
      </div>
    </Router>
  );
}

export default App;


