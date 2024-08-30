import React, { useState, useContext } from "react";
import "./User.css";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../store/userInfo";
import Modal from "../components/Modal";
import Favorites from "../components/Favorites";
import Orders from "../components/Orders";

export default function User() {
  const { user } = useContext(userContext);

  const [currentDetails, setCurrentDetails] = useState("orders");

  const userLogoutHanler = () => {
    setModalData({
      modalId: "logout",
      modalTitle: "LOGOUT",
      modalMessage: "DO YOU WANT TO LOG-OUT ?",
    });
  };
  const [modalData, setModalData] = useState({});

  return (
    <div className="profileContainer">
      <Modal modalData={modalData} />
      <div className="profileHeader">
        <div className="userDetails">
          <div id="userName">{user.name ? user.name.toUpperCase() : ""}</div>
          <p>{user.email}</p>
        </div>
        <Link id="editProfileButton" to="/user/edituser">
          EDIT PROFILE
        </Link>
      </div>
      <div className="profileDetails">
        <div className="profileDtailsOptions">
          <div
            id="option"
            onClick={() => {
              setCurrentDetails("orders");
            }}
          >
            Orders
          </div>
          <div
            id="option"
            onClick={() => {
              setCurrentDetails("favorites");
            }}
          >
            Favorites
          </div>
          <Link
            to="/cart"
            id="option"
            style={{ textDecoration: "none", color: "black" }}
          >
            Cart
          </Link>
          <div
            id="option"
            onClick={() => {
              setCurrentDetails("loation");
            }}
          >
            Location
          </div>
          <div
            id="option"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={userLogoutHanler}
          >
            Logout
          </div>
        </div>
        <div className="profileOptionsDetails">
          {currentDetails == "favorites" && <Favorites />}
          {currentDetails == "orders" && <Orders />}
        </div>
      </div>
    </div>
  );
}
