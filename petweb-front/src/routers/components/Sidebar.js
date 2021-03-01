import React, {useState} from 'react';
import '../../App.css'
import {useHistory, Redirect, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../reduxs/actions';
// import logoWhite from '../../images/logo-white.png'
import LogoWhite from '../../images/LogoWhite';
import IconDashboard from '../../images/IconDashboard';
import IconUpload from '../../images/IconUpload';
import IconView from '../../images/IconView';
import IconAnalysis from '../../images/IconAnalysis';
import IconSetting from '../../images/IconSetting';
import IconLogout from '../../images/IconLogout';

function Sidebar() {
  const dispatch = useDispatch();
  const history =useHistory();
  return (
    <div className="sidebar">
      <div className='sidebar-logo'><LogoWhite fill="white"/></div>
      <ul className='sidebar-grp1' >
        {/* <div className={`sidebar-grp1-item ${history.location.pathname === '/dashboard' ? 'act' : ''}`}> */}
        <div className={`sidebar-grp1-menu ${history.location.pathname.split('/')[1] == 'dashboard' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/dashboard');}}>
          <div className={`sidebar-grp1-menu-title`}><IconDashboard size={'40'} stroke={history.location.pathname === '/dashboard' ? "#118AF7" : "#ccccda"}/><li>Dashboard</li></div>
        </div>
        {/* <div onClick={()=>history.push('/dashboard/profile')} className={`sidebar-link-contents ${history.location.pathname === '/dashboard' ? '' : ''}`}><li>profile</li></div> */}
        <div className={`sidebar-grp1-menu ${history.location.pathname.split('/')[1] == 'upload' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/upload');}}>
          <div className={`sidebar-grp1-menu-title`}><IconUpload size={'40'} stroke={history.location.pathname === '/upload' ? "#118AF7" : "#ccccda"}/><li>Upload</li></div>
        </div>
        <div className={'sidebar-grp1-splitter'}></div>
        <div className={`sidebar-grp1-menu ${history.location.pathname.split('/')[1] == 'view' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/view');}}>
          <div className={`sidebar-grp1-menu-title`}><IconView size={'40'} stroke={history.location.pathname === '/view' ? "#118AF7" : "#ccccda"}/><li>View</li></div>
        </div>
        <div className={`sidebar-grp1-menu ${history.location.pathname.split('/')[1] == 'analysis' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/analysis/suvr');}}>
          <div className={`sidebar-grp1-menu-title`}><IconAnalysis size={'40'} stroke={history.location.pathname.split('/')[1] === 'analysis' ? "#118AF7" : "#ccccda"} onClick={(e)=>{e.stopPropagation(); history.push('/analysis/suvr');}}/><li>Analysis</li></div>
          <div className={`sidebar-grp1-menu-item ${history.location.pathname == '/analysis/suvr' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/analysis/suvr');}}><li>SUVR</li></div>
          <div className={`sidebar-grp1-menu-item ${history.location.pathname == '/analysis/report' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/analysis/report');}}><li>Report</li></div>
        </div>
        <div className={`sidebar-grp1-menu ${history.location.pathname.split('/')[1] == 'setting' ? 'act' : ''}`} onClick={(e)=>{e.stopPropagation(); history.push('/setting');}}>
          <div className={`sidebar-grp1-menu-title`}><IconSetting size={'40'} stroke={history.location.pathname === '/setting' ? "#118AF7" : "#ccccda"}/><li>Setting</li></div>
        </div>
      </ul>
      <ul className='sidebar-grp2'>
        <div className={`sidebar-grp2-menu`} onClick={()=> {dispatch(logout());localStorage.removeItem("token");}} >
          <div className={`sidebar-grp2-menu-title`}><IconLogout size={'40'} stroke={"#ccccda"}/><li>Logout</li></div>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
