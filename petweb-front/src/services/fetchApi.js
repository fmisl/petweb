import axios from 'axios';
import {IPinUSE} from './IPs'

export function TokenVerify (data) {
  return axios.post(IPinUSE+'api/token/verify/', data);
}
export function Registration (data) {
  return axios.post(IPinUSE+'rest-auth/registration/', data);
}
export function Login (data) {
  return axios.post(IPinUSE+'api/token/', data);
}
export function getCase(data) {
  return axios.get(IPinUSE+"v1/case/"+data.id+"/",{
    headers:{
    'Authorization':'jwt '+data.token
    }
  })
}
export function deleteFile(data) {
  return axios.delete(IPinUSE+"testing/uploader/",{
    headers:{
      'Authorization':'jwt '+data.token,
    }
  });
}
export function postFile(data) {
  return axios.post(IPinUSE+"testing/uploader/",data.obj,{
    headers:{
      'Authorization':'jwt '+data.token,
      'content-type': 'multipart/form-data'
    }
  });
}
export function runFile(data) {
  return axios.put(IPinUSE+"testing/uploader/",data.obj,{
    headers:{
      'Authorization':'jwt '+data.token,
    }
  });
}
export function testing(data){
  return axios.get(IPinUSE+"testing/",{
    headers:{
    'Authorization':'jwt '+data.token
    }
  })
}