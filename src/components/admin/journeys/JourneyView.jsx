import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import journeyService from "../../../services/journeyService";
import JourneySubNav from "./JourneySubNav";

function formatDate(timestamp){
  return new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function approvalBadge(status){
  if(status === "approved") return <span className="badge bg-success">Approved</span>
  if(status === "pending") return <span className="badge bg-warning text-dark">Pending Review</span>
  return <span className="badge bg-danger">Rejected</span>
}

const JourneyView = () => {
  const [journey, setJourney] = useState(null);
  const params = useParams();

  async function getJourneyDetails() {
    let response = await journeyService.singleJourney(params.id);
    if (response) {
      setJourney(response);
    }
  }

  useEffect(() => {
    getJourneyDetails();
  }, []);

  if (!journey) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  return (
    <>
      {/* Header  */}
      <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-eye"></i> View Journey</h2>
      <p>Read-only view of this journey's full content.</p>
    </div>
    <JourneySubNav />
  </div>
</div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {journey.coverImage &&
                <img
                  src={journey.coverImage}
                  alt={journey.journeyTitle}
                  className="img-fluid rounded-4 mb-4"
                  style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
                />
              }

              <div className="d-flex flex-wrap gap-2 mb-3">
                {approvalBadge(journey.approvalStatus)}
                <span className="badge bg-secondary">{journey.status}</span>
                {journey.submittedBy !== "admin" &&
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    Community Submission
                  </span>
                }
              </div>

              <p className="text-muted mb-1">
                Submitted by <strong>{journey.submittedByName || "Admin"}</strong> on {formatDate(journey.createdAt)}
              </p>

              {journey.hookLine &&
                <p className="fst-italic fs-5 mt-3">"{journey.hookLine}"</p>
              }

              <hr />

              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}>
                {journey.journeyDescription}
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JourneyView;