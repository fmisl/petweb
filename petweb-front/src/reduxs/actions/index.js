import axios from "axios";
import {IPinUSE} from '../../services/IPs'
import * as services from '../../services/fetchApi'
export function loadItems (data){
  return async dispatch => {
    try {
      const dataRes = await axios.get(IPinUSE+"testing/",{
          headers:{
            'Authorization':'jwt '+data.token
            }
        }).then(res => res.data)
        dispatch(fetchItems(dataRes));
    } catch (err) {

    }
  }
}
export const fetchItems = (items) =>{
  return{
    type: 'FETCH_ITEMS',
    items: items,
  }
}
export const increment = (max) =>{
  return {
    type: 'INCREMENT',
    max: max
  };
};
export const decrement = (max) =>{
  return {
    type: 'DECREMENT',
    max: max
  };
};
export const tab_number = (num) =>{
  return {
    type: 'TAB_NUMBER',
    tabNumber: num
  };
};
export const login = () =>{
  return {
    type: 'LOGIN',
  };
};
export const logout = () =>{
  return {
    type: 'LOGOUT',
  };
};
export const profile = (text) =>{
  return {
    type: 'PROFILE',
    username: text
  };
};
export const addToList = (item) =>{
  return {
    type: 'ADD',
    item: item,
  }
}
export const removeFromList = (item) =>{
  return {
    type: 'REMOVE',
    item: item,
  }
}
export const changeColor = (color) =>{
  return{
    type: 'CHANGE_COLOR',
    color: color,
  }
}
export const openItem = (itemID) =>{
  return {
    type: 'OPEN_ITEM',
    itemID: itemID,
  }
}
export const closeItem = (itemID) =>{
  return {
    type: 'CLOSE_ITEM',
    itemID: itemID,
  }
}
export const selectItem = (itemID) =>{
  return {
    type: 'SELECT_ITEM',
    itemID: itemID,
  }
}
export const unselectItem = (itemID) =>{
  return {
    type: 'UNSELECT_ITEM',
    itemID: itemID,
  }
}