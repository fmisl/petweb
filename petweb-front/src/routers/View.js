// import React,{useState, useEffect} from 'react';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../reduxs/actions';
import * as cornerstone from "cornerstone-core";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux';
import IconPlay from '../images/IconPlay';
import IconPlayPNG from '../images/play.png';
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

import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";

// function View({}) {
class View extends Component {
  state = {
    selectedColormap: 'gray',
    value5: {
      min: 0,
      max: 32767,
    },
    currentStepIndex: 20,
    username: localStorage.getItem('username'),
    showMenu: false,
    isPlayed: true,
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
    stackMip:{},
    petCStack: {},
    petSStack: {},
    petAStack: {},
  };
  componentDidMount(){
    const {username, inoutSelect} = this.state;
    const {counter, stackManager} = this.props;
    const imageIdC = [...Array(109).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_coronal_'+i+'.png'));
    const imageIdS = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_sagittal_'+i+'.png'));
    const imageIdA = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_axial_'+i+'.png'));
    const imageIdM = [...Array(45).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+'mip_'+inoutSelect+'_axial_'+i+'.png'));
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
    const stackMip = {
      imageIds: imageIdM,
      currentImageIdIndex: 0
    };

    const petCStack = {
      // patient: "anonymous",
      // studyID:  "1.3.6.1.4.1.5962.99.1.2237260787.1662717184.1234892907507.1411.0",
      imageIds: [],
      currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentC,
      options: {
        opacity: 1,
        visible: true,
        viewport: {
          colormap: 'hot',
        },
        name: 'PET'
      }
    };
    const petSStack = {
      // patient: "anonymous",
      // studyID:  "1.3.6.1.4.1.5962.99.1.2237260787.1662717184.1234892907507.1411.0",
      imageIds: [],
      currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentS,
      options: {
        opacity: 1,
        visible: true,
        viewport: {
          colormap: 'hot',
        },
        name: 'PET'
      }
    };
    const petAStack = {
      // patient: "anonymous",
      // studyID:  "1.3.6.1.4.1.5962.99.1.2237260787.1662717184.1234892907507.1411.0",
      imageIds: [],
      currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentA,
      options: {
        opacity: 1,
        visible: true,
        viewport: {
          colormap: 'gray',
        },
        name: 'PET'
      }
    };
    const petMStack = {
      // patient: "anonymous",
      // studyID:  "1.3.6.1.4.1.5962.99.1.2237260787.1662717184.1234892907507.1411.0",
      imageIds: [],
      currentImageIdIndex: 0,
      options: {
        opacity: 1,
        visible: true,
        viewport: {
          colormap: 'gray',
        },
        name: 'PET'
      }
    };
    this.setState({
      imageIdC,
      imageIdS,
      imageIdA,
      stackCoronal,
      stackSaggital,
      stackAxial,
      stackMip,
      petCStack,
      petSStack,
      petAStack,
      petMStack,
    })
  }
  setShowMenu = (value) =>{ this.setState({showMenu:value}) }
  setIsPlayed = (value) =>{ this.setState({isPlayed:value}) }
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
    const {counter, stackManager, sliceList} = this.props;
    const {imageLoader, metaDataLoader} = this;
    const inoutSelect = isSNed ? "output":"input"
    const IdxSlice = sliceList.findIndex(v=>v.fileID==counter.fileID)
    // console.log('prevProps.stackManager.length != stackManager.length', prevProps.stackManager.length != stackManager.length)
    if (prevProps.counter != counter || prevState.isSNed != isSNed || (stackManager.length != 0 && prevProps.sliceList.length != sliceList.length)){
      console.log('componentDidUpdate with counter', counter)
      const imageIdC = [...Array(109).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_coronal_'+i+'.png'));
      const imageIdS = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_sagittal_'+i+'.png'));
      const imageIdA = [...Array(91).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_axial_'+i+'.png'));
      const imageIdM = [...Array(90).keys()].map((v,i)=>(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+'mip_'+inoutSelect+'_axial_'+i+'.png'));
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
      const stackMip = {
        imageIds: imageIdM,
        currentImageIdIndex: 0
      };
      const petCStack = {
        imageIds: [...Array(109).keys()].map((v,i)=>("pet:"+inoutSelect+"/"+IdxSlice+"/coronal/"+i)),
        currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentC,
        options: {
          opacity: 1,
          visible: true,
          viewport: {
            colormap: this.state.isCrosshaired ? 'hot':'jet',
          },
          name: 'PET'
        }
      };
      const petSStack = {
        imageIds: [...Array(91).keys()].map((v,i)=>("pet:"+inoutSelect+"/"+IdxSlice+"/sagittal/"+i)),
        currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentS,
        options: {
          opacity: 1,
          visible: true,
          viewport: {
            colormap: 'hot',
          },
          name: 'PET'
        }
      };
      const petAStack = {
        imageIds: [...Array(91).keys()].map((v,i)=>("pet:"+inoutSelect+"/"+IdxSlice+"/axial/"+i)),
        currentImageIdIndex: stackManager.filter(v=>v.fileID==counter.fileID)[0].currentA,
        options: {
          opacity: 1,
          visible: true,
          viewport: {
            colormap: 'gray',
          },
          name: 'PET'
        }
      };
      const petMStack = {
        // IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+'mip_'+inoutSelect+'_axial_'+i+'.png'
        imageIds: [...Array(45).keys()].map((v,i)=>("pet:"+inoutSelect+"/"+IdxSlice+"/mip/"+i)),
        currentImageIdIndex: 0,
        options: {
          opacity: 1,
          visible: true,
          viewport: {
            colormap: 'gray',
          },
          name: 'PET'
        }
      };

      try{
        console.log('imageLoader update from sliceList B64Data')
        const isExistSlice = this.props.sliceList.findIndex(v=>v.fileID==this.props.counter.fileID)
        if (sliceList.length != 0 && stackManager.length != 0 && isExistSlice >= 0){
          console.log('isExistSlice ',isExistSlice)
          imageLoader(inoutSelect);
          metaDataLoader(inoutSelect);
          this.setState({
            inoutSelect,
            imageIdC,
            imageIdS,
            imageIdA,
            stackCoronal,
            stackSaggital,
            stackAxial,
            stackMip,
            petCStack,
            petSStack,
            petAStack,
            petMStack,
          })
        }
      } catch (e){
        console.log('imageLoader metaDataLoader fail')
      }
      // console.log("2");
      // this.metaDataLoader();
    }
  }

  handleInputChange = e => {
    this.setState({ currentStepIndex: e.currentTarget.value });
  };
  handleWindowChange = (WW,WC) => {
    // this.setState({ currentStepIndex: e.currentTarget.value });
    const {value5}=this.state;
    const newMin=Math.max(0,WC-WW/2);
    const newMax=Math.min(32767,WC+WW/2);
    if (value5.min != newMin || value5.max != newMax){
      this.setState({
        value5:{
          min: newMin,
          max: newMax,
        }
      })
    }
  };
  niftiDownload = async () =>{
    const {counter, stackManager} = this.props;
    console.log('download nifti')
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const fileID = stackManager?.[counter.tabX].fileID;
    const downloadUrl = IPinUSE+'result/download/'+username+'/database/'+fileID+"/"+"output_"+fileID+".nii";
    // // res = await services.TokenVerify({'token':token})
    // const res = await services.downloadNifti({'token':token});
    setTimeout(() => window.open(downloadUrl, "_blank"), 1000);
  }
  changeColormap = (event)=>{
    this.setState({selectedColormap: event.target.value});
  }
  render() {
    const {setShowMenu,setIsCrosshaired,setIsInverted,setIsSNed,setInoutSelect, resetDataReady, setIsPlayed, handleWindowChange, niftiDownload, changeColormap} = this;
    const {selectedColormap, value5, dataReady, isPlayed, isCrosshaired, isInverted, isSNed, showMenu, imageIdC, imageIdS, imageIdA, username, inoutSelect, petCStack,petSStack,petAStack, petMStack, currentStepIndex} = this.state;
    const {counter, stackManager} = this.props;
    // console.log(this.state.selectedColormap)
    return (
      <div className="content" onClick={()=>setShowMenu(false)}>
        {/* <Sidebar />
        <Headerbar/> */}
        <div className="content-page">
          {/* <div className="view-box"> */}
            <div style={{background:"black",position: "absolute", top:"140px", left:"300px",width:"100%",height:"100%", width:"1550px", height:"850px"}}>
              <ImageViewer selectedColormap={selectedColormap} handleWindowChange={handleWindowChange} value5={value5} currentStepIndex={currentStepIndex} isSNed={isSNed} isPlayed={isPlayed} isCrosshaired={isCrosshaired} isInverted={isInverted} stackC={{ ...petCStack }} stackS={{ ...petSStack }} stackA={{ ...petAStack }} stackM={{...petMStack}}/>
              {/* <Home caseID={caseID}/> */}
            </div>
          {/* </div> */}

          <div  className="content-title">
            <div className="content-info" style={{border:'0px red solid'}}>
              <div style={{marginRight:"10px", overflow:"hidden", width:"160px", height:"60px"}}>
                Patient Name
                <div className="content-var">{stackManager?.[counter.tabX].PatientName}</div>
              </div>
              <div style={{margin: "0px 10px"}}>
                Patient ID
                <div className="content-var" >{stackManager?.[counter.tabX].PatientID}</div>
              </div>
              <div style={{margin: "0px 10px"}}>
                Birth Date
                <div className="content-var" >{stackManager?.[counter.tabX].Age}</div>
              </div>
              <div style={{margin: "0px 10px"}}>
                Sex
                <div className="content-var" >{stackManager?.[counter.tabX].Sex}</div>
              </div>
            </div>
            <div style={{display:"flex", color:"white", border:'0px red solid'}}>
              <div className="view-btn" onClick={()=>setIsPlayed(!isPlayed)}><img src={IconPlayPNG} width={'42px'}  className="view-icon"/></div>
              <div className="view-btn opacity-bar" >
                MIP:&nbsp;
                <input type="range" style={{height:"100%", width:"100%"}} value={this.state.currentStepIndex} onInput={this.handleInputChange} step="1" min="0" max="50"/>
              </div>
              <div className="view-btn opacity-bar" >
                <InputRange
                  draggableTrack
                  step={1000}
                  maxValue={32768}
                  minValue={0}
                  value={this.state.value5}
                  onChange={value => this.setState({ value5: value })}
                  // orientation="vertical"
                />
              </div>
              <div className="view-btn" onClick={()=>setIsCrosshaired(!isCrosshaired)}>{isCrosshaired ? <IconCrosshair className="view-icon"/>:<IconCrosshairOff className="view-icon"/>}</div>
              <div className="view-btn" onClick={()=>setIsInverted(!isInverted)}>{isInverted ? <IconInvert className="view-icon"/>:<IconInvertOff className="view-icon"/>}</div>
              <div className="view-btn" onClick={()=>setIsSNed(!isSNed)}>{isSNed ? <IconSN className="view-icon"/>:<IconSNOff className="view-icon"/>}</div>
              {/* <div className="view-btn opacity-bar" >
                Opacity:&nbsp;
                <input type="range" style={{height:"100%", width:"100%"}} value="50" step="1" min="0" max="100"/>
              </div> */}
              <div className="view-btn colormap-select">
                <select id="colormap" name="colormap" onChange={this.changeColormap} value={this.state.selectedColormap}
                style={{height:"100%", width: "100%", background:"#383C41", border:"0px", color:"white", textAlignLast:"center"}}>
                  <option value="hot" >Hot (colormap)</option>
                  <option value="jet">Jet (colormap)</option>
                  <option value="gray">Gray (colormap)</option>
                </select>
              </div>
              {/* <div className="view-btn template-select">
                <select id="template" name="template" style={{height:"100%", width: "100%", background:"#383C41", border:"0px", color:"white", textAlignLast:"center"}}>
                  <option value="MNI" selected>MNI305</option>
                </select>
              </div> */}
              <div className="view-btn" onClick={(e)=>{e.stopPropagation();setShowMenu(!showMenu)}}>
                <IconBurger className={`view-icon ${showMenu && 'show'}`}/>
                {showMenu && 
                  <div className="view-menu" onClick={(e)=>e.stopPropagation()}>
                    {/* <div>Save</div> */}
                    {/* <div>Delete</div> */}
                    {/* <div>Export PNG</div> */}
                    <div onClick={niftiDownload}>Export Nifti</div>
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
  imageLoader = async (inoutSelect) => {

    "use strict";

    // console.log("imageLoader called");


    function pixelData2str(buf) {
      var bufView = new Uint16Array(buf);
      var len = bufView.length;
      var str = '';

      for(var i = 0; i < len; i++) {


        var word = bufView[i];
        var lower = word & 0xFF;
        var upper = (word >> 8) & 0xFF;
        str += String.fromCharCode(lower) + String.fromCharCode(upper);
      }

      return str;
    }

    function encodePixelData(pixelData) {
      var pixelDataAsString = pixelData2str(pixelData);
      var base64str = window.btoa(pixelDataAsString);
      return base64str;
    }

    function str2pixelData(str) {
      var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
      var bufView = new Int16Array(buf);
      var index = 0;
      for (var i=0, strLen=str.length; i<strLen; i+=2) {
        var lower = str.charCodeAt(i);
        var upper = str.charCodeAt(i+1);
        // debugger;
        bufView[index] = lower + (upper <<8);
        index++;
      }
      return bufView;
    }

    var min1 = 0;
    var max1 = 0;
    function getPixelData(base64PixelData)
    {
      if(!base64PixelData) debugger;
      var pixelDataAsString = window.atob(base64PixelData);
      var pixelData = str2pixelData(pixelDataAsString);
      // console.log("min:", pixelData.length);
      return pixelData;
    }
    const IdxSlice = this.props.sliceList.findIndex(v=>v.fileID==this.props.counter.fileID)
    console.log('imageLoader with counter and IdxSlice',this.props.counter,IdxSlice)
    var petAxialOutputData = [...Array(91).keys()].map((v,i)=>(getPixelData(this.props.sliceList[IdxSlice].B64.filter(v=>v.Direction=='axial' && v.Type==inoutSelect)[i].B64Data)));
    var petCoronalOutputData = [...Array(109).keys()].map((v,i)=>(getPixelData(this.props.sliceList[IdxSlice].B64.filter(v=>v.Direction=='coronal' && v.Type==inoutSelect)[i].B64Data)));
    var petSagittalOutputData = [...Array(91).keys()].map((v,i)=>(getPixelData(this.props.sliceList[IdxSlice].B64.filter(v=>v.Direction=='sagittal' && v.Type==inoutSelect)[i].B64Data)));
    // var petMipInputData = [...Array(45).keys()].map((v,i)=>(getPixelData(this.props.sliceList[IdxSlice].B64.filter(v=>v.Direction=='mip' && v.Type=='input')[i].B64Data)));
    var petMipOutputData = [...Array(45).keys()].map((v,i)=>(getPixelData(this.props.sliceList[IdxSlice].B64.filter(v=>v.Direction=='mip' && v.Type==inoutSelect)[i].B64Data)));

    function getPETImage(imageId) {
      let identifier=imageId.split(/[:,/]+/)
      let device = identifier[0]//pet
      let inout = identifier[1]//output
      let slice = identifier[2] //0
      let direction=identifier[3]
      let id=Number(identifier[4])
      var width = 91;
      var height = 91;
      if(direction === 'coronal') {width=91; height=91}
      else if(direction === 'sagittal') {width=109; height=91}
      else if(direction === 'axial') {width=91; height=109}
      else if (direction === "mip"){width = 109; height = 91}
      // else if(direction === 'mip'){width = 69; height = 51}
      // console.log("ID: ", ID, " Direction: ", Direction, " w/h: ", width,"/",height)

      var image = {
        imageId: imageId,

        minPixelValue : 0,
        maxPixelValue : 32767,
        slope: 1.0,
        intercept: 0,
        windowCenter : 16384,
        windowWidth : 32767,
        getPixelData: getPixelData,
        rows: height,
        columns: width,
        height: height,
        width: width,
        color: false,
        columnPixelSpacing: 2,
        rowPixelSpacing: 2,
        sizeInBytes: width * height * 2,
      };

      function getPixelData()
      {
        if (direction === "coronal"){return petCoronalOutputData[id]}
        else if (direction === "sagittal"){return petSagittalOutputData[id]}
        else if (direction === "axial"){return petAxialOutputData[id]}
        else if (direction === "mip"){return petMipOutputData[id]}
        // else if (direction === "mip" && inout === "output"){return petMipOutputData[id]}

        throw "unknown imageId";
      }

      return {
        promise: new Promise((resolve) => {
          resolve(image);
        }),
        cancelFn: undefined
      };
    }

    cornerstone.registerImageLoader('pet', getPETImage);
  };

  metaDataLoader = async (inoutSelect) => {

    "use strict";

    // console.log("2.5");
    function metaDataProvider(type, imageId) {
      let identifier=imageId.split(/[:,/]+/)
      let device = identifier[0]//pet
      let inout = identifier[1]//output
      let slice = identifier[2] //0
      let direction=identifier[3]
      let id=Number(identifier[4])
      let scale = 1;
      let cX = 1;
      let cY = 1;
      let cZ = 1;

      // let identifier=imageId.split('/')
      // // console.log(identifier)
      // let Device = identifier[0].substr(0,identifier[0].length-1)
      // let Type = identifier[identifier.length-3]
      // let Direction = identifier[identifier.length-2]
      // let ID = identifier[identifier.length-1]
      let width = 91;
      let height = 91;
      if (direction === "coronal"){width = 91; height = 91}
      else if (direction === "sagittal"){width = 109; height = 91}
      else if (direction === "axial"){width = 91; height = 109}
      else if (direction === "mip"){width = 109; height = 91}
      // else if (direction === "mip"){width = 69; height = 51}

      // console.log(identifier, type)
      if(type === 'imagePlaneModule') {
          if (direction === 'coronal'){
              return {
                  frameOfReferenceUID: '1.2.3.4.5',
                  rows: 91,
                  columns: 91,
                  rowCosines:     [ 0,  1,  0], 
                  columnCosines:  [ 0,  0,  1],
                  imagePositionPatient: [scale*id+cY, cX, cZ], //coronal plane에서 [xxx, sagittal line, axial line]
                  columnPixelSpacing: 1,
                  rowPixelSpacing: 1,
              }
          }
          else if (direction === 'sagittal'){
              return {
                  frameOfReferenceUID: '1.2.3.4.5',
                  rows: 91,
                  columns: 109,
                  rowCosines:     [1,  0,  0], 
                  columnCosines:  [ 0,  0, 1],
                  imagePositionPatient: [cY, scale*id+cX, cZ], //sagittal plane에서 [coroanl line, xxx, axial line]
                  columnPixelSpacing: 1,
                  rowPixelSpacing: 1,
              }
          }
          else if (direction === 'axial'){
              return {
                  frameOfReferenceUID: '1.2.3.4.5',
                  rows: 109,
                  columns: 91,
                  rowCosines:     [ 0, 1,  0], 
                  columnCosines:  [ -1,  0,  0],
                  imagePositionPatient: [cY+109, cX, -scale*id+cZ+91], //axial plane에서  [coronal line, sagittal line, xxx]
                  columnPixelSpacing: 1,
                  rowPixelSpacing: 1,
              }
          }
          // else if (direction === 'mip'){
          //     return {
          //         frameOfReferenceUID: '1.2.3.4.5.6',
          //         rows: 91,//91/2,
          //         columns: 109,//109/2,
          //         rowCosines:     [0,  0,  0], 
          //         columnCosines:  [ 0,  0, 0],
          //         // -(Math.sin(scale*id*8/180*Math.PI)+Math.cos(scale*id*8/180*Math.PI)) //sagittal plane에서 [coroanl line, xxx, axial line]
          //         // 109*id*8/360+109/2
          //         imagePositionPatient: [cY, cX, cZ], //sagittal plane에서 [coroanl line, xxx, axial line]
          //         columnPixelSpacing: 1,
          //         rowPixelSpacing: 1,
          //     }
          // }
      }
    }

    cornerstone.metaData.addProvider(metaDataProvider);

  };
}
const mapStateToProps = (state) => ({
  // storeCount: state.count.count,
  counter:state.counter,
  isLogged:state.isLogged,
  stackManager:state.stackManager,
  sliceList: state.sliceList,
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