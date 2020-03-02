import axios from 'axios'

const baseUrl = 'http://phdev.perfectpitchtech.com:8001'

const baseMock = 'http://5e2fcff79c29c900145db496.mockapi.io'
const req = {
  headers: {
    Authorization: 'Token 8ee5d9b89bff4f221f475f43bb5b1f26539e11b7'
  }
}

const get = (endpoint, data) => axios.get(`${baseUrl}${endpoint}`, data)
const post = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, data)
const patch = (endpoint, data) => axios.patch(`${baseUrl}${endpoint}`, data)
const remove = (endpoint, data) => axios.delete(`${baseUrl}${endpoint}`, data)

const auth = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, { data })
const getAPI = (endpoint, data) =>
  axios.get(`https://api.perfectpitchtech.com${endpoint}`, { ...req, data })

const getMock = (endpoint, data) =>
  axios.get(`${baseMock}${endpoint}`, { data })

export { get, patch, post, getMock, auth, getAPI, remove }
