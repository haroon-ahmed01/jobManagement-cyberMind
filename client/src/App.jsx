import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import JobCreationPage from './pages/JobCreationPage'
import JobListingPage from './pages/JobListingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobListingPage />} />
        <Route path="/create-job" element={<JobCreationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

