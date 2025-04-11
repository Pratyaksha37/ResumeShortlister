import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <>
      <Navbar activePage="landing" />
      
      <header className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>Get Your Resume <span>Job-Ready</span></h1>
              <p>AI-powered resume analyzer to match your resume with job descriptions and improve your chances of getting hired.</p>
              <Link to="/analyzer" className="btn btn-primary btn-lg">Try Now - It's Free</Link>
            </div>
            <div className="col-lg-6">
              <img src="/image.png" alt="ResuMatch App" className="img-fluid hero-image" />
            </div>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row">
            <div className="col-lg-3">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-upload"></i>
                </div>
                <h3>Upload Resume</h3>
                <p>Upload your resume or paste its text content</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3>Add Job Description</h3>
                <p>Paste the job description you're applying for</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-robot"></i>
                </div>
                <h3>Language API Tool</h3>
                <p>Our AI analyzes your resume and corrects grammar issues</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="feature-card">
                <div className="icon-circle">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Get Instant Results</h3>
                <p>See how well your resume matches the job and get improvement tips</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Get Your Dream Job?</h2>
          <p>Improve your resume and increase your chances of getting hired.</p>
          <Link to="/analyzer" className="btn btn-primary btn-lg">Try ResuMatch Now</Link>
        </div>
      </section>
      
      <Footer />
    </>
  )
}

export default LandingPage