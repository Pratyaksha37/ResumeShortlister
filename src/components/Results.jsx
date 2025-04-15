function Results({ results }) {
  const { structure, grammar, jobMatch, overallScore } = results
  
  const getScoreLevel = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  }
  
  const structureLevel = getScoreLevel(structure.score);
  const grammarLevel = getScoreLevel(grammar.score);
  const matchLevel = getScoreLevel(jobMatch.score);
  const overallLevel = getScoreLevel(overallScore);
  
  return (
    <div id="results">
      <h2 className="mb-4 text-center">Resume Analysis Results</h2>
      
      <div className="score-cards">
        <div className="score-card">
          <div className="circle-progress-container">
            <div 
              className="circle-progress" 
              style={{ 
                background: `conic-gradient(var(--${overallLevel}) ${overallScore}%, #eee ${overallScore}% 100%)` 
              }}
            >
              <div className="circle-inner">
                <span className="score-value" style={{ color: `var(--${overallLevel})` }}>
                  {Math.round(overallScore)}%
                </span>
              </div>
            </div>
          </div>
          <div>Overall Score</div>
        </div>
        
        <div className="score-card">
          <div className="circle-progress-container">
            <div 
              className="circle-progress" 
              style={{ 
                background: `conic-gradient(var(--${structureLevel}) ${structure.score}%, #eee ${structure.score}% 100%)` 
              }}
            >
              <div className="circle-inner">
                <span className="score-value" style={{ color: `var(--${structureLevel})` }}>
                  {Math.round(structure.score)}%
                </span>
              </div>
            </div>
          </div>
          <div>Structure</div>
        </div>
        
        <div className="score-card">
          <div className="circle-progress-container">
            <div 
              className="circle-progress" 
              style={{ 
                background: `conic-gradient(var(--${grammarLevel}) ${grammar.score}%, #eee ${grammar.score}% 100%)` 
              }}
            >
              <div className="circle-inner">
                <span className="score-value" style={{ color: `var(--${grammarLevel})` }}>
                  {Math.round(grammar.score)}%
                </span>
              </div>
            </div>
          </div>
          <div>Grammar</div>
        </div>
        
        <div className="score-card">
          <div className="circle-progress-container">
            <div 
              className="circle-progress" 
              style={{ 
                background: `conic-gradient(var(--${matchLevel}) ${jobMatch.score}%, #eee ${jobMatch.score}% 100%)` 
              }}
            >
              <div className="circle-inner">
                <span className="score-value" style={{ color: `var(--${matchLevel})` }}>
                  {Math.round(jobMatch.score)}%
                </span>
              </div>
            </div>
          </div>
          <div>Job Match</div>
        </div>
      </div>
      
      <div id="verdict">
        {overallScore >= 70 ? (
          <div className="verdict-pass">
            <h4><i className="fas fa-check-circle me-2"></i>Your resume is a strong match for this job!</h4>
            <p>Your resume is well-structured and matches the job requirements effectively. Consider addressing the missing keywords to further enhance your chances.</p>
          </div>
        ) : (
          <div className="verdict-fail">
            <h4><i className="fas fa-exclamation-circle me-2"></i>Your resume needs improvement for this job.</h4>
            <p>Your resume could use enhancement to better match this job description. Focus on addressing the missing keywords and improving the structure as suggested below.</p>
          </div>
        )}
      </div>
      
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-list-check me-2"></i>Structure Analysis</h5>
            </div>
            <div className="card-body">
              <div className="score-box">
                <div className="score-name">Structure Score:</div>
                <div className="progress w-100">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${structure.score}%`, backgroundColor: `var(--${structureLevel})` }} 
                    aria-valuenow={structure.score}
                  >
                    {Math.round(structure.score)}%
                  </div>
                </div>
              </div>
              <div>
                <h6 className="mb-3">Section Analysis:</h6>
                {structure.items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`section-item ${item.exists ? 'has-section' : 'missing-section'}`}
                  >
                    <i className={`fas fa-${item.exists ? 'check' : 'times'}-circle me-2`}></i>
                    <span className="section-name fw-bold">{item.section}</span>: 
                    {item.exists ? ' Present' : ' Missing'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-spell-check me-2"></i>Grammar Check</h5>
            </div>
            <div className="card-body">
              <div className="score-box">
                <div className="score-name">Grammar Score:</div>
                <div className="progress w-100">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${grammar.score}%`, backgroundColor: `var(--${grammarLevel})` }} 
                    aria-valuenow={grammar.score}
                  >
                    {Math.round(grammar.score)}%
                  </div>
                </div>
              </div>
              <div>
                <h6 className="mb-3">Issues Found:</h6>
                {grammar.issues.length === 0 ? (
                  <div className="section-item has-section">
                    <i className="fas fa-check-circle me-2"></i>
                    No grammar issues detected - Excellent!
                  </div>
                ) : (
                  grammar.issues.slice(0, 5).map((issue, index) => (
                    <div key={index} className="grammar-error">
                      <div><strong>Issue:</strong> {issue.message}</div>
                      <div>
                        <strong>Context:</strong> "...{issue.context.text.substring(
                          Math.max(0, issue.context.offset - 20),
                          issue.context.offset + issue.context.length + 20
                        )}..."
                      </div>
                      <div><strong>Suggestion:</strong> {issue.replacements[0]?.value || 'No suggestion'}</div>
                    </div>
                  ))
                )}
                {grammar.issues.length > 5 && (
                  <div className="mt-3 text-secondary">
                    <i className="fas fa-info-circle me-2"></i>
                    And {grammar.issues.length - 5} more issues...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-briefcase me-2"></i>Job Match Analysis</h5>
            </div>
            <div className="card-body">
              <div className="score-box">
                <div className="score-name">Job Match Score:</div>
                <div className="progress w-100">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${jobMatch.score}%`, backgroundColor: `var(--${matchLevel})` }} 
                    aria-valuenow={jobMatch.score}
                  >
                    {Math.round(jobMatch.score)}%
                  </div>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <h6 className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Matching Keywords ({jobMatch.matches.filter(m => m.exists).length})
                  </h6>
                  {jobMatch.matches.filter(m => m.exists).length > 0 ? (
                    jobMatch.matches.filter(m => m.exists).map((match, index) => (
                      <div key={index} className="job-item job-match">
                        <i className="fas fa-check-circle me-2"></i>
                        <span className="fw-bold">{match.keyword}</span>
                      </div>
                    ))
                  ) : (
                    <div className="alert alert-warning">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      No matching keywords found. Add job-specific terms to improve your match score.
                    </div>
                  )}
                </div>
                
                <div className="col-md-6">
                  <h6 className="mb-3">
                    <i className="fas fa-times-circle text-danger me-2"></i>
                    Missing Keywords ({jobMatch.matches.filter(m => !m.exists).length})
                  </h6>
                  {jobMatch.matches.filter(m => !m.exists).slice(0, 8).map((match, index) => (
                    <div key={index} className="job-item job-missing">
                      <i className="fas fa-times-circle me-2"></i>
                      <span className="fw-bold">{match.keyword}</span>
                    </div>
                  ))}
                  {jobMatch.matches.filter(m => !m.exists).length > 8 && (
                    <div className="mt-3 text-secondary">
                      <i className="fas fa-info-circle me-2"></i>
                      And {jobMatch.matches.filter(m => !m.exists).length - 8} more missing keywords...
                    </div>
                  )}
                </div>
              </div>
              
              <div className="alert alert-primary mt-4">
                <i className="fas fa-lightbulb me-2"></i>
                <strong>Pro Tip:</strong> Adding the missing keywords to your resume can significantly increase your chances of passing automated resume screening systems.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results