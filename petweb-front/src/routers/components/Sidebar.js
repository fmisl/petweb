import React, {useState} from 'react';
import '../../App.css'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../actions';

function Sidebar() {
  const dispatch = useDispatch();
  const history =useHistory();
  // console.log("sidebar:")
  console.log(history.location.pathname)
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <div onClick={()=>history.push('/')} className={`sidebar-link ${history.location.pathname === '/' ? 'act' : ''}`}><li>Dashboard</li></div>
        <div onClick={()=>history.push('/upload')} className={`sidebar-link ${history.location.pathname === '/upload' ? 'act' : ''}`}><li>Upload</li></div>
        <div onClick={()=>history.push('/view')} className={`sidebar-link ${history.location.pathname === '/view' ? 'act' : ''}`}><li>View</li></div>
        <div onClick={()=>history.push('/analysis')} className={`sidebar-link ${history.location.pathname === '/analysis' ? 'act' : ''}`}><li>Analysis</li></div>
        <div onClick={()=>history.push('/setting')} className={`sidebar-link ${history.location.pathname === '/setting' ? 'act' : ''}`}><li>Setting</li></div>
      </ul>
      <ul className="sidebar-links">
        <div  onClick={()=> dispatch(logout())} className={"sidebar-link"}><li>Logout</li></div>
      </ul>
    </div>
  );
}

export default Sidebar;
