import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../constants/config.js'
import URL from '../constants/url.js'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setSellerProfileToLS } from './utils.js'

export class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
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
      (response) => {
        const { url } = response.config
        if (url === URL.URL_LOGIN || url === URL.URL_REGISTER_ACCOUNT) {
          const data = response.data
          this.accessToken = data.token
          setAccessTokenToLS(this.accessToken)
          toast.success(data.message)
        }
        //Nếu là 201 vs register to seller => luu thong tin vao localStorage
        else if (url === URL.URL_REGISTER_TO_SELLER) {
          if (response.status === 201) {
            const { shop } = response.data
            setSellerProfileToLS(shop)
          }
        } else if (url === URL.URL_SELLER_CANCEL) {
          console.log(response)
          clearLS()
          toast.success(response.data.message)
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
