import url from '../constants/url.js'
import http from '../utils/http.js'

const sellerApi = {
  registerToSeller(formData) {
    return http.post(url.URL_REGISTER_TO_SELLER, formData)
  },

  getSellerProfile() {
    return http.get(url.URL_GET_SELLER_PROFILE)
  },

  getCreditCardInfo() {
    return http.get(url.URL_GET_CREDIT_CARD_INFO)
  }
}

export default sellerApi
