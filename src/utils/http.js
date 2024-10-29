import axios from 'axios'
import config from '../constants/config.js'
import access_token from '../constants/env.js'
import { getAccessTokenFromLS, setAccessTokenToLS } from './utils.js'

export class Http {
  constructor() {
    setAccessTokenToLS(access_token)
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      contentType: 'multipart/form-data'
    })

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = getAccessTokenFromLS()
        if (accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
