import 'antd/dist/reset.css' // Sử dụng reset.css cho phiên bản Ant Design v5
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css' // Đảm bảo Tailwind cũng được thêm vào

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)