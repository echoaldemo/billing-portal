import axios from 'axios'
import { token } from './domo'

// const baseUrl = "http://phdev.perfectpitchtech.com:8001";
// const baseUrl = "http://localhost:3000";
// const baseUrl = 'http://localhost:15001'
const baseUrl = 'https://6so59hwb30.execute-api.us-east-1.amazonaws.com/dev'
const baseMock = 'http://5e2fcff79c29c900145db496.mockapi.io'
const req = {
  headers: {
    Authorization: 'Token 4eb2825deaaf3764e8d471619809cbd4ab3a4567',
    'Content-Type': 'application/json'
  }
}

const domoReq = {
  headers: {
    Authorization: `bearer ${token}`
  }
}

const get = (endpoint, data) => axios.get(`${baseUrl}${endpoint}`, data)
const post = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, data)
const patch = (endpoint, data) => axios.patch(`${baseUrl}${endpoint}`, data)
const remove = (endpoint, data) => axios.delete(`${baseUrl}${endpoint}`, data)

const auth = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, { data })
const getAPI = (endpoint, data) =>
  axios.get(`https://api.perfectpitchtech.com${endpoint}`, {
    ...req,
    data
  })

const getDomo = data =>
  axios.post(
    `https://cors-anywhere.herokuapp.com/https://api.domo.com/v1/datasets/query/execute/6ea5c93d-905a-4f27-bc3a-e133b9809296`,
    { ...data },
    domoReq
  )

const getMock = (endpoint, data) =>
  axios.get(`${baseMock}${endpoint}`, { data })
export { get, patch, post, getMock, auth, getAPI, remove, getDomo }
