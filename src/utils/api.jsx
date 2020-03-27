import axios from 'axios'
// const baseUrl = "http://phdev.perfectpitchtech.com:8001";
// const baseUrl = "http://localhost:3000";
// const baseUrl = 'http://localhost:15001'
const baseUrl = 'https://6so59hwb30.execute-api.us-east-1.amazonaws.com/dev'
const baseMock = 'http://5e2fcff79c29c900145db496.mockapi.io'
var bptoken = localStorage.getItem('bpToken')

const req = {
  headers: {
    Authorization: 'Token 4eb2825deaaf3764e8d471619809cbd4ab3a4567',
    'Content-Type': 'application/json'
  }
}
const checkToken = () => {
  if (bptoken) {
    axios.defaults.headers.common['Authorization'] = `token ${bptoken}`
  } else {
    axios.defaults.headers.common[
      'Authorization'
    ] = `token ${localStorage.getItem('bpToken')}`
  }
}
const get = (endpoint, data) => {
  checkToken()
  return axios.get(`${baseUrl}${endpoint}`, data)
}
const post = (endpoint, data) => {
  checkToken()
  return axios.post(`${baseUrl}${endpoint}`, data)
}
const patch = (endpoint, data) => {
  checkToken()
  return axios.patch(`${baseUrl}${endpoint}`, data)
}
const remove = (endpoint, data) => {
  checkToken()
  return axios.delete(`${baseUrl}${endpoint}`, data)
}

const auth = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, { data })
const getAPI = (endpoint, data) =>
  axios.get(`https://api.perfectpitchtech.com${endpoint}`, {
    ...req,
    data
  })

const getMock = (endpoint, data) =>
  axios.get(`${baseMock}${endpoint}`, { data })
export { get, patch, post, getMock, auth, getAPI, remove }
