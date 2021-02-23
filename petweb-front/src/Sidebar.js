import React, {useState} from 'react';
import './App.css'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {login, logout} from './actions';
// import {usePath} from 'hookrouter';

function Sidebar() {
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  // const path = usePath();
  // console.log(path);
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <Link onClick={()=>setActive('dashboard')} className={`sidebar-link ${active === 'dashboard' ? 'act' : ''}`} to="/dashboard"><li>Dashboard</li></Link>
        <Link onClick={()=>setActive('upload')} className={`sidebar-link ${active === 'upload' ? 'act' : ''}`} to="/upload"><li>Upload</li></Link>
        <Link onClick={()=>setActive('view')} className={`sidebar-link ${active === 'view' ? 'act' : ''}`} to="/View"><li>View</li></Link>
        <Link onClick={()=>setActive('analysis')} className={`sidebar-link ${active === 'analysis' ? 'act' : ''}`} to="/Analysis"><li>Analysis</li></Link>
        <Link onClick={()=>setActive('setting')} className={`sidebar-link ${active === 'setting' ? 'act' : ''}`} to="/Setting"><li>Setting</li></Link>
      </ul>
      <ul className="sidebar-links">
      <Link  onClick={()=> dispatch(logout())} className={"sidebar-link"} to='/'><li>Logout</li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;
