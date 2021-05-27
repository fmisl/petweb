import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import './ConnectPACS.css';
import IconDelete from '../images/IconDelete';
import UploaderTable from './components/Tables/UploaderTable'
import loadingGIF from '../images/gif/spinner.gif'
// import * as services from '../services/fetchApi'
import {IPinUSE} from '../services/IPs'
import * as services from '../services/fetchApi'
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
function ConnectPACS({ setListID, listID, setFetchState, fetchState, setaddToWorklist, selectTracer, setSelectTracer, fileList, isShowing, hide, removeFileList, updateFileList }) {
  const [data, setData] = useState([]);
  const [hoverState, setHoverState] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [tracer, setTracer] = useState('');
  const [focusItem, setFelectItem] = useState(0);
//   const [tracerModal, setTracerModal] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [currentJPGURL_head, setCurrentJPGURL_head] = useState("");
  const username = localStorage.getItem('username')
  useEffect(() => {
    if (isShowing) {
    //   setTracerModal(true);
      // setSelectTracer('[18F]FMM');
    }
  },[isShowing])
  const getJPGURL=(filename)=>{
    const fname = filename.split('.').slice(0,-1).join()
    const tempURL_head = IPinUSE+'result/download/'+username+'/uploader/'+fname
    setCurrentJPGURL_head(tempURL_head)
  }
  useEffect(() => {
    if (alarm) {
      setAlarm(false);
      // alert(`Selected: [\u00B9\u2078F] `+tracer);
      if (tracer=="Pittsburg Compound B(PIB)"){
        setTimeout(() => alert(`Selected: [\u00B9\u00B9C] `+tracer), 100);
      } else {
        setTimeout(() => alert(`Selected: [\u00B9\u2078F] `+tracer), 100);
      }
    }
  },[alarm])
  const handleMouseHover=()=> {
    setHoverState(!hoverState);
  }
  const searchHandler = async () =>{
    //   alert('searchHandler')
    // setFetchState(true);
    // setListID(null);
    const token = localStorage.getItem('token')
    const res = await services.getPacs({'token':token})
    console.log(res);
    // const uploadList = res.data
    // setFileList(uploadList)
  }
  return (
    isShowing ? 
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={()=>{hide(false)}}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header" >
              PACS <span onClick={()=>hide(false)} ><IconDelete className="worklist-delete" /></span>
            </div>
            <div className="modal-body">
                <div style={{position:"relative", width:"810px", background:"#383C41", overflow:"hidden"}} onClick={()=>{setFelectItem(Math.floor(Math.random() * 20+30))}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-around", height:"8%", width:"100%", border:"0px red solid", boxSizing:"border-box"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"32%"}}>
                            <label for="Patient_name">PatientName</label>
                            <input id="Patient_name" type="text" placeholder="PatientName"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"32%"}}>
                            <label for="Patient_ID">PatientID</label>
                            <input id="Patient_ID" type="text"  placeholder="PatientID"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"32%"}}>
                            <label for="Date_of_birth">BirthDate</label>
                            <input id="Date_of_birth" type="text"  placeholder="BirthDate"/>
                        </div>
                    </div>
                    <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-around", height:"8%", width:"100%", border:"0px red solid", boxSizing:"border-box"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"32%"}}>
                            <label for="Study_date">StudyDate</label>
                            <input id="Study_date" type="text"  placeholder="StudyDate"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"32%"}}>
                            <label for="Modality">Modality</label>
                            <input id="Modality" type="text"  placeholder="Modality"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"32%"}}>
                            <label for="Study_description">StudyDescription</label>
                            <input id="Study_description" type="text" placeholder="StudyDescription"/>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent:"flex-end", border:"0px red solid", boxSizing:"border-box"}}>
                        <div style={{}} className="pacs-btn type1" onClick={()=>{searchHandler()}}>Search</div>
                    </div>
                    <div style={{marginTop:"20px", height:"70%", width:"100%", border:"1px yellow solid", boxSizing:"border-box"}}>
                        Hello
                    </div>
                </div>
                <div style={{position:"relative",width:"750px",height:"100%", background:"#383C41", border:"0px red solid"}}>
                    <div style={{...styleDiv, ...{top:"0", left:"0"}}} >
                    {currentJPGURL_head !== "" && <img width={'400px'} style={{transform:`scale(${fileList[listID]?.InputAffineX0 < 0 ? "-1":"1"}, ${fileList[listID]?.InputAffineZ2 < 0 ? "-1":"1"})`, border:"1px white solid", boxSizing:"border-box"}} src={currentJPGURL_head+'_hy.jpg'} alt=" "/>}
                    </div>
                    <div style={{...styleDiv, ...{top:"", left:"50%"}}} >
                    
                    {currentJPGURL_head !== "" && <img width={'400px'} style={{transform:`scale(${fileList[listID]?.InputAffineY1 < 0 ? "-1":"1"}, ${fileList[listID]?.InputAffineZ2 < 0 ? "-1":"1"})`, border:"1px white solid", boxSizing:"border-box"}} src={currentJPGURL_head+'_hx.jpg'} alt=" "/>}
                    </div>
                    <div style={{...styleDiv, ...{top:"50%", left:"0"}}} >
                    {currentJPGURL_head !== "" && <img width={'400px'} style={{transform:`scale(${fileList[listID]?.InputAffineX0 < 0 ? "1":"-1"}, ${fileList[listID]?.InputAffineY1 < 0 ? "-1":"1"})`, border:"1px white solid", boxSizing:"border-box"}} src={currentJPGURL_head+'_hz.jpg'} alt=" "/>}
                    </div>
                    <div style={{...styleDiv, ...{top:"50%", left:"50%"}}} >
                    </div>
                    {fileList[listID] && <div style={{position:"absolute", border:"0px red solid", top:"20%", left:"2%", width:"40%", userSelect:"none", display:"flex", justifyContent:"space-between", flexDirection:'row'}}><div>R</div><div>L</div></div>}
                    {fileList[listID] && <div style={{position:"absolute", border:"0px red solid", top:"20%", left:"52%", width:"40%", userSelect:"none", display:"flex", justifyContent:"space-between", flexDirection:'row'}}><div>P</div><div>A</div></div>}
                    {fileList[listID] && <div style={{position:"absolute", border:"0px red solid", top:"70%", left:"2%", width:"40%", userSelect:"none", display:"flex", justifyContent:"space-between", flexDirection:'row'}}><div>R</div><div>L</div></div>}
                    {fileList[listID] && <div style={{position:"absolute", border:"0px red solid", top:"5%", left:"23%", height:"37%", userSelect:"none", display:"flex", justifyContent:"space-between", flexDirection:'column'}}><div>S</div><div>I</div></div>}
                    {fileList[listID] && <div style={{position:"absolute", border:"0px red solid", top:"5%", left:"73%", height:"37%", userSelect:"none", display:"flex", justifyContent:"space-between", flexDirection:'column'}}><div>S</div><div>I</div></div>}
                    {fileList[listID] && <div style={{position:"absolute", border:"0px red solid", top:"50%", left:"23%", height:"45%", userSelect:"none", display:"flex", justifyContent:"space-between", flexDirection:'column'}}><div>A</div><div>P</div></div>}
                </div>
            </div>
            <div style={{display:"flex", marginTop:"21px", justifyContent:"space-between", alignItems:"center"}}>
                <div className="upload-checkbox-label" onClick={()=>{setaddToWorklist(!isChecked); setIsChecked(!isChecked);console.log("isChecked:", isChecked.toString())}}>
                    <div className={`upload-checkbox ${isChecked && 'act'}`}>
                    <div></div>
                    </div>
                    Automatically add to worklist
                </div>
                <div style={{display: "flex"}}>
                    <div style={{}} className="upload-btn"  onClick={()=>{hide(false)}}>Cancel</div>
                    <div style={{}} className="upload-btn type1" onClick={()=>{hide(false)}}>Run</div>
                </div>
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null
  );
}
export default ConnectPACS;