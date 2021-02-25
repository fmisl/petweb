import React from 'react';
import '../App.css';
import Sidebar from './components/Sidebar'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../actions';

function Analysis({history}) {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  console.log(history.location.pathname)
  return (
    <div className="content">
      <Sidebar/>
      <div className="content-div">
        <h1>Analysis page</h1>
        <h1>Counter: {counter}</h1>
        <button onClick={()=> dispatch(increment(1))}>+</button>
        <button onClick={()=> dispatch(decrement(2))}>-</button>
        {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>}
      </div>
    </div>
  );
}

export default Analysis;