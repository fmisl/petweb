import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Sidebar from './components/Sidebar'
import Headerbar from './components/Headerbar'
import { connect } from 'react-redux';
import * as actions from '../reduxs/actions';
// import {useSelector, useDispatch} from 'react-redux';
// import {increment, decrement} from '../reduxs/actions';
import IconBurger from '../images/IconBurger';
import CustomSlide from './components/Slider/CustomSlide';
import BrainImage from '../images/BrainImage';
import JetColorMap from '../images/JetColorMap'

// function Analysis() {
class Analysis extends Component {
   constructor(props) {
    super(props);
    this.handleWheel = this.handleWheel.bind(this);
    this.state = {
      showMenu: false,
    };
  }
  handleWheel(e) {
    e.preventDefault();
    // console.log(e.deltaY)
    e.deltaY > 0 ? this.slider.slickNext() : this.slider.slickPrev();
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('wheel', this.handleWheel);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('wheel', this.handleWheel);
  }
  render(){
    const { counter, isLogged, increment, decrement } = this.props;
    // const counter = useSelector(state => state.counter);
    // const isLogged = useSelector(state => state.isLogged);
    // const dispatch = useDispatch();
    // const [showMenu, setShowMenu] = useState(false)
    // console.log(history.location.pathname)
    const settings = {
      className: "center",
      centerMode: true,
      dots: true,
      infinite: false,
      vertical: true,
      verticalSwiping: true,
      speed: 300,
      slidesToShow: 1,
      centerPadding: "50px",
      slidesToScroll: 1
    };
  
    console.log(window.location.pathname)
    return (
      <div className="content" onClick={()=>this.setState({showMenu:false})}>
        <Sidebar/>
        <Headerbar/>
        <div className="content-page">

          <div className="analysis-box">
            <Slider ref={slider => this.slider = slider} {...settings} >
              <CustomSlide index={1}>
                <div  style={{display:"flex", whiteSpace:"nowrap", margin:"0px 0px 15px"}}>
                  <div className="analysis-box1">
                    <div className="analysis-box1-title">Regional SUVR</div>
                    <div className="analysis-box1-content">
                      <div>
                        <div style={{height:"120px", width:"120px"}}>
                          <BrainImage className="BrainImage" region="global"/>
                          Global Lobe
                        </div>
                        <div style={{height:"100%", width:"80%"}}>
                          <div className="analysis-score" style={{width:"0%"}}>
                            R
                            <br/>
                            2.2
                          </div>
                          <div className="analysis-score" style={{width:"40%"}}>
                            L
                            <br/>
                            1.2
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{height:"120px", width:"120px"}}>
                          <BrainImage className="BrainImage" region="frontal"/>
                          Frontal Lobe
                        </div>
                        <div style={{height:"100%", width:"80%"}}>
                          <div className="analysis-score" style={{width:"20%"}}>
                            R
                            <br/>
                            2.2
                          </div>
                          <div className="analysis-score" style={{width:"50%"}}>
                            L
                            <br/>
                            1.2
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{height:"120px", width:"120px"}}>
                          <BrainImage className="BrainImage" region="parietal"/>
                          Parietal Lobe
                        </div>
                        <div style={{height:"100%", width:"80%"}}>
                          <div className="analysis-score" style={{width:"60%"}}>
                            R
                            <br/>
                            2.2
                          </div>
                          <div className="analysis-score" style={{width:"100%"}}>
                            L
                            <br/>
                            1.2
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{height:"120px", width:"120px"}}>
                          <BrainImage className="BrainImage" region="temporal"/>
                          Temporal Lobe
                        </div>
                        <div style={{height:"100%", width:"80%"}}>
                          <div className="analysis-score" style={{width:"20%"}}>
                            R
                            <br/>
                            2.2
                          </div>
                          <div className="analysis-score" style={{width:"40%"}}>
                            L
                            <br/>
                            1.2
                          </div>
                        </div>
                      </div>
                      <div style={{borderBottom:"2px #2A2E31 solid"}}>
                        <div style={{height:"120px", width:"120px"}}>
                          <BrainImage className="BrainImage" region="occipital"/>
                          Occipital Lobe
                        </div>
                        <div style={{height:"100%", width:"80%"}}>
                          <div className="analysis-score" style={{width:"80%"}}>
                            R
                            <br/>
                            2.2
                          </div>
                          <div className="analysis-score" style={{width:"60%"}}>
                            L
                            <br/>
                            1.2
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column", alignItems:"flex-end", width:"652px"}}>
                      <JetColorMap/>
                      <div style={{width:"552px", textAlign:"start"}}>
                        SUVR &emsp;1.0&emsp;&emsp;&emsp;&emsp;&ensp;1.2&emsp;&emsp;&emsp;&emsp;&ensp;1.4&emsp;&emsp;&emsp;&emsp;&ensp;1.5&emsp;&emsp;&emsp;&emsp;&ensp;1.6&emsp;&emsp;&emsp;&emsp;&ensp;2.0
                      </div>
                    </div>
                  </div>

                  <div className="analysis-box2">
                    <div className="analysis-box2-title">Sub-regional SUVR</div>
                  </div>
                </div>
              </CustomSlide>
              <CustomSlide index={2}>
                <div style={{display:"flex", whiteSpace:"nowrap", margin:"0px 0px 15px"}}>
                  <div className="analysis-box3">
                    <div className="analysis-box3-title">Brain Surface</div>
                  </div>
                </div>
              </CustomSlide>
            </Slider>
          </div>

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
              <div className="view-btn" onClick={(e)=>{e.stopPropagation();this.setState({showMenu:!this.state.showMenu})}}>
                <IconBurger className={`view-icon ${this.state.showMenu && 'show'}`}/>
                {this.state.showMenu && 
                  <div className="view-menu" onClick={(e)=>e.stopPropagation()}>
                    <div>Save</div>
                    <div>Delete</div>
                    <div>Export PNG</div>
                    <div>Export Nifti</div>
                  </div>}
              </div>
            </div>
          </div>

          <div className="redux-info">
            <h1>isLogged: {isLogged.toString()}</h1>
            <h1>Analysis page</h1>
            <h1>Counter: {counter}</h1>
            <button onClick={()=> increment()}>+</button>
            <button onClick={()=> decrement()}>-</button>
            {/* {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // storeCount: state.count.count,
  counter:state.counter,
  isLogged:state.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(actions.increment()),
  decrement: () => dispatch(actions.decrement()),
  login: () => dispatch(actions.login()),
  logout: () => dispatch(actions.logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Analysis);