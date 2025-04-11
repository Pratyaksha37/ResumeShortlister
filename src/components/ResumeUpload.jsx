import { useRef } from 'react'

function ResumeUpload({ resumeText, setResumeText }) {
  const fileInputRef = useRef(null)
  
  // Extract text from PDF
  const extractPdfText = (file) => {
    const fileReader = new FileReader()
    
    fileReader.onload = function() {
      const typedarray = new Uint8Array(this.result)
      const pdfjsLib = window.pdfjsLib
      
      pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
        let textContent = ''
        const maxPages = pdf.numPages
        let currentPage = 1
        
        function extractPageText() {
          pdf.getPage(currentPage).then(function(page) {
            page.getTextContent().then(function(content) {
              textContent += content.items.map(item => item.str).join(' ') + '\n'
              currentPage++
              if (currentPage <= maxPages) {
                extractPageText()
              } else {
                setResumeText(textContent)
              }
            })
          })
        }
        
        extractPageText()
      }).catch(function(error) {
        console.error('Error loading PDF:', error)
        alert('Failed to extract text from PDF. Please try another file or paste text directly.')
      })
    }
    
    fileReader.readAsArrayBuffer(file)
  }
  
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    if (file.type === 'application/pdf') {
      extractPdfText(file)
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) setResumeText(e.target.result)
      }
      reader.readAsText(file)
    }
  }
  
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h5 className="mb-0"><i className="fas fa-upload me-2"></i>Upload Resume</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Select Resume File (TXT/PDF)</label>
          <input 
            className="form-control" 
            type="file" 
            id="file" 
            accept=".txt,.pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resume" className="form-label">Or Paste Resume Text</label>
          <textarea 
            className="form-control resume-textarea" 
            id="resume" 
            rows="10"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default ResumeUpload