import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import './ConnectPACS.css';
import IconDelete from '../images/IconDelete';
import UploaderTable from './components/Tables/UploaderTable'
import loadingGIF from '../images/gif/spinner.gif'
// import * as services from '../services/fetchApi'
import {IPinUSE} from '../services/IPs'
import {useSelector, useDispatch} from 'react-redux';
import * as services from '../services/fetchApi'
import {increment, decrement, addToList, removeFromList,loadItems, fetchItems, openSelect, tab_location, addStack} from '../reduxs/actions';
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
function ConnectPACS({ setListID, listID, setFetchState, fetchState, selectTracer, setSelectTracer, fileList, isShowing, hide, removeFileList, updateFileList }) {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    PatientID: '', 	//사용할 문자열들을 저장하는 객체 형태로 관리!
    StudyDate: '',
  });
  const { PatientID, StudyDate } = inputs; 
  const [hoverState, setHoverState] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tracer, setTracer] = useState('');
  const [focusItem, setFelectItem] = useState(0);
//   const [tracerModal, setTracerModal] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [currentJPGURL_head, setCurrentJPGURL_head] = useState("");
  const [addToWorklist, setaddToWorklist] = useState(true);
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  useEffect(() => {
    if (isShowing) {
        setCurrentJPGURL_head('')
        deleteFiles();
    } else {
        setCurrentJPGURL_head('')
        deleteFiles();
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
  const deleteFiles = async () =>{
    const token = localStorage.getItem('token')
    const res = await services.deleteFile({'token':token})
    const uploadList = res.data
    setData([])
  }
  const searchHandler = async () =>{
    //   alert('searchHandler')
    // setFetchState(true);
    // setListID(null);
    setFetching(true);
    const token = localStorage.getItem('token')
    const res = await services.postPacs({'PatientID':PatientID, 'StudyDate':StudyDate, 'token':token})
    console.log(res.data);
    setData(res.data)
    setFetching(false);
    // const uploadList = res.data
    // setFileList(uploadList)
  }
  const handleChange = (e) => { 
    const { name, value }  = e.target;
    
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  const handleReset = () => {
    setInputs({
      PatientID: '',
      StudyDate: '',
    });
  };

  const runFiles = async (selectTracer, addToWorklist) =>{
    const token = localStorage.getItem('token')
    const res = await services.runFile({'token':token, 'obj':data, 'Tracer':selectTracer, 'addToWorklist':addToWorklist})
    const putList = res.data
    dispatch(fetchItems(putList))
  }
  return (
    isShowing ? 
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={()=>{hide(false); deleteFiles();}}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header" >
              PACS <span onClick={()=>{hide(false); deleteFiles();}} ><IconDelete className="worklist-delete" /></span>
            </div>
            <div className="modal-body">
                <div style={{position:"relative", width:"810px", background:"#383C41", overflow:"hidden"}} onClick={()=>{setFelectItem(Math.floor(Math.random() * 20+30))}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-around", height:"12%", width:"100%", border:"0px red solid", boxSizing:"border-box"}}>
                        <div className="pacs-form" style={{border:"0px red solid", display:"flex", flexDirection:"column", width:"35%"}}>
                            <label for="PatientID">Patient_ID
                                <input name="PatientID" type="text" placeholder="PatientID"
                                    value={PatientID}
                                    onChange={handleChange}/>
                            </label>
                        </div>
                        <div className="pacs-form" style={{border:"0px red solid", display:"flex", flexDirection:"column", width:"35%"}}>
                            <label for="StudyDate">StudyDate
                                <input name="StudyDate" type="text" placeholder="StudyDate"
                                    value={StudyDate}
                                    onChange={handleChange}/>
                            </label>
                        </div>
                        <div className="pacs-form" style={{display: "flex", justifyContent:"flex-end", border:"0px red solid", boxSizing:"border-box"}}>
                            <div style={{}} className="pacs-btn type1" onClick={()=>{searchHandler(); handleReset()}}>Search</div>
                        </div>
                    </div>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"20px", height:"70%", width:"103%", border:"0px white solid", boxSizing:"border-box"}}>
                        {fetching ? <img src={loadingGIF}/>:<UploaderTable setListID={setListID} selectTracer={selectTracer} fileList={data} getJPGURL={getJPGURL} removeFileList={removeFileList} updateFileList={updateFileList}/>}
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
                    <div style={{}} className="upload-btn"  onClick={()=>{hide(false); deleteFiles();}}>Cancel</div>
                    <div style={{}} className="upload-btn type1" onClick={()=>{hide(false); runFiles(selectTracer, addToWorklist);}}>Run</div>
                </div>
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null
  );
}
export default ConnectPACS;