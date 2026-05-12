import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-center" 
      toastOptions={{
        style: {
          background: '#302300',
          color: '#cccec0',
          border: '1px solid #d89d03',
          fontFamily: 'Outfit',
        }
      }}
    />
  </React.StrictMode>,
)
