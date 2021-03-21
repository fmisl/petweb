import React, {useEffect} from 'react';
import '../App.css';
import {useHistory, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../reduxs/actions';
import WeeklyGraph from './components/Charts/WeeklyGraph'
import WeeklyPie from './components/Charts/WeeklyPie'
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Dashboard(props) {
  const counter = useSelector(state => state.counter);
  const listSelected = useSelector(state => state.stackManager);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const history =useHistory();
  const location = useLocation();
  // useEffect(() => {
  //    console.log(location.pathname); // result: '/secondpage'
  //    console.log(location.search); // result: '?query=abc'
  //    console.log(location.state.detail); // result: 'some_value'
  // }, [location]);
  // console.log("dashboard")
  // console.log(history.location.pathname)
  // console.log(window.location.pathname)
  // console.log(props.location)
    // console.log(window.location.pathname)
  return (
    <div className="content">
      {/* <Sidebar />
      <Headerbar/> */}
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
            <span>Weekly Analysis</span>
            <span>2021.03.05 - 2021.03.09</span>
            <br/>
            <br/>
            <WeeklyGraph />
          </div>
          <div className="dashboard-box2">
            <span>Amyloid Tracers</span>
            <span>2021.03.05 - 2021.03.09</span>
            <span>53</span>
            <span>Total</span>
            <br/>
            <br/>
            <WeeklyPie />
          </div>
        </div>

        {/* <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>Dashboard page</h1>
          <h1>listSelected: {listSelected}</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment())}>+</button>
          <button onClick={()=> dispatch(decrement())}>-</button>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;