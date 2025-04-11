import { Link } from 'react-router-dom'

function Navbar({ activePage = "analyzer" }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h5><img src="/logo.png" alt="ResuMatch" height="40" className="me-2" />ResuMatch</h5>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {activePage === "landing" ? (
                <Link className="nav-link active try-now-btn" to="/analyzer">Try Now</Link>
              ) : (
                <Link className="nav-link" to="/">Home</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar