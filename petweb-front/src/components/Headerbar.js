import React from 'react';
import '../App.css'
import {useSelector, useDispatch} from 'react-redux';
import {changeColor, loadItems} from '../reduxs/actions';

function Headerbar() {
  const fileList = useSelector(state => state.fileList);
  const dispatch = useDispatch();
  // console.log("headerbar.js:?")
  // console.log("headerbar.js:",fileList)
  return (
    <div className="Headerbar">
       {/* onClick={()=>{dispatch(loadItems())}} */}
      {/* Logo */}
      {/* {fileList} */}
      {/* {JSON.stringify(fileList)}  */}
    </div>
  );
}

export default Headerbar;
