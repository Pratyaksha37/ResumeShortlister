function LoadingAnimation() {
  return (
    <div id="loading" className="text-center my-5">
      <div className="loading-animation">
        <div className="loading-bar"></div>
        <div className="loading-text">Analyzing<span className="dots">...</span></div>
      </div>
    </div>
  )
}

export default LoadingAnimation