import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import userContext from "../store/userInfo";
import { url } from "../url";
export default function SignUp() {
  const { user } = useContext(userContext);
  const { setAuthToken } = useContext(userContext);

  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  const navigate = useNavigate();

  const signUpSubmitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    const response = await fetch(
      `${url}/user/${
        currentPath === "/signup" ? "signup" : `edituser/${user._id}`
      }`,
      {
        method: currentPath === "/signup" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      const resData = await response.json();
      alert(resData.message);
    } else {
      const resData = await response.json();
      localStorage.setItem("authToken", resData.authToken);
      console.log(resData.authToken);
      setAuthToken(resData.authToken);
      navigate("/");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {currentPath === "/user/edituser"
                        ? "Edit User"
                        : "Sign up"}
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={signUpSubmitHandler}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            name="name"
                            required
                            defaultValue={user.name || ""}
                            contentEditable
                          ></input>
                          <label className="form-label" for="form3Example1c">
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            name="email"
                            required
                            defaultValue={user.email || ""}
                            contentEditable
                          />
                          <label className="form-label" for="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            name="password"
                            required
                          />
                          <label className="form-label" for="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example4cd"
                            className="form-control"
                            name="location"
                            defaultValue={user.location || ""}
                            contentEditable
                            style={{ height: "auto", overflow: "auto" }}
                          />
                          <label className="form-label" for="form3Example4cd">
                            Location
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label" for="form2Example3">
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div
                        className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 "
                        style={{ gap: "10px" }}
                      >
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          {currentPath === "/user/edituser"
                            ? "Save"
                            : "Register"}
                        </button>
                        {currentPath === "/user/edituser" ? null : (
                          <Link
                            to="/login"
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </Link>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029852/PC_Creative%20refresh/3D_bau/banners_new/Momos.png"
                      className="img-fluid"
                      alt="Sample image"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
