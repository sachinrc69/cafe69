import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import userContext from "../store/userInfo";
import { useNavigate } from "react-router-dom";
export default function Modal({ modalData }) {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const { setAuthToken } = useContext(userContext);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    if (modalData.modalId === "deleteAll") {
      dispatch(cartActions.removeALL());
    } else if (modalData.modalId === "logout") {
      localStorage.removeItem("authToken");
      setUser({});
      setAuthToken("");
      navigate("/login");
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalData.modalTitle ? modalData.modalTitle : null}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{ fontWeight: "bolder", color: "red" }}
            >
              {modalData.modalMessage ? modalData.modalMessage : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={deleteHandler}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
