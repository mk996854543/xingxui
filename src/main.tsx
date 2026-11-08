import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter'
import './styles/global.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('未找到星绘次元的页面挂载节点。')
}

createRoot(root).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
