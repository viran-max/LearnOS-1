import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const JourneySubNav = () => {

  const location = useLocation();

  const createPath = "/admin/journeys";
  const listPath = "/admin/journeys/journeyList";

  const isCreateActive = location.pathname === createPath;
  const isListActive =
    location.pathname === listPath ||
    location.pathname.includes("journeyEdit") ||
    location.pathname.includes("journeyView");

  return (
    <div className="aihub-subnav">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className={`aihub-subnav-group ${isCreateActive || isListActive ? "is-active-group" : ""}`}>
            <div className="aihub-subnav-group-label">
              <i className="bi bi-signpost-split"></i>
              <span>Journeys</span>
            </div>
            <div className="aihub-subnav-links">
              <Link
                to={createPath}
                className={`aihub-subnav-link ${isCreateActive ? "active" : ""}`}
              >
                <i className="bi bi-plus-lg"></i> Create
              </Link>
              <Link
                to={listPath}
                className={`aihub-subnav-link ${isListActive ? "active" : ""}`}
              >
                <i className="bi bi-list-ul"></i> View All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneySubNav