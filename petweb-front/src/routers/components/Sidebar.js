import React, {useState} from 'react';
import '../../App.css'
import {useHistory, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../reduxs/actions';
import logoWhite from '../../images/logo-white.png'
import IconDashboard from '../../images/IconDashboard';

function Sidebar() {
  const dispatch = useDispatch();
  const history =useHistory();
  const handleLogout = () =>{
    dispatch(logout()) 
    localStorage.removeItem("token")
    history.push('/')
  }
  // console.log("sidebar:")
  // console.log(history.location.pathname)
  console.log(window.location.pathname)
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <div className='sidebar-logo'><img src={logoWhite} alt="logo" /></div>
        <div onClick={()=>history.push('/')} className={`sidebar-link ${history.location.pathname === '/' ? 'act' : ''}`}><IconDashboard stroke="#118AF7"/><li>Dashboard</li></div>
        <div onClick={()=>history.push('/upload')} className={`sidebar-link ${history.location.pathname === '/upload' ? 'act' : ''}`}><li>Upload</li></div>
        <div onClick={()=>history.push('/view')} className={`sidebar-link ${history.location.pathname === '/view' ? 'act' : ''}`}><li>View</li></div>
        <div onClick={()=>history.push('/analysis')} className={`sidebar-link ${history.location.pathname === '/analysis' ? 'act' : ''}`}><li>Analysis</li></div>
        <div onClick={()=>history.push('/setting')} className={`sidebar-link ${history.location.pathname === '/setting' ? 'act' : ''}`}><li>Setting</li></div>
      </ul>
      <ul className="sidebar-links">
        <div  onClick={()=> handleLogout()} className={"sidebar-link"}><li>Logout</li></div>
      </ul>
    </div>
  );
}

export default Sidebar;
