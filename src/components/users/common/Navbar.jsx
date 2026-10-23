import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../../services/authService";

const Navbar = () => {
  const nav = useNavigate();

  const isLoggedIn = authService.isLoggedIn();
  const fullName = authService.getFullName();
  const userType = authService.getUserType();
  const initial = fullName ? fullName.charAt(0).toUpperCase() : "?";

  function handleLogout() {
    authService.logout();
    toast.success("Logged Out!");
    nav("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 site-navbar">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 px-4 px-lg-5"
        >
          <img
            src="/public/img/logo.png"
            alt="LearnOS"
            className="navbar-logo"
          />
          <span className="navbar-brand-text">LearnOS</span>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            {
              !isLoggedIn && (

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-house"></i> Home
            </NavLink>
              )
            }

            {isLoggedIn && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-speedometer2"></i> Dashboard
                </NavLink>
                <NavLink
                  to="/aiHub"
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-book"></i> AI Hub
                </NavLink>
                <NavLink
                  to="/promptVault"
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-lightbulb"></i> Prompt Vault
                </NavLink>
                <NavLink
                  to="/journeys"
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-signpost-split"></i> Journeys
                </NavLink>
                <NavLink
                  to="/submit"
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-plus-circle"></i> Submit Journey
                </NavLink>
                {userType === "1" && (
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      `nav-item nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    <i className="bi bi-shield-lock"></i> Admin Panel
                  </NavLink>
                )}
              </>
            )}
          </div>

          {isLoggedIn ? (
            <div className="d-flex align-items-center px-4 px-lg-0 pb-4 pb-lg-0">
              <div className="navbar-user-avatar me-2">{initial}</div>
              <span className="nav-item nav-link me-2 mb-0 p-0">
                {fullName}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-primary navbar-cta me-lg-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center px-4 px-lg-0 pb-4 pb-lg-0 ">
              <Link
                to="/login"
                className="btn btn-primary navbar-cta me-lg-4 pt-4"
              >
                Login / Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
