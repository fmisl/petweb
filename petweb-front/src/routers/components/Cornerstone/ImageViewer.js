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
      top:"50%",
      left:"0",
      width:"775px",
      height:"425px",
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

          <canvas className="cornerstone-canvas" />
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
          <canvas className="cornerstone-canvas" />
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
          <canvas className="cornerstone-canvas" />
        </div>
        {/* {this.props.isCrosshaired && <div className="coronal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",bottom:`${this.props.stackC.currentImageIdIndex/108*50}%`,left:"0%", width:"50%", height:"0%"}}></div>}
        {this.props.isCrosshaired && <div className="coronal-sagittal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",top:"0%",left:`${this.props.stackC.currentImageIdIndex/108*50+50}%`, width:"0%", height:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="sagittal-axial" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.props.stackS.currentImageIdIndex/90*50}%`, height:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="sagittal-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:`${this.props.stackS.currentImageIdIndex/90*50}%`, top:"50%", height:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="axial-coronal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:"0%", bottom:`${this.props.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>}
        {this.props.isCrosshaired && <div className="axial-sagittal" style={{position:"absolute", border:"1px white solid", boxSizing:"border-box",left:"50%", bottom:`${this.props.stackA.currentImageIdIndex/90*50+50}%`, width:"50%"}}></div>} */}
      </div>
    );
  }

  onWindowResize() {
    // console.log("onWindowResize");
    cornerstone.resize(this.elementC);
    cornerstone.resize(this.elementS);
    cornerstone.resize(this.elementA);
  }
  onImageRendered() {
    try{
      const stackDataC = cornerstoneTools.getToolState(this.elementC, "stack");
      const stackDataS = cornerstoneTools.getToolState(this.elementS, "stack");
      const stackDataA = cornerstoneTools.getToolState(this.elementA, "stack");
      const stackC = stackDataC.data[0];
      const stackS = stackDataS.data[0];
      const stackA = stackDataA.data[0];
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
      this.loadImage(elementC, elementS, elementA);
    } catch(e){
      console.error('fast skip by wheel')
    }
  }

  componentWillUnmount() {
    // console.log('ImageViewer componentWillUnmount')
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
    const { isInverted, isCrosshaired } = this.props;
    try{
      // if (prevProps.stackC.imageIds[0] !== this.props.stackC.imageIds[0]){
      if (prevProps.stackC.imageIds[0] !== this.props.stackC.imageIds[0]){
        console.log('loadImage with counter',this.props.counter)
        this.loadImage(this.elementC, this.elementS, this.elementA);
      } 
      if (prevProps.isCrosshaired != isCrosshaired){
        this.controlViewport();
      }
    } catch(e){
      console.error(e)
      // console.log("componentDidUpdate:error")
    }
  }
  loadImage=(elementC, elementS, elementA)=>{
    const { isCrosshaired } = this.props;
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
        cornerstoneTools.addStackStateManager(elementC, ["stack", 'referenceLines', 'crosshairs']);
        cornerstoneTools.addToolState(elementC, "stack", stack);
        cornerstoneTools.stackScroll.activate(elementC, 1);
        cornerstoneTools.stackScrollWheel.activate(elementC);
        cornerstoneTools.stackPrefetch.enable(elementC, 3);
        cornerstoneTools.wwwcRegion.activate(elementC, 4);
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
        cornerstoneTools.stackScroll.activate(elementS, 1);
        cornerstoneTools.stackScrollWheel.activate(elementS);
        cornerstoneTools.stackPrefetch.enable(elementS, 3);
        cornerstoneTools.wwwcRegion.activate(elementS, 4);
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
        cornerstoneTools.stackScroll.activate(elementA, 1);
        cornerstoneTools.stackScrollWheel.activate(elementA);
        cornerstoneTools.stackPrefetch.enable(elementA, 3);
        cornerstoneTools.wwwcRegion.activate(elementA, 4);
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
    Promise.all([coronalLoadImagePromise, sagittalLoadImagePromise, axialLoadImagePromise]).then(() => {
      // Add the enabled elements to the synchronization context
      try{
        this.synchronizer.add(elementC);
        this.synchronizer.add(elementS);
        this.synchronizer.add(elementA);
  
        // cornerstoneTools.referenceLines.tool.enable(coronalElement, synchronizer);
        // cornerstoneTools.referenceLines.tool.enable(sagittalElement, synchronizer);
        // cornerstoneTools.referenceLines.tool.enable(axialElement, synchronizer);
  
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
    console.log('constrolViewport isCrosshaired: ',isCrosshaired)
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