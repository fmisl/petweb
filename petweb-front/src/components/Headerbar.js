import React, {useState, useRef, useEffect,createRef} from 'react';
import '../App.css'
import IconDelete from '../images/IconDelete';
import {useSelector, useDispatch} from 'react-redux';
import {logout, increment, decrement, tab_location, closeItem} from '../reduxs/actions';
import {changeColor, loadItems} from '../reduxs/actions';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory, useParams, useLocation} from 'react-router-dom' 

function Headerbar({OpenedFiles}) {
  const [selectTab, setSelectTab] = useState(0);
  const fileList = useSelector(state => state.fileList);
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const myRef = useRef(null);
  // const OpenedFiles = fileList.filter(item => {return item.Opened==true});
  const OpenedFilesLength = OpenedFiles.length;
  const history =useHistory();
  const location = useLocation();
  const elRefs = useRef([]);
  // const scrollToRef = (ref) => ref.scrollLeft(ref.current.offsetLeft, 0)   
  // const executeScroll = () => scrollToRef(myRef)
  // console.log("headerbar.js:?")
  // console.log("headerbar.js:",fileList)
  // useEffect(() => {
  //   if (OpenedFiles.length !== 0){
  //     if (counter.fileID==null) {
  //       dispatch(tab_location({...counter, fileID:OpenedFiles[counter.tabX].fileID}))
  //     }
  //   }
  // }, [OpenedFiles])
  useEffect(() => {
    // console.log('useEffect: counter');
    // elRefs.current[counter.tabX].current.focus()
    const focusTab = counter.tabX
    if (OpenedFilesLength != 0) {
      // if (counter.tabX)
      try{
        myRef.current.scrollLeft=elRefs.current[focusTab].current.offsetLeft-100;
      } catch (e){
        alert('focustTab is closed: focusTab='+focusTab)
        // console.log(focusTab)
        // dispatch(tab_location({...counter, tabX:focusTab-1}))
      }
    }
  }, [counter])
  // }, [counter]) onClick={()=> {myRef.current.scrollLeft=elRefs.current[0].current.offsetLeft}}
  if (elRefs.current.length !== OpenedFilesLength) {
    // dispatch(tab_location({...counter, tabX:i, fileID:el.fileID}))
    elRefs.current = Array(OpenedFilesLength).fill().map((_, i) => elRefs.current[i] || createRef());
  }
  console.log('header', location.pathname.split('/')[1])
  return (
    <div className="Headerbar" >
      {/* <div className='Headerbar-left-arrow'>{'<<'}</div> */}
      <div ref={myRef} className="Headerbar-tab-collection">
        {
          OpenedFiles.map((el, i) => (
            <React.Fragment key={i}>
              <div ref={elRefs.current[i]}
                onClick={()=>{
                  if(counter.tabY == 2){
                    history.push('/'+location.pathname.split('/')[1]+'/'+el.fileID); 
                    dispatch(tab_location({...counter, tabX:i, fileID:el.fileID}));
                  }
                  else if (counter.tabY == 3){
                    history.push('/'+location.pathname.split('/').slice(1,3).join('/')+'/'+el.fileID); 
                    dispatch(tab_location({...counter, tabX:i, fileID:el.fileID}));
                  }
                  else
                    {
                      dispatch(tab_location({...counter, tabX:i, fileID:el.fileID}));
                    }
                }}
              className={`Headerbar-tab ${el.fileID == counter.fileID && 'act'}`}>
                {el.PatientID} 
                <div style={{userSelect:"none"}} onClick={(e)=>{e.stopPropagation();dispatch(closeItem(el.fileID))}}>
                  <IconDelete className="HeaderbarIcon-Delete"/>
                </div>
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
