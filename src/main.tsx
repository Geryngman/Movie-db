import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { LibraryProvider } from './context/LibraryContext.tsx'
import './index.css'

// Strip the trailing slash so React Router gets a clean basename
// (e.g. "/Movie-db" when hosted on GitHub Pages, "" in local dev).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LibraryProvider>
        <App />
      </LibraryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
