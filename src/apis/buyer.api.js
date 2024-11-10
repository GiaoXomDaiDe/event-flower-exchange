import url from '../constants/url.js'
import http from '../utils/http.js'

const buyerApi = {
  getListFlower(params) {
    console.log({ ...params })
    return http.get(url.URL_GET_FLOWERS, { params: { ...params } })
  },
  addToCart(formData) {
    return http.post(url.URL_ADD_TO_CART, formData)
  }
}

export default buyerApi
