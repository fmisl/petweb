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

    this.onImageRendered = this.onImageRendered.bind(this);
    this.onNewImage = this.onNewImage.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.wwwcsynchronizer = new cornerstoneTools.Synchronizer("cornerstoneimagerendered", cornerstoneTools.wwwcSynchronizer);
    this.synchronizer = new cornerstoneTools.Synchronizer("cornerstonenewimage", cornerstoneTools.updateImageSynchronizer);
  }

  render() {
    console.log(this.state);
    // console.log("stackC: ", this.state.stackC, typeof(this.state.stackC.currentImageIdIndex));
    // console.log("stackS: ", this.state.stackS, typeof(this.state.stackS.currentImageIdIndex));
    // console.log("stackA: ", this.state.stackA, typeof(this.state.stackA.currentImageIdIndex));
    return (
      <div style={{position:"relative",width:"100%", height:"100%"}}>
        <div
          className="viewportElement"
          style={divStyleC}
          ref={input => {
            this.elementC = input;
          }}
          onClick={(e)=>{
              console.dir(e); 
              console.log("x:",e.pageX," y:",e.pageY);
              console.log("x - 300:",e.pageX - 300," y - 170 + 89:",-e.pageY + 170 - 89);
              console.log("(x - 300)/775*90:",(e.pageX - 300)/775*90," y - 170 + 89:",-e.pageY + 170 - 89);
              // cornerstoneTools.scrollToIndex(this.elementS, (e.pageX - 300)/775*90);
            //   this.setState({
            //     ...this.state,
            //     // stackA:{...this.state.stackA,
            //     //   currentImageIdIndex:Number(-e.pageY + 170 - 89),
            //     // },
            //     stackS:{...this.state.stackS,
            //       currentImageIdIndex:Math.round((e.pageX - 300)/775*90),
            //     }
            //   })
            }
          }
        >
          {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.state.stackA.currentImageIdIndex/90*100}%`, width:"100%"}}></div>}
          {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackS.currentImageIdIndex/90*100}%`, height:"100%"}}></div>}
          <canvas className="cornerstone-canvas" />
          {/* <div style={bottomLeftStyle}>Zoom: {this.state.viewportC.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewportC.voi.windowWidth} /{" "}
            {this.state.viewportC.voi.windowCenter}
          </div> */}
        </div>
        <div
          className="viewportElement"
          style={divStyleS}
          ref={input => {
            this.elementS = input;
          }}
        >
          {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.state.stackA.currentImageIdIndex/90*100}%`, width:"100%"}}></div>}
          {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackC.currentImageIdIndex/108*100}%`, height:"100%"}}></div>}
          <canvas className="cornerstone-canvas" />
          {/* <div style={bottomLeftStyle}>Zoom: {this.state.viewportS.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewportS.voi.windowWidth} /{" "}
            {this.state.viewportS.voi.windowCenter}
          </div> */}
        </div>
        <div
          className="viewportElement"
          style={divStyleA}
          ref={input => {
            this.elementA = input;
          }}
        >
          {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.state.stackS.currentImageIdIndex/90*100}%`, height:"100%"}}></div>}
          {this.props.isCrosshaired && <div style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.state.stackC.currentImageIdIndex/108*100}%`, width:"100%"}}></div>}
          <canvas className="cornerstone-canvas" />
          {/* <div style={bottomLeftStyle}>Zoom: {this.state.viewportA.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewportA.voi.windowWidth} /{" "}
            {this.state.viewportA.voi.windowCenter}
          </div> */}
        </div>
      </div>
    );
  }

  onWindowResize() {
    console.log("onWindowResize");
    cornerstone.resize(this.elementC);
    cornerstone.resize(this.elementS);
    cornerstone.resize(this.elementA);
  }

  onImageRendered() {
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
    console.log("onImageRendered()")
    // console.log(this.state.stackC)
    // console.log(this.state.viewportC,this.state.viewportS,this.state.viewportA);
  }

  onNewImage() {
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

  componentDidMount() {
    const elementC = this.elementC;
    const elementS = this.elementS;
    const elementA = this.elementA;

    // Enable the DOM Element for use with Cornerstone
    cornerstone.enable(elementC);
    cornerstone.enable(elementS);
    cornerstone.enable(elementA);
    cornerstoneTools.touchInput.enable(elementC);
    cornerstoneTools.touchInput.enable(elementS);
    cornerstoneTools.touchInput.enable(elementA);
    // cornerstoneTools.keyboardInput.enable(elementC);
    // cornerstoneTools.keyboardInput.enable(elementS);
    // cornerstoneTools.keyboardInput.enable(elementA);
    cornerstoneTools.mouseInput.enable(elementC);
    cornerstoneTools.mouseInput.enable(elementS);
    cornerstoneTools.mouseInput.enable(elementA);
    cornerstoneTools.mouseWheelInput.enable(elementC);
    cornerstoneTools.mouseWheelInput.enable(elementS);
    cornerstoneTools.mouseWheelInput.enable(elementA);
    // Load the first image in the stack
    cornerstone.loadImage(this.state.imageIdC[this.state.stackC.currentImageIdIndex]).then(image => {
      // Display the first image
      cornerstone.displayImage(elementC, image);

      const stack = this.state.stackC;
      cornerstoneTools.addStackStateManager(elementC, ["stack", 'referenceLines']);
      cornerstoneTools.addToolState(elementC, "stack", stack);
      // cornerstoneTools.stackScroll.activate(elementC, 1);
      cornerstoneTools.stackScrollWheel.activate(elementC);
      cornerstoneTools.scrollIndicator.enable(elementC);
      cornerstoneTools.wwwcRegion.activate(elementC, 4);
      this.wwwcsynchronizer.add(elementC);
      // Set the div to focused, so keypress events are handled
      // elementC.tabIndex = 0;
      // elementC.focus();
      // Enable all tools we want to use with this element
      // cornerstoneTools.stackScrollKeyboard.activate(elementC);

      // Enable all tools we want to use with this element
      // cornerstoneTools.zoomTouchPinch.activate(elementC);
      // this.state.synchronizer.add(elementC);
      // cornerstoneTools.referenceLines.tool.enable(elementC, this.synchronizer);

      elementC.addEventListener("cornerstoneimagerendered",this.onImageRendered);
      elementC.addEventListener("cornerstonenewimage", this.onNewImage);
      window.addEventListener("resize", this.onWindowResize);
    });
    cornerstone.loadImage(this.state.imageIdS[this.state.stackS.currentImageIdIndex]).then(image => {
      // Display the first image
      cornerstone.displayImage(elementS, image);

      const stack = this.state.stackS;
      cornerstoneTools.addStackStateManager(elementS, ["stack", 'referenceLines']);
      cornerstoneTools.addToolState(elementS, "stack", stack);
      // cornerstoneTools.stackScroll.activate(elementS, 1);
      cornerstoneTools.stackScrollWheel.activate(elementS);
      cornerstoneTools.scrollIndicator.enable(elementS);
      cornerstoneTools.wwwcRegion.activate(elementS, 4);
      this.wwwcsynchronizer.add(elementS);
      // this.state.synchronizer.add(elementS);
      // elementS.tabIndex = 1;
      // elementS.focus();
      // Enable all tools we want to use with this element
      // cornerstoneTools.stackScrollKeyboard.activate(elementS);
      
      elementS.addEventListener("cornerstoneimagerendered",this.onImageRendered);
      elementS.addEventListener("cornerstonenewimage", this.onNewImage);
      window.addEventListener("resize", this.onWindowResize);
    });
    cornerstone.loadImage(this.state.imageIdA[this.state.stackA.currentImageIdIndex]).then(image => {
      // Display the first image
      cornerstone.displayImage(elementA, image);

      const stack = this.state.stackA;
      cornerstoneTools.addStackStateManager(elementA, ["stack", 'referenceLines']);
      cornerstoneTools.addToolState(elementA, "stack", stack);
      // cornerstoneTools.stackScroll.activate(elementA, 1);
      cornerstoneTools.stackScrollWheel.activate(elementA);
      cornerstoneTools.scrollIndicator.enable(elementA);
      cornerstoneTools.wwwcRegion.activate(elementA, 4);
      this.wwwcsynchronizer.add(elementA);
      // elementA.tabIndex = 2;
      // elementA.focus();
      // Enable all tools we want to use with this element
      // cornerstoneTools.stackScrollKeyboard.activate(elementA);
      
      elementA.addEventListener("cornerstoneimagerendered",this.onImageRendered);
      elementA.addEventListener("cornerstonenewimage", this.onNewImage);
      window.addEventListener("resize", this.onWindowResize);
    });
    // this.setState({
    //   ...this.state,
    // });
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
    // console.log("componentDidUpdate")
    try{
      console.log("prevProps.isInverted, this.props.isInverted")
      console.log(prevProps.isInverted, this.props.isInverted)
      console.log(prevProps !== this.props)
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
      console.log("componentDidUpdate:passed")
    } catch(e){
      console.error(e)
      console.log("componentDidUpdate:error")
    }
  }
}
