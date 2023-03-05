import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {FieldProvider} from "./context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FieldProvider>

      <App />
    </FieldProvider>
  </React.StrictMode>,
)
