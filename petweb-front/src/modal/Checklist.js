import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import IconDelete from '../images/IconDelete';
import ChecklistTable from './components/Tables/ChecklistTable'

function Checklist({ isShowing, hide }) {
  // const [isShown, setIsShown] = useState(false);
  return (
      <React.Fragment>
        {/* aria-modal aria-hidden tabIndex={-1} role="dialog"  */}
        <div className={`modal-right-wrapper ${isShowing && 'show'}`}>
          <div className="modal-right" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-right-btn"><div></div></div>
            <div className="modal-right-header" >
              CHECKLIST 
              {/* <span onClick={()=>hide} ><IconDelete className="checklist-delete" /></span> */}
            </div>
            <div className="modal-right-body">
              <ChecklistTable/>
            </div>
            <div style={{display:"flex", marginTop:"21px", justifyContent:"flex-end"}}>
              <div className="upload-right-btn">Export Nifti</div>
              <div className="upload-right-btn type1">Save</div>
              <div className="upload-right-btn type1">Open</div>
            </div>

          </div>
        </div>
        <div className="modal-right-overlay"  onClick={hide}/>
      </React.Fragment>
  );
}
export default Checklist;