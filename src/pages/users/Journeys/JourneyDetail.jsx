import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import journeyService from '../../../services/journeyService'

function formatDate(timestamp){
  return new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const JourneyDetail = () => {

  const params = useParams();

  const [journey, setJourney] = useState(null);
  const [moreJourneys, setMoreJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getJourney() {
    const response = await journeyService.singleJourney(params.id);
    setJourney(response);

    // pick 3 other approved, published journeys at random to suggest next
    const all = await journeyService.getAll();
    const eligible = all.filter(
      (j) => j.id !== params.id && j.status === "Published" && j.approvalStatus === "approved"
    );
    eligible.sort(() => Math.random() - 0.5);
    setMoreJourneys(eligible.slice(0, 3));

    setLoading(false);
  }

  useEffect(() => {
    getJourney();
  }, [params.id]);

  if (loading) {
    return <div className="container py-5 text-center">Loading journey...</div>
  }

  if (!journey) {
    return <div className="container py-5 text-center">This journey is not available.</div>
  }

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                {journey.journeyTitle}
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to="/journeys">
                      Journeys
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container" style={{ maxWidth: "800px" }}>

          {journey.coverImage &&
            <img
              src={journey.coverImage}
              alt={journey.journeyTitle}
              className="img-fluid rounded-4 mb-4"
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
          }

          {journey.submittedBy !== "admin" &&
            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill mb-3">
              Submitted by a community member
            </span>
          }

          {journey.hookLine &&
            <p className="fst-italic fs-5 mb-2">"{journey.hookLine}"</p>
          }

          <p className="text-muted mb-4 pb-3 border-bottom">
            by <strong>{journey.submittedByName || "Admin"}</strong> · {formatDate(journey.createdAt)}
          </p>

          <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", fontSize:"24px"}}>
            {journey.journeyDescription}
          </p>

        </div>
      </div>

      {/* Submit your own journey CTA */}
      <div className="container" style={{ maxWidth: "800px" }}>
        <div
          className="rounded-4 p-4 p-md-5 text-center text-white mb-5"
          style={{ background: "linear-gradient(90deg, #0d6efd 0%, #3b82f6 100%)" }}
        >
          <h4 className="mb-2">Have a learning journey worth sharing?</h4>
          <p className="mb-4" style={{ opacity: 0.9 }}>
            Your story could be the one that helps someone else keep going. Submit your journey and, once approved, it'll be featured right here for the community.
          </p>
          <Link to="/submit" className="btn btn-light px-4 py-2 fw-semibold">
            Submit Your Journey
          </Link>
        </div>
      </div>

      {/* More journeys to explore */}
      {moreJourneys.length > 0 &&
        <div className="container-xxl pb-5">
          <div className="container">
            <h4 className="mb-4">More Journeys to Explore</h4>
            <div className="row g-4">
              {moreJourneys.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <Link to={`/journeys/${item.id}`} className="text-decoration-none text-dark">
                    <div className="border rounded-4 overflow-hidden h-100">
                      {item.coverImage &&
                        <img
                          src={item.coverImage}
                          alt={item.journeyTitle}
                          style={{ width: "100%", height: "160px", objectFit: "cover" }}
                        />
                      }
                      <div className="p-3">
                        {item.submittedBy !== "admin" &&
                          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill mb-2">
                            Community
                          </span>
                        }
                        <h6 className="mb-2">{item.journeyTitle}</h6>
                        {item.hookLine &&
                          <p className="text-muted small mb-0 fst-italic">"{item.hookLine}"</p>
                        }
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default JourneyDetail