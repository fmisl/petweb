import React, {useState} from 'react';
import '../../App.css'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../redux/actions';
import {usePath} from 'hookrouter';

function Sidebar(props) {
  // const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const path = usePath();
  console.log("active: ", props.active);
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <Link className={`sidebar-link ${props.active === 'dashboard' ? 'act' : ''}`} to="/dashboard"><li>Dashboard</li></Link>
        <Link className={`sidebar-link ${props.active === 'upload' ? 'act' : ''}`} to="/upload"><li>Upload</li></Link>
        <Link className={`sidebar-link ${props.active === 'view' ? 'act' : ''}`} to="/View"><li>View</li></Link>
        <Link className={`sidebar-link ${props.active === 'analysis' ? 'act' : ''}`} to="/Analysis"><li>Analysis</li></Link>
        <Link className={`sidebar-link ${props.active === 'setting' ? 'act' : ''}`} to="/Setting"><li>Setting</li></Link>
      </ul>
      <ul className="sidebar-links">
      <Link  onClick={()=> dispatch(logout())} className={"sidebar-link"} to='/'><li>Logout</li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;
