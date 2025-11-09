import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import Layout from './Layout.jsx'

import Home from './pages/Home.jsx'
import Introduction from './pages/Introduction.jsx'
import Contract from './pages/Contract.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="contract" element={<Contract />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)