import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import IconDelete from '../images/IconDelete';
import WorklistTable from './components/Tables/WorklistTable'
import {login, logout, increment, decrement, loadItems, profile, tab_location, groupItem, addStack, updateStack, removeStack, openSelect} from '../reduxs/actions';
import {useSelector, useDispatch} from 'react-redux';

function Worklist({ isShowing, hide, lock }) {
  const dispatch = useDispatch();
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
              <div className="upload-right-btn type1" onClick={()=>{dispatch(openSelect())}}>Open</div>
            </div>

          </div>
        </div>
        <div className="modal-right-overlay"  onClick={hide}/>
      </React.Fragment>
  );
}
export default Worklist;