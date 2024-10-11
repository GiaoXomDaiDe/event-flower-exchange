import PropTypes from 'prop-types'
import { createContext } from 'react'

const getInitialUserContext = () => ({
  //isAuthenticated: false,
  isAuthenticated: true,
  setIsAuthenticated: () => null,
  //isSellerMode: false,
  isSellerMode: true,
  setIsSellerMode: () => null,
  reset: () => null
})

const initialAppContext = getInitialUserContext()

export const SellerContext = createContext(initialAppContext)

export const SellerProvider = ({ children, defaultValue: initialAppContext }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated)
  const [isSellerMode, setIsSellerMode] = useState(defaultValue.isSellerMode)

  const reset = () => {
    setIsAuthenticated(false)
    setIsSellerMode(false)
  }

  return (
    <SellerContext.SellerProvider value={{ isAuthenticated, setIsAuthenticated, isSellerMode, setIsSellerMode, reset }}>
      {children}
    </SellerContext.SellerProvider>
  )
}

SellerProvider.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    isSellerMode: PropTypes.bool
  })
}
