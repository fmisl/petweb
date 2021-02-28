import React from 'react';
import '../App.css';
import Sidebar from './components/Sidebar'
import Headerbar from './components/Headerbar'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../reduxs/actions';

function Dashboard() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const history =useHistory();
  // console.log("dashboard")
  // console.log(history.location.pathname)
  console.log(window.location.pathname)
  return (
    <div className="content">
      <Sidebar />
      <Headerbar/>
      <div className="content-page">
        <p className="dashboard-title">
          Hello, 
          <span style={{color:"#118AF7"}}> 
            Dr.Daewoon Kim
          </span>
          <br/>
          <span style={{fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "300",fontSize: "20px",lineHeight: "34px",color: "#91919C"}}>
            Have a great day at work
          </span>
          <br/>
          <br/>
          <br/>
          <span style={{fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "300",fontSize: "24px",lineHeight: "24px",color: "white"}}>
          ID
          </span>
          &nbsp;&nbsp;
          <span style={{fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "500",fontSize: "24px",lineHeight: "24px",color: "white"}}>
          2020-0000
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "300",fontSize: "24px",lineHeight: "24px",color: "white"}}>
            Position
          </span>
          &nbsp;&nbsp;
          <span style={{fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "500",fontSize: "24px",lineHeight: "24px",color: "white"}}>
            Dr
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "300",fontSize: "24px",lineHeight: "24px",color: "white"}}>
            Hospital
          </span>
          &nbsp;&nbsp;
          <span style={{fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "500",fontSize: "24px",lineHeight: "24px",color: "white"}}>
            SNUH
          </span>
          {/* <span>
            ID &nbsp; 2020-0000 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Position &nbsp; Dr &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hospital &nbsp; Seoul National University
          </span> */}
        </p>
        <div className="dashboard-box1">
          Weekly Analysis
        </div>
        <div className="dashboard-box2">
          Weekly Analysis
        </div>

        <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>Dashboard page</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment(1))}>+</button>
          <button onClick={()=> dispatch(decrement(2))}>-</button>
          {/* {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>} */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;