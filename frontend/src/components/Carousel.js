import React from "react";

export default function Carousel({ setSearchText }) {
  return (
    <div style={{ marginBottom: "20px", marginTop: "10vh" }}>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div
          className="carousel-caption d-none d-md-block"
          style={{ zIndex: "10" }}
        >
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            ></input>
            {/* <button
              className="btn btn-outline-success bg-success text-white"
              type="submit"
            >
              Search
            </button> */}
          </form>
        </div>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?cs=srgb&dl=pexels-daniel-reche-3616956.jpg&fm=jpg"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            ></img>
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            ></img>
          </div>
          <div className="carousel-item">
            <img
              src="https://www.shutterstock.com/image-photo/beef-shawarma-on-dark-background-600nw-2199072037.jpg"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            ></img>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
