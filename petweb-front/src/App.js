import React from 'react';
import './App.css'
import Headerbar from './components/Headerbar'
// import Sidebar from './pages/components/Sidebar'
import Login from './routers/login/Login'
import {useSelector, useDispatch} from 'react-redux';
import {Dashboard, Upload, View, Analysis, Setting} from './routers'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 


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
            {/* <Sidebar/> */}
            {/* <Route path="/" exact component={Dashboard}/> */}
            <Route path="/" exact component={Dashboard}/>
            <Route path="/upload" exact component={Upload}/>
            <Route path="/view" exact component={View}/>
            <Route path="/analysis" exact component={Analysis}/>
            <Route path="/setting" exact component={Setting}/>
            {/* <Redirect path="*" to="/dashboard" /> */}
          </div>
        }
      </Switch>
    </Router>
  );
}

export default App;


