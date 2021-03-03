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
        <div className="dashboard-title">
          <div >
            <div className="dashboard-text" style={{marginBottom:"0"}}>
              Hello, 
              <span style={{color:"#118AF7"}}> 
                Dr.Daewoon Kim
              </span>
            </div>
            <div className="dashboard-text" style={{marginTop:"0", marginBottom:"0", lineHeight: "10px"}} >
              <span style={{fontWeight: "300",fontSize: "20px",color: "#91919C"}}>
                Have a great day at work
              </span>
            </div>
          </div>
          <div style={{width:"206px"}}>
            <div className="dashboard-text">
              <span style={{fontWeight: "300",fontSize: "24px"}}>
              ID
              </span>
              &nbsp;&nbsp;
              <span style={{fontWeight: "500",fontSize: "24px"}}>
              2020-0000
              </span>
            </div>
            <div className="dashboard-text" >
              <span style={{fontWeight: "300",fontSize: "24px"}}>
                Position
              </span>
              &nbsp;&nbsp;
              <span style={{fontWeight: "500",fontSize: "24px"}}>
                Dr
              </span>
            </div>
            <div className="dashboard-text" >
              <span style={{fontWeight: "300",fontSize: "24px"}}>
                Hospital
              </span>
              &nbsp;&nbsp;
              <span style={{fontWeight: "500",fontSize: "24px"}}>
                SNUH
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-box">
          <div className="dashboard-box1">
            Weekly Analysis
          </div>
          <div className="dashboard-box2">
            Weekly Analysis
          </div>
        </div>

        <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>Dashboard page</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment())}>+</button>
          <button onClick={()=> dispatch(decrement())}>-</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;