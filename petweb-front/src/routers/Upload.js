import React,{useState, useRef, useEffect,useCallback } from 'react';
import '../App.css';
import Worklist from "../modal/Worklist";
// import useWorklist from '../modal/useWorklist';
import Uploader from "../modal/Uploader";
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, addToList, removeFromList,loadItems, fetchItems, openSelect} from '../reduxs/actions';
import IconView from '../images/IconView';
import IconAnalysis from '../images/IconAnalysis';
import IconDelete from '../images/IconDelete';
import IconWorklist from '../images/IconWorklist';
import UploadTable from './components/Tables/UploadTable'
import * as services from '../services/fetchApi'
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory, useParams, useLocation} from 'react-router-dom'
// import { useDropzone } from "react-dropzone";

function Upload({toggleChecklist}) {
  const history =useHistory();
  const [dragState, setDragState] = useState(false);
  const counter = useSelector(state => state.counter);
  const listSelected = useSelector(state => state.stackManager);
  const [isShowingWorklist, setIsShowingWorklist] = useState(false);
  const [isShowingUploader, setIsShowingUploader] = useState(false);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const [uploaderFileList, setUploaderFileList] = useState([]);

  const toggleUploader=(e)=>{
    //   e.preventDefault();
    setDragState(false)
    if (isShowingUploader==false){
      deleteFiles()
      let formData = new FormData();
      const FilesObj = e.target.files;
      Array.from(FilesObj).map(myfile => formData.append("myfiles", myfile));
      postFiles(formData)
    } else {
      if (e.target.innerText == "Run"){
        runFiles()
      }
      else {
        deleteFiles()
      }
    }
    setIsShowingUploader(!isShowingUploader);
  };

  const runFiles = async () =>{
    const token = localStorage.getItem('token')
    const res = await services.runFile({'token':token, 'obj':uploaderFileList})
    const putList = res.data
    // console.log(putList)
    dispatch(fetchItems(putList))
  }

  const deleteFiles = async () =>{
    const token = localStorage.getItem('token')
    const res = await services.deleteFile({'token':token})
    const uploadList = res.data
    console.log(uploadList)
    // setFileList(uploadList)
  }

  const postFiles = async formData =>{
    const token = localStorage.getItem('token')
    const res = await services.postFile({'token':token, 'obj':formData})
    const uploadList = res.data
    setUploaderFileList(uploadList)
  }

  const removeFileList=(record)=>{
    setUploaderFileList(
      uploaderFileList.filter(item => item.id !== record.id)
    )
  }

  const updateFileList=(record)=>{
    setUploaderFileList(
      uploaderFileList.map(
        item => record.id === item.id ?
        { ...item, ...{Select:!record.Select, Focus:true} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
          : {...item,...{Focus:false}} // 기존의 값을 그대로 유지
      )
    )
  }

  return (
    <div className="content">
      {/* <Sidebar />
      <Headerbar/> */}
      {/* <Worklist isShowing={isShowingWorklist} hide={toggleWorklist}/> */}
      <Uploader fileList={uploaderFileList} isShowing={isShowingUploader} hide={toggleUploader} removeFileList={removeFileList} updateFileList={updateFileList}/>
      <div className="content-page">
        <div className="upload-title">
          <div style={{display:"flex"}}>
            <div className="upload-btn" onClick={()=>{dispatch(openSelect());history.push('/view/'+counter.tabX)}}><IconView className="upload-icon"/>View</div>
            <div className="upload-btn" onClick={()=>{dispatch(openSelect());history.push('/analysis/suvr/'+counter.tabX)}}><IconAnalysis className="upload-icon"/>Analysis</div>
            <div className="upload-btn" onClick={toggleChecklist}><IconWorklist className="upload-icon"/>Checklist</div>
            <div className="upload-btn"><IconDelete className="upload-icon"/>Delete</div>
            <div className="upload-btn" style={{width:"199px", marginLeft:"40px"}} >Connect to PACS</div>
          </div>
          <div style={{display:"flex", color:"white"}} >
            <label for="upload-input" className="upload-btn upload" >Upload</label>
            <input style={{display:"none"}} multiple type="file" id="upload-input" onChange={(e)=>toggleUploader(e)} onClick={(e)=>e.target.value=null} />
          </div>
        </div>
        <div className="upload-table" onDragEnter={()=>{setDragState(true);}} onDragOver={()=>{if(!dragState) {setDragState(true);}}}>
          <UploadTable/>
          {dragState && 
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:"black", background:"rgba(0,0,0,0.8)", position:'absolute', position:'absolute', top:'0', left:'0', width:'100%', height:'100%', border:'white dashed', boxSizing:'border-box', borderRadius:'10px'}}>
                <input type='file' multiple style={{position:'absolute', top:'0', left:'0', border:'red solid', opacity:'0', width:'100%', height:'100%'}} onDragLeave={()=>{setDragState(false);}} onChange={(e)=>toggleUploader(e)} onPointerOver={()=>{if (dragState) setDragState(false)}}/>
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