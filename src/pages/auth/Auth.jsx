import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";

const Auth = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const nav = useNavigate();

  async function SubmitForm(e) {
    e.preventDefault();

    try {
      let payload = {
        fullName: fullName,
        email: email,
        password: password,
        mobile: mobile,
      };

      await userService.register(payload);
      toast.success("Account Created! Please Login now.");
      nav("/login");
    } catch (err) {
      toast.error(
        "Error, please Verify all details are correctly filled in the form.",
      );
      console.log("Error :", err);
    }
  }
  return (
    <>
      {/* Header  */}
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Sign Up
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to="/SignUp">
                      Sign Up
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="text-white" to="/login">
                      Login
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* SignUp Form */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Sign Up
            </h6>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form onSubmit={SubmitForm}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Your Full Name"
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                      />
                      <label htmlFor="fullName">Your Full Name</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label htmlFor="password">password</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control"
                        id="mobile"
                        placeholder="Your Mobile Number"
                        onChange={(e) => {
                          setMobile(e.target.value);
                        }}
                      />
                      <label htmlFor="mobile">Your Mobile Number</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Auth;