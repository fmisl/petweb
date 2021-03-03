import React,{useState} from 'react';
import '../App.css';
import Sidebar from './components/Sidebar'
import Headerbar from './components/Headerbar'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../reduxs/actions';
import IconBurger from '../images/IconBurger';

function Analysis({history}) {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch();
  // console.log(history.location.pathname)
  console.log(window.location.pathname)
  return (
    <div className="content" onClick={()=>setShowMenu(false)}>
      <Sidebar/>
      <Headerbar/>
      <div className="content-page">
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
            <div className="view-btn" onClick={(e)=>{e.stopPropagation();setShowMenu(!showMenu)}}>
              <IconBurger className={`view-icon ${showMenu && 'show'}`}/>
              {showMenu && 
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
          <button onClick={()=> dispatch(increment(1))}>+</button>
          <button onClick={()=> dispatch(decrement(2))}>-</button>
          {/* {isLogged ? '' : <h3>Valueable Information I shouldn't see</h3>} */}
        </div>
      </div>
    </div>
  );
}

export default Analysis;