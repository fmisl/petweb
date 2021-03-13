import React, { Component } from 'react'
import './AnalysisItem3.css'
import * as services from '../../../services/fetchApi'

export default class Analysisitem3 extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {
        
    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() {}

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    render() {
        return (
            <div className="AnalysisItem3-Default">
                <div className="AnalysisItem3-Surface" >
                    <div><img src={`${services.IPinUSE}+'result/download/case190/_llat.png'`} height="220px"/>Left Lateral</div>
                    <div><img src={`${services.IPinUSE}+'http://147.47.228.204:8002/result/download/case190/_rlat.png'`} height="220px"/>Right Lateral</div>
                </div>
                <div className="AnalysisItem3-Surface" >
                    <div><img src={`${services.IPinUSE}+'result/download/case190/_lmed.png'`} height="220px"/>Left Medial</div>
                    <div><img src={`${services.IPinUSE}+'result/download/case190/_rmed.png'`} height="220px"/>Right Medial</div>
                </div>
                <div className="AnalysisItem3-Threshold">
                    <input type="range" style={{width:"35%"}}/>
                </div>
            </div>
        )
    }
}
