import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <>
    <div className="container-xxl py-5 category">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Explore
      </h6>
      <h1 className="mb-5">The 3 Pillars of LearnOS</h1>
    </div>
    <div className="row g-4">

      <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s">
        <div className="border rounded p-4 text-center h-100">
          <i className="fa fa-3x fa-book text-primary mb-3" />
          <h5 className="mb-2">AI Hub</h5>
          <p className="text-muted mb-3">
            Learn AI through chapter-based, story-driven lessons with real-world examples.
          </p>
          <Link to="/login" className="btn btn-outline-primary">
            Login to Explore
          </Link>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
        <div className="border rounded p-4 text-center h-100">
          <i className="fa fa-3x fa-lightbulb text-primary mb-3" />
          <h5 className="mb-2">Prompt Vault</h5>
          <p className="text-muted mb-3">
            Browse ready-to-use AI prompts, organized by category and easy to filter based on your needs.
          </p>
          <Link to="/login" className="btn btn-outline-primary">
            Login to Explore
          </Link>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.5s">
        <div className="border rounded p-4 text-center h-100">
          <i className="fa fa-3x fa-road text-primary mb-3" />
          <h5 className="mb-2">Journeys</h5>
          <p className="text-muted mb-3">
            Follow guided learning paths or create your own journey and share it with the community.
          </p>
          <Link to="/login" className="btn btn-outline-primary">
            Login to Explore
          </Link>
        </div>
      </div>

    </div>
  </div>
</div>

    </>
  )
}

export default Categories