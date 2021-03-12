import axios from 'axios';

const globalIP = "http://147.47.228.204:8002/";
const localIP = "http://localhost:8001/";
export const IPinUSE = globalIP;

export function TokenVerify (data) {
  return axios.post(IPinUSE+'api/token/verify/', data);
}
export function Registration (data) {
  return axios.post(IPinUSE+'rest-auth/registration/', data);
}
export function Login (data) {
  return axios.post(IPinUSE+'api/token/', data);
}
export function Upload(data) {
  return axios.post(IPinUSE+"v1/case/uploads/",data,{
    headers:{
      'content-type': 'multipart/form-data'
    }
  });
}