// SellerProfile.js
import CryptoJS from 'crypto-js'
import { useEffect, useState } from 'react'

function SellerProfile() {
  const [sellerInfo, setSellerInfo] = useState(null)
  const [sensitiveData, setSensitiveData] = useState(null)

  const secretKey = 'your-secret-key'

  const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }

  useEffect(() => {
    // Lấy thông tin từ sessionStorage
    const savedSellerInfo = sessionStorage.getItem('sellerInfo')
    const encryptedSensitiveData = sessionStorage.getItem('encryptedSensitiveData')

    if (savedSellerInfo) {
      setSellerInfo(JSON.parse(savedSellerInfo))
    }

    if (encryptedSensitiveData) {
      const decryptedData = decryptData(encryptedSensitiveData)
      setSensitiveData(decryptedData)
    } else {
      // Gọi API để lấy thông tin nhạy cảm nếu cần
      sellerApi.getCreditCardInfo().then((response) => {
        const encryptedData = encryptData(response.data)
        sessionStorage.setItem('encryptedSensitiveData', encryptedData)
        setSensitiveData(response.data)
      })
    }
  }, [])

  if (!sellerInfo || !sensitiveData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{sellerInfo.shopName}</h1>
      <p>Địa chỉ: {sellerInfo.sellerAddress}</p>
      <h2>Thông tin thẻ tín dụng</h2>
      <p>Chủ thẻ: {sensitiveData.cardName}</p>
      <p>Số thẻ: **** **** **** {sensitiveData.cardNumber.slice(-4)}</p>
      <p>Ngân hàng: {sensitiveData.cardProviderName}</p>
      {/* Các thông tin khác */}
    </div>
  )
}
