import url from '../constants/url.js'
import http from '../utils/http.js'
import { getAccessTokenFromLS } from '../utils/utils.js'

const productApi = {
  createFlower(formData) {
    const accessToken = getAccessTokenFromLS()
    console.log('Calling API with accessToken:', accessToken)
    return http.post(`${url.URL_CREATE_FLOWER}?accessToken=${accessToken}`, formData)
  },
  updateFlower(formData) {
    const accessToken = getAccessTokenFromLS()
    console.log('Calling API with accessToken:', accessToken)
    return http.put(`${url.URL_UPDATE_FLOWER}?accessToken=${accessToken}`, formData)
  },
  deleteFlower(formData) {
    const accessToken = getAccessTokenFromLS()
    console.log(formData.getAll('flowerIds'))
    console.log(http.delete(`${url.URL_DELETE_FLOWER}?accessToken=${accessToken}`, formData.getAll('flowerIds')))
    return http.delete(`${url.URL_DELETE_FLOWER}?accessToken=${accessToken}`, { data: formData })
  },
  updateFlowerCategory(params) {
    return http.get(url.URL_UPDATE_FLOWER_CATEGORY, { params })
  },
  deleteFlowerCategory(fCateId) {
    return http.get(url.URL_DELETE_FLOWER_CATEGORY, { params: { fCateId } })
  },
  getFlowerDetail(flowerId) {
    return http.get(`${url.URL_GET_FLOWER_DETAIL}?flowerId=${flowerId}`)
  }
}

export default productApi
