import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/Auth.jsx'
import { ListProvider } from './store/ListContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(


  <AuthProvider>

  <ListProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>,

  </ListProvider>

  </AuthProvider>
)
