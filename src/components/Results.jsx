function Results({ results }) {
  const { structure, grammar, jobMatch, overallScore } = results
  
  return (
    <div id="results">
      <h2 className="mb-4 text-center">Analysis Results</h2>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-list-check me-2"></i>Structure Analysis</h5>
            </div>
            <div className="card-body">
              <div className="score-box">
                <div className="score-name">Structure Score:</div>
                <div className="progress w-100">
                  <div 
                    className="progress-bar bar-structure" 
                    role="progressbar" 
                    style={{ width: `${structure.score}%` }} 
                    aria-valuenow={structure.score}
                  >
                    {Math.round(structure.score)}%
                  </div>
                </div>
              </div>
              <div>
                {structure.items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`section-item ${item.exists ? 'has-section' : 'missing-section'}`}
                  >
                    <i className={`fas fa-${item.exists ? 'check' : 'times'}-circle me-2`}></i>
                    <span className="section-name">{item.section}</span>: 
                    {item.exists ? ' Present' : ' Missing'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
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
                    style={{ width: `${grammar.score}%` }} 
                    aria-valuenow={grammar.score}
                  >
                    {Math.round(grammar.score)}%
                  </div>
                </div>
              </div>
              <div>
                {grammar.issues.length === 0 ? (
                  <div className="section-item has-section">
                    <i className="fas fa-check-circle me-2"></i>
                    No grammar issues detected
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
                  <div className="mt-2 text-secondary">
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
          <div className="card mb-4 shadow-sm">
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
                    style={{ width: `${jobMatch.score}%` }} 
                    aria-valuenow={jobMatch.score}
                  >
                    {Math.round(jobMatch.score)}%
                  </div>
                </div>
              </div>
              <div>
                <h6>Matching Keywords:</h6>
                {jobMatch.matches.filter(m => m.exists).map((match, index) => (
                  <div key={index} className="job-item job-match">
                    <i className="fas fa-check-circle me-2"></i>
                    {match.keyword}
                  </div>
                ))}
                
                <h6 className="mt-4">Missing Keywords:</h6>
                {jobMatch.matches.filter(m => !m.exists).slice(0, 8).map((match, index) => (
                  <div key={index} className="job-item job-missing">
                    <i className="fas fa-times-circle me-2"></i>
                    {match.keyword}
                  </div>
                ))}
                {jobMatch.matches.filter(m => !m.exists).length > 8 && (
                  <div className="mt-2 text-secondary">
                    And {jobMatch.matches.filter(m => !m.exists).length - 8} more missing keywords...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-chart-pie me-2"></i>Overall Analysis</h5>
            </div>
            <div className="card-body">
              <div className="score-cards">
                <div className="score-card">
                  <div className="circle-progress-container">
                    <div 
                      className="circle-progress" 
                      style={{ 
                        background: `conic-gradient(var(--primary) ${overallScore}%, #eee ${overallScore}% 100%)` 
                      }}
                    >
                      <div className="circle-inner">
                        <span className="score-value">{Math.round(overallScore)}%</span>
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
                        background: `conic-gradient(var(--primary) ${structure.score}%, #eee ${structure.score}% 100%)` 
                      }}
                    >
                      <div className="circle-inner">
                        <span className="score-value">{Math.round(structure.score)}%</span>
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
                        background: `conic-gradient(var(--primary) ${grammar.score}%, #eee ${grammar.score}% 100%)` 
                      }}
                    >
                      <div className="circle-inner">
                        <span className="score-value">{Math.round(grammar.score)}%</span>
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
                        background: `conic-gradient(var(--primary) ${jobMatch.score}%, #eee ${jobMatch.score}% 100%)` 
                      }}
                    >
                      <div className="circle-inner">
                        <span className="score-value">{Math.round(jobMatch.score)}%</span>
                      </div>
                    </div>
                  </div>
                  <div>Job Match</div>
                </div>
              </div>
              
              <div id="verdict">
                {overallScore >= 70 ? (
                  <div className="verdict-pass">
                    <h4><i className="fas fa-check-circle me-2"></i>Your resume is a good match for this job!</h4>
                    <p>Your resume is well-structured and matches the job requirements well. Consider addressing the missing keywords to improve your chances even further.</p>
                  </div>
                ) : (
                  <div className="verdict-fail">
                    <h4><i className="fas fa-times-circle me-2"></i>Your resume needs improvement for this job.</h4>
                    <p>Your resume could use some work to better match this job description. Focus on adding missing keywords and improving the structure as suggested above.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results