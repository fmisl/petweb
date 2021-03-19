import React, { Component } from 'react'
import './ImageViewer.css'

import { render } from "react-dom";
// Importing all the dependencies for the Cornerstone library
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";

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

const divStyleC = {
  // width: "512px",
  // height: "512px",
  top:"0",
  left:"0",
  width:"775px",
  height:"425px",
  position: "absolute",
  color: "white",
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
  // border:"1px red solid",
  // boxSizing:"border-box",
};
const divStyleA = {
  // width: "512px",
  // height: "512px",
  top:"50%",
  left:"0",
  width:"775px",
  height:"425px",
  position: "absolute",
  color: "white",
  // border:"1px red solid",
  // boxSizing:"border-box",
};

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

export default class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stackC: props.stackC,
      stackS: props.stackS,
      stackA: props.stackA,
      viewportC: cornerstone.getDefaultViewport(null, undefined),
      viewportS: cornerstone.getDefaultViewport(null, undefined),
      viewportA: cornerstone.getDefaultViewport(null, undefined),
      imageIdC: props.stackC.imageIds,
      imageIdS: props.stackS.imageIds,
      imageIdA: props.stackA.imageIds,
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
    // console.log("state:",this.state);
    // console.log("stackC: ", this.state.stackC, typeof(this.state.stackC.currentImageIdIndex));
    // console.log("stackS: ", this.state.stackS, typeof(this.state.stackS.currentImageIdIndex));
    // console.log("stackA: ", this.state.stackA, typeof(this.state.stackA.currentImageIdIndex));
    // console.log('ImageViewer render')
    return (
      <div style={{position:"relative",width:"100%", height:"100%"}}>
        <div
          className="viewportElement coronal"
          style={divStyleC}
          ref={input => {
            this.elementC = input;
          }}
          onClick={(e)=>{
              console.dir(e); 
              console.log("x:",e.pageX," y:",e.pageY);
              console.log("x - 300:",e.pageX - 300," y - 170 + 89:",-e.pageY + 170 - 89);
              console.log("(x - 300)/775*90:",(e.pageX - 300)/775*90," y - 170 + 89:",-e.pageY + 170 - 89);
              
              // this.elementC.tabIndex = 0;
              // this.elementC.focus();
            }
          }
        >

          {/* {this.props.isCrosshaired && <div id="axialDiv" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.state.stackA.currentImageIdIndex/90*100}%`, width:"100%"}}></div>} */}
          {/* {this.props.isCrosshaired && <div id="sagittalDiv" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackS.currentImageIdIndex/90*100}%`, height:"100%"}}></div>} */}
          <canvas className="cornerstone-canvas" />
          {/* <div style={bottomLeftStyle}>Zoom: {this.state.viewportC.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewportC.voi.windowWidth} /{" "}
            {this.state.viewportC.voi.windowCenter}
          </div> */}
        </div>
        <div
          className="viewportElement sagittal"
          style={divStyleS}
          ref={input => {
            this.elementS = input;
          }}
          onClick={(e)=>{
            // this.elementS.tabIndex = 0;
            // this.elementS.focus();
          }}
        >
        {/* {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.state.stackA.currentImageIdIndex/90*100}%`, width:"100%"}}></div>} */}
        {/* {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackC.currentImageIdIndex/108*100}%`, height:"100%"}}></div>} */}
          <canvas className="cornerstone-canvas" />
          {/* <div style={bottomLeftStyle}>Zoom: {this.state.viewportS.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewportS.voi.windowWidth} /{" "}
            {this.state.viewportS.voi.windowCenter}
          </div> */}
        </div>
        <div
          className="viewportElement axial"
          style={divStyleA}
          ref={input => {
            this.elementA = input;
          }}
          onClick={(e)=>{
            // this.elementA.tabIndex = 0;
            // this.elementA.focus();
          }}
        >
          {/* {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackS.currentImageIdIndex/90*100}%`, height:"100%"}}></div>} */}
          {/* {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.state.stackC.currentImageIdIndex/108*100}%`, width:"100%"}}></div>} */}
          <canvas className="cornerstone-canvas" />
          {/* <div style={bottomLeftStyle}>Zoom: {this.state.viewportA.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewportA.voi.windowWidth} /{" "}
            {this.state.viewportA.voi.windowCenter}
          </div> */}
        </div>
        {this.props.isCrosshaired && <div className="coronal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.state.stackC.currentImageIdIndex/108*50}%`,left:"0%", width:"50%", height:"0%"}}></div>}
        {this.props.isCrosshaired && <div className="coronal-sagittal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",top:"0%",left:`${this.state.stackC.currentImageIdIndex/108*50+50}%`, width:"0%", height:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="sagittal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackS.currentImageIdIndex/90*50}%`, height:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="sagittal-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackS.currentImageIdIndex/90*50}%`, top:"50%", height:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="axial-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:"0%", bottom:`${this.state.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="axial-sagittal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:"50%", bottom:`${this.state.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>}
      </div>
    );
  }

  onWindowResize() {
    // console.log("onWindowResize");
    cornerstone.resize(this.elementC);
    cornerstone.resize(this.elementS);
    cornerstone.resize(this.elementA);
  }
  onImageRendered1(){
    console.log("onImageRendered1")
  }
  onImageRendered() {
    // console.log("onImageRendered")
    let viewportC = cornerstone.getViewport(this.elementC);
    let viewportS = cornerstone.getViewport(this.elementS);
    let viewportA = cornerstone.getViewport(this.elementA);
    // console.log(viewportC, viewportS, viewportA); 
    // let viewport = cornerstone.getViewport(this.elementA);
    // cornerstone.setViewport(this.elementA, viewport);

    this.setState({
      ...this.state,
      viewportC,
      viewportS,
      viewportA,
    });
    // console.log(this.state.stackC)
    // console.log(this.state.viewportC,this.state.viewportS,this.state.viewportA);
  }

  onNewImage() {
    console.log("onNewImage")
    const enabledElementC = cornerstone.getEnabledElement(this.elementC);
    const enabledElementS = cornerstone.getEnabledElement(this.elementS);
    const enabledElementA = cornerstone.getEnabledElement(this.elementA);

    if (enabledElementC.image!==undefined && enabledElementS.image!==undefined && enabledElementA.image!==undefined ){
      this.setState({
        ...this.state,
        imageIdC: enabledElementC.image.imageId,
        imageIdS: enabledElementS.image.imageId,
        imageIdA: enabledElementA.image.imageId,
      });
    }
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
    console.log('ImageViewer componentDidMount')
    try{
      // console.log("componentDidMount")
      const elementC = this.elementC;
      const elementS = this.elementS;
      const elementA = this.elementA;

      // Enable the DOM Element for use with Cornerstone
      cornerstone.enable(elementC);
      cornerstone.enable(elementS);
      cornerstone.enable(elementA);
      // Add and activate tools
      // cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
      // cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
      // cornerstoneTools.setToolActive('StackScroll', { mouseButtonMask: 1 });
      // cornerstoneTools.setToolActive('StackScrollMouseWheel', { });

      cornerstoneTools.touchInput.enable(elementC);
      cornerstoneTools.touchInput.enable(elementS);
      cornerstoneTools.touchInput.enable(elementA);
      cornerstoneTools.keyboardInput.enable(elementC);
      cornerstoneTools.keyboardInput.enable(elementS);
      cornerstoneTools.keyboardInput.enable(elementA);
      cornerstoneTools.mouseInput.enable(elementC);
      cornerstoneTools.mouseInput.enable(elementS);
      cornerstoneTools.mouseInput.enable(elementA);
      cornerstoneTools.mouseWheelInput.enable(elementC);
      cornerstoneTools.mouseWheelInput.enable(elementS);
      cornerstoneTools.mouseWheelInput.enable(elementA);
      // cornerstoneTools.crosshairs.enable(elementC, 1, this.synchronizer);
      // cornerstoneTools.crosshairs.enable(elementS, 1, this.synchronizer);
      // cornerstoneTools.crosshairs.enable(elementA, 1, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(elementC, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(elementS, this.synchronizer);
      // cornerstoneTools.crosshairsTouch.enable(elementA, this.synchronizer);
      // Load the first image in the stack
      const coronalLoadImagePromise = cornerstone.loadImage(this.state.imageIdC[this.state.stackC.currentImageIdIndex]).then(image => {
        // Display the first image
        try {
          cornerstone.displayImage(elementC, image);

        const stack = this.state.stackC;
        // this.synchronizer.add(elementC);
        cornerstoneTools.addStackStateManager(elementC, ["stack", 'Crosshairs']);
        cornerstoneTools.addToolState(elementC, "stack", stack);
        cornerstoneTools.stackScroll.activate(elementC, 1);
        cornerstoneTools.stackScrollWheel.activate(elementC);
        // cornerstoneTools.scrollIndicator.enable(elementC);
        cornerstoneTools.stackPrefetch.enable(elementC, 3);
        cornerstoneTools.wwwcRegion.activate(elementC, 4);
        this.wwwcsynchronizer.add(elementC);
        // Set the div to focused, so keypress events are handled
        // Set the div to focused, so keypress events are handled

        // Enable all tools we want to use with this element
        cornerstoneTools.stackScrollKeyboard.activate(elementC);
        // elementC.tabIndex = 0;
        // elementC.focus();
        // Enable all tools we want to use with this element
        // cornerstoneTools.stackScrollKeyboard.activate(elementC);

        // Enable all tools we want to use with this element
        // cornerstoneTools.zoomTouchPinch.activate(elementC);
        // this.state.synchronizer.add(elementC);
        // cornerstoneTools.referenceLines.tool.enable(elementC, this.synchronizer);

        elementC.addEventListener("cornerstonetoolskeydown", this.onKeyPress);
        elementC.addEventListener("cornerstoneimagerendered",this.onImageRendered);
        elementC.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
      } catch(e){
        console.error('FastSkip')
      }
      });
      const sagittalLoadImagePromise = cornerstone.loadImage(this.state.imageIdS[this.state.stackS.currentImageIdIndex]).then(image => {
        // Display the first image
        try{
        cornerstone.displayImage(elementS, image);

        const stack = this.state.stackS;
        // this.synchronizer.add(elementS);
        cornerstoneTools.addStackStateManager(elementS, ["stack", 'Crosshairs']);
        cornerstoneTools.addToolState(elementS, "stack", stack);
        cornerstoneTools.stackScroll.activate(elementS, 1);
        cornerstoneTools.stackScrollWheel.activate(elementS);
        // cornerstoneTools.scrollIndicator.enable(elementS);
        cornerstoneTools.stackPrefetch.enable(elementS, 3);
        cornerstoneTools.wwwcRegion.activate(elementS, 4);
        this.wwwcsynchronizer.add(elementS);
        // Set the div to focused, so keypress events are handled

        // Enable all tools we want to use with this element
        cornerstoneTools.stackScrollKeyboard.activate(elementS);
        // this.state.synchronizer.add(elementS);
        // elementS.tabIndex = 1;
        // elementS.focus();
        // Enable all tools we want to use with this element
        // cornerstoneTools.stackScrollKeyboard.activate(elementS);
        
        elementS.addEventListener("cornerstonetoolskeydown", this.onKeyPress);
        elementS.addEventListener("cornerstoneimagerendered",this.onImageRendered);
        elementS.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
      } catch(e){
        console.error('FastSkip')
      }
      });
      const axialLoadImagePromise = cornerstone.loadImage(this.state.imageIdA[this.state.stackA.currentImageIdIndex]).then(image => {
        // Display the first image
        try{
        cornerstone.displayImage(elementA, image);

        const stack = this.state.stackA;
        // this.synchronizer.add(elementA);
        cornerstoneTools.addStackStateManager(elementA, ["stack", 'Crosshairs']);
        cornerstoneTools.addToolState(elementA, "stack", stack);
        cornerstoneTools.stackScroll.activate(elementA, 1);
        cornerstoneTools.stackScrollWheel.activate(elementA);
        // cornerstoneTools.scrollIndicator.enable(elementA);
        cornerstoneTools.stackPrefetch.enable(elementA, 3);
        cornerstoneTools.wwwcRegion.activate(elementA, 4);
        this.wwwcsynchronizer.add(elementA);
        // Set the div to focused, so keypress events are handled

        // Enable all tools we want to use with this element
        cornerstoneTools.stackScrollKeyboard.activate(elementA);
        
        elementA.addEventListener("cornerstonetoolskeydown", this.onKeyPress);
        elementA.addEventListener("cornerstoneimagerendered",this.onImageRendered);
        elementA.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
      } catch(e){
        console.error('FastSkip')
      }
      });
      // this.setState({
      //   ...this.state,
      // });
      // After images have loaded, and our sync context has added both elements
      Promise.all([coronalLoadImagePromise, sagittalLoadImagePromise, axialLoadImagePromise])
      .then(() => {
        try{
        this.synchronizer.add(elementC);
        this.synchronizer.add(elementS);

        cornerstoneTools.crosshairs.enable(elementC, 1, this.synchronizer);
        cornerstoneTools.crosshairs.enable(elementS, 1, this.synchronizer);

        cornerstoneTools.crosshairsTouch.enable(elementC, this.synchronizer);
        cornerstoneTools.crosshairsTouch.enable(elementS, this.synchronizer);
        // const tool = cornerstoneTools.CrosshairsTool;
        // cornerstoneTools.addTool(tool);
        // cornerstoneTools.setToolActive('Crosshairs', {
        //   mouseButtonMask: 1,
        //   synchronizationContext: this.synchronizer,
        // });
      } catch(e){
        console.error('FastSkip')
      }
      });
    } catch(e){
      console.error('fast skip by wheel')
    }
  }

  componentWillUnmount() {
    const elementC = this.elementC;
    const elementS = this.elementS;
    const elementA = this.elementA;
    elementC.removeEventListener("cornerstoneimagerendered",this.onImageRendered);
    elementS.removeEventListener("cornerstoneimagerendered",this.onImageRendered);
    elementA.removeEventListener("cornerstoneimagerendered",this.onImageRendered);
    elementC.removeEventListener("cornerstonenewimage", this.onNewImage);
    elementS.removeEventListener("cornerstonenewimage", this.onNewImage);
    elementA.removeEventListener("cornerstonenewimage", this.onNewImage);
    window.removeEventListener("resize", this.onWindowResize);
    cornerstone.disable(elementC);
    cornerstone.disable(elementS);
    cornerstone.disable(elementA);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('ImageViewer componentDidUpdate')
    // console.log("componentDidUpdate")
    try{
      // console.log("prevProps.isInverted, this.props.isInverted")
      // console.log(prevProps.isInverted, this.props.isInverted)
      // console.log(prevProps !== this.props)
      if (prevProps !== this.props){
        let viewportA = cornerstone.getViewport(this.elementA);
        viewportA.invert=!this.props.isInverted;
        cornerstone.setViewport(this.elementA, viewportA);
      }
      // const stackDataC = cornerstoneTools.getToolState(this.elementC, "stack");
      // const stackDataS = cornerstoneTools.getToolState(this.elementS, "stack");
      // const stackDataA = cornerstoneTools.getToolState(this.elementA, "stack");
      // const stackC = stackDataC.data[0];
      // const stackS = stackDataS.data[0];
      // const stackA = stackDataA.data[0];
      // stackC.currentImageIdIndex = this.state.stackC.currentImageIdIndex;
      // // stackS.currentImageIdIndex = 0;
      // stackS.currentImageIdIndex = this.state.stackS.currentImageIdIndex;
      // stackA.currentImageIdIndex = this.state.stackA.currentImageIdIndex;
      // stackC.imageIds = this.state.stackC.imageIds;
      // stackS.imageIds = this.state.stackS.imageIds;
      // stackA.imageIds = this.state.stackA.imageIds;
      // cornerstoneTools.addToolState(this.elementC, "stack", stackC);
      // cornerstoneTools.addToolState(this.elementS, "stack", stackS);
      // cornerstoneTools.addToolState(this.elementA, "stack", stackA);
      
      // // const imageIdC = stackC.imageIds[stackC.currentImageIdIndex];
      // // const imageIdS = stackS.imageIds[stackS.currentImageIdIndex];
      // // const imageIdA = stackA.imageIds[stackA.currentImageIdIndex];
      // cornerstoneTools.scrollToIndex(this.elementC, stackC.currentImageIdIndex);
      // cornerstoneTools.scrollToIndex(this.elementS, stackS.currentImageIdIndex);
      // cornerstoneTools.scrollToIndex(this.elementA, stackA.currentImageIdIndex);
      // console.log("componentDidUpdate:passed")
    } catch(e){
      console.error(e)
      // console.log("componentDidUpdate:error")
    }
  }
}
