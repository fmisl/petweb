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

// Listing the dependencies for reference later
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
    // this.state = {
    //   stackC: props.stackC,
    //   stackS: props.stackS,
    //   stackA: props.stackA,
    //   imageIdC: props.stackC.imageIds,
    //   imageIdS: props.stackS.imageIds,
    //   imageIdA: props.stackA.imageIds,
    //   viewportC: cornerstone.getDefaultViewport(null, undefined),
    //   viewportS: cornerstone.getDefaultViewport(null, undefined),
    //   viewportA: cornerstone.getDefaultViewport(null, undefined),
    // };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onImageRendered = this.onImageRendered.bind(this);
    this.onNewImage = this.onNewImage.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.wwwcsynchronizer = new cornerstoneTools.Synchronizer("cornerstoneimagerendered", cornerstoneTools.wwwcSynchronizer);
    this.synchronizer = new cornerstoneTools.Synchronizer("cornerstonenewimage", cornerstoneTools.updateImageSynchronizer);
    // var synchronizer = new cornerstoneTools.Synchronizer("cornerstonenewimage", cornerstoneTools.updateImageSynchronizer);
  }

  render() {
    const { isInverted } = this.props;
    const divStyleC = {
      // width: "512px",
      // height: "512px",
      top:"0",
      left:"0",
      width:"775px",
      height:"425px",
      position: "absolute",
      color: "white",
      filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
    };
    const divStyleS = {
      // width: "512px",
      // height: "512px",
      top:"0",
      left:"50%",
      width:"775px",
      height:"425px",
      position: "absolute",
      color: "white",
      filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
    };
    const divStyleA = {
      // width: "512px",
      // height: "512px",
      top:"46%",
      left:"0",
      width:"775px",
      // height:"425px",
      height:"510px",
      position: "absolute",
      color: "white",
      filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
      // background:"white !important",
    };
    const divStyleM = {
      // width: "512px",
      // height: "512px",
      top:"46%",
      left:"50%",
      width:"775px",
      // height:"425px",
      height:"510px",
      position: "absolute",
      color: "white",
      filter: isInverted ? "invert(1)":"invert(0)",
      // border:"1px red solid",
      // boxSizing:"border-box",
      // background:"white !important",
    };
    const divWrapper = {
      position:"relative",
      width:"100%", 
      height:"100%", 
      background: isInverted ? "white":"black",
    };
    const viewportC = this.elementC && cornerstone.getViewport(this.elementC);
    // const viewportS = cornerstone.getViewport(this.elementS);
    // const viewportA = cornerstone.getViewport(this.elementA);
    // const viewportM = cornerstone.getViewport(this.elementM);
    return (
      <div style={divWrapper}>
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
          <div style={{position:"absolute", top:"0px"}}>
              WW/WC: {(viewportC !== undefined) && viewportC.voi.windowWidth} /{" "}
              {(viewportC !== undefined) && viewportC.voi.windowCenter}
          </div>
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
        {/* {this.props.isCrosshaired && <div className="coronal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.props.stackC.currentImageIdIndex/108*50}%`,left:"0%", width:"50%", height:"0%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="coronal-sagittal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",top:"0%",left:`${this.props.stackC.currentImageIdIndex/108*50+50}%`, width:"0%", height:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="sagittal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.props.stackS.currentImageIdIndex/90*50}%`, height:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="sagittal-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.props.stackS.currentImageIdIndex/90*50}%`, top:"50%", height:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="axial-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:"0%", bottom:`${this.props.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div className="axial-sagittal" style={{position:"absolute", border:"1px red solid", boxSizing:"border-box",left:"50%", bottom:`${this.props.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>} */}
        {/* {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"0%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>}
        {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"50%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>}
        {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"0%",top:"50%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>}
        {<div style={{position:"absolute",height:'0px', width:'50%',border:"0px red solid", boxSizing:"border-box",left:"50%",top:"50%", color:'red', fontSize:'25px', userSelect:'none'}}>Superior</div>} */}

        {<div style={{position:"absolute",height:'0px', width:'50%', boxSizing:"border-box",left:"0%",top:"20%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'100px', paddingRight:'100px'}}><div>{this.CoronalLeftSide}</div><div>{this.CoronalRightSide}</div></div>} {/* Coronal Plane  */}
        {<div style={{position:"absolute",height:'0px', width:'50%', boxSizing:"border-box",left:"50%",top:"20%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'100px', paddingRight:'100px'}}><div>{this.SagittalLeftSide}</div><div>{this.SagittalRightSide}</div></div>} {/* Sagittal Plane this.AxialRightSide */}
        {<div style={{position:"absolute",height:'0px', width:'50%', boxSizing:"border-box",left:"0%",top:"75%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'100px', paddingRight:'100px'}}><div>{this.AxialLeftSide}</div><div>{this.AxialRightSide}</div></div>} {/* Axial Plane this.AxialRightSide */}
        <div style={{position:"absolute",top:"25%", left:"1%", color:'red', fontSize:"25px", userSelect:'none'}}>32768(max)</div>
        {(viewportC !== undefined) && 
          <div style={{overflow:'hidden', border:"0px red solid", position:"relative", width:'100px', height:'45%', boxSizing:"border-box",left:"0%",top:"30%", color:'red', fontSize:'25px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', userSelect:'none', paddingLeft:'10px', paddingRight:'10px'}}>
            
            <div style={{border:`1px ${isInverted ? 'black':'white'} solid`, width: '68px', height:`${100-(viewportC.voi.windowCenter)/32768*100}%`, background:`${isInverted ? 'black':'white'}`}}></div>
            {isInverted ? 
                <img style={{position:'absolute', width: '70px', top:`${100-(viewportC.voi.windowCenter)/32768*100-(viewportC.voi.windowWidth/32768*50)}%`, height:`${viewportC.voi.windowWidth/32768*100}%` }} src={invertedgraycmap} />
                :
                <img style={{position:'absolute', width: '70px', top:`${100-(viewportC.voi.windowCenter)/32768*100-(viewportC.voi.windowWidth/32768*50)}%`, height:`${viewportC.voi.windowWidth/32768*100}%` }} src={graycmap}/>
            }
            <div style={{border:`1px ${isInverted ? 'black':'white'} solid`, width: '68px', height:`${(viewportC.voi.windowCenter)/32768*100}%`, background:`${isInverted ? 'white':'black'}`, display:'flex', flexDirection:'column-reverse'}}></div>
            <div style={{borderTop:"1px red solid", position:'absolute', width:'68px', top:`${Math.min(80, Math.max(-1, 90-(viewportC.voi.windowCenter/32768*100)-(viewportC.voi.windowWidth/32768*50)))}%`}}>{Math.floor(viewportC.voi.windowCenter+viewportC.voi.windowWidth/2)}</div>
            {/* <div style={{borderTop:"1px red solid", position:'absolute', width:'68px', top:`${90-(viewportC.voi.windowCenter)/32768*100}%`}}>{Math.floor(viewportC.voi.windowCenter+viewportC.voi.windowWidth/2)}</div> */}
            <div style={{border:"1px yellow solid", position:'absolute', width:'68px', top:`${96-(viewportC.voi.windowCenter)/32768*100}%`, height:'10px'}}></div>
            <div style={{borderBottom:"1px red solid", position:'absolute', width:'68px', top:`${Math.min(93, Math.max(10, Math.max(10, viewportC.voi.windowWidth/32768*100)+90-(viewportC.voi.windowCenter/32768*100)-(viewportC.voi.windowWidth/32768*50)))}%`}}>{Math.floor(viewportC.voi.windowCenter-viewportC.voi.windowWidth/2)}</div>
          </div>
        }
        <div style={{position:"absolute",top:"75%", left:"1%", color:'red', fontSize:"25px", userSelect:'none'}}>0(min)</div>
        {/* Coronal Plane  */}
        {/* <div style={{border:"0px red solid", position:"absolute",height:'45%', width:'20px', boxSizing:"border-box",left:"50%",top:"0%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'10px', paddingRight:'10px'}}><div style={{border:"0px red solid", display:"flex", flexDirection:"column", justifyContent:"space-between"}}><span>3.0</span><span>0</span></div>{isInverted ? <img src={invertedgraycmap} />:<img src={graycmap}/>}</div> {/* Sagittal Plane this.AxialRightSide */}
        {/* <div style={{border:"0px red solid", position:"absolute",height:'50%', width:'20px', boxSizing:"border-box",left:"0%",top:"50%", color:'red', fontSize:'25px', display:'flex', justifyContent:'space-between', userSelect:'none', paddingLeft:'10px', paddingRight:'10px'}}><div style={{border:"0px red solid", display:"flex", flexDirection:"column", justifyContent:"space-between"}}><span>3.0</span><span>0</span></div>{isInverted ? <img src={invertedgraycmap} />:<img src={graycmap}/>}</div> Axial Plane this.AxialRightSide */} */}
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
    try{
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
    const { isInverted, isCrosshaired, isPlayed, isSNed, currentStepIndex } = this.props;
    const elementC = this.elementC;
    // const elementS = this.elementS;
    // const elementA = this.elementA;
    // let viewportS = cornerstone.getViewport(elementS);
    // let viewportA = cornerstone.getViewport(elementA);
    try{
      // if (prevProps.stackC.imageIds[0] !== this.props.stackC.imageIds[0]){
      if (prevProps.stackC.imageIds[0] !== this.props.stackC.imageIds[0]){
        const LRDirection = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineX0:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineX0;
        const APDirection = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineY1:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineY1;
        // const SIDirection = isSNed ? this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].outputAffineZ2:this.props.stackManager.filter((v)=>v.fileID==this.props.counter.fileID)[0].inputAffineZ2;
        this.SagittalLeftSide = APDirection > 0 ? "P":"A";
        this.SagittalRightSide = APDirection > 0 ? "A":"P";
        this.CoronalLeftSide = LRDirection > 0 ? "L":"R";
        this.CoronalRightSide = LRDirection > 0 ? "R":"L";
        this.AxialLeftSide = LRDirection > 0 ? "L":"R";
        this.AxialRightSide = LRDirection > 0 ? "R":"L";
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
      }
      else {
        cornerstoneTools.stopClip(this.elementM, currentStepIndex);
      }
      if (prevProps.isCrosshaired != isCrosshaired){
        this.controlViewport();
        console.log('constrolViewport isCrosshaired: ',isCrosshaired)
        
        // console.log('viewport.colormap', this.props.stackC.options.viewport.colormap)
        // let viewportC = cornerstone.getViewport(this.elementC);
        // viewportC.colormap = this.props.stackC.options.viewport.colormap;
        // cornerstone.setViewport(this.elementC, viewportC);
      }
    } catch(e){
      console.error(e)
      // console.log("componentDidUpdate:error")
    }
    const viewportC = cornerstone.getViewport(this.elementC);
    const viewportS = cornerstone.getViewport(this.elementS);
    const viewportA = cornerstone.getViewport(this.elementA);
    const viewportM = cornerstone.getViewport(this.elementM);
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


  loadImage=(elementC, elementS, elementA, elementM)=>{
    const { isCrosshaired, isPlayed } = this.props;
    console.log('promise')
    // console.log('loadImage')
    // const stackDataC = cornerstoneTools.getToolState(this.elementC, "stack");
    // const stackDataS = cornerstoneTools.getToolState(this.elementS, "stack");
    // const stackDataA = cornerstoneTools.getToolState(this.elementA, "stack");
    // const stackC = stackDataC.data[0];
    // const stackS = stackDataS.data[0];
    // const stackA = stackDataA.data[0];
    // console.log(stackC.currentImageIdIndex)
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
  
        cornerstoneTools.crosshairsTouch.enable(elementC, this.synchronizer);
        cornerstoneTools.crosshairsTouch.enable(elementS, this.synchronizer);
        cornerstoneTools.crosshairsTouch.enable(elementA, this.synchronizer);

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