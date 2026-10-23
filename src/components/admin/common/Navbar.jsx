import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../../services/authService";

const Navbar = () => {
  const nav = useNavigate();

  const fullName = authService.getFullName();
  const initial = fullName ? fullName.charAt(0).toUpperCase() : "?";

  function handleLogout() {
    authService.logout();
    toast.success("Logged Out!");
    nav("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 site-navbar">
        
        {/* Logo */}
        <Link
          to="/admin/dashboard"
          className="navbar-brand d-flex align-items-center gap-2 px-4 px-lg-5"
        >
          <img
            src="/public/img/logo.png"
            alt="LearnOS"
            className="navbar-logo"
          />
          <span className="navbar-brand-text">LearnOS</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar Content */}
        <div
          className="collapse navbar-collapse"
          id="adminNavbarCollapse"
        >
          <div className="navbar-nav ms-auto p-4 p-lg-0">

            {/* Dashboard */}
            <NavLink
              to="/admin/dashboard"
              end
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </NavLink>

            {/* AI Hub */}
            <NavLink
              to="/admin/aiHub"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-book"></i>
              AI Hub
            </NavLink>

            {/* Prompt Vault */}
            <NavLink
              to="/admin/promptVault"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-lightbulb"></i>
              Prompt Vault
            </NavLink>

            {/* Journeys */}
            <NavLink
              to="/admin/journeys"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-signpost-split"></i>
              Journeys
            </NavLink>

            {/* User View */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="bi bi-person"></i>
              User View
            </NavLink>
          </div>

          {/* User + Logout */}
          <div className="d-flex align-items-center px-4 px-lg-0 pb-4 pb-lg-0">

            <div className="navbar-user-avatar me-2">
              {initial}
            </div>

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
        </div>
      </nav>
    </>
  );
};

export default Navbar;