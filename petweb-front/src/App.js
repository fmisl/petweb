import React from 'react';
import './App.css'
import Sidebar from './Sidebar'
import Headerbar from './Headerbar'
import Login from './Login'
import {useSelector, useDispatch} from 'react-redux';
import {Dashboard, Upload, View, Analysis, Setting} from './sidebar/'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom' 


function App() {
  const isLogged = useSelector(state => state.isLogged);
  return (
    <Router>
      <Switch>
        {!isLogged ? 
          <div className="App-unAuth">
            <Headerbar/>
            <Route path="/" component={Login}/>
          </div>
          :
          <div className="App">
            <Headerbar/>
            <Sidebar />
            {/* <Route path="/dashboard" exact render={(props)=><Dashboard {...props}/>}/> */}
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/upload" exact component={Upload}/>
            <Route path="/View" exact component={View}/>
            <Route path="/Analysis" exact component={Analysis}/>
            <Route path="/Setting" exact component={Setting}/>
          </div>
        }
      </Switch>
    </Router>
  );
}

export default App;


