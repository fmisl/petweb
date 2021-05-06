import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import IconDelete from '../images/IconDelete';
import WorklistTable from './components/Tables/WorklistTable'
import {login, logout, increment, decrement, loadItems, profile, tab_location, groupItem, addStack, updateStack, removeStack, openSelect} from '../reduxs/actions';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory, useParams, useLocation} from 'react-router-dom' 

function Worklist({ isShowing, hide, lock }) {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const stackManager = useSelector(state => state.stackManager);
  const fileList = useSelector(state => state.fileList);
  const history =useHistory();
  // const [isShown, setIsShown] = useState(false);
  const changePageByKey = (e) =>{
    switch (e.keyCode){
      case 17:
        hide()
        break;
      default:
        console.log('press up or down key only', e.keyCode)
    }
  }
  return (
      <React.Fragment >
        {/* aria-modal aria-hidden tabIndex={-1} role="dialog"  */}
        <div className={`modal-right-wrapper ${isShowing && 'show'}`}>
          <div className="modal-right" onClick={(e)=>e.stopPropagation()} tabIndex={0} onKeyDown={(e)=>{changePageByKey(e)}} onClick={lock}>
            <div className="modal-right-btn"><div></div></div>
            <div className="modal-right-header" >
              WORKLIST 
            </div>
            <div className="modal-right-body">
              <WorklistTable/>
            </div>
            <div style={{display:"flex", marginTop:"21px", justifyContent:"flex-end"}}>
              <div className="upload-right-btn">Export Nifti</div>
              <div className="upload-right-btn type1">Save</div>
              <div className="upload-right-btn type1" onClick={()=>{
                const nextStackManager = [...stackManager, ...fileList.filter((v, i)=>v.Opened == false && v.Select == true).map(v=>{return {fileID:v.fileID, currentC:50, currentS:50, currentA:50, PatientName:v.PatientName, PatientID:v.PatientID, Age:v.Age, Sex:v.Sex}})];
                // const nextStackManager = [...stackManager, ...fileList.filter((v,i)=>{if(v.Opened == false && v.Select == true) return {fileID:v.fileID, currentC:50, currentS:50, currentA:50}})]
                const lastIndex = nextStackManager.length-1;
                dispatch(openSelect());
                dispatch(addStack(nextStackManager));
                {lastIndex >= 0 ? dispatch(tab_location({...counter, tabX:lastIndex, fileID:nextStackManager[lastIndex].fileID})):dispatch(tab_location({...counter, tabX:null, fileID:null}))}
                setTimeout(() => history.push('/analysis/suvr/'+lastIndex), 100);
                }}>Open</div>
            </div>

          </div>
        </div>
        <div className="modal-right-overlay"  onClick={hide}/>
      </React.Fragment>
  );
}
export default Worklist;