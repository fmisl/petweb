const sliceListReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_SLICES':
      return [...state, {fileID:action.fileID, 
        
      // InputAffineX0:v.InputAffineParamsX0, InputAffineY1:v.InputAffineParamsY1, InputAffineZ2:v.InputAffineParamsZ2, 
      // OutputAffineX0:v.OutputAffineParamsX0, OutputAffineY1:v.OutputAffineParamsY1, OutputAffineZ2:v.OutputAffineParamsZ2, 
      
      B64:action.slices}]
    // case 'REMOVE_SLICES':
    //   return state.filter((v,i)=>v.CaseID!=action.fileID)
    default:
      return [...state]
  }
}
export default sliceListReducer;