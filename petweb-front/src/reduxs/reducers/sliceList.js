const sliceListReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_SLICES':
      return [...state, {fileID:action.fileID, B64:action.slices}]
    // case 'REMOVE_SLICES':
    //   return state.filter((v,i)=>v.CaseID!=action.fileID)
    default:
      return [...state]
  }
}
export default sliceListReducer;