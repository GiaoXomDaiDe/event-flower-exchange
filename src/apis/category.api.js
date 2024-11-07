import url from '../constants/url.js'
import http from '../utils/http.js'

const categoryApi = {
  createFlowerCategory({ FcateName, FcateDesc, FparentCateId }) {
    // console.log(params)
    return http.post(url.URL_CREATE_FLOWER_CATEGORY, { FcateName, FcateDesc, FparentCateId })
  },
  updateFlowerCategory({ FcateDesc, FcateId, FcateName }) {
    return http.put(url.URL_UPDATE_FLOWER_CATEGORY, { FcateDesc, FcateId, FcateName })
  },
  deleteFlowerCategory(fCateId) {
    return http.delete(url.URL_DELETE_FLOWER_CATEGORY, { params: { fCateId } })
  }
}

export default categoryApi
