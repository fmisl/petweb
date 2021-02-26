import axios from 'axios';

const globalIP = "http://106.10.41.158:8000/";
const localIP = "http://localhost:8000/";
export const IPinUSE = localIP;

export function TokenVerify (data) {
  return axios.post(IPinUSE+'api/token/verify/', data);
}
export function Registration (data) {
  return axios.post(IPinUSE+'rest-auth/registration/', data);
}
export function Login (data) {
  return axios.post(IPinUSE+'api/token/', data);
}