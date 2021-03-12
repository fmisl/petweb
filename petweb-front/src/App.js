import React, {useEffect} from 'react';
import './App.css'
import Sidebar from './routers/components/Sidebar'
import Headerbar from './routers/components/Headerbar'
import axios from 'axios';
// import Sidebar from './pages/components/Sidebar'
import Login from './routers/login/Login'
import Forgot from './routers/login/Forgot'
import Signup from './routers/login/Signup'
import * as services from './services/fetchApi'
import {login, logout} from './reduxs/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Dashboard, Upload, View, Analysis, Setting} from './routers'
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom' 


function App() {
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  // dispatch(profile())
  const history =useHistory();

  useEffect(async () => {
    const token = localStorage.getItem('token')
    let res = null
    if (token){
      try{
        res = await services.TokenVerify({'token':token})
      } catch (e){
        // console.log(e.response.data.non_field_errors[0])
        console.log("Token expired")
        dispatch(logout())
        localStorage.removeItem('token');
        alert('Logout')
      } finally {
        // console.log(res)
      }
    }
  }, [])

  console.log(window.location.pathname)
  return (
    <Router>
      <Switch>
        {!isLogged && 
          <div className="App-unAuth">
            {/* <Headerbar/> */}
            <Route path="/" exact component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard" component={Login}/>
            <Route path="/upload" component={Login}/>
            <Route path="/view" component={Login}/>
            <Route path="/analysis" component={Login}/>
            <Route path="/setting" component={Login}/>
            <Route path="/forgot" component={Forgot}/>
            <Route path="/signup" component={Signup}/>
            {/* <Redirect path="*" to="/" /> */}
          </div>
        }
        {isLogged && 
          <div className="App">
            <Sidebar />
            <Headerbar/>
            {/* <Headerbar/> */}
            {/* <Sidebar/> */}
            <Route path="/" exact component={Login}/>
            {/* <Redirect exact from="/" to="/dashboard" /> */}
            {/* <Route path="/" exact component={Dashboard}/>
            <Route path="/login" exact component={Dashboard}/>
            <Route path="/forgot" exact component={Dashboard}/>
            <Route path="/signup" exact component={Dashboard}/> */}
            {/* <Route path="/dashboard" render={(props)=> <Dashboard state={{detail:'test1'}}/>}/> */}
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/upload" component={Upload}/>
            <Route path="/view" component={View}/>
            <Route path="/analysis" component={Analysis}/>
            <Route path="/setting" component={Setting}/>
            {/* <Redirect exact path="/signup" to="/" />
            <Redirect exact path="/forgot" to="/" /> */}
          </div>
        }
      </Switch>
    </Router>
  );
}

export default App;


