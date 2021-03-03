import React,{useState} from 'react';
import '../App.css';
import Sidebar from './components/Sidebar'
import Headerbar from './components/Headerbar'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../reduxs/actions';
import IconCrosshair from '../images/IconCrosshair';
import IconCrosshairOff from '../images/IconCrosshairOff';
import IconInvert from '../images/IconInvert';
import IconInvertOff from '../images/IconInvertOff';
import IconSN from '../images/IconSN';
import IconSNOff from '../images/IconSNOff';
import IconBurger from '../images/IconBurger';

function View({history}) {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const [showMenu, setShowMenu] = useState(false)
  const [isCrosshaired, setIsCrosshaired] = useState(true)
  const [isInverted, setIsInverted] = useState(true)
  const [isSNed, setIsSNed] = useState(true)
  const dispatch = useDispatch();
  // console.log(history.location.pathname)
  console.log(window.location.pathname)
  return (
    <div className="content" onClick={()=>setShowMenu(false)}>
      <Sidebar />
      <Headerbar/>
      <div className="content-page">
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

        <div className="redux-info">
          <h1>isLogged: {isLogged.toString()}</h1>
          <h1>View page</h1>
          <h1>Counter: {counter}</h1>
          <button onClick={()=> dispatch(increment(1))}>+</button>
          <button onClick={()=> dispatch(decrement(2))}>-</button>
          {/* {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>} */}
        </div>
      </div>
    </div>
  );
}

export default View;