import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import IconDelete from '../images/IconDelete';
import UploaderTable from './components/Tables/UploaderTable'
// import * as services from '../services/fetchApi'
import {IPinUSE} from '../services/IPs'
const styleDiv ={
  position: "absolute",
  display: "flex",
  justifyContent:"center",
  alignItems:"center",
  // border: "1px white solid",
  // boxSizig: "border-box",
  width: "46%",
  height:"46%",
  // background: "black",
}
function Uploader({ isShowing, hide }) {
  const [focusItem, setFelectItem] = useState(0);
  const [isChecked, setIsChecked] = useState(true);
  return (
    isShowing ? 
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog"  onClick={hide}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header" >
              UPLOAD <span onClick={hide} ><IconDelete className="worklist-delete" /></span>
            </div>
            <div className="modal-body">
              <div style={{width:"40%", background:"#383C41"}} onClick={()=>{console.log(Math.floor(Math.random() * 20+30));setFelectItem(Math.floor(Math.random() * 20+30))}}>
                <UploaderTable />
              </div>
              <div style={{position:"relative",width:"750px",height:"100%", background:"#383C41"}}>
                <div style={{...styleDiv, ...{top:"0", left:"0"}}} >
                  <img height={'100%'} style={{border:"1px white solid", boxSizing:"border-box"}} 
                  src={IPinUSE+'result/download/case100/input_coronal_100_'+focusItem+'.png'}/>
                </div>
                <div style={{...styleDiv, ...{top:"", left:"50%"}}} >
                <img height={'100%'} style={{border:"1px white solid", boxSizing:"border-box"}} 
                src={IPinUSE+'result/download/case100/input_sagittal_100_'+focusItem+'.png'}/>
                </div>
                <div style={{...styleDiv, ...{top:"50%", left:"0"}}} >
                <img height={'100%'} style={{border:"1px white solid", boxSizing:"border-box"}} 
                src={IPinUSE+'result/download/case100/input_axial_100_'+focusItem+'.png'}/>
                </div>
                <div style={{...styleDiv, ...{top:"50%", left:"50%"}}} >
                {/* <img src={'http://localhost:8000/result/download/case100/input_axial_100_10.png'}/> */}
                </div>
              </div>
            </div>
            <div style={{display:"flex", marginTop:"21px", justifyContent:"space-between", alignItems:"center"}}>
              <div className="upload-checkbox-label" onClick={()=>{setIsChecked(!isChecked);console.log("isChecked:", isChecked.toString())}}>
                <div className={`upload-checkbox ${isChecked && 'act'}`}>
                  <div></div>
                </div>
                Automatically add to worklist
              </div>
              <div style={{display: "flex"}}>
                <div style={{}} className="upload-btn" onClick={hide}>Cancel</div>
                <div style={{}} className="upload-btn type1" onClick={hide}>Run</div>
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>, document.body
    ) : null
  );
}
export default Uploader;