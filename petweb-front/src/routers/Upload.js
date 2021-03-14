import React,{useState, useRef, useEffect } from 'react';
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

function Upload({history}) {
  const counter = useSelector(state => state.counter);
  const listSelected = useSelector(state => state.listManager);
  const [isShowingWorklist, setIsShowingWorklist] = useState(false);
  const [isShowingUploader, setIsShowingUploader] = useState(false);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const dropRef = useRef();
  

  function toggleWorklist() {
    setIsShowingWorklist(!isShowingWorklist);
  }
  function toggleUploader() {
    // alert("hi")
    setIsShowingUploader(!isShowingUploader);
  }
  // function handleDrop() {
  //   alert("drop")
  //   setIsShowingUploader(!isShowingUploader);
  // }
  // console.log(history.location.pathname)
  const toggleUploader2=(e)=>{
    //   e.preventDefault();
    setIsShowingUploader(!isShowingUploader);
  };

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
            <div className="upload-btn" style={{width:"199px", marginLeft:"40px"}}>Connect to PACS</div>
          </div>
          <div style={{display:"flex", color:"white"}} >
            <label for="upload-input" className="upload-btn upload" >Upload</label>
            <input style={{display:"none"}} multiple type="file" id="upload-input" onChange={(e)=>toggleUploader2(e)} onClick={(e)=>e.target.value=null} />
          </div>
        </div>
        <div className="upload-table">
          <UploadTable/>
        </div>

        <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>Upload page</h1>
          <h1>listSelected: {listSelected}</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment())}>+</button>
          <button onClick={()=> dispatch(decrement())}>-</button>
          {/* {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>} */}
        </div>
      </div>
    </div>
  );
}
export default Upload;