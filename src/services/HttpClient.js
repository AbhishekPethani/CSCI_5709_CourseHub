import axios from "axios";
const baseUri = "http://localhost:3000/api/";

const HttpClient = {
  get: (resourceUri) => {
    return axios.get(`${baseUri}${resourceUri}`);
  },
  post: (resourceUri, payload) => {
    return axios.post(`${baseUri}${resourceUri}`, payload);
  },
  put: (resourceUri, payload) => {
    return axios.put(`${baseUri}${resourceUri}`, payload);
  },
  remove: (resourceUri) => {
    return axios.delete(`${baseUri}${resourceUri}`);
  },
};

export default HttpClient;
