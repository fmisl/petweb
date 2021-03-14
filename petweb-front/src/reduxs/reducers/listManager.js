const listManagerReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD':
      // state = state.slice();
      // return state.push(action.item);
      // console.log("listManagerReducer: ", action.item, state)
      return [...state, action.item];
    case 'REMOVE':
      // state = state.slice();
      // return state.remove(action.item);
      // const newState = state.filter((v, i) => v !== action.item);
      // console.log('remove: ',newState)
      return state.filter((v, i) => v !== action.item);
    default:
      return state;
  }
}
export default listManagerReducer;