import React, {useState, useEffect } from 'react';
import '../App.css'
import {useHistory, Redirect, Link, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {logout, increment, decrement, tab_number} from '../reduxs/actions';
// import logoWhite from '../../images/logo-white.png'
import LogoWhite from '../images/LogoWhite';
import IconDashboard from '../images/IconDashboard';
import IconUpload from '../images/IconUpload';
import IconView from '../images/IconView';
import IconAnalysis from '../images/IconAnalysis';
import IconSetting from '../images/IconSetting';
import IconLogout from '../images/IconLogout';

function Sidebar() {
  const [tab, setTab] = useState(0)
  const location = useLocation();
  const history =useHistory();
  const dispatch = useDispatch();
  const listSelected = useSelector(state => state.listManager);
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  // const menuList = ['dashboard', 'upload', 'view/191', 'analysis/suvr', 'analysis/report', 'setting']
  // useEffect(() => {
  //   console.log(counter);
  //   console.log(menuList[counter]);
  //   console.log(typeof(menuList[counter]));
  //   history.push('/'+menuList[counter])
  // }); // count가 바뀔 때만 effect를 재실행합니다.
  useEffect(()=>{
    const pathname = location.pathname.split('/')
    switch (pathname[1]){
      case "dashboard":
        dispatch(tab_number(0));
        break;        
      case "upload":
        dispatch(tab_number(1));
        break;
      case "view":
        dispatch(tab_number(2));
        break;
      case "analysis":
        switch (pathname[2]){
          case "suvr":
            dispatch(tab_number(3));
            break;
          case "report":
            dispatch(tab_number(4));
            break;
        }
        break;
      case "setting":
        dispatch(tab_number(5));
        break;
      default:
        console.log('pathname('+pathname+') is not found')
    }
    // console.log('pathname('+pathname+') is not found')
  },[location])
  // console.log(tab)
  // if (e.deltaY >= 0) {setTab(Math.min(menuList.length-1,tab+1))} else {setTab(Math.max(0, tab-1))}
  // onWheel={(e)=>{if (e.deltaY >= 0) {setTab(Math.min(menuList.length-1,tab+1))} else {setTab(Math.max(0, tab-1))}}}
  // onWheel={(e)=>{let temp = tab; if (e.deltaY >= 0) {temp = Math.min(menuList.length-1,tab+1)} else {temp = Math.max(0, tab-1)}; history.push({pathname:'/'+menuList[temp],state:{tab:temp}})}}
  
  const pathname = location.pathname.split('/')
  // console.log("sidebar.js: ",pathname)
  return (
    <div className="sidebar" >
      {/* onWheel={(e)=>{if (e.deltaY>=0){dispatch(increment(menuList.length))}else{dispatch(decrement(menuList.length))}}} */}
      <div className='sidebar-logo'><LogoWhite fill="white"/></div>
      <ul className='sidebar-grp1' >
        {/* <div className={`sidebar-grp1-item ${history.location.pathname === '/dashboard' ? 'act' : ''}`}> */}
        {/* <div className={`sidebar-grp1-menu ${history.location.pathname.split('/')[1] == 'dashboard' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push({pathname:'/dashboard', state:{detail:'test'}});}}> */}
        <div className={`sidebar-grp1-menu ${pathname[1] == 'dashboard' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/dashboard');}}> {/*dispatch(tab_number(0));*/}
          <div className={`sidebar-grp1-menu-title`}><IconDashboard size={'40'} stroke={pathname[1] === 'dashboard' ? "#118AF7" : "#ccccda"}/><li>Dashboard</li></div>
        </div>
        {/* <div onClick={()=>history.push('/dashboard/profile')} className={`sidebar-link-contents ${history.location.pathname === '/dashboard' ? '' : ''}`}><li>profile</li></div> */}
        <div className={`sidebar-grp1-menu ${pathname[1] == 'upload' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/upload');}}> {/*  dispatch(tab_number(1)); */}
          <div className={`sidebar-grp1-menu-title`}><IconUpload size={'40'} stroke={pathname[1] === 'upload' ? "#118AF7" : "#ccccda"}/><li>Upload</li></div>
        </div>
        <div className={'sidebar-grp1-splitter'}></div>
        <div className={`sidebar-grp1-menu ${pathname[1] == 'view' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/view/191');}}> {/* dispatch(tab_number(2)); */}
          <div className={`sidebar-grp1-menu-title`}><IconView size={'40'} stroke={pathname[1] === 'view' ? "#118AF7" : "#ccccda"}/><li>View</li></div>
        </div>
        <div className={`sidebar-grp1-menu ${pathname[1] == 'analysis' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/analysis/suvr');}}> {/*  dispatch(tab_number(3)); */}
          <div className={`sidebar-grp1-menu-title`}><IconAnalysis size={'40'} stroke={pathname[1] === 'analysis' ? "#118AF7" : "#ccccda"}/><li>Analysis</li></div>
          <div className={`sidebar-grp1-menu-item ${pathname[2] == 'suvr' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/analysis/suvr');}}><li>SUVR</li></div> {/* dispatch(tab_number(3)); */}
          <div className={`sidebar-grp1-menu-item ${pathname[2] == 'report' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/analysis/report');}}><li>Report</li></div> {/* dispatch(tab_number(4)); */}
        </div>
        <div className={`sidebar-grp1-menu ${pathname[1] == 'setting' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/setting');}}> {/* dispatch(tab_number(5)); */}
          <div className={`sidebar-grp1-menu-title`}><IconSetting size={'40'} stroke={pathname[1] === 'setting' ? "#118AF7" : "#ccccda"}/><li>Setting</li></div>
        </div>
      </ul>
      <ul className='sidebar-grp2'>
        <div className={`sidebar-grp2-menu`} onClick={()=> {dispatch(logout());localStorage.removeItem("token");}} >
          <div className={`sidebar-grp2-menu-title`}><IconLogout size={'40'} stroke={"#ccccda"}/><li>Logout</li></div>
        </div>
      </ul>

      <div className="redux-info">
        <h1>isLogged: {isLogged.toString()}</h1>
        <h1>{pathname[1]}</h1>
        <h1>listSelected: {listSelected.toString()}</h1>
        <h1>Counter: {counter}</h1>
        {/* <button onClick={()=> dispatch(increment(6))}>+</button>
        <button onClick={()=> dispatch(decrement(6))}>-</button> */}
      </div>
    </div>
  );
}

export default Sidebar;
