import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [selectedKey, setSelectedKey] = useState(null)

  return (
    <LayoutContext.Provider value={{ collapsed, setCollapsed, selectedKey, setSelectedKey }}>
      {children}
    </LayoutContext.Provider>
  )
}

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired
}
