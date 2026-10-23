import React from 'react'

const Services = () => {
  return (
    <>
    <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        What LearnOS Offers
      </h6>
      <h1 className="mb-5">Everything You Need, In One Place</h1>
    </div>
    <div className="row g-4">
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-book text-primary mb-4" />
            <h5 className="mb-3">Story-Driven AI Hub</h5>
            <p>
              Chapter-based lessons that teach AI fundamentals through real-world examples with a structured learning approach.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-lightbulb text-primary mb-4" />
            <h5 className="mb-3">Curated Prompt Vault</h5>
            <p>
              Category-wise organized, ready-to-use AI prompts — best-for,
              when-to-use and with expected-output
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-road text-primary mb-4" />
            <h5 className="mb-3">Guided Journeys</h5>
            <p>
              Structured learning paths that guide you step by step to master any skill.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-users text-primary mb-4" />
            <h5 className="mb-3">Community Driven</h5>
            <p>
             Create and submit your own learning journey. Once approved by our team, it becomes publicly available for everyone to explore.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Services