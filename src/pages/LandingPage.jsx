import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import heroImage from '../components/images/image.png'

function LandingPage() {
  return (
    <>
      <Navbar activePage="landing" />
      
      <header className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>Transform Your <span>Resume</span> Into Job Opportunities</h1>
              <p>AI-powered resume analyzer that matches your qualifications with job descriptions to maximize your chances of getting interviews.</p>
              
            </div>
            <div className="col-lg-6">
              <img src={heroImage} alt="ResuMatch App" className="img-fluid hero-image" />
            </div>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2>How ResuMatch Works</h2>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-upload"></i>
                </div>
                <h3>Upload Resume</h3>
                <p>Upload your resume PDF or paste the text content for analysis</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3>Add Job Description</h3>
                <p>Paste the job description you're targeting for precise matching</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-robot"></i>
                </div>
                <h3>AI Analysis</h3>
                <p>Our AI analyzes structure, grammar, and job-specific keywords</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Get Detailed Results</h3>
                <p>Receive actionable feedback to optimize your resume for each application</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container text-center">
          <h2>Ready To Land Your Dream Job?</h2>
          <p>Improve your resume's effectiveness and increase your interview rate with our professional analysis tools.</p>
          <Link to="analyzer" className="btn btn-primary btn-lg">
            <i className="fas fa-bolt me-2"></i>
            Start Analyzing Your Resume
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  )
}

export default LandingPage