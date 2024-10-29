import url from '../constants/url'
import http from '../utils/http'

const utilsApi = {
  uploadImage(file) {
    return http.post(url.URL_SET_IMAGE, file)
  }
}
export default utilsApi
