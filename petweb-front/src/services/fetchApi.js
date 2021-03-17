import axios from 'axios';
import {IPinUSE} from './IPs'

export function testing(data){
  return axios.get(IPinUSE+"testing/",{
    headers:{
    'Authorization':'jwt '+data.token
    }
  })
}
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
export function uploadFile(data) {
  return axios.post(IPinUSE+"v1/case/uploads/",data.obj,{
    headers:{
      'Authorization':'jwt '+data.token,
      'content-type': 'multipart/form-data'
    }
  });
}
export function Upload(data) {
  return axios.post(IPinUSE+"v1/case/uploads/",data,{
    headers:{
      'content-type': 'multipart/form-data'
    }
  });
}