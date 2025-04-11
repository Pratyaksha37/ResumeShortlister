import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AnalyzerPage from './pages/AnalyzerPage'

function App() {
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false)
  
  // Set up PDF.js
  useEffect(() => {
    // Add loading indicator
    const loadPdfJs = async () => {
      try {
        window.pdfjsLib = window['pdfjs-dist/build/pdf']
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
        setPdfJsLoaded(true)
      } catch (error) {
        console.error('Error loading PDF.js:', error)
      }
    }
    
    loadPdfJs()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="analyzer" element={<AnalyzerPage isPdfJsLoaded={pdfJsLoaded} />} />
    </Routes>
  )
}

export default App