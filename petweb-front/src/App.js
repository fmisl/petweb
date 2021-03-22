import React, {useEffect, useState} from 'react';
import './App.css'
import Sidebar from './components/Sidebar'
import Headerbar from './components/Headerbar'
import Checklist from "./modal/Checklist";
import axios from 'axios';
// import Sidebar from './pages/components/Sidebar'
import Login from './routers/login/Login'
import Forgot from './routers/login/Forgot'
import Signup from './routers/login/Signup'
import * as services from './services/fetchApi'
import {login, logout, increment, decrement, loadItems, profile, tab_location, groupItem, addStack, updateStack, removeStack} from './reduxs/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Dashboard, Upload, View, Analysis, Setting} from './routers'
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory, useParams, useLocation} from 'react-router-dom' 
// import stackManagerReducer from './reduxs/reducers/stackManager';


function App() {
  const fileList = useSelector(state => state.fileList);
  const OpenedFiles = fileList.filter(item => {return item.Opened==true});
  // const [OpenedFiles, setOpenedFiles] = useState([]);
  const counter = useSelector(state => state.counter);
  const stackManager = useSelector(state => state.stackManager);
  const isLogged = useSelector(state => state.isLogged);
  const [isShowingChecklist, setIsShowingChecklist] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const history =useHistory();
  const { caseID } = useParams();
  const menuList = ['dashboard', 'upload', 'view', 'analysis/suvr', 'analysis/report', 'setting']
  useEffect(() => {
    if (OpenedFiles.length != 0){
      console.log('OpenedFiles changed: ', OpenedFiles)
      dispatch(addStack([...OpenedFiles.map((v,i)=>{return {fileID: v.fileID, currentC:50, currentS:50, currentA:50}})]))
      if (counter.fileID==null) dispatch(tab_location({...counter, fileID:OpenedFiles[counter.tabX].fileID}))
      else {
        const focusTab = OpenedFiles.findIndex((item)=>item.fileID == counter.fileID)
        if (focusTab == -1 ) {
          const lowerBoundTabIndex = Math.max(0, counter.tabX-1)
          const focusFileID = OpenedFiles[lowerBoundTabIndex].fileID
          dispatch(tab_location({...counter, tabX:lowerBoundTabIndex, fileID:focusFileID}))
        }
        else dispatch(tab_location({...counter, tabX:focusTab}))
      }
    }
  }, [OpenedFiles.length])

  // if (OpenedFiles.length !== 0){
  //   if (counter.fileID==null) {
  //     dispatch(tab_location({...counter, fileID:OpenedFiles[counter.tabX].fileID}))
  //   }
  // }
  useEffect(async () => {
    const token = localStorage.getItem('token')
    let res = null
    if (token){
      try{
        res = await services.TokenVerify({'token':token})
        if (res.data.token == token) {
          dispatch(loadItems({'token':token}))
          // dispatch(profile())
        }
        else {
          alert('Automatically Logout')
        }
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
  }, [isLogged])

  function openChecklist() {
    setIsShowingChecklist(true);
  }
  function toggleChecklist() {
    if (isShowingChecklist == false) dispatch(groupItem(1))
    setIsShowingChecklist(!isShowingChecklist);
  }

  const changePageByKey = (e) =>{
    const MaxOpenedFiles = OpenedFiles.length;
    switch (e.keyCode){
      case 38:
        const keyUpPage = Math.max(0,counter.tabY-1)
        dispatch(tab_location({...counter, tabY:keyUpPage}));
        if (keyUpPage <= 1) history.push('/'+menuList[keyUpPage]);
        else if (keyUpPage > 1) history.push('/'+menuList[keyUpPage]+'/'+OpenedFiles[counter.tabX].fileID);
        break;
      case 40:
          const keyDownPage = Math.min(menuList.length-1,counter.tabY+1)
          if (keyDownPage <= 1) history.push('/'+menuList[keyDownPage]);
          else if (keyDownPage > 1) 
            if (MaxOpenedFiles > 0){
              history.push('/'+menuList[keyDownPage]+'/'+OpenedFiles[counter.tabX].fileID);
            }
        break;
      case 39:
        if (MaxOpenedFiles > 0){
          const keyRightPage = Math.min(MaxOpenedFiles-1, counter.tabX+1);
          // , fileID:OpenedFiles[keyRightPage].File
          dispatch(tab_location({...counter, tabX:keyRightPage, fileID:OpenedFiles[keyRightPage].fileID}));
          if (counter.tabY <= 1) history.push('/'+menuList[counter.tabY]);
          else if (counter.tabY > 1) history.push('/'+menuList[counter.tabY]+'/'+OpenedFiles[keyRightPage].fileID);
        }
        break;
      case 37:
        if (MaxOpenedFiles > 0){
          const keyLeftPage = Math.max(0,counter.tabX-1)
          dispatch(tab_location({...counter, tabX:keyLeftPage, fileID:OpenedFiles[keyLeftPage].fileID}));
          if (counter.tabY <= 1) history.push('/'+menuList[counter.tabY]);
          else if (counter.tabY > 1) history.push('/'+menuList[counter.tabY]+'/'+OpenedFiles[keyLeftPage].fileID);
        }
        break;
      case 16:
        toggleChecklist()
        break;
      default:
        console.log('press up or down key only', e.keyCode)
    }
    // console.log('press up or down key only:',e.keyCode)
  }
  // console.log('what')
  return (
    <React.Fragment>
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
        // <div className="App" tabIndex={0} onKeyDown={(e)=>{if (e.keyCode == 40){dispatch(increment(menuList.length))} else if (e.keyCode == 38) {dispatch(decrement(menuList.length))};}}>
        <div className="App" tabIndex={0} onKeyDown={(e)=>{changePageByKey(e)}}>
          <Sidebar OpenedFiles={OpenedFiles}/>
          <Headerbar OpenedFiles={OpenedFiles}/>
          <Checklist isShowing={isShowingChecklist} hide={toggleChecklist} lock={openChecklist}/>
          {/*  */}
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
          {/* <Route path="/upload" component={Upload}/> */}
          <Route path="/upload" render={()=><Upload toggleChecklist={toggleChecklist}/>}/>
          {counter.fileID != null ? <Route path="/view/:caseID" exact component={View}/>
          : <Route path="/view/:caseID" render={()=><Redirect to="/dashboard"/>}/> }
          {counter.fileID != null ? <Route path="/analysis" component={Analysis}/>
          : <Route path="/analysis" render={()=><Redirect to="/dashboard"/>}/> }
          <Route path="/setting" component={Setting}/>
          {/* <Route path="/" render={()=><Redirect to="dashboard"/>}/> */}
          {/* <Redirect exact path="/signup" to="/" />
          <Redirect exact path="/forgot" to="/" /> */}
        </div>
      }
    </React.Fragment>
  );
}

export default App;


