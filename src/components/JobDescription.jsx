function JobDescription({ jobText, setJobText }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h5 className="mb-0"><i className="fas fa-briefcase me-2"></i>Job Description</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="job" className="form-label">Paste Job Description</label>
          <textarea 
            className="form-control job-textarea" 
            id="job" 
            rows="10"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default JobDescription