import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="container-fluid p-0 mb-5">
  <div className="owl-carousel header-carousel position-relative">
    <div className="owl-carousel-item position-relative">
      <img className="img-fluid" src="img/carousel-1.jpg" alt="" />
      <div
        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
        style={{ background: "rgba(24, 29, 56, .7)" }}
      >
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-sm-10 col-lg-8">
              <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                Developer Learning Operating System
              </h5>
              <h1 className="display-3 text-white animated slideInDown">
                Learn. Practice. Grow — With AI By Your Side.
              </h1>
              <p className="fs-5 text-white mb-4 pb-2">
                LearnOS brings together story-driven AI lessons, curated prompts, and guided learning paths in one place—so instead of jumping between scattered tutorials, you can follow a clear, structured path to learning.
              </p>
              <Link
                to="/login"
                className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="btn btn-light py-md-3 px-md-5 animated slideInRight"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="owl-carousel-item position-relative">
      <img className="img-fluid" src="img/carousel-2.jpg" alt="" />
      <div
        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
        style={{ background: "rgba(24, 29, 56, .7)" }}
      >
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-sm-10 col-lg-8">
              <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                AI Hub &bull; Prompt Vault &bull; Journeys
              </h5>
              <h1 className="display-3 text-white animated slideInDown">
                Your Structured Path Into AI-Assisted Development
              </h1>
              <p className="fs-5 text-white mb-4 pb-2">
                Chapter-wise lessons, ek curated prompt library, aur community
                se banayi guided journeys — sab kuch ek jagah, ek account ke
                peeche.
              </p>
              <Link
                to="/login"
                className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="btn btn-light py-md-3 px-md-5 animated slideInRight"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Hero