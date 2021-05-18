import React, { Component } from 'react'
import './ImageViewer.css'

import { render } from "react-dom";
import { connect } from 'react-redux';
import * as actions from '../../../reduxs/actions';
// Importing all the dependencies for the Cornerstone library
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import { CartesianGrid } from 'recharts';
import graycmap from "../../../images/graycmap.png"
import invertedgraycmap from "../../../images/invertedgraycmap.png"
import hotcmap from "../../../images/hotcmap.png"
import invertedhotcmap from "../../../images/invertedhotcmap.png"
import jetcmap from "../../../images/jetcmap.png"
import invertedjetcmap from "../../../images/invertedjetcmap.png"
// import InputRange from 'react-input-range';
// import "react-input-range/lib/css/index.css";

// Listing the dependencies for reference laterInput
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
// The image, from a url, that we will be uploading and viewing with code below. 

// import cornerstone from 'cornerstone-core';
// import cornerstoneMath from 'cornerstone-math';
// import cornerstoneTools from 'cornerstone-tools';
// import Hammer from 'hammerjs';
// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;
// cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

// cornerstoneTools.init();
// const LengthTool = cornerstoneTools.LengthTool;


const bottomLeftStyle = {
  bottom: "5px",
  left: "5px",
  position: "absolute",
  color: "white"
};

const bottomRightStyle = {
  bottom: "5px",
  right: "5px",
  position: "absolute",
  color: "white"
};

