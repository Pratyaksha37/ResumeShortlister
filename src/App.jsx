import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AnalyzerPage from './pages/AnalyzerPage'

function App() {
  // Set up PDF.js
  useEffect(() => {
    window.pdfjsLib = window['pdfjs-dist/build/pdf']
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="analyzer" element={<AnalyzerPage />} /> 
    </Routes>
  )
}

export default App