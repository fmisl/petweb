const counterReducer = (state = 0, action) => {
  switch(action.type){
    case 'INCREMENT':
      return Math.min(action.max-1, state + 1);
    case 'DECREMENT':
      return Math.max(0,state - 1);
    case 'TAB_NUMBER':
      return action.tabNumber;
    default:
      return state;
  }
}
export default counterReducer;