const fileListReducer = (state = {color:'red'}, action) => {
  switch(action.type){
    case 'CHANGE_COLOR':
      return {
        ...state,
        color:action.color
      }
    default:
      return {...state}
  }
  // if(action.type==="CHANGE_COLOR"){
  //   return {
  //     ...state,
  //     color:action.color
  //   }
  // } else{
  //   return{
  //     ...state
  //   }
  // }
}
export default fileListReducer;