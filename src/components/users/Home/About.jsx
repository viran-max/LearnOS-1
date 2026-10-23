import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
    <div className="container-xxl py-5">
  <div className="container">
    <div className="row g-5">
      <div
        className="col-lg-6 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ minHeight: 400 }}
      >
        <div className="position-relative h-100">
          <img
            className="img-fluid position-absolute w-100 h-100"
            src="img/about.jpg"
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
        <h6 className="section-title bg-white text-start text-primary pe-3">
          About Us
        </h6>
        <h1 className="mb-4">Welcome to LearnOS</h1>
        <p className="mb-4">
          LearnOS is a Developer Learning Operating System—a single place for structured AI lessons, a curated prompt library, and guided learning paths, giving you a clear roadmap instead of scattered tutorials and random YouTube playlists.
        </p>
        <p className="mb-4">
          Everything is organized into structured chapters with connected learning paths, and the community can contribute their own learning journeys, which are published after admin approval.
        </p>
        <div className="row gy-2 gx-4 mb-4">
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Story-Driven AI Hub
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Curated Prompt Vault
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Guided Journeys
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Community Submissions
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Structured Chapters &amp; Lessons
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Always Growing Content
            </p>
          </div>
        </div>
        <Link className="btn btn-primary py-3 px-5 mt-2" to="/login">
          Join Now
        </Link>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default About