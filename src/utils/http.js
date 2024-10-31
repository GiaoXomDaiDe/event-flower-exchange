import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../constants/config.js'
import access_token from '../constants/env.js'
import URL from '../constants/url.js'
import { clearLS, encryptData, getAccessTokenFromLS, setAccessTokenToLS, setSellerProfileToLS } from './utils.js'

export class Http {
  constructor() {
    //Chưa có login chưa có sẵn access_token trong localStorage
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
      (response) => {
        const { url } = response.config
        //Nếu là 201 vs register to seller => luu thong tin vao localStorage
        if (url === URL.URL_REGISTER_TO_SELLER) {
          if (response.status === 201) {
            const { shop } = response.data

            // Mã hóa các thông tin nhạy cảm
            const encryptedSellerProfile = { ...shop }
            encryptedSellerProfile.cardName = encryptData(shop.cardName)
            encryptedSellerProfile.cardNumber = encryptData(shop.cardNumber)
            encryptedSellerProfile.taxNumber = encryptData(shop.taxNumber)
            encryptedSellerProfile.cardProviderName = encryptData(shop.cardProviderName)
            console.log(encryptedSellerProfile)

            // Lưu trữ sellerProfile đã được mã hóa vào localStorage
            setSellerProfileToLS(encryptedSellerProfile)
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
