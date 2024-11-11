import url from '../constants/url.js'
import http from '../utils/http.js'
import { getAccessTokenFromLS } from '../utils/utils.js'

const authApi = {
  registerAccount(formLogin) {
    return http.post(url.URL_REGISTER, formLogin)
  },
  loginAccount(formLogin) {
    return http.post(url.URL_LOGIN, formLogin)
  },
  getProfile() {
    const accessToken = getAccessTokenFromLS()
    return http.get(url.URL_GET_PROFILE, { params: { accessToken } })
  }
}

export default authApi
