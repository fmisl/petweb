const fileListReducer = (state = [], action) => {
  switch(action.type){
    // case 'CHANGE_COLOR':
    //   return {
    //     ...state,
    //     color:action.color
    //   }
    case 'FETCH_ITEMS':
      return [
        ...action.items
      ]
    default:
      return [...state]
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