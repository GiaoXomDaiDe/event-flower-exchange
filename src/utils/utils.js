import CryptoJS from 'crypto-js'
const secretKey = '12345678901234567890123456789012'

export const setAccessTokenToLS = (access_token) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const clearLS = () => {
  localStorage.removeItem('access_token')
}

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString().toString()
}

export const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
