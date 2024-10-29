import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

const getInitialUserContext = () => ({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  isSellerMode: false,
  setIsSellerMode: () => null,
  sellerInfo: null,
  setSellerInfo: () => null,
  reset: () => null
})

const initialAppContext = getInitialUserContext()

export const SellerContext = createContext(initialAppContext)

export const SellerProvider = ({ children, defaultValue = initialAppContext }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated)
  const [isSellerMode, setIsSellerMode] = useState(defaultValue.isSellerMode)
  const [sellerInfo, setSellerInfo] = useState(defaultValue.sellerInfo)

  const reset = () => {
    setIsAuthenticated(false)
    setIsSellerMode(false)
    setSellerInfo(null)
  }

  return (
    <SellerContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isSellerMode,
        setIsSellerMode,
        sellerInfo,
        setSellerInfo,
        reset
      }}
    >
      {children}
    </SellerContext.Provider>
  )
}

SellerProvider.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    isSellerMode: PropTypes.bool,
    sellerInfo: PropTypes.object
  })
}
