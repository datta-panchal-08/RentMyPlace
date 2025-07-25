import axios from 'axios';

const instance = axios.create({
  baseURL: "https://rentmyplace-backend.onrender.com/api/v1",
  withCredentials:true
});

export const get = (url)=>instance.get(url);
export const post = (url,data)=>instance.post(url,data);
export const put = (url, data) => instance.put(url, data);
export const patch= (url, data) => instance.patch(url, data);
export const del = (url) => instance.delete(url);