class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ww: 10000,
      wc: 16384,
      value5: {
        min: 3,
        max: 7,
      },
      in_suvr_max:0, 
      in_suvr_min:0,
      out_suvr_max:0,
      out_suvr_min:0
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onImageRendered = this.onImageRendered.bind(this);
    this.onNewImage = this.onNewImage.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.wwwcsynchronizer = new cornerstoneTools.Synchronizer("cornerstoneimagerendered", cornerstoneTools.wwwcSynchronizer);
    this.synchronizer = new cornerstoneTools.Synchronizer("cornerstonenewimage", cornerstoneTools.updateImageSynchronizer);
    // var synchronizer = new cornerstoneTools.Synchronizer("cornerstonenewimage", cornerstoneTools.updateImageSynchronizer);
  }

  render() {
    const {ww, wc, in_suvr_max, in_suvr_min, out_suvr_max, out_suvr_min} = this.state;
    const { isInverted, isCrosshaired, selectedColormap, isSNed } = this.props;
    const divStyleC = {
      // width: "512px",
      // height: "512px",
      top:"0px",
      // left:"175px",
      left:"100px",
      // width:"775px",
      // width:"425px",
      width:"612px",
      height:"425px",
      position: "absolute",
      color: "white",
      // backgroundColor: 'rgba(255, 255, 128, .5)',
      // filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
    };
    const divStyleS = {
      // width: "512px",
      // height: "512px",
      top:"0px",
      // left:"50%",
      // left:"900px",
      left:"712px",
      // width:"775px",
      width:"602px",
      height:"425px",
      position: "absolute",
      color: "white",
      // filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
    };
    const divStyleA = {
      // width: "512px",
      // height: "512px",
      top:"390px",
      // left:"0",
      // width:"775px",
      // left:"175px",
      left:"100px",
      // width:"775px",
      // width:"425px",
      width:"612px",
      // height:"425px",
      height:"603px",
      position: "absolute",
      color: "white",
      // filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
      // background:"white !important",
    };
    const divStyleM = {
      // width: "512px",
      // height: "512px",
      top:"425px",
      // left:"50%",
      // left:"847px",
      // left:"726px",
      left:"655px",
      // width:"775px",
      width:"723px",
      // height:"425px",
      height:"510px",
      position: "absolute",
      color: "white",
      // filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
      // background:"white !important",
    };
    const divWrapper = {
      position:"relative",
      // width:"1550px", 
      // height:"937px", 
      // width:"1550px", 
      // width:"1550px",
      left:"74px",
      width:"1314px",
      height:"933px", 
      overflow:"hidden",
      // background: isInverted ? "red":"black",
      // background: isInverted ? "white":"black",
      // background: "white !important",
      // border:"1px red solid",
    };
    const viewportC = this.elementC && cornerstone.getViewport(this.elementC);

    const suvr_max = isSNed ? out_suvr_max:in_suvr_max;
    const suvr_min = Math.max(0, isSNed ? out_suvr_min:in_suvr_min);
    const widthSUVR = (viewportC !== undefined) ? ((ww/32767)*(suvr_max-suvr_min)):1;
    const centerSUVR = (viewportC !== undefined) ? ((wc/32767)*(suvr_max-suvr_min)):1;
    // const suvrMax = wc + ww/2;
    // const suvrMin = wc - ww/2;
    return (
      <div style={divWrapper}>
        <div
          className="viewportElement mip"
          style={divStyleM}
          ref={input => {
            this.elementM = input;
          }}
          // onClick={(e)=>{
          // }}
        >
          <canvas className="cornerstone-canvas" onContextMenu={(e)=> {e.preventDefault()}}/>
        </div>
        <div
          className="viewportElement axial"
          style={divStyleA}
          ref={input => {
            this.elementA = input;
          }}
          // onClick={(e)=>{
          // }}
        >
          <canvas className="cornerstone-canvas" onContextMenu={(e)=> {e.preventDefault()}}/>
        </div>
        <div
          className="viewportElement coronal"
          style={divStyleC}
          ref={input => {
            this.elementC = input;
          }}
          // onClick={(e)=>{
          //     console.dir(e); 
          //     console.log("x:",e.pageX," y:",e.pageY);
          //     console.log("x - 300:",e.pageX - 300," y - 170 + 89:",-e.pageY + 170 - 89);
          //     console.log("(x - 300)/775*90:",(e.pageX - 300)/775*90," y - 170 + 89:",-e.pageY + 170 - 89);
              
          //   }
          // }
        >

          <canvas className="cornerstone-canvas" onContextMenu={(e)=> {e.preventDefault()}}/>
          {/* <div style={{position:"absolute", top:"0px"}}>
              WW/WC: {(viewportC !== undefined) && viewportC.voi.windowWidth} /{" "}
              {(viewportC !== undefined) && viewportC.voi.windowCenter}
          </div> */}
        </div>
        <div
          className="viewportElement sagittal"
          style={divStyleS}
          ref={input => {
            this.elementS = input;
          }}
          // onClick={(e)=>{
          // }}
        >
          <canvas className="cornerstone-canvas" onContextMenu={(e)=> {e.preventDefault()}}/>
        </div>
        {/* {this.props.isCrosshaired && <div className="coronal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.props.stackC.currentImageIdIndex/108*50}%`,left:"0%", width:"50%", height:"0%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="coronal-sagittal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",top:"0%",left:`${this.props.stackC.currentImageIdIndex/108*50+50}%`, width:"0%", height:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="sagittal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.props.stackS.currentImageIdIndex/90*50}%`, height:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="sagittal-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.props.stackS.currentImageIdIndex/90*50}%`, top:"50%", height:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="axial-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:"0%", bottom:`${this.props.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="axial-sagittal" style={{position:"absolute", border:"1px red solid", boxSizing:"border-box",left:"50%", bottom:`${this.props.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>} */}
        {/* {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"0%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>}
        {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"50%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>}
        {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"0%",top:"50%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>}
        {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"50%",top:"50%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>}*/}

        {<div style={{position:"absolute",height:'0px', width:'42%', boxSizing:"border-box",left:"10%",top:"20%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'25px', paddingRight:'17px', border:'0px yellow solid'}}><div>{this.CoronalLeftSide}</div><div>{this.CoronalRightSide}</div></div>} {/* Coronal Plane  */}
        {<div style={{position:"absolute",height:'0px', width:'45%', boxSizing:"border-box",left:"53%",top:"20%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'60px', paddingRight:'0px', border:'0px green solid'}}><div>{this.SagittalLeftSide}</div><div>{this.SagittalRightSide}</div></div>} {/* Sagittal Plane this.AxialRightSide */}
        {<div style={{position:"absolute",height:'0px', width:'42%', boxSizing:"border-box",left:"10%",top:"67%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'25px', paddingRight:'17px', border:'0px red solid'}}><div>{this.AxialLeftSide}</div><div>{this.AxialRightSide}</div></div>} {/* Axial Plane this.AxialRightSide */}
        {<div style={{position:"absolute",height:'44%', width:'0px', boxSizing:"border-box",left:"30.35%",top:"1%", color:'red', fontSize:'25px', display:'flex', flexDirection:'column', justifyContent:'space-between', userSelect:'none', border:'0px yellow solid'}}><div>{this.CoronalUppderSide}</div><div>{this.CoronalUnderSide}</div></div>} {/* Axial Plane this.AxialRightSide */}
        {<div style={{position:"absolute",height:'44%', width:'0px', boxSizing:"border-box",left:"77%",top:"1%", color:'red', fontSize:'25px', display:'flex', flexDirection:'column', justifyContent:'space-between', userSelect:'none', border:'0px green solid'}}><div>{this.CoronalUppderSide}</div><div>{this.CoronalUnderSide}</div></div>} {/* Axial Plane this.AxialRightSide */}
        {<div style={{position:"absolute",height:'50%', width:'0px', boxSizing:"border-box",left:"30%",top:"47%", color:'red', fontSize:'25px', display:'flex', flexDirection:'column', justifyContent:'space-between', userSelect:'none', border:'0px red solid'}}><div>{this.SagittalRightSide}</div><div>{this.SagittalLeftSide}</div></div>}
        {/* 32767의 SUVR값 */}
        {(viewportC !== undefined) && <div style={{position:"absolute",top:"19%", left:"1%", color:'red', fontSize:"16px", userSelect:'none'}}>{isSNed ? out_suvr_max.toFixed(2):in_suvr_max.toFixed(2)}&nbsp;(max)</div>}
        {(viewportC !== undefined) && 
          <div class='colorbar1' >
            {/* 상단 배경*/}
            {selectedColormap === 'gray' &&<div style={{boxSizing:'border-box', border:`1px ${false ? 'white':'white'} solid`, width: '30px', height:`${false ? (wc)/32768*100:100-(wc)/32768*100}%`, background:`${isInverted ? 'black':'white'}`}}></div>}
            {selectedColormap === 'hot' &&<div style={{boxSizing:'border-box', border:`1px ${false ? 'white':'black'} solid`, width: '30px', height:`${false ? (wc)/32768*100:100-(wc)/32768*100}%`, background:`${isInverted ? 'black':'white'}`}}></div>}
            {selectedColormap === 'jet' &&<div style={{boxSizing:'border-box', border:`1px ${false ? 'white':'white'} solid`, width: '30px', height:`${false ? (wc)/32768*100:100-(wc)/32768*100}%`, background:`${isInverted ? 'blue':'red'}`}}></div>}
            {/* 이미지 컬러맵 */}
            {selectedColormap === 'gray' && <img style={{userDrag:'none', userSelect:'none', boxSizing:'border-box', borderTop:'1px white solid', borderBottom:'1px white solid', position:'absolute', width: '70px', top:`${100-(wc)/32768*100-(viewportC.voi.windowWidth/32768*50)}%`, height:`${viewportC.voi.windowWidth/32768*100}%` }} src={isInverted ? invertedgraycmap:graycmap}/>}
            {selectedColormap === 'hot' && <img style={{userDrag:'none', userSelect:'none', boxSizing:'border-box', borderTop:'1px white solid', borderBottom:'1px white solid', position:'absolute', width: '70px', top:`${100-(wc)/32768*100-(viewportC.voi.windowWidth/32768*50)}%`, height:`${viewportC.voi.windowWidth/32768*100}%` }} src={isInverted ? invertedhotcmap:hotcmap}/>}
            {selectedColormap === 'jet' && <img style={{userDrag:'none', userSelect:'none', boxSizing:'border-box', borderTop:'1px white solid', borderBottom:'1px white solid', position:'absolute', width: '70px', top:`${100-(wc)/32768*100-(viewportC.voi.windowWidth/32768*50)}%`, height:`${viewportC.voi.windowWidth/32768*100}%` }} src={isInverted ? invertedjetcmap:jetcmap}/>}
            {/* 상단 글자 */}
            <div style={{borderTop:"0px white solid", position:'absolute', width:'68px', top:`${false ? (wc)/32768*100-viewportC.voi.windowWidth/32768*50:100-(wc)/32768*100-viewportC.voi.windowWidth/32768*50}%`, height:`${viewportC.voi.windowWidth/32768*5}%`, fontSize:'12px'}}>{(centerSUVR+widthSUVR/2).toFixed(2)}</div>{/* <div style={{minHeight:'15px', borderTop:`${viewportC.voi.windowWidth/32768*10}px yellow solid`, position:'absolute', width:'68px', top:`${100-(viewportC.voi.windowCenter)/32768*100}%`, fontSize:'12px'}}>{(viewportC.voi.windowCenter/32767).toFixed(2)*)}</div> (out_suvr_max+out_suvr_min)/2*/}
            {/* 중심선과 중심글자 */}
            {(false) ? <div style={{minHeight:'15px', borderTop:`${viewportC.voi.windowWidth/32768*10}px yellow solid`, position:'absolute', width:'68px', top:`${(wc)/32768*100}%`, fontSize:'12px'}}>{centerSUVR.toFixed(2)}</div>:<div style={{minHeight:'15px', borderTop:`${viewportC.voi.windowWidth/32768*10}px yellow solid`, position:'absolute', width:'68px', top:`${100-(wc)/32768*100}%`, fontSize:'12px'}}>{centerSUVR.toFixed(2)}</div>}
            {/* 하단 글자 */}
            <div style={{borderBottom:"0px black solid", position:'absolute', width:'68px', top:`${false ? -4+(wc)/32768*100+viewportC.voi.windowWidth/32768*50:100-4-(wc)/32768*100+viewportC.voi.windowWidth/32768*50}%`, height:`${viewportC.voi.windowWidth/32768*5}%`, fontSize:'12px'}}>{(centerSUVR-widthSUVR/2).toFixed(2)}</div>
            {/* 하단배경 */}
            {selectedColormap === 'gray' &&<div style={{boxSizing:'border-box', border:`1px ${false ? 'black':'white'} solid`, width: '30px', height:`${false ? 100-(wc)/32768*100:(wc)/32768*100}%`, background:`${isInverted ? 'white':'black'}`, display:'flex', flexDirection:'column-reverse'}}></div>}
            {selectedColormap === 'hot' &&<div style={{boxSizing:'border-box', border:`1px ${false ? 'black':'white'} solid`, width: '30px', height:`${false ? 100-(wc)/32768*100:(wc)/32768*100}%`, background:`${isInverted ? 'white':'black'}`, display:'flex', flexDirection:'column-reverse'}}></div>}
            {selectedColormap === 'jet' &&<div style={{boxSizing:'border-box', border:`1px ${false ? 'white':'white'} solid`, width: '30px', height:`${false ? 100-(wc)/32768*100:(wc)/32768*100}%`, background:`${isInverted ? 'red':'blue'}`, display:'flex', flexDirection:'column-reverse'}}></div>}
            {/* <div style={{borderBottom:"1px red solid", position:'absolute', width:'68px', top:`${Math.min(93, Math.max(-1, 90-(viewportC.voi.windowCenter/32768*100)-(viewportC.voi.windowWidth/32768*50)))}%`}}></div> */}
              {/* <div style={{borderTop:"1px red solid", position:'absolute', width:'68px', top:`${90-(viewportC.voi.windowCenter)/32768*100}%`}}>{Math.floor(viewportC.voi.windowCenter+viewportC.voi.windowWidth/2)}</div> */}
              {/* <div style={{borderBottom:"1px red solid", position:'absolute', width:'68px', top:`${Math.min(93, Math.max(10, Math.max(10, viewportC.voi.windowWidth/32768*100)+90-(viewportC.voi.windowCenter/32768*100)-(viewportC.voi.windowWidth/32768*50)))}%`}}>{Math.floor(viewportC.voi.windowCenter-viewportC.voi.windowWidth/2)}</div> */}
            {/* <div style={{borderBottom:"1px red solid", position:'absolute', width:'68px', top:`${Math.min(93, Math.max(10, Math.max(10, viewportC.voi.windowWidth/32768*100)+90-(viewportC.voi.windowCenter/32768*100)-(viewportC.voi.windowWidth/32768*50)))}%`}}></div>  */}
          </div>
        }
        {/* {(viewportC !== undefined) && <div  style={{overflow:'hidden', border:"1px red solid", position:"absolute", width:'30px', height:`${viewportC.voi.windowWidth/32768*100*0.45}%`, boxSizing:"border-box",left:"3%",top:`${30+30-(viewportC.voi.windowCenter)/32768*30-(viewportC.voi.windowWidth/32768*50*0.3)}%`, color:'red', fontSize:'25px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', userSelect:'none', paddingLeft:'10px', paddingRight:'10px'}}></div>} */}
        {/* 0의 SUVR 값 */}
        {(viewportC !== undefined) && <div style={{position:"absolute",top:"67.5%", left:"1%", color:'red', fontSize:"16px", userSelect:'none'}}>{isSNed ? Math.max(0,out_suvr_min).toFixed(2):Math.max(0,in_suvr_min).toFixed(2)}&nbsp;(min)</div>}


        {/* Coronal Plane  */}
        {/* <div style={{border:"0px red solid", position:"absolute",height:'45%', width:'20px', boxSizing:"border-box",left:"50%",top:"0%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'10px', paddingRight:'10px'}}><div style={{border:"0px red solid", display:"flex", flexDirection:"column", justifyContent:"space-between"}}><span>3.0</span><span>0</span></div>{isInverted ? <img src={invertedgraycmap} />:<img src={graycmap}/>}</div> {/* Sagittal Plane this.AxialRightSide */}
        {/* <div style={{border:"0px red solid", position:"absolute",height:'50%', width:'20px', boxSizing:"border-box",left:"0%",top:"50%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'10px', paddingRight:'10px'}}><div style={{border:"0px red solid", display:"flex", flexDirection:"column", justifyContent:"space-between"}}><span>3.0</span><span>0</span></div>{isInverted ? <img src={invertedgraycmap} />:<img src={graycmap}/>}</div> Axial Plane this.AxialRightSide */}
        {/* {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"50%",top:"75%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between'}}>Superior</div>} */}
      </div>
    );
  }

  onWindowResize() {
    // console.log("onWindowResize");
    cornerstone.resize(this.elementC);
    cornerstone.resize(this.elementS);
    cornerstone.resize(this.elementA);
    cornerstone.resize(this.elementM);
  }
  onImageRendered() {
    const {ww, wc, in_suvr_max, in_suvr_min, out_suvr_max, out_suvr_min} = this.state;
    const {handleWindowChange, isSNed, isInverted} = this.props;
    try{
      // 이곳의 viewport를 열어서 min, max를 상위 component로 전달하고, 이곳의 state (ww, wc)를 바꿈
      let viewportC = cornerstone.getViewport(this.elementC);
      const newWW = viewportC.voi.windowWidth;
      const newWC = isInverted ? 32767-viewportC.voi.windowCenter:viewportC.voi.windowCenter;
      if (ww != newWW || wc != newWC){
        // console.log('windowCenter:',newWC)
        this.setState({
          ww: newWW,
          wc: newWC,
        })
        const newMax = newWC + newWW/2;
        const newMin = newWC - newWW/2;
        handleWindowChange(Math.floor(newMax), Math.floor(newMin));
      }
      // let viewportC = cornerstone.getViewport(this.elementC);
      // handleWindowChange(Math.floor(viewportC.voi.windowWidth), Math.floor(viewportC.voi.windowCenter))
      

      const stackDataC = cornerstoneTools.getToolState(this.elementC, "stack");
      const stackDataS = cornerstoneTools.getToolState(this.elementS, "stack");
      const stackDataA = cornerstoneTools.getToolState(this.elementA, "stack");
      const stackDataM = cornerstoneTools.getToolState(this.elementM, "stack");
      const stackC = stackDataC.data[0];
      const stackS = stackDataS.data[0];
      const stackA = stackDataA.data[0];
      const stackM = stackDataM.data[0];
      // console.log("onImageRendered: ", stackC.currentImageIdIndex, stackS.currentImageIdIndex, stackA.currentImageIdIndex)
      this.props.updateStack(this.props.stackManager.map(v=>
          {
            if (v.fileID==this.props.counter.fileID) 
              return {...v, currentC:stackC.currentImageIdIndex, currentS:stackS.currentImageIdIndex, currentA:stackA.currentImageIdIndex}
            else
              return {...v}
          }
        ))
    } catch (e){
      console.error('onImageRendered')
    }

    // let viewportC = cornerstone.getViewport(this.elementC);
    // let viewportS = cornerstone.getViewport(this.elementS);
    // let viewportA = cornerstone.getViewport(this.elementA);

    // this.setState({
    //   // ...this.state,
    //   stackC: this.props.stackC,
    //   stackS: this.props.stackS,
    //   stackA: this.props.stackA,
    //   imageIdC: this.props.stackC.imageIds,
    //   imageIdS: this.props.stackS.imageIds,
    //   imageIdA: this.props.stackA.imageIds,
    //   viewportC,
    //   viewportS,
    //   viewportA,
    // });
  }

  onNewImage() {
    // console.log("onNewImage")
    // const enabledElementC = cornerstone.getEnabledElement(this.elementC);
    // const enabledElementS = cornerstone.getEnabledElement(this.elementS);
    // const enabledElementA = cornerstone.getEnabledElement(this.elementA);

    // if (enabledElementC.image!==undefined && enabledElementS.image!==undefined && enabledElementA.image!==undefined ){
    //   this.setState({
    //     ...this.state,
    //   // stackC: this.props.stackC,
    //   // stackS: this.props.stackS,
    //   // stackA: this.props.stackA,
    //   // imageIdC: this.props.stackC.imageIds,
    //   // imageIdS: this.props.stackS.imageIds,
    //   // imageIdA: this.props.stackA.imageIds,
    //     imageIdC: enabledElementC.image.imageId,
    //     imageIdS: enabledElementS.image.imageId,
    //     imageIdA: enabledElementA.image.imageId,
    //   });
    // }
  }
  onKeyPress(e) {
    console.log("onKeyPress");
      var data = e.detail;
      var keyCode = data.keyCode;
      var keyName;
      var keys = {
          UP: 38,
          DOWN: 40
      };
      if (keyCode === keys.UP) {
          keyName = 'Up arrow';
      } else if (keyCode === keys.DOWN) {
          keyName = 'Down arrow';
      } else {
          keyName = String.fromCharCode(keyCode);
      }
  }

  componentDidMount() {
    // console.log('ImageViewer componentDidMount')
    try{
      // console.log("componentDidMount")
      const elementC = this.elementC;
      const elementS = this.elementS;
      const elementA = this.elementA;
      const elementM = this.elementM;

      // Enable the DOM Element for use with Cornerstone
      cornerstone.enable(elementC);
      cornerstone.enable(elementS);
      cornerstone.enable(elementA);
      cornerstone.enable(elementM);
      // Add and activate tools
      // cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
      // cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
      // cornerstoneTools.setToolActive('StackScroll', { mouseButtonMask: 1 });
      // cornerstoneTools.setToolActive('StackScrollMouseWheel', { });

      cornerstoneTools.touchInput.enable(elementC);
      cornerstoneTools.touchInput.enable(elementS);
      cornerstoneTools.touchInput.enable(elementA);
      cornerstoneTools.touchInput.enable(elementM);
      cornerstoneTools.keyboardInput.enable(elementC);
      cornerstoneTools.keyboardInput.enable(elementS);
      cornerstoneTools.keyboardInput.enable(elementA);
      cornerstoneTools.keyboardInput.enable(elementM);
      cornerstoneTools.mouseInput.enable(elementC);
      cornerstoneTools.mouseInput.enable(elementS);
      cornerstoneTools.mouseInput.enable(elementA);
      cornerstoneTools.mouseInput.enable(elementM);
      cornerstoneTools.mouseWheelInput.enable(elementC);
      cornerstoneTools.mouseWheelInput.enable(elementS);
      cornerstoneTools.mouseWheelInput.enable(elementA);
      cornerstoneTools.mouseWheelInput.enable(elementM);
      // cornerstoneTools.crosshairs.enable(elementC, 1, this.synchronizer);
      // cornerstoneTools.crosshairs.enable(elementS, 1, this.synchronizer);
      // cornerstoneTools.crosshairs.enable(elementA, 1, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(elementC, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(elementS, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(elementA, this.synchronizer);
      // Load the first image in the stack
      this.loadImage(elementC, elementS, elementA, elementM);
    } catch(e){
      console.error('fast skip by wheel')
    }
  }

  componentWillUnmount() {
    // console.log('ImageViewer componentWillUnmount')
    const elementC = this.elementC;
    const elementS = this.elementS;
    const elementA = this.elementA;
    const elementM = this.elementM;


    elementC.removeEventListener("cornerstoneimagerendered",this.onImageRendered);
    elementS.removeEventListener("cornerstoneimagerendered",this.onImageRendered);
    elementA.removeEventListener("cornerstoneimagerendered",this.onImageRendered);
    elementM.removeEventListener("cornerstoneimagerendered",this.onImageRendered);
    elementC.removeEventListener("cornerstonenewimage", this.onNewImage);
    elementS.removeEventListener("cornerstonenewimage", this.onNewImage);
    elementA.removeEventListener("cornerstonenewimage", this.onNewImage);
    elementM.removeEventListener("cornerstonenewimage", this.onNewImage);
    window.removeEventListener("resize", this.onWindowResize);
    cornerstone.disable(elementC);
    cornerstone.disable(elementS);
    cornerstone.disable(elementA);
    cornerstone.disable(elementM);
  }

  componentDidUpdate(prevProps, prevState) {
    const { value5, handleWindowChange, isInverted, isCrosshaired, isPlayed, isSNed, currentStepIndex, selectedColormap, stackManager, updateSUVR_min_max } = this.props;
    // const elementS = this.elementS;
    // const elementA = this.elementA;
    // let viewportS = cornerstone.getViewport(elementS);
    // let viewportA = cornerstone.getViewport(elementA);
    try{
      // 상위의 state (ww, wc) 를 받아서 viewport를 업데이트 시킴
      if (prevProps.value5 != value5){
        // console.log('value5 update')
        const newWW = (value5.max-value5.min);
        const newWC = isInverted ? 32767-(value5.max+value5.min)/2:(value5.max+value5.min)/2;
        let viewportC = cornerstone.getViewport(this.elementC);
        viewportC.voi.windowCenter = newWC;
        viewportC.voi.windowWidth = newWW;
        cornerstone.setViewport(this.elementC, viewportC);
        
        // if (isInverted){
        //   const WW = viewportC.voi.windowWidth;
        //   const WC = viewportC.voi.windowCenter;
        //   const newWC = WC;
        //   const newMax=Math.min(32767,newWC+WW/2);
        //   const newMin=Math.max(0,newWC-WW/2);
        //   // handleWindowChange(Math.floor(viewportC.voi.windowWidth), Math.floor(viewportC.voi.windowCenter))
        //   handleWindowChange(newMax, newMin);
        // } else{
        //   const WW = viewportC.voi.windowWidth;
        //   const WC = viewportC.voi.windowCenter;
        //   const newWC = WC;
        //   const newMax=Math.min(32767,newWC+WW/2);
        //   const newMin=Math.max(0,newWC-WW/2);
        //   // handleWindowChange(Math.floor(viewportC.voi.windowWidth), Math.floor(viewportC.voi.windowCenter))
        //   handleWindowChange(newMax, newMin);
        // }

        // handleWindowChange(Math.floor(viewportC.voi.windowWidth), Math.floor(viewportC.voi.windowCenter))
      
        // let viewportC = cornerstone.getViewport(this.elementC);
      }
      // if (prevProps.stackC.imageIds[0] !== this.props.stackC.imageIds[0]){
      if (prevProps.selectedColormap !== selectedColormap){
        const elementC = this.elementC;
        const elementS = this.elementS;
        const elementA = this.elementA;
        const elementM = this.elementM;
        let viewportC = cornerstone.getViewport(elementC);
        let viewportS = cornerstone.getViewport(elementS);
        let viewportA = cornerstone.getViewport(elementA);
        let viewportM = cornerstone.getViewport(elementM);
        console.log('viewportC:',viewportC)
        viewportC.colormap = selectedColormap;
        viewportS.colormap = selectedColormap;
        viewportA.colormap = selectedColormap;
        viewportM.colormap = selectedColormap;
        cornerstone.setViewport(elementC, viewportC);
        cornerstone.setViewport(elementS, viewportS);
        cornerstone.setViewport(elementA, viewportA);
        cornerstone.setViewport(elementM, viewportM);
      }
      // const elementC = this.elementC;
      // let viewportC = cornerstone.getViewport(this.elementC);
      // if (){
      //   const suvr_max = isSNed ? out_suvr_max:in_suvr_max;
      //   const suvr_min = Math.max(0, isSNed ? out_suvr_min:in_suvr_min);
      //   const widthSUVR = (viewportC !== undefined) ? ((viewportC.voi.windowWidth/32767)*(suvr_max-suvr_min)):1;
      //   const centerSUVR = (viewportC !== undefined) ? ((viewportC.voi.windowCenter/32767)*(suvr_max-suvr_min)):1;
      //   this.props.updateSUVR_min_max({
      //     suvr_max,
      //     suvr_min,
      //     widthSUVR,
      //     centerSUVR,
      //   })
      // }

      if (prevProps.stackC.imageIds[0] !== this.props.stackC.imageIds[0]){
        const in_suvr_max = stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].in_suvr_max
        const in_suvr_min = stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].in_suvr_min
        const out_suvr_max = stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].out_suvr_max
        const out_suvr_min = stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].out_suvr_min
        // console.log(in_suvr_max, in_suvr_min,out_suvr_max,out_suvr_min)
        this.setState({
          in_suvr_max,
          in_suvr_min,
          out_suvr_max,
          out_suvr_min,
        })
        const LRDirection = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineX0:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineX0;
        const APDirection = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineY1:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineY1;
        const SIDirection = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineZ2:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineZ2;
        console.log("Direction", LRDirection, APDirection, SIDirection)
        // const SIDirection = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineZ2:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineZ2;
        this.SagittalLeftSide = APDirection < 0 ? "A":"P";
        this.SagittalRightSide = APDirection < 0 ? "P":"A";
        this.CoronalLeftSide = LRDirection < 0 ? "R":"L";
        this.CoronalRightSide = LRDirection < 0 ? "L":"R";
        this.AxialLeftSide = LRDirection < 0 ? "R":"L";
        this.AxialRightSide = LRDirection < 0 ? "L":"R";
        this.CoronalUppderSide = SIDirection < 0 ? "I":"S";
        this.CoronalUnderSide = SIDirection < 0 ? "S":"I";
        // const AxialLeftSide = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineX0:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineX0;
        // console.log("test:",LRDirection, this.AxialLeftSide, this.AxialRightSide)
        // const IAxialLeftSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'AffineX0')>0 ? "L":"R";
        // const IAxialRightSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'AffineX0')>0 ? "R":"L";
        // const ICoronalLeftSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'AffineY1')>0 ? "L":"R";
        // const ICoronalRightSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'InputAffineY1')>0 ? "R":"L";
        // const ISagittalLeftSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'InputAffineZ2')>0 ? "A":"P";
        // const ISagittalRightSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'InputAffineZ2')>0 ? "P":"A";
        // const OAxialLeftSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'OutputAffineX0')>0 ? "L":"R";
        // const OAxialRightSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'OutputAffineX0')>0 ? "R":"L";
        // const OCoronalLeftSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'OutputAffineY1')>0 ? "L":"R";
        // const OCoronalRightSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'OutputAffineY1')>0 ? "R":"L";
        // const OSagittalLeftSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'OutputAffineZ2')>0 ? "A":"P";
        // const OSagittalRightSide = this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].eval(inoutSelect+'OutputAffineZ2')>0 ? "P":"A";
        // console.log("Input:",IAxialLeftSide,IAxialRightSide,ICoronalLeftSide,ICoronalRightSide,ISagittalLeftSide,ISagittalRightSide)
        // console.log("Output:",OAxialLeftSide,OAxialRightSide,OCoronalLeftSide,OCoronalRightSide,OSagittalLeftSide,OSagittalRightSide)
        console.log('loadImage with counter',this.props.counter)
        this.loadImage(this.elementC, this.elementS, this.elementA, this.elementM);
      } 
      // console.log(isPlayed==true && prevProps.currentStepIndex !== currentStepIndex)
      // console.log(prevProps.currentStepIndex)
      if (isPlayed==true) {
        cornerstoneTools.playClip(this.elementM, currentStepIndex);
        // let viewportC = cornerstone.getViewport(this.elementC);
        // viewportC.voi.windowCenter = 16384/2;
        // cornerstone.setViewport(this.elementC, viewportC);
      }
      else {
        cornerstoneTools.stopClip(this.elementM, currentStepIndex);
        // let viewportC = cornerstone.getViewport(this.elementC);
        // viewportC.voi.windowCenter = 16384;
        // cornerstone.setViewport(this.elementC, viewportC);
      }
      if (prevProps.isCrosshaired != isCrosshaired){
        this.controlViewport();
        console.log('constrolViewport isCrosshaired: ',isCrosshaired)
        // let AlayerPET = cornerstone.getLayer(Aelement, AlayerId[1]);
        // let layerPET = cornerstone.getLayer(elementC, AlayerId[1]);
        // layerPET.viewport.colormap = "jet";
        // // cornerstone.setActiveLayer(Aelement, AlayerId[0]);
        // cornerstone.updateImage(Aelement);
        
        // let layerPET = cornerstone.getLayer(elementC);
        // layerPET.viewport.colormap = "jet";
        // cornerstone.updateImage(elementC);
      }
    } catch(e){
      console.error(e)
      // console.log("componentDidUpdate:error")
    }
    try{
      // console.log('viewportC', viewportC)
      // console.log('stackC.options.viewport', this.props.stackC.options.viewport)
      // console.log('New viewportC', {...viewportC, ...this.props.stackC.options.viewport})
      // viewportC.colormap = this.props.stackC.options.viewport.colromap;
      // viewportS.colormap = this.props.stackS.options.viewport.colromap;
      // viewportA.colormap = this.props.stackA.options.viewport.colromap;
      // let newViewportC = {...viewportC, ...this.props.stackC.options.viewport}
      // let newViewportS = {...viewportS, ...this.props.stackS.options.viewport}
      // let newViewportA = {...viewportA, ...this.props.stackA.options.viewport}
      // cornerstone.setViewport(this.elementC, viewportC);
      // cornerstone.setViewport(this.elementS, viewportS);
      // cornerstone.setViewport(this.elementA, viewportA);
    }catch(e){

    }
    // viewportC.colormap = "jet";
    // viewportS.colormap = "jet";
    // viewportA.colormap = "jet";
    // cornerstone.setViewport(this.elementC, newViewportC);
    // cornerstone.setViewport(this.elementS, newViewportS);
    // cornerstone.setViewport(this.elementA, newViewportA);
  }

  // renderer_findImageFn = function(imageIds, targetImageId) {
  //   var minDistance = 1;
  //   var targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImageId);
  //   // console.log("imagePositionPatient: ", targetImagePlane)
  //   var imagePositionZ = targetImagePlane.imagePositionPatient[2];

  //   var closest;
  //   // console.log(targetImageId);
  //   // console.log(imageIds, targetImageId)
  //   // imageIds.forEach(function(imageId) {
  //   //     var imagePlane = cornerstone.metaData.get('imagePlaneModule', imageId);
  //   //     //frameOfReferenceUID
  //   //     // console.log(imageId)
  //   //     // console.log(imagePlane.frameOfReferenceUID)
  //   //     var imgPosZ = imagePlane.imagePositionPatient[2];
  //   //     var distance = Math.abs(imgPosZ - imagePositionZ);
  //   //     if (distance < minDistance) {
  //   //         minDistance = distance;
  //   //         // console.log("renderer distance: ", imageId)
  //   //         closest = imageId;
  //   //     }
  //   // });

  //   return closest;
  // };

  loadImage=(elementC, elementS, elementA, elementM)=>{
    const { isCrosshaired, isPlayed,selectedColormap } = this.props;
    console.log('promise')
    // console.log('loadImage')
    // const stackDataC = cornerstoneTools.getToolState(this.elementC, "stack");
    // const stackDataS = cornerstoneTools.getToolState(this.elementS, "stack");
    // const stackDataA = cornerstoneTools.getToolState(this.elementA, "stack");
    // const stackC = stackDataC.data[0];
    // const stackS = stackDataS.data[0];
    // const stackA = stackDataA.data[0];
    // console.log(stackC.currentImageIdIndex)
    // this.Arenderer.findImageFn = this.renderer_findImageFn;
    // this.Crenderer.findImageFn = this.renderer_findImageFn;
    // this.Srenderer.findImageFn = this.renderer_findImageFn;
    const currentIndex = this.props.stackManager.filter((v)=>{if (v.fileID==this.props.counter.fileID) return {currentC: v.currentC, currentS:v.currentS, currentA:v.currentA}})
    // console.log(currentIndex)
    const coronalLoadImagePromise = cornerstone.loadImage(this.props.stackC.imageIds[currentIndex[0].currentC]).then(image => {
      // const coronalLoadImagePromise = cornerstone.loadImage(this.props.stackC.imageIds[this.props.stackC.currentImageIdIndex]).then(image => {
      // Display the first image
      try {
        cornerstone.displayImage(elementC, image);

        const stack = this.props.stackC;
        console.log('stackC', stack)
        cornerstoneTools.addStackStateManager(elementC, ["stack", 'referenceLines', 'crosshairs']);
        cornerstoneTools.addToolState(elementC, "stack", stack);

        // let layerPET = cornerstone.getLayer(elementC);
        // console.log(layerPET)
        // layerPET.viewport.colormap = "jet";
        // cornerstone.updateImage(elementC);


        // this.Crenderer.render(elementC);
        // cornerstoneTools.stackScroll.activate(elementC, 1);
        
        // cornerstoneTools.stackScroll.activate(elementS, 1);
        cornerstoneTools.stackScrollWheel.activate(elementC);
        cornerstoneTools.stackPrefetch.enable(elementC, 3);
        cornerstoneTools.wwwc.activate(elementC, 4);
        cornerstoneTools.wwwcRegion.activate(elementC, 2);
        this.wwwcsynchronizer.add(elementC);
        this.synchronizer.add(elementC);

        // enable reference Lines tool
        {isCrosshaired ? cornerstoneTools.referenceLines.tool.enable(elementC, this.synchronizer):cornerstoneTools.referenceLines.tool.disable(elementC)}
        cornerstoneTools.stackScrollKeyboard.activate(elementC);
        elementC.addEventListener("cornerstoneimagerendered",this.onImageRendered);
        elementC.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
        // cornerstone.displayImage(elementC, image);
      } catch(e){
        console.error('FastSkip coronalLoadImagePromise')
      }
    });
    const sagittalLoadImagePromise = cornerstone.loadImage(this.props.stackS.imageIds[currentIndex[0].currentS]).then(image => {
      // Display the first image
      try{
        cornerstone.displayImage(elementS, image);

        const stack = this.props.stackS;
        cornerstoneTools.addStackStateManager(elementS, ["stack", 'referenceLines', 'crosshairs']);
        cornerstoneTools.addToolState(elementS, "stack", stack);
        // cornerstoneTools.stackScroll.activate(elementS, 1);
        cornerstoneTools.stackScrollWheel.activate(elementS);
        cornerstoneTools.stackPrefetch.enable(elementS, 3);
        cornerstoneTools.wwwc.activate(elementS, 4);
        cornerstoneTools.wwwcRegion.activate(elementS, 2);
        this.wwwcsynchronizer.add(elementS);
        this.synchronizer.add(elementS);

        // enable reference Lines tool
        {isCrosshaired ? cornerstoneTools.referenceLines.tool.enable(elementS, this.synchronizer):cornerstoneTools.referenceLines.tool.disable(elementS)}
        cornerstoneTools.stackScrollKeyboard.activate(elementS);
        elementS.addEventListener("cornerstoneimagerendered",this.onImageRendered);
        elementS.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
        // cornerstone.displayImage(elementS, image);
      } catch(e){
        console.error('FastSkip sagittalLoadImagePromise')
      }
    });
    const axialLoadImagePromise = cornerstone.loadImage(this.props.stackA.imageIds[currentIndex[0].currentA]).then(image => {
      // Display the first image
      try{
        cornerstone.displayImage(elementA, image);

        const stack = this.props.stackA;
        cornerstoneTools.addStackStateManager(elementA, ["stack", 'referenceLines', 'crosshairs']);
        cornerstoneTools.addToolState(elementA, "stack", stack);
        // cornerstoneTools.stackScroll.activate(elementA, 1);
        cornerstoneTools.stackScrollWheel.activate(elementA);
        cornerstoneTools.stackPrefetch.enable(elementA, 3);
        cornerstoneTools.wwwc.activate(elementA, 4);
        cornerstoneTools.wwwcRegion.activate(elementA, 2);
        this.wwwcsynchronizer.add(elementA);
        this.synchronizer.add(elementA);

        // enable reference Lines tool
        {isCrosshaired ? cornerstoneTools.referenceLines.tool.enable(elementA, this.synchronizer):cornerstoneTools.referenceLines.tool.disable(elementA)}
        cornerstoneTools.stackScrollKeyboard.activate(elementA);
        elementA.addEventListener("cornerstoneimagerendered",this.onImageRendered);
        elementA.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
        // cornerstone.displayImage(elementA, image);
      } catch(e){
        console.error('FastSkip axialLoadImagePromise')
      }
    });
    const mipLoadImagePromise = cornerstone.loadImage(this.props.stackM.imageIds[0]).then(image => {
      // Display the first image
      try{
        try{//데이터가 없으면 if문에서 stack.data[0] 호출할때 에러나서 catch로 이동
          let temp = cornerstoneTools.getElementToolStateManager(elementM)
          if (temp.toolState.stack.data[0]){ //데이터가 존재하면 돌리던건 멈춘다
            cornerstoneTools.stopClip(elementM, 5);
            // alert('데이터 있음->기존데이터 멈춤: stopClip')
          }
        } catch(e){
          // alert('데이터 없음->: nothing')
        }
        // var toolStateManager = cornerstoneTools.getElementToolStateManager(elementM);
        // cornerstone.clearToolState(elementM, 'stack')
        cornerstone.displayImage(elementM, image);

        const stack = this.props.stackM;
        cornerstoneTools.addStackStateManager(elementM, ["stack", 'playClip']);
        cornerstoneTools.addToolState(elementM, "stack", stack);
        // cornerstoneTools.pan.activate(elementM, 1);
        cornerstoneTools.stackScroll.activate(elementM, 1);
        cornerstoneTools.stackScrollWheel.activate(elementM);
        // cornerstoneTools.stackPrefetch.enable(elementM, 3);
        // cornerstoneTools.zoom.activate(elementM, 3);
        cornerstoneTools.wwwc.activate(elementM, 4);
        cornerstoneTools.wwwcRegion.activate(elementM, 2);

        try{
          let temp = cornerstoneTools.getElementToolStateManager(elementM)
          if (temp.toolState.stack.data[0]){ //데이터가 존재하면 돌리던건 멈춘다
            if (isPlayed) cornerstoneTools.playClip(elementM, 5);
            else cornerstoneTools.stopClip(elementM, 5);
            // alert('새로운 데이터 회전->: playClip')
          }
        } catch(e){
          console.log('error')
        }
        // try{
        //   let temp = cornerstoneTools.getElementToolStateManager(elementM)
        //   if (temp.toolState.stack.data[0]){
        //     cornerstoneTools.stopClip(elementM, 5);
        //     alert('data exist: stopClip')
        //   } else {
        //     cornerstoneTools.playClip(elementM, 5);
        //     alert('data not exist: playClip')
        //   }
        //   console.dir(temp)
        //   console.dir(temp.toolState.stack.data[0])
        // } catch(e){
        //   console.log('error')
        // }

        this.wwwcsynchronizer.add(elementM);
        // this.synchronizer.add(elementM);

        // // enable reference Lines tool
        // {isCrosshaired ? cornerstoneTools.referenceLines.tool.enable(elementM, this.synchronizer):cornerstoneTools.referenceLines.tool.disable(elementM)}
        // cornerstoneTools.stackScrollKeyboard.activate(elementM);
        elementM.addEventListener("cornerstoneimagerendered",this.onImageRendered);
        elementM.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
        // cornerstone.displayImage(elementA, image);
      } catch(e){
        console.error('FastSkip axialLoadImagePromise')
      }
    });
    Promise.all([coronalLoadImagePromise, sagittalLoadImagePromise, axialLoadImagePromise, mipLoadImagePromise]).then(() => {
      const { isCrosshaired, isPlayed } = this.props;
      // Add the enabled elements to the synchronization context
      try{
        this.synchronizer.add(elementC);
        this.synchronizer.add(elementS);
        this.synchronizer.add(elementA);
  
        // cornerstoneTools.referenceLines.tool.enable(coronalElement, synchronizer);
        // cornerstoneTools.referenceLines.tool.enable(sagittalElement, synchronizer);
        // cornerstoneTools.referenceLines.tool.enable(axialElement, synchronizer);
        
        // {!isCrosshaired ? cornerstoneTools.wwwc.activate(elementC, 1):
        cornerstoneTools.crosshairs.enable(elementC, 1, this.synchronizer);
        cornerstoneTools.crosshairs.enable(elementS, 1, this.synchronizer);
        cornerstoneTools.crosshairs.enable(elementA, 1, this.synchronizer);
  

      } catch(e){
        console.error('FastSkip Promise',e)
      }
    });
  }

  controlViewport=()=>{
    const { isInverted, isCrosshaired } = this.props;
    const Celement = this.elementC;
    const Selement = this.elementS;
    const Aelement = this.elementA;
    if (isCrosshaired==false){
      // cornerstoneTools.crosshairs.disable(Celement);
      // cornerstoneTools.crosshairs.disable(Selement);
      // cornerstoneTools.crosshairs.disable(Aelement);
      // cornerstoneTools.crosshairsTouch.disable(Celement);
      // cornerstoneTools.crosshairsTouch.disable(Selement);
      // cornerstoneTools.crosshairsTouch.disable(Aelement);
      cornerstoneTools.referenceLines.tool.disable(Celement);
      cornerstoneTools.referenceLines.tool.disable(Selement);
      cornerstoneTools.referenceLines.tool.disable(Aelement);
      // cornerstoneTools.wwwc.activate(Celement, 1);
    }else{
      // cornerstoneTools.crosshairs.enable(Celement, 1, this.synchronizer);
      // cornerstoneTools.crosshairs.enable(Selement, 1, this.synchronizer);
      // cornerstoneTools.crosshairs.enable(Aelement, 1, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(Celement, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(Selement, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(Aelement, this.synchronizer);
      cornerstoneTools.referenceLines.tool.enable(Celement, this.synchronizer);
      cornerstoneTools.referenceLines.tool.enable(Selement, this.synchronizer);
      cornerstoneTools.referenceLines.tool.enable(Aelement, this.synchronizer);
      // cornerstoneTools.wwwc.activate(Celement, 1);
      // cornerstoneTools.crosshairs.enable(Celement);
    }
    // let viewportC = cornerstone.getViewport(Celement);
    // let viewportS = cornerstone.getViewport(Selement);
    // let viewportA = cornerstone.getViewport(Aelement);
    // console.log('viewportC:',viewportC)
    // viewportC.colormap = "gray";
    // viewportS.colormap = "jet";
    // viewportA.colormap = "hot";
    // cornerstone.setViewport(Celement, viewportC);
    // cornerstone.setViewport(Selement, viewportS);
    // cornerstone.setViewport(Aelement, viewportA);
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
export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);