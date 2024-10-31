import CryptoJS from 'crypto-js'
const secretKey = '12345678901234567890123456789012'
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString().toString()
}
export const LocalStorageEventTarget = new EventTarget()

export const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export const setAccessTokenToLS = (access_token) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const setSellerProfileToLS = (seller_profile) =>
  localStorage.setItem('seller_profile', JSON.stringify(seller_profile))

export const getSellerProfileFromLS = () => {
  const result = localStorage.getItem('seller_profile')
  if (result) {
    const sellerProfile = JSON.parse(result)
    // Giải mã các trường thông tin nhạy cảm
    sellerProfile.cardName = decryptData(sellerProfile.cardName)
    sellerProfile.cardNumber = decryptData(sellerProfile.cardNumber)
    sellerProfile.taxNumber = decryptData(sellerProfile.taxNumber)
    sellerProfile.cardProviderName = decryptData(sellerProfile.cardProviderName)
    return sellerProfile
  }
  return null
}

export const getIsSellerModeFromLS = () => {
  const seller_profile = localStorage.getItem('seller_profile')
  if (!seller_profile) {
    return false
  }
  const { account } = JSON.parse(seller_profile)
  return Boolean(account.isSeller)
}

export const clearLS = () => {
  // localStorage.removeItem('access_token')
  localStorage.removeItem('seller_profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
