import React, {useState, useRef, useEffect,createRef} from 'react';
import '../App.css'
import {useSelector, useDispatch} from 'react-redux';
import {logout, increment, decrement, tab_location} from '../reduxs/actions';
import {changeColor, loadItems} from '../reduxs/actions';

function Headerbar() {
  const [selectTab, setSelectTab] = useState(0);
  const fileList = useSelector(state => state.fileList);
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const myRef = useRef(null);
  const OpenedFiles = fileList.filter(item => {return item.Opened==true});
  const OpenedFilesLength = OpenedFiles.length;
  const elRefs = useRef([]);
  // const scrollToRef = (ref) => ref.scrollLeft(ref.current.offsetLeft, 0)   
  // const executeScroll = () => scrollToRef(myRef)
  // console.log("headerbar.js:?")
  // console.log("headerbar.js:",fileList)
  const focusTab = Math.min(OpenedFilesLength-1, counter.tabX)
  useEffect(() => {
    console.log('useEffect: executeScroll');
    // elRefs.current[counter.tabX].current.focus()
    if (OpenedFilesLength != 0) myRef.current.scrollLeft=elRefs.current[focusTab].current.offsetLeft-100;
  }, [counter])
  // }, [counter]) onClick={()=> {myRef.current.scrollLeft=elRefs.current[0].current.offsetLeft}}
  if (elRefs.current.length !== OpenedFilesLength) {
    // add or remove refs
    elRefs.current = Array(OpenedFilesLength).fill().map((_, i) => elRefs.current[i] || createRef());
  }

  return (
    <div className="Headerbar" >
      {/* <div className='Headerbar-left-arrow'>{'<<'}</div> */}
      <div ref={myRef} className="Headerbar-tab-collection">
        {/* <div className="Headerbar-vSplitter"></div> */}
          {OpenedFiles.map((el, i) => (
          <React.Fragment>
            <div ref={elRefs.current[i]} onClick={()=>dispatch(tab_location({...counter, tabX:i}))}
            className={`Headerbar-tab ${counter.tabX==i && 'act'}`}>
              {el.PatientID} &nbsp;&nbsp;&nbsp;&nbsp;x
            </div>
            <div className="Headerbar-vSplitter"></div>
          </React.Fragment>
          ))}
      </div>
      {/* <div className='Headerbar-right-arrow'>{'>>'}</div> */}
      <div className="Headerbar-tab-username">
        Daewoon Kim
      </div>
    </div>
  );
}

export default Headerbar;
