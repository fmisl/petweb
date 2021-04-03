// import React,{useState, useEffect} from 'react';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../reduxs/actions';
import '../App.css';
import {useSelector, useDispatch} from 'react-redux';
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
import {login, logout, increment, decrement, loadItems, loadSlices, profile, tab_location, groupItem, addStack, updateStack, removeStack, fetchItems} from '../reduxs/actions';


// function View({}) {
class View extends Component {
  state = {
    username: localStorage.getItem('username'),
    showMenu: false,
    isCrosshaired: true,
    isInverted: true,
    isSNed: true,
    inoutSelect: 'output',
    imageIdC: [],
    imageIdS: [],
    imageIdA: [],
    stackCoronal:{},
    stackSaggital:{},
    stackAxial:{},
  };
  componentDidMount(){
    const {username, inoutSelect} = this.state;
    const {counter, stackManager} = this.props;
    const imageIdC = [...Array(109).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_coronal_'+i+'.png'));
    const imageIdS = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_sagittal_'+i+'.png'));
    const imageIdA = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_axial_'+i+'.png'));
    const stackCoronal = {
      imageIds: imageIdC,
      currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentC
    };
    const stackSaggital = {
      imageIds: imageIdS,
      currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentS
    };
    const stackAxial = {
      imageIds: imageIdA,
      currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentA
    };
    this.setState({
      imageIdC,
      imageIdS,
      imageIdA,
      stackCoronal,
      stackSaggital,
      stackAxial,
    })
  }
  setShowMenu = (value) =>{ this.setState({showMenu:value}) }
  setIsCrosshaired = (value) =>{ this.setState({isCrosshaired:value}) }
  setIsInverted = (value) =>{ this.setState({isInverted:value}) }
  setIsSNed = (value) =>{ this.setState({isSNed:value}) }
  setInoutSelect = (value) =>{ this.setState({inoutSelect:value}) }
  // const [showMenu, setShowMenu] = useState(false)
  // const [isCrosshaired, setIsCrosshaired] = useState(true)
  // const [isInverted, setIsInverted] = useState(true)
  // const [isSNed, setIsSNed] = useState(true)
  // const [inoutSelect, setInoutSelect] = useState("output")
  componentDidUpdate(prevProps, prevState){
    const {isSNed, username} = this.state;
    const {counter, stackManager} = this.props;
    const inoutSelect = isSNed ? "output":"input"
    if (prevProps.counter != counter || prevState.isSNed != isSNed){
      const imageIdC = [...Array(109).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_coronal_'+i+'.png'));
      const imageIdS = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_sagittal_'+i+'.png'));
      const imageIdA = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_axial_'+i+'.png'));
      const stackCoronal = {
        imageIds: imageIdC,
        currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentC
      };
      const stackSaggital = {
        imageIds: imageIdS,
        currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentS
      };
      const stackAxial = {
        imageIds: imageIdA,
        currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentA
      };
      this.setState({
        inoutSelect,
        imageIdC,
        imageIdS,
        imageIdA,
        stackCoronal,
        stackSaggital,
        stackAxial,
      })
    }
  }

  render() {
    const {setShowMenu,setIsCrosshaired,setIsInverted,setIsSNed,setInoutSelect} = this;
    const {isCrosshaired, isInverted, isSNed, showMenu, imageIdC, imageIdS, imageIdA, username, inoutSelect, stackCoronal,stackSaggital,stackAxial} = this.state;
    const {counter, stackManager} = this.props;
    console.log(this.state)
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
}
const mapStateToProps = (state) => ({
  // storeCount: state.count.count,
  counter:state.counter,
  isLogged:state.isLogged,
  stackManager:state.stackManager,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(actions.increment()),
  decrement: () => dispatch(actions.decrement()),
  addStack: (Stack)=> dispatch(actions.addStack(Stack)),
  updateStack: (Stack)=> dispatch(actions.updateStack(Stack)),
  removeStack: (Stack)=> dispatch(actions.removeStack(Stack)),
  login: () => dispatch(actions.login()),
  logout: () => dispatch(actions.logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(View);