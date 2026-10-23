import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top-accent"></div>
      <div className="container-fluid bg-dark text-light pt-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-5 col-md-12">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src="/public/img/logo.png"
                  alt="LearnOS"
                  className="navbar-logo"
                />
                <h5 className="text-white mb-0">LearnOS</h5>
              </div>
              <p
                className="mb-0"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  maxWidth: "380px",
                  lineHeight: "1.7",
                }}
              >
                A Developer Learning Operating System — structured AI lessons, a
                curated prompt library, and community-driven learning journeys,
                all in one place.
              </p>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="footer-heading">Explore</h6>
              <Link className="footer-link" to="/">
                <i className="bi bi-house"></i> Home
              </Link>
              <Link className="footer-link" to="/dashboard">
                <i className="bi bi-speedometer2"></i> Dashboard
              </Link>
              <Link className="footer-link" to="/aiHub">
                <i className="bi bi-book"></i> AI Hub
              </Link>
              <Link className="footer-link" to="/promptVault">
                <i className="bi bi-lightbulb"></i> Prompt Vault
              </Link>
              <Link className="footer-link" to="/journeys">
                <i className="bi bi-signpost-split"></i> Journeys
              </Link>
            </div>

            <div className="col-lg-4 col-md-6">
              <h6 className="footer-heading">Account</h6>
              <Link className="footer-link" to="/login">
                <i className="bi bi-box-arrow-in-right"></i> Login
              </Link>
              <Link className="footer-link" to="/SignUp">
                <i className="bi bi-person-plus"></i> Sign Up
              </Link>
              <Link className="footer-link" to="/submit">
                <i className="bi bi-plus-circle"></i> Submit a Journey
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container py-3">
            <div className="row align-items-center">
              <small style={{ textAlign: "center" }}>
                © {year} LearnOS. All Rights Reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
