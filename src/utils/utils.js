export const setAccessTokenToLS = (access_token) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const setSellerProfileToLS = (seller_profile) =>
  localStorage.setItem('seller_profile', JSON.stringify(seller_profile))

export const getSellerProfileFromLS = () => {
  const result = localStorage.getItem('seller_profile')
  if (result) {
    return JSON.parse(result)
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
export const LocalStorageEventTarget = new EventTarget()
export const clearLS = () => {
  // localStorage.removeItem('access_token')
  localStorage.removeItem('seller_profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
