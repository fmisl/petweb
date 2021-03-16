import React from 'react';
import '../App.css'
import {useSelector, useDispatch} from 'react-redux';
import {changeColor, loadColor} from '../reduxs/actions';

function Headerbar() {
  const fileLists = useSelector(state => state.fileLists);
  const dispatch = useDispatch();
  console.log("headerbar.js:",fileLists)
  return (
    <div className="Headerbar" onClick={()=>{dispatch(loadColor())}}>
      {/* Logo */}
      {fileLists.color}
    </div>
  );
}

export default Headerbar;
