import React from 'react';
import '../App.css';
import Sidebar from './components/Sidebar'
import Headerbar from './components/Headerbar'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../reduxs/actions';

function Setting({history}) {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  // console.log(history.location.pathname)
  console.log(window.location.pathname)
  return (
    <div className="content">
      <Sidebar/>
      <Headerbar/>
      {/* <SimpleSlider/> */}
      <div className="content-page">
        <div className="setting-title">
          <div style={{display:"flex", color:"white"}}>
            <div className="setting-btn setting" >Save</div>
          </div>
        </div>
        <div className="setting-box">
          <div style={{borderRight:"2px #292D30 solid"}}>
            <span>Side Bar Configuration</span>
          </div>
          <div style={{borderRight:"2px #292D30 solid"}}>
            <span>Tracers Lists</span>
          </div>
          <div >
            <span>Atlas & Template</span>
          </div>
        </div>

        <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>Setting page</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment())}>+</button>
          <button onClick={()=> dispatch(decrement())}>-</button>
          {/* {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>} */}
        </div>
      </div>
    </div>
  );
}

export default Setting;