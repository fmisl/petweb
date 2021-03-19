import React,{useState, useEffect} from 'react';
import '../App.css';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../reduxs/actions';
import IconCrosshair from '../images/IconCrosshair';
import IconCrosshairOff from '../images/IconCrosshairOff';
import IconInvert from '../images/IconInvert';
import IconInvertOff from '../images/IconInvertOff';
import IconSN from '../images/IconSN';
import IconSNOff from '../images/IconSNOff';
import IconBurger from '../images/IconBurger';
import ImageViewer from './components/Cornerstone/ImageViewer';
import {IPinUSE} from '../services/IPs'
import {useParams} from 'react-router-dom' 
import * as services from '../services/fetchApi'
import Home from './components/Cornerstone/Home'


function View({}) {
  const counter = useSelector(state => state.counter);
  const listSelected = useSelector(state => state.listManager);
  const isLogged = useSelector(state => state.isLogged);
  const [showMenu, setShowMenu] = useState(false)
  // const [caseID, setCaseID] = useState(null)
  const { caseID } = useParams();
  const [isCrosshaired, setIsCrosshaired] = useState(true)
  const [isInverted, setIsInverted] = useState(true)
  const [isSNed, setIsSNed] = useState(true)
  const dispatch = useDispatch();
  const username = localStorage.getItem('username')
  const imageIdC = [...Array(108).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+caseID+'/output_coronal_100_'+i+'.png'));
  const imageIdS = [...Array(90).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+caseID+'/output_sagittal_100_'+i+'.png'));
  const imageIdA = [...Array(90).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+caseID+'/output_axial_100_'+i+'.png'));

  const stackCoronal = {
    imageIds: imageIdC,
    currentImageIdIndex: 50
  };
  const stackSaggital = {
    imageIds: imageIdS,
    currentImageIdIndex: 40
  };
  const stackAxial = {
    imageIds: imageIdA,
    currentImageIdIndex: 40
  };
  useEffect(() => {
    // console.log('useEffect (fileID): ',counter.fileID)
    // console.log("imageIdC: ",imageIdC[0])
    // console.log("imageIdS: ",imageIdS[0])
    // console.log("imageIdA: ",imageIdA[0])
  }, [counter])

  // const getCase = async (caseID) => {
  //   console.log('getCase (caseID): ',caseID)
  //   const token = localStorage.getItem('token')
  //   // res = await services.TokenVerify({'token':token})
  //   const res = await services.getCase({'token':token, id:caseID})
  //   console.log('res: ', res.data[0])
  //   // let slices = res.data[0].slices;
  // }
  // console.log("imageIdC: ",imageIdC)
  return (
    <div className="content" onClick={()=>setShowMenu(false)}>
      {/* <Sidebar />
      <Headerbar/> */}
      <div className="content-page">
        {/* <div className="view-box"> */}
          <div style={{background:"black",position: "absolute", top:"170px", left:"300px",width:"100%",height:"100%", width:"1550px", height:"850px"}}>
            <ImageViewer isCrosshaired={isCrosshaired} isInverted={isInverted} stackC={{ ...stackCoronal }} stackS={{ ...stackSaggital }} stackA={{ ...stackAxial }}/>
            {/* <Home caseID={caseID}/> */}
          </div>
        {/* </div> */}

        <div  className="content-title">
          <div className="content-info" >
            <div style={{marginRight:"25px"}}>
              Patient Name
              <div className="content-var">Daewoon Kim</div>
            </div>
            <div style={{margin: "0px 25px"}}>
              Patient ID
              <div className="content-var" >2020-0000</div>
            </div>
            <div style={{margin: "0px 25px"}}>
              Age
              <div className="content-var" >50</div>
            </div>
            <div style={{margin: "0px 25px"}}>
              Sex
              <div className="content-var" >Male</div>
            </div>
          </div>
          <div style={{display:"flex", color:"white"}}>
            <div className="view-btn" onClick={()=>setIsCrosshaired(!isCrosshaired)}>{isCrosshaired ? <IconCrosshair className="view-icon"/>:<IconCrosshairOff className="view-icon"/>}</div>
            <div className="view-btn" onClick={()=>setIsInverted(!isInverted)}>{isInverted ? <IconInvert className="view-icon"/>:<IconInvertOff className="view-icon"/>}</div>
            <div className="view-btn" onClick={()=>setIsSNed(!isSNed)}>{isSNed ? <IconSN className="view-icon"/>:<IconSNOff className="view-icon"/>}</div>
            <div className="view-btn opacity-bar" >
              Opacity:&nbsp;
              <input type="range" style={{height:"100%", width:"100%"}} value="50" step="1" min="0" max="100"/>
            </div>
            <div className="view-btn colormap-select">
              <select id="colormap" name="colormap" style={{height:"100%", width: "100%", background:"#383C41", border:"0px", color:"white", textAlignLast:"center"}}>
                <option value="hot" selected>Hot (colormap)</option>
                <option value="jet">Jet (colormap)</option>
                <option value="gray" >Gray (colormap)</option>
              </select>
            </div>
            <div className="view-btn template-select">
              <select id="template" name="template" style={{height:"100%", width: "100%", background:"#383C41", border:"0px", color:"white", textAlignLast:"center"}}>
                <option value="MNI" selected>MNI305</option>
              </select>
            </div>
            <div className="view-btn" onClick={(e)=>{e.stopPropagation();setShowMenu(!showMenu)}}>
              <IconBurger className={`view-icon ${showMenu && 'show'}`}/>
              {showMenu && 
                <div className="view-menu" onClick={(e)=>e.stopPropagation()}>
                  <div>Save</div>
                  <div>Delete</div>
                  <div>Export PNG</div>
                  <div>Export Nifti</div>
                </div>}
            </div>
          </div>
        </div>

        {/* <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>View page</h1>
          <h1>listSelected: {listSelected}</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment())}>+</button>
          <button onClick={()=> dispatch(decrement())}>-</button>
        </div> */}
        {/* {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>} */}
      </div>
    </div>
  );
}

export default View;