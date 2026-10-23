import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navGroups = [
  {
    label: "Chapters",
    icon: "bi-collection",
    createPath: "/admin/aiHub",
    listPath: "/admin/aiHub/chapterList",
    editMatch: "chapterEdit",
  },
  {
    label: "Lessons",
    icon: "bi-journal-text",
    createPath: "/admin/aiHub/createLesson",
    listPath: "/admin/aiHub/lessonList",
    editMatch: "lessonEdit",
  },
  {
    label: "Stories",
    icon: "bi-collection-play",
    createPath: "/admin/aiHub/createStory",
    listPath: "/admin/aiHub/storyList",
    editMatch: "storyEdit",
  },
]

const AiHubSubNav = () => {

  const location = useLocation();

  return (
    <div className="aihub-subnav">
      <div className="row g-3">
        {navGroups.map((group) => {
          const isCreateActive = location.pathname === group.createPath;
          const isListActive =
            location.pathname === group.listPath ||
            location.pathname.includes(group.editMatch);

          return (
            <div className="col-md-4" key={group.label}>
              <div className={`aihub-subnav-group ${isCreateActive || isListActive ? "is-active-group" : ""}`}>
                <div className="aihub-subnav-group-label">
                  <i className={`bi ${group.icon}`}></i>
                  <span>{group.label}</span>
                </div>
                <div className="aihub-subnav-links">
                  <Link
                    to={group.createPath}
                    className={`aihub-subnav-link ${isCreateActive ? "active" : ""}`}
                  >
                    <i className="bi bi-plus-lg"></i> Create
                  </Link>
                  <Link
                    to={group.listPath}
                    className={`aihub-subnav-link ${isListActive ? "active" : ""}`}
                  >
                    <i className="bi bi-list-ul"></i> View All
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AiHubSubNav