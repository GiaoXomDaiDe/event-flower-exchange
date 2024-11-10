import url from '../constants/url'
import http from '../utils/http'

const utilsApi = {
  uploadImage(file) {
    return http.post(url.URL_SET_IMAGE, file)
  },
  finishDeliveringStage(orderId) {
    return http.get(url.URL_FINISH_DELIVERY_STAGE, { params: { orderId } })
  }
}
export default utilsApi
