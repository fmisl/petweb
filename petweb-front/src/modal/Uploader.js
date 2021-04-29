import React, { useState, useEffect } from 'react';
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
function Uploader({ setaddToWorklist, selectTracer, setSelectTracer, fileList, isShowing, hide, removeFileList, updateFileList }) {
  const [data, setData] = useState([]);
  const [alarm, setAlarm] = useState(false);
  const [tracer, setTracer] = useState('');
  const [focusItem, setFelectItem] = useState(0);
  const [tracerModal, setTracerModal] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [currentJPGURL_head, setCurrentJPGURL_head] = useState("");
  const username = localStorage.getItem('username')
  useEffect(() => {
    if (isShowing) {
      setTracerModal(true);
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
      alert(`Selected: [\u00B9\u2078F] `+tracer);
    }
  },[alarm])
  console.log(selectTracer.slice(-3) == 'FMM')
  return (
    isShowing ? 
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog"  onClick={(e)=>{hide(e);setCurrentJPGURL_head("")}}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header" >
              UPLOAD <span onClick={hide} ><IconDelete className="worklist-delete" /></span>
            </div>
            <div className="modal-body">
              <div style={{position:"relative", width:"810px", background:"#383C41", overflow:"hidden"}} onClick={()=>{console.log(Math.floor(Math.random() * 20+30));setFelectItem(Math.floor(Math.random() * 20+30))}}>

              <div style={{position:'relative', minWidth:'600px', minHeight:'60px'}}>
                <div className={`modal-header-btn FMM ${selectTracer.slice(-3) == 'FMM' && 'act'}`} onClick={()=>{setSelectTracer('[18F]FMM'); setTracer('Flutemetamol(FMM)'); setAlarm(true);}}>[<sup><sup>18</sup></sup>F]FMM</div>
                <div className={`modal-header-btn FBP ${selectTracer.slice(-3) == 'FBP' && 'act'}`} onClick={()=>{setSelectTracer('[18F]FBP'); setTracer('Florbetapir(FBP)'); setAlarm(true);}}>[<sup><sup>18</sup></sup>F]FBP</div>
                <div className={`modal-header-btn FBB ${selectTracer.slice(-3) == 'FBB' && 'act'}`} onClick={()=>{setSelectTracer('[18F]FBB'); setTracer('Florbetaben(FBB)'); setAlarm(true);}}>[<sup><sup>18</sup></sup>F]FBB</div>
              </div>
                <UploaderTable selectTracer={selectTracer} fileList={fileList} getJPGURL={getJPGURL} removeFileList={removeFileList} updateFileList={updateFileList}/>
              </div>
              <div style={{position:"relative",width:"750px",height:"100%", background:"#383C41"}}>
                <div style={{...styleDiv, ...{top:"0", left:"0"}}} >
                  {/* {currentJPGURL_head !== "" && <img height={'100%'} width={'300px'} style={{border:"1px white solid", boxSizing:"border-box"}}  */}
                  {currentJPGURL_head !== "" && <img width={'400px'} style={{border:"1px white solid", boxSizing:"border-box"}} 
                  // src={IPinUSE+'result/download/'+username+'uploader/input_coronal_'+focusItem+'.png'}/>
                  src={currentJPGURL_head+'_hy.jpg'} alt=" "/>}
                </div>
                <div style={{...styleDiv, ...{top:"", left:"50%"}}} >
                  {/* {currentJPGURL_head !== "" && <img height={'100%'} width={'300px'} style={{border:"1px white solid", boxSizing:"border-box"}}  */}
                  {currentJPGURL_head !== "" && <img width={'400px'} style={{border:"1px white solid", boxSizing:"border-box"}} 
                  // src={IPinUSE+'result/download/'+username+'uploader/input_sagittal_'+focusItem+'.png'}/>
                  src={currentJPGURL_head+'_hx.jpg'} alt=" "/>}
                </div>
                  <div style={{...styleDiv, ...{top:"50%", left:"0"}}} >
                  {/* {currentJPGURL_head !== "" && <img height={'100%'} width={'300px'} style={{border:"1px white solid", boxSizing:"border-box"}}  */}
                  {currentJPGURL_head !== "" && <img width={'400px'} style={{border:"1px white solid", boxSizing:"border-box"}} 
                  // src={IPinUSE+'result/download/'+username+'uploader/input_axial_'+focusItem+'.png'}/>
                  src={currentJPGURL_head+'_hz.jpg'} alt=" "/>}
                </div>
                <div style={{...styleDiv, ...{top:"50%", left:"50%"}}} >
                {/* <img src={'http://localhost:8000/result/download/case100/input_axial_10.png'}/> */}
                </div>
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
                <div style={{}} className="upload-btn" onClick={(e)=>{hide(e);setCurrentJPGURL_head("")}}>Cancel</div>
                <div style={{}} className="upload-btn type1" onClick={(e)=>{hide(e);setCurrentJPGURL_head("");}}>Run</div>
              </div>
            </div>
            {tracerModal && 
              <div className="modal-Tracer-Selector">
                <div style={{position:'relative', minWidth:'1000px', minHeight:'200px', display:"flex", justifyContent:"center"}}>
                  <div style={{position: 'absolute', top:'-200px'}}>Select tracer from below: </div>
                  <div className={`modal-tracer-btn FMM ${selectTracer.slice(-3) == 'FMM' && 'act'}`} onClick={()=>{setSelectTracer('[18F]FMM'); 
                  setTracer('Flutemetamol(FMM)'); setAlarm(true);// alert(`Selected: [\u00B9\u00B9C] `+`Pittsburg compound B`)
                  }}>
                    <div>[<sup>18</sup>F]Flutemetamol (FMM)</div>
                    <br/>
                    <div style={{fontSize:'26px'}}>Trade names: Vizamyl</div>
                    <div style={{fontSize:'26px'}}>Trader: GE Healthcare</div>
                  </div>
                  <div className={`modal-tracer-btn FBP ${selectTracer.slice(-3) == 'FBP' && 'act'}`} onClick={()=>{setSelectTracer('[18F]FBP'); 
                  setTracer('Florbetapir(FBP)'); setAlarm(true);// alert(`Selected: [\u00B9\u2078F] `+`Florbetapir`)
                  }}>
                    <div>[<sup>18</sup>F]Florbetapir (FBP)</div>
                    <br/>
                    <div style={{fontSize:'26px'}}>Trade names: Amyvid (AV-45)</div>
                    <div style={{fontSize:'26px'}}>Company: Lilly</div>
                  </div>
                  <div className={`modal-tracer-btn FBB ${selectTracer.slice(-3) == 'FBB' && 'act'}`} onClick={()=>{setSelectTracer('[18F]FBB'); 
                  setTracer('Florbetaben(FBB)'); setAlarm(true);// alert(`Selected: [\u00B9\u2078F] `+`Florbetaben`)
                  }}>
                    <div>[<sup>18</sup>F]Florbetaben (FBB)</div>
                    <br/>
                    <div style={{fontSize:'26px'}}>Trade names: Nuraceq (BAY-949172)</div>
                    <div style={{fontSize:'26px'}}>Company: Bayer</div>
                  </div>
                  <div className={`modal-tracer-confirm`} onClick={()=>{setTracerModal(false)}}>Select</div>
                </div>
              </div>}
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null
  );
}
export default Uploader;