import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App as AntApp, ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { SellerProvider } from './contexts/seller.context.jsx'
import './index.css'
import { store } from './redux/store.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'Beausite Classic Trial',
                  colorPrimary: '#ff6d7e'
                }
              }}
            >
              <AntApp>
                <SellerProvider>
                  <App />
                </SellerProvider>
              </AntApp>
            </ConfigProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
