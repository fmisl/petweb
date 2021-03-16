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