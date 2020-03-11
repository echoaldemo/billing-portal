import axios from "axios";

const baseUrl = "http://phdev.perfectpitchtech.com:8001";
/* const baseUrl = "http://localhost:8001"; */
const baseMock = "http://5e2fcff79c29c900145db496.mockapi.io";
const req = {
  headers: {
    Authorization: "Token 821a7d6aeb62468bf051fbb0efb65d8e2607009d"
  }
};

const get = (endpoint, data) => axios.get(`${baseUrl}${endpoint}`, data);
const post = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, data);
const patch = (endpoint, data) => axios.patch(`${baseUrl}${endpoint}`, data);
const remove = (endpoint, data) => axios.delete(`${baseUrl}${endpoint}`, data);

const auth = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, { data });
const getAPI = (endpoint, data) =>
  axios.get(`http://devswarm.perfectpitchtech.com${endpoint}`, {
    ...req,
    data
  });

const getMock = (endpoint, data) =>
  axios.get(`${baseMock}${endpoint}`, { data });
export { get, patch, post, getMock, auth, getAPI, remove };
