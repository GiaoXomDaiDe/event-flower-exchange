import axios from 'axios'

const httpRequest = axios.create({
  baseURL: 'https://localhost:7026/api/'
})

export const get = async (path, option = {}) => {
  const response = await httpRequest.get(path, option)
  return response.data
}

export const post = async (path, data = {}, option = {}) => {
  const response = await httpRequest.post(path, data, option)
  return response.data
}

export const remove = async (path, data, option = {}) => {
  const response = await httpRequest.delete(path, data, option)
  return response.data
}

export default httpRequest
