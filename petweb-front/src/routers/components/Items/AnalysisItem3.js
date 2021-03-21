import React, { Component } from 'react'
import axios from 'axios';
import {IPinUSE} from '../../../services/IPs'
import { connect } from 'react-redux';
import * as actions from '../../../reduxs/actions';
import './AnalysisItem3.css'
// import * as services from '../../../services/fetchApi'
class Analysisitem3 extends Component {
    // state = {
    //     subRegion:{},
    // }

    // componentDidUpdate(prevProps) {
    //     const {counter} = this.props;
    //     const username = localStorage.getItem('username')
    //     if (prevProps.counter.tabX != this.props.counter.tabX){
    //         console.log('componentDidUpdate')
    //         try {
    //             axios.get(IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/aal_subregion.txt')
    //             .then(res => {
    //                 const posts = res.data.split(/\s+/)
    //                 const obj = posts.reduce(function(o, val, idx) { o[subRegionName[idx]] = val; return o; }, {});
    //                 console.log(res.data,posts, typeof(posts), obj)
    //                 this.setState({
    //                     subRegion: obj,
    //                 })
    //             })
    //         } catch (err) {
        
    //         }
    //     }
    // }

    render() {
        const {counter} = this.props;
        const username = localStorage.getItem('username')
        return (
            <div className="AnalysisItem3-Default">
                <div className="AnalysisItem3-Surface" >
                    {/* IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/'+inoutSelect+'_coronal_'+i+'.png' */}
                    <div><img src={IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/_llat.png'} height="220px"/>Left Lateral</div>
                    <div><img src={IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/_rlat.png'} height="220px"/>Right Lateral</div>
                </div>
                <div className="AnalysisItem3-Surface" >
                    <div><img src={IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/_lmed.png'} height="220px"/>Left Medial</div>
                    <div><img src={IPinUSE+'result/download/'+username+'/database/'+counter.fileID+'/_rmed.png'} height="220px"/>Right Medial</div>
                </div>
                <div className="AnalysisItem3-Threshold">
                    <input type="range" style={{width:"35%"}}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    // storeCount: state.count.count,
    counter:state.counter,
    isLogged:state.isLogged,
    listSelected:state.stackManager,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(actions.increment()),
    decrement: () => dispatch(actions.decrement()),
    login: () => dispatch(actions.login()),
    logout: () => dispatch(actions.logout()),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(Analysisitem3);