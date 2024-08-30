import React, { useContext, useState, useRef } from "react";
import userContext from "../store/userInfo";
import "./CheckOutModal.css";
import upi from "../Util/upi.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import Loading from "./Loading";
import { url } from "../url";
export default function CheckOutModal() {
  const authToken = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  const foodList = cartItems.map((e) => {
    return { foodId: e.id, quantity: e.quantity, price: e.price, size: e.size };
  });
  const totalAmount = cartItems.reduce((x, e) => {
    return x + e.price;
  }, 0);

  const { user } = useContext(userContext);
  const [paymentMethod, setPaymentMethod] = useState(true);
  const oderPlacedSuccesFully = useRef(false);
  const [loadingConfirmation, serLoadingConfirmation] = useState(null);

  const orderHandler = async (e) => {
    serLoadingConfirmation((prev) => !prev);

    const response = await fetch(`${url}/orders/newOrder`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },

      headers: { Authorization: "Bearer " + authToken },
      body: JSON.stringify({
        paymentMethod: `${paymentMethod ? "card" : "upi"}`,
        foodList: foodList,

        totalAmount: totalAmount,
      }),
    });
    if (!response.ok) {
      console.log("error in ordering");
      oderPlacedSuccesFully.current = false;
    } else {
      const resData = await response.json();
      oderPlacedSuccesFully.current = true;
      dispatch(cartActions.removeALL());
    }
    serLoadingConfirmation((prev) => !prev);
  };

  return (
    <div
      className="modal fade zindex-modal "
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Check Out - Shipping information
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

          {loadingConfirmation === null && (
            <div className="modal-body">
              <form onSubmit={orderHandler}>
                <div>
                  <label className="infoLabel">Order Name</label>
                  <p className="info">{user.name && user.name}</p>
                </div>
                <div>
                  <label className="infoLabel">Email</label>
                  <p className="info">{user.email && user.email}</p>
                </div>
                <div>
                  <label className="infoLabel">Address</label>
                  <p className="info">{user.location && user.location}</p>
                </div>
                <div>
                  {paymentMethod ? (
                    <div>
                      <label className="infoLabel">Payment details :</label>
                      <div className="paymentDetails">
                        <label className="infoLabel">Card Info</label>
                        <input
                          name="cardNum"
                          className="info cardNum"
                          placeholder="1234 1234 1234 1234"
                          min={0}
                          maxLength={10}
                          required
                        ></input>
                        <div>
                          <input
                            name="cardExp"
                            className="info expiry"
                            placeholder="MM/YY"
                            type="number"
                            min={0}
                            maxLength={10}
                            required
                          ></input>
                          <input
                            name="cardCvc"
                            className="info cvc"
                            placeholder="CVC"
                            type="number"
                            min={0}
                            maxLength={10}
                            required
                          ></input>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  ) : (
                    <div className="upiImageCont">
                      <img src={upi} className="upiImage"></img>
                    </div>
                  )}
                  <div className="alternatePayment">
                    <button
                      type="button"
                      className="btn btn-primary upiToggleBtn"
                      onClick={() => {
                        setPaymentMethod((prev) => !prev);
                      }}
                    >
                      {paymentMethod ? "Pay with UPI !" : "Pay with Card !"}
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  {loadingConfirmation === null && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss={loadingConfirmation !== null ? "modal" : null}
                  >
                    {loadingConfirmation !== null
                      ? "CLOSE"
                      : ` Pay - ${totalAmount}`}
                  </button>
                </div>
              </form>
            </div>
          )}
          {loadingConfirmation !== null && (
            <div>
              <h1>
                {oderPlacedSuccesFully.current
                  ? "Succesflly placed order"
                  : "Failed to place order , please try again later"}
              </h1>
            </div>
          )}
          <div className="modal-footer">
            {loadingConfirmation !== null && (
              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={orderHandler}
                data-dismiss={loadingConfirmation !== null ? "modal" : null}
              >
                {loadingConfirmation !== null
                  ? "CLOSE"
                  : ` Pay - ${totalAmount}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
