import axios from 'axios';
// const baseUrl = "https://rentmyplace-backend.onrender.com/api/v1"
const baseUrl = "http://localhost:3200/api/v1";

const instance = axios.create({
  baseURL:baseUrl,
  withCredentials:true
});

export const get = (url)=>instance.get(url);
export const post = (url,data)=>instance.post(url,data);
export const put = (url, data) => instance.put(url, data);
export const patch= (url, data) => instance.patch(url, data);
export const del = (url) => instance.delete(url);
