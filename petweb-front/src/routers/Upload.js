import React,{useState, useRef, useEffect,useCallback } from 'react';
import '../App.css';
import Worklist from "../modal/Worklist";
// import useWorklist from '../modal/useWorklist';
import Uploader from "../modal/Uploader";
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, addToList, removeFromList} from '../reduxs/actions';
import IconView from '../images/IconView';
import IconAnalysis from '../images/IconAnalysis';
import IconDelete from '../images/IconDelete';
import IconWorklist from '../images/IconWorklist';
import UploadTable from './components/Tables/UploadTable'
import * as services from '../services/fetchApi'
// import { useDropzone } from "react-dropzone";

function Upload({history}) {
  const [dragState, setDragState] = useState(false);
  const counter = useSelector(state => state.counter);
  const listSelected = useSelector(state => state.listManager);
  const [isShowingWorklist, setIsShowingWorklist] = useState(false);
  const [isShowingUploader, setIsShowingUploader] = useState(false);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  // const dropRef = useRef();

  function toggleWorklist() {
    setIsShowingWorklist(!isShowingWorklist);
  }
  function toggleUploader() {
    // alert("hi")
    // setDragState(false);
    setIsShowingUploader(!isShowingUploader);
  }
  // function handleDrop() {
  //   alert("drop")
  //   setIsShowingUploader(!isShowingUploader);
  // }
  // console.log(history.location.pathname)
  const toggleUploader2=(e)=>{
    //   e.preventDefault();
    setDragState(false)
    let formData = new FormData();
    const FilesObj = e.target.files;
    console.dir(FilesObj)
    // console.dir(FilesObj)
    // formData.append("myfiles", FilesObj)
    Array.from(FilesObj).map(myfile => formData.append("myfiles", myfile));
    console.dir(formData)
    // debugger;
    uploadFiles(formData)
    // if (FilesObj) {
    // }
    setIsShowingUploader(!isShowingUploader);
  };
  const uploadFiles = async formData =>{
    const token = localStorage.getItem('token')
    const res1 = await services.uploadFile({'token':token, 'obj':formData})
    // const headers = {
    //   Authorization: authProps.idToken // using Cognito authorizer
    // };
    // const response = await axios.post(
    //   "https://MY_ENDPOINT.execute-api.us-east-1.amazonaws.com/v1/",
    //   API_GATEWAY_POST_PAYLOAD_TEMPLATE,
    //   { headers }
    // );
    // const data = await response.json();
    // setToken(data.access_token);
  }

  // console.log(window.location.pathname)
  return (
    <div className="content">
      {/* <Sidebar />
      <Headerbar/> */}
      <Worklist isShowing={isShowingWorklist} hide={toggleWorklist}/>
      <Uploader isShowing={isShowingUploader} hide={toggleUploader}/>
      <div className="content-page">
        <div className="upload-title">
          <div style={{display:"flex"}}>
            <div className="upload-btn" onClick={()=>history.push('/view')}><IconView className="upload-icon"/>View</div>
            <div className="upload-btn" onClick={()=>history.push('/analysis/suvr')}><IconAnalysis className="upload-icon"/>Analysis</div>
            <div className="upload-btn" onClick={toggleWorklist}><IconWorklist className="upload-icon"/>Worklist</div>
            <div className="upload-btn"><IconDelete className="upload-icon"/>Delete</div>
            <div className="upload-btn" style={{width:"199px", marginLeft:"40px"}} >Connect to PACS</div>
          </div>
          <div style={{display:"flex", color:"white"}} >
            <label for="upload-input" className="upload-btn upload" >Upload</label>
            <input style={{display:"none"}} multiple type="file" id="upload-input" onChange={(e)=>toggleUploader2(e)} onClick={(e)=>e.target.value=null} />
          </div>
        </div>
        <div className="upload-table" onDragEnter={()=>{setDragState(true);}} onDragOver={()=>{if(!dragState) {setDragState(true);}}}>
          <UploadTable/>
          {dragState && 
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:"black", background:"rgba(0,0,0,0.8)", position:'absolute', position:'absolute', top:'0', left:'0', width:'100%', height:'100%', border:'white dashed', boxSizing:'border-box', borderRadius:'10px'}}>
                <input type='file' multiple style={{position:'absolute', top:'0', left:'0', border:'red solid', opacity:'0', width:'100%', height:'100%'}} onDragLeave={()=>{setDragState(false);}} onChange={(e)=>toggleUploader2(e)} onPointerOver={()=>{if (dragState) setDragState(false)}}/>
                <div style={{color:'white', fontSize:'60px'}}>Drag & Drop Files</div>
              </div>
          }
        </div>

        {/* <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>Upload page</h1>
          <h1>listSelected: {listSelected}</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment())}>+</button>
          <button onClick={()=> dispatch(decrement())}>-</button>
        </div> */}
      </div>
    </div>
  );
}
export default Upload;