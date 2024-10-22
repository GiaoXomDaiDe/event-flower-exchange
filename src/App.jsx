import React from 'react'
import useRouteElements from './useRouteElements.jsx'

function App() {
  const routeElements = useRouteElements()
  return <>{routeElements}</>
}
export default App
