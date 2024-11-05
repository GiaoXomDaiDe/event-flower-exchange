import url from '../constants/url.js'
import http from '../utils/http.js'

const productApi = {
  createFlower(formData) {
    const accessToken = getAccessTokenFromLS()
    console.log('Calling API with accessToken:', accessToken)
    return http.post(url.URL_CREATE_FLOWER, { accessToken }, formData)
  },
  updateFlowerCategory(params) {
    return http.get(url.URL_UPDATE_FLOWER_CATEGORY, { params })
  },
  deleteFlowerCategory(fCateId) {
    return http.get(url.URL_DELETE_FLOWER_CATEGORY, { params: { fCateId } })
  }
}

export default productApi
