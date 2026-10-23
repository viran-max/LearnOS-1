import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (authService.isLoggedIn()) {
      if (authService.getUserType() === "1") {
        nav("/admin/dashboard");
      } else {
        nav("/dashboard");
      }
    }
  }, []);

  async function SubmitForm(e) {
    e.preventDefault();

    try {
      let payload = {
        email,
        password,
      };
      const session = await userService.login(payload);
      toast.success("Login Successfull!");

      if (session.userType === "1") {
        nav("/admin/dashboard");
      } else {
        nav("/dashboard");
      }
    } catch (err) {
      toast.error("Invalid Email or Password");
      console.log("error : ", err);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Login
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

      {/* Login form  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Login
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

                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Login
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

export default Login;