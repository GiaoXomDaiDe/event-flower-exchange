import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'antd/dist/reset.css' // Sử dụng reset.css cho phiên bản Ant Design v5
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import './index.css' // Đảm bảo Tailwind cũng được thêm vào
import { persistor, store } from './redux/store.js'

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
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
