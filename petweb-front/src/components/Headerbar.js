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
      <div className="Headerbar-tab-collection">
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
        <div>2006_SNUH.nii &nbsp;&nbsp;&nbsp;&nbsp;x</div>
      </div>
      <div className="Headerbar-tab-clock">time info</div>
    </div>
  );
}

export default Headerbar;
