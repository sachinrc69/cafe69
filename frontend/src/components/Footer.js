import React, { useRef } from "react";
import { json, Link } from "react-router-dom";
import { url } from "../url";

export default function Footer({ setNewReview }) {
  const reviewRef = useRef(null);
  const authToken = localStorage.getItem("authToken");

  const sendReviewHandler = async () => {
    if (reviewRef.current) {
      try {
        const response = await fetch(`${url}/reviews/addReview`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review: reviewRef.current,
          }),
        });
        if (response) {
          const resData = await response.json();
          setNewReview(resData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <footer className="bg-body-tertiary text-center">
      <div className="container p-4">
        <section className="mb-4">
          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>

        {authToken && (
          <section className="">
            <div action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Reviews and Suggestions are apriciated</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      id="form5Example24"
                      className="form-control"
                      onChange={(e) => {
                        reviewRef.current = e.target.value;
                      }}
                    />
                  </div>
                </div>

                <div className="col-auto">
                  <button
                    data-mdb-ripple-init
                    className="btn btn-outline mb-4"
                    disabled={!authToken && true}
                    onClick={sendReviewHandler}
                  >
                    Send
                  </button>
                </div>
                {/* <li class="bg-white mb-3">
                <div class="form-outline">
                  <textarea
                    class="form-control"
                    id="textAreaExample2"
                    rows="4"
                  ></textarea>
                  <label class="form-label" for="textAreaExample2">
                    Message
                  </label>
                </div>
              </li>
              <button type="button" class="btn btn-info btn-rounded float-end">
                Send
              </button> */}
              </div>
            </div>
          </section>
        )}

        <section className="mb-4">
          <p>
            Welcome to Cafe 69, where culinary excellence meets a cozy ambiance!
            Nestled in the heart of Banglore, Cafe 69 has earned its reputation
            as a haven for food enthusiasts seeking delectable and innovative
            dishes. Our culinary artisans craft each menu item with passion and
            precision, ensuring a symphony of flavors that tantalize the taste
            buds.
          </p>
        </section>

        {/* <section className="">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-body" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-body" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-body" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-body" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section> */}
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2020 Copyright:
        <a className="text-reset fw-bold" href="#">
          Cafe69.com
        </a>
        <p>Website designed by Sachin R C ;)</p>
      </div>
    </footer>
  );
}
