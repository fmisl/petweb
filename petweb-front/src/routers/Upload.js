import React,{useState} from 'react';
import '../App.css';
import Sidebar from './components/Sidebar'
import Headerbar from './components/Headerbar'
import Worklist from "../modal/Worklist";
import useWorklist from '../modal/useWorklist';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../reduxs/actions';
import IconView from '../images/IconView';
import IconAnalysis from '../images/IconAnalysis';
import IconDelete from '../images/IconDelete';
import IconWorklist from '../images/IconWorklist';
import UploadTable from './components/Tables/UploadTable'

function Upload({history}) {
  const counter = useSelector(state => state.counter);
  const [isShowing, setIsShowing] = useState(false);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  function toggle() {
    setIsShowing(!isShowing);
  }
  // console.log(history.location.pathname)
  console.log(window.location.pathname)
  return (
    <div className="content">
      <Sidebar />
      <Headerbar/>
      <Worklist isShowing={isShowing} hide={toggle}/>
      <div className="content-page">
        <div className="upload-title">
          <div style={{display:"flex"}}>
            <div className="upload-btn" onClick={()=>history.push('/view')}><IconView className="upload-icon"/>View</div>
            <div className="upload-btn" onClick={()=>history.push('/analysis/suvr')}><IconAnalysis className="upload-icon"/>Analysis</div>
            <div className="upload-btn" onClick={toggle}><IconWorklist className="upload-icon"/>Worklist</div>
            <div className="upload-btn"><IconDelete className="upload-icon"/>Delete</div>
            <div className="upload-btn" style={{width:"199px", marginLeft:"40px"}}>Connect to PACS</div>
          </div>
          <div style={{display:"flex", color:"white"}}>
            <div className="upload-btn upload" >Upload</div>
          </div>
        </div>
        <div className="upload-table">
          <UploadTable/>
        </div>

        <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>Upload page</h1>
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