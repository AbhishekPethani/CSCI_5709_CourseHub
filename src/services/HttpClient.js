import axios from "axios";
const baseUri = "https://csci-5709-course-hub-backend.herokuapp.com/admin/";

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
