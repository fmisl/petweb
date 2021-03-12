import React, {useState, useEffect } from 'react';
import '../../App.css'
import {useHistory, Redirect, Link, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {logout, increment, decrement, tab_number} from '../../reduxs/actions';
// import logoWhite from '../../images/logo-white.png'
import LogoWhite from '../../images/LogoWhite';
import IconDashboard from '../../images/IconDashboard';
import IconUpload from '../../images/IconUpload';
import IconView from '../../images/IconView';
import IconAnalysis from '../../images/IconAnalysis';
import IconSetting from '../../images/IconSetting';
import IconLogout from '../../images/IconLogout';

function Sidebar() {
  const [tab, setTab] = useState(0)
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const history =useHistory();
  const menuList = ['dashboard', 'upload', 'view', 'analysis/suvr', 'analysis/report', 'setting']
  useEffect(() => {
    console.log(counter);
    console.log(menuList[counter]);
    console.log(typeof(menuList[counter]));
    history.push('/'+menuList[counter])
  }); // count가 바뀔 때만 effect를 재실행합니다.
  
  // console.log(tab)
  // if (e.deltaY >= 0) {setTab(Math.min(menuList.length-1,tab+1))} else {setTab(Math.max(0, tab-1))}
  // onWheel={(e)=>{if (e.deltaY >= 0) {setTab(Math.min(menuList.length-1,tab+1))} else {setTab(Math.max(0, tab-1))}}}
  // onWheel={(e)=>{let temp = tab; if (e.deltaY >= 0) {temp = Math.min(menuList.length-1,tab+1)} else {temp = Math.max(0, tab-1)}; history.push({pathname:'/'+menuList[temp],state:{tab:temp}})}}
  return (
    <div className="sidebar" onWheel={(e)=>{if (e.deltaY>=0){dispatch(increment(menuList.length))}else{dispatch(decrement(menuList.length))}}}>
      <div className='sidebar-logo'><LogoWhite fill="white"/></div>
      <ul className='sidebar-grp1' >
        {/* <div className={`sidebar-grp1-item ${history.location.pathname === '/dashboard' ? 'act' : ''}`}> */}
        {/* <div className={`sidebar-grp1-menu ${history.location.pathname.split('/')[1] == 'dashboard' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push({pathname:'/dashboard', state:{detail:'test'}});}}> */}
        <div className={`sidebar-grp1-menu ${menuList[counter] == 'dashboard' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); dispatch(tab_number(0));}}>
          <div className={`sidebar-grp1-menu-title`}><IconDashboard size={'40'} stroke={menuList[counter] === 'dashboard' ? "#118AF7" : "#ccccda"}/><li>Dashboard</li></div>
        </div>
        {/* <div onClick={()=>history.push('/dashboard/profile')} className={`sidebar-link-contents ${history.location.pathname === '/dashboard' ? '' : ''}`}><li>profile</li></div> */}
        <div className={`sidebar-grp1-menu ${menuList[counter] == 'upload' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); dispatch(tab_number(1));}}>
          <div className={`sidebar-grp1-menu-title`}><IconUpload size={'40'} stroke={menuList[counter] === 'upload' ? "#118AF7" : "#ccccda"}/><li>Upload</li></div>
        </div>
        <div className={'sidebar-grp1-splitter'}></div>
        <div className={`sidebar-grp1-menu ${menuList[counter] == 'view' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); dispatch(tab_number(2));}}>
          <div className={`sidebar-grp1-menu-title`}><IconView size={'40'} stroke={menuList[counter] === 'view' ? "#118AF7" : "#ccccda"}/><li>View</li></div>
        </div>
        <div className={`sidebar-grp1-menu ${menuList[counter].split('/')[0] == 'analysis' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); dispatch(tab_number(3));}}>
          <div className={`sidebar-grp1-menu-title`}><IconAnalysis size={'40'} stroke={menuList[counter].split('/')[0] === 'analysis' ? "#118AF7" : "#ccccda"}/><li>Analysis</li></div>
          <div className={`sidebar-grp1-menu-item ${menuList[counter] == 'analysis/suvr' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); dispatch(tab_number(3));}}><li>SUVR</li></div>
          <div className={`sidebar-grp1-menu-item ${menuList[counter] == 'analysis/report' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); dispatch(tab_number(4));}}><li>Report</li></div>
        </div>
        <div className={`sidebar-grp1-menu ${menuList[counter] == 'setting' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); dispatch(tab_number(5));}}>
          <div className={`sidebar-grp1-menu-title`}><IconSetting size={'40'} stroke={menuList[counter] === 'setting' ? "#118AF7" : "#ccccda"}/><li>Setting</li></div>
        </div>
      </ul>
      <ul className='sidebar-grp2'>
        <div className={`sidebar-grp2-menu`} onClick={()=> {dispatch(logout());localStorage.removeItem("token");}} >
          <div className={`sidebar-grp2-menu-title`}><IconLogout size={'40'} stroke={"#ccccda"}/><li>Logout</li></div>
        </div>
      </ul>

      <div className="redux-info">
        <h1>isLogged: {isLogged.toString()}</h1>
        <h1>{menuList[counter]}</h1>
        <h1>Counter: {counter}</h1>
        <button onClick={()=> dispatch(increment(menuList.length))}>+</button>
        <button onClick={()=> dispatch(decrement(menuList.length))}>-</button>
      </div>
    </div>
  );
}

export default Sidebar;
