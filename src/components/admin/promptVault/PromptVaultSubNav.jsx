import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navGroups = [
  {
    label: "Categories",
    icon: "bi-tags",
    createPath: "/admin/promptVault/createCategory",
    listPath: "/admin/promptVault/categoryList",
    editMatch: "categoryEdit",
  },
  {
    label: "Prompts",
    icon: "bi-lightbulb",
    createPath: "/admin/promptVault",
    listPath: "/admin/promptVault/promptList",
    editMatch: "promptEdit",
  },
]

const PromptVaultSubNav = () => {

  const location = useLocation();

  return (
    <div className="aihub-subnav">
      <div className="row g-3 justify-content-center">
        {navGroups.map((group) => {
          const isCreateActive = location.pathname === group.createPath;
          const isListActive =
            location.pathname === group.listPath ||
            location.pathname.includes(group.editMatch);

          return (
            <div className="col-md-5" key={group.label}>
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

export default PromptVaultSubNav