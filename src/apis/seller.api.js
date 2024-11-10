import url from '../constants/url.js'
import http from '../utils/http.js'
import { getAccessTokenFromLS } from '../utils/utils.js'

const sellerApi = {
  registerToSeller(formData) {
    return http.post(url.URL_REGISTER_TO_SELLER, formData)
  },
  async getSellerProfile() {
    try {
      return await http.get(url.URL_GET_SELLER_PROFILE)
    } catch (error) {
      // Kiểm tra và xử lý lỗi nếu cần
      throw error
    }
  },
  getCreditCardInfo() {
    return http.get(url.URL_GET_CREDIT_CARD_INFO)
  },
  sellerCancel() {
    return http.post(url.URL_SELLER_CANCEL)
  },
  getBanks() {
    return http.get(url.URL_GET_BANKS)
  },
  getSellerProductList(params) {
    return http.get(url.URL_GET_SELLER_FLOWERS, { params })
  },
  changeStatusFlower(flowerId) {
    const accessToken = getAccessTokenFromLS()
    console.log('Calling API with accessToken:', accessToken)
    return http.post(`${url.URL_CHANGE_FLOWER_STATUS}?flowerId=${flowerId}&accessToken=${accessToken}`)
  },
  getSellerFlowerCategories() {
    return http.get(url.URL_GET_FLOWER_CATEGORIES)
  },
  getOrdersOfSeller(sellerId) {
    return http.get(url.URL_GET_ORDERS_OF_SELLER, { params: { sellerId } })
  }
}

export default sellerApi
