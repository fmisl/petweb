import React, { Component } from 'react'
import '../../../App.css'
import BrainImage from '../../../images/BrainImage';
import JetColorMap from '../../../images/JetColorMap'
let colormap = require('colormap')

let colors = colormap({
  colormap: 'jet',
  nshades: 101,
  format: 'hex',
  alpha: 1
})
export default class AnalysisItem1 extends Component {
  render() {
    const {subRegion} = this.props;
    // console.log(colors)
    const maxSUVR = 2;
    const globalR = subRegion.Composite;
    const globalL = subRegion.Composite;
    const frontalR = subRegion.Frontal_R;
    const frontalL = subRegion.Frontal_L;
    const parietalR = subRegion.Parietal_R;
    const parietalL = subRegion.Parietal_L;
    const temporalR = subRegion.Temporal_R;
    const temporalL = subRegion.Temporal_L;
    const occipitalR = subRegion.Occipital_R;
    const occipitalL = subRegion.Occipital_L;
    const globalRPercentile = Math.round(Math.max(0,subRegion.Composite-1)*100);
    const globalLPercentile = Math.round(Math.max(0,subRegion.Composite-1)*100);
    const frontalRPercentile = Math.round(Math.max(0,subRegion.Frontal_R-1)*100);
    const frontalLPercentile = Math.round(Math.max(0,subRegion.Frontal_L-1)*100);
    const parietalRPercentile = Math.round(Math.max(0,subRegion.Parietal_R-1)*100);
    const parietalLPercentile = Math.round(Math.max(0,subRegion.Parietal_L-1)*100);
    const temporalRPercentile = Math.round(Math.max(0,subRegion.Temporal_R-1)*100);
    const temporalLPercentile = Math.round(Math.max(0,subRegion.Temporal_L-1)*100);
    const occipitalRPercentile = Math.round(Math.max(0,subRegion.Occipital_R-1)*100);
    const occipitalLPercentile = Math.round(Math.max(0,subRegion.Occipital_L-1)*100);
    return (
      <React.Fragment>
          <div className="analysis-box1-content">
            <div>
              <div style={{height:"120px", width:"120px"}}>
                <BrainImage className="BrainImage" region="global" color={colors[Math.round((globalRPercentile+globalLPercentile)/2)]}/>
                Global Lobe
              </div>
              <div style={{height:"100%", width:"480px"}}>
                <div className="analysis-score" style={{width:`${globalLPercentile}%`, borderRight:`10px ${colors[globalLPercentile]} solid`}}>
                  L
                  <br/>
                  {globalL}
                </div>
                <div className="analysis-score" style={{width:`${globalRPercentile}%`, borderRight:`10px ${colors[globalRPercentile]} solid`}}>
                  R
                  <br/>
                  {globalR}
                </div>
              </div>
            </div>
            <div>
              <div style={{height:"120px", width:"120px"}}>
                <BrainImage className="BrainImage" region="frontal" color={colors[Math.round((frontalRPercentile+frontalLPercentile)/2)]}/>
                Frontal Lobe
              </div>
              <div style={{height:"100%", width:"480px"}}>
                <div className="analysis-score" style={{width:`${frontalLPercentile}%`, borderRight:`10px ${colors[frontalLPercentile]} solid`}}>
                  L
                  <br/>
                  {frontalL}
                </div>
                <div className="analysis-score" style={{width:`${frontalRPercentile}%`, borderRight:`10px ${colors[frontalRPercentile]} solid`}}>
                  R
                  <br/>
                  {frontalR}
                </div>
              </div>
            </div>
            <div>
              <div style={{height:"120px", width:"120px"}}>
                <BrainImage className="BrainImage" region="parietal" color={colors[Math.round((parietalRPercentile+parietalLPercentile)/2)]}/>
                Parietal Lobe
              </div>
              <div style={{height:"100%", width:"480px"}}>
                <div className="analysis-score" style={{width:`${parietalLPercentile}%`, borderRight:`10px ${colors[parietalLPercentile]} solid`}}>
                  L
                  <br/>
                  {parietalL}
                </div>
                <div className="analysis-score" style={{width:`${parietalRPercentile}%`, borderRight:`10px ${colors[parietalRPercentile]} solid`}}>
                  R
                  <br/>
                  {parietalR}
                </div>
              </div>
            </div>
            <div>
              <div style={{height:"120px", width:"120px"}}>
                <BrainImage className="BrainImage" region="temporal" color={colors[Math.round((temporalRPercentile+temporalLPercentile)/2)]}/>
                Temporal Lobe
              </div>
              <div style={{height:"100%", width:"480px"}}>
                <div className="analysis-score" style={{width:`${temporalLPercentile}%`, borderRight:`10px ${colors[temporalLPercentile]} solid`}}>
                  L
                  <br/>
                  {temporalL}
                </div>
                <div className="analysis-score" style={{width:`${temporalRPercentile}%`, borderRight:`10px ${colors[temporalRPercentile]} solid`}}>
                  R
                  <br/>
                  {temporalR}
                </div>
              </div>
            </div>
            <div style={{borderBottom:"2px #2A2E31 solid"}}>
              <div style={{height:"120px", width:"120px"}}>
                <BrainImage className="BrainImage" region="occipital" color={colors[Math.round((occipitalRPercentile+occipitalLPercentile)/2)]}/>
                Occipital Lobe
              </div>
              <div style={{height:"100%", width:"480px"}}>
                <div className="analysis-score" style={{width:`${occipitalLPercentile}%`, borderRight:`10px ${colors[occipitalLPercentile]} solid`}}>
                  L
                  <br/>
                  {occipitalL}
                </div>
                <div className="analysis-score" style={{width:`${occipitalRPercentile}%`, borderRight:`10px ${colors[occipitalRPercentile]} solid`}}>
                  R
                  <br/>
                  {occipitalR}
                </div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column", alignItems:"flex-end", width:"690px"}}>
            <JetColorMap/>
            <div style={{width:"600px", display:"flex", justifyContent:"space-between"}}>
              <div>SUVR</div>
              <div>1.0</div>
              <div>1.2</div>
              <div>1.4</div>
              <div>1.6</div>
              <div>1.8</div>
              <div>2.0</div>
              {/* SUVR &emsp;&emsp;&emsp;&emsp;&emsp;1.0&emsp;&emsp;&emsp;&emsp;&ensp;1.2&emsp;&emsp;&emsp;&emsp;&ensp;1.4&emsp;&emsp;&emsp;&emsp;&ensp;1.6&emsp;&emsp;&emsp;&emsp;&ensp;1.8&emsp;&emsp;&emsp;&emsp;&ensp;2.0 */}
            </div>
        </div>
      </React.Fragment>
    )
  }
}
