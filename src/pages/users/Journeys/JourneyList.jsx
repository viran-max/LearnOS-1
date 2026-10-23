import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import journeyService from '../../../services/journeyService'

function formatDate(timestamp){
  return new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const JourneyList = () => {

  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getJourneys() {
    const response = await journeyService.getAll();

    const visible = response.filter(
      (journey) => journey.status === "Published" && journey.approvalStatus === "approved"
    );

    visible.sort(() => Math.random() - 0.5);

    setJourneys(visible);
    setLoading(false);
  }

  useEffect(() => {
    getJourneys();
  }, []);

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Journeys
              </h1>
              <p className="text-white mb-0">
                Guided learning paths, curated by the LearnOS team and the community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">

          <div className="text-end mb-4">
            <Link to="/submit" className="btn btn-outline-primary">
              Submit Your Journey
            </Link>
          </div>

          {loading &&
            <p className="text-center">Loading journeys...</p>
          }

          {!loading && journeys.length === 0 &&
            <p className="text-center">No journeys available yet. Be the first to submit one!</p>
          }

          <div className="row g-4">
            {journeys.map((journey) => (
              <div className="col-lg-4 col-md-6" key={journey.id}>
                <Link to={`/journeys/${journey.id}`} className="text-decoration-none text-dark">
                  <div className="border rounded-4 overflow-hidden h-100">
                    {journey.coverImage &&
                      <img
                        src={journey.coverImage}
                        alt={journey.journeyTitle}
                        style={{ width: "100%", height: "180px", objectFit: "cover" }}
                      />
                    }
                    <div className="p-4">
                      {journey.submittedBy !== "admin" &&
                        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill mb-2">
                          Community
                        </span>
                      }
                      <h5 className="mb-2">{journey.journeyTitle}</h5>
                      {journey.hookLine &&
                        <p className="text-muted mb-3 fst-italic">"{journey.hookLine}"</p>
                      }
                      <div className="d-flex justify-content-between align-items-center small text-muted border-top pt-2 mt-2">
                        <span>by {journey.submittedByName || "Admin"}</span>
                        <span>{formatDate(journey.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default JourneyList