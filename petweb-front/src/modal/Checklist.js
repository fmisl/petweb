import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import IconDelete from '../images/IconDelete';
import WorklistTable from './components/Tables/WorklistTable'

function Checklist({ isShowing, hide }) {
  // const [isShown, setIsShown] = useState(false);
  return (
    isShowing ? 
    ReactDOM.createPortal(
      <React.Fragment>
        {/* aria-modal aria-hidden tabIndex={-1} role="dialog"  */}
        <div className="modal-right-wrapper"  onClick={hide}>
          <div className="modal-right" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-right-btn"><div></div></div>
            <div className="modal-right-header" >
              WORKLIST <span onClick={hide} ><IconDelete className="worklist-delete" /></span>
            </div>
            <div className="modal-right-body">
              <WorklistTable/>
            </div>
            <div style={{display:"flex", marginTop:"21px", justifyContent:"flex-end"}}>
              <div className="upload-right-btn">Export Nifti</div>
              <div className="upload-right-btn type1">Save</div>
              <div className="upload-right-btn type1">Open</div>
            </div>

          </div>
        </div>
        <div className="modal-right-overlay"/>
      </React.Fragment>, document.body
    ) : null
  );
}
export default Checklist;