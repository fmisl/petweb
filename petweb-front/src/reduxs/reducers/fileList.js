const fileListReducer = (state = [], action) => {
  switch(action.type){
    case 'FETCH_ITEMS':
      return [...action.items]
    case 'UPDATE_CENTILOID':
      return state.map((v, i) => {if (v.Centiloid == null) {return {...v, Centiloid:action.items.find((item)=>item.fileID==v.fileID).Centiloid}; } return {...v} });
      // return state.map((v, i) => {if (v.Centiloid == null) {return {...v, Centiloid:action.items[action.items.findIndex((item)=>item.fileID==v.fileID)].Centiloid}; } return {...v} });
    case 'OPEN_ITEM':
      return state.map((v, i) => {if (v.id == action.itemID) {return {...v, Opened:true}; } return {...v} });
    case 'CLOSE_ITEM':
      return state.map((v, i) => {if (v.id == action.itemID) {return {...v, Opened:false}; } return {...v} });
    case 'SELECT_ITEM':
      return state.map((v, i) => {if (v.id == action.itemID) {return {...v, Select:true}; } return {...v} });
    case 'UNSELECT_ITEM':
      return state.map((v, i) => {if (v.id == action.itemID) {return {...v, Select:false}; } return {...v} });
    case 'GROUP_ITEM':
      return state.map((v, i) => {if (v.Select == true) {return {...v, Group:action.groupID}; } return {...v} });
    case 'UNGROUP_ITEM_SELECT':
      return state.map((v, i) => {if (v.Select == true) {return {...v, Group:0}; } return {...v} });
    case 'UNGROUP_ITEM_INDIVIDUAL':
      return state.map((v, i) => {if (v.fileID == action.itemID) {return {...v, Group:0, Select:false}; } return {...v} });
    case 'OPEN_SELECT':
      return state.map((v, i) => {if (v.Select == true) {return {...v, Opened:true}; } return {...v} });
    default:
      return [...state]
  }
}
export default fileListReducer;