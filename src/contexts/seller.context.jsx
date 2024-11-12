import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getIsSellerModeFromLS, getSellerProfileFromLS } from '../utils/utils'

const getInitialUserContext = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  isSellerMode: getIsSellerModeFromLS(),
  setIsSellerMode: () => null,
  sellerProfile: getSellerProfileFromLS(),
  setSellerProfile: () => null,
  reset: () => null
})

const initialAppContext = getInitialUserContext()

export const SellerContext = createContext(initialAppContext)

export const SellerProvider = ({ children, defaultValue = initialAppContext }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated)
  const [isSellerMode, setIsSellerMode] = useState(defaultValue.isSellerMode)
  const [sellerProfile, setSellerProfile] = useState(defaultValue.sellerProfile)

  const reset = () => {
    setIsAuthenticated(false)
    setIsSellerMode(false)
    setSellerProfile(null)
  }

  return (
    <SellerContext.Provider
      value={{
        isAuthenticated,
        isSellerMode,
        sellerProfile,
        setIsAuthenticated,
        setIsSellerMode,
        setSellerProfile,
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
    sellerProfile: PropTypes.object
  })
}
