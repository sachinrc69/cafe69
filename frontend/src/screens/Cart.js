import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../store/cart";
import { useState } from "react";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { url } from "../url";

const Cart = () => {
  const authToken = localStorage.getItem("authToken");
  const [modalData, setModalData] = useState({});

  const cartItems = useSelector((state) => state.cart);
  // let delteBtn = cartItems && true;
  console.log(cartItems);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );

  const foodList = cartItems.map((e) => {
    return { foodId: e.id, quantity: e.quantity, price: e.price, size: e.size };
  });

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Pdc6fRxo6YU27EOQkTerwBX7n5Jn33RaRIjp01QuhoDlFMWtDaqxMrsKQnO8FyDbxODhgNJ9DqCRZj8FDTVFaDW00ts8YWVZS"
    );

    const response = await fetch(`${url}/orders/payment`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems: cartItems, totalPrice, foodList }),
    });

    const session = await response.json();
    if (!response.ok) {
      alert(session.message);
    }
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <div>
      <Modal modalData={modalData} />
      <section className="h-100 gradient-custom d-flex pt-5">
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center my-4">
            <motion.div
              className="col-md-8"
              initial={{ x: "+100vh", opacity: 0 }}
              animate={{ x: "0vh", opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card mb-4">
                <div className="card-header py-3 d-flex">
                  <h5 className="mb-0 me-auto">
                    Cart - {cartItems.length ? cartItems.length : 0} items
                  </h5>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm mb-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    data-mdb-toggle="tooltip"
                    title="Move to the wish list"
                    onClick={() => {
                      setModalData({
                        modalId: "deleteAll",
                        modalTitle: "Delete all",
                        modalMessage: "DELTE ALL ITEM'S FROM CART ?",
                      });
                    }}
                    disabled={cartItems.length === 0}
                  >
                    Delete all items
                  </button>
                </div>
                <div className="card-body">
                  {cartItems.length === 0 ? (
                    <div
                      className="w-100"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1>Your Cart Is Empty</h1>

                      <Link
                        className="btn btn-primary btn-lg "
                        to="/menu"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Explore Menu!
                      </Link>
                    </div>
                  ) : (
                    cartItems.map((item) => {
                      console.log(item.id);
                      return (
                        <motion.div
                          className="row"
                          key={item.id}
                          initial={{ x: "-100vh", opacity: 0 }}
                          animate={{ x: "0vh", opacity: 1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={item.img}
                                className="w-100"
                                style={{ height: "150px", objectFit: "cover" }}
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor: "rgba(251, 251, 251, 0.2)",
                                  }}
                                ></div>
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>{item.name}</strong>
                            </p>
                            {/* <p>Color: red</p> */}
                            <p>Size: {item.size}</p>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm mb-2"
                              data-mdb-toggle="tooltip"
                              title="Move to the wish list"
                              onClick={() => {
                                dispatch(cartActions.remove(item.id));
                              }}
                            >
                              Delete
                            </button>
                          </div>
                          <div
                            className="col-lg-4 col-md-6 mb-4 mb-lg-0"
                            style={{
                              dispaly: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn btn-primary px-3 me-2"
                                onClick={() => {
                                  dispatch(
                                    cartActions.decQuantity({
                                      id: item.id,
                                      size: item.size,
                                    })
                                  );
                                }}
                              >
                                -
                              </button>
                              <div className="form-outline ">
                                <p
                                  className="form-control w-100 d-flex  "
                                  style={{
                                    fontWeight: "bold",
                                    justifyContent: "center",
                                  }}
                                >
                                  {item.quantity}
                                </p>
                                <label
                                  className="form-label w-100 "
                                  for="form1"
                                  style={{ textAlign: "center" }}
                                >
                                  Quantity
                                </label>
                              </div>
                              <button
                                className="btn btn-primary px-3 ms-2"
                                onClick={() => {
                                  dispatch(
                                    cartActions.incQuantity({
                                      id: item.id,
                                      size: item.size,
                                    })
                                  );
                                }}
                              >
                                +
                              </button>
                            </div>

                            <p className="text-start text-md-center">
                              <strong>Rs: {item.price}</strong>
                            </p>
                          </div>
                          <hr style={{ marginTop: "10px", width: "90%" }}></hr>
                        </motion.div>
                      );
                    })
                  )}

                  {/* {} */}
                </div>
              </div>

              <div className="card mb-4 mb-lg-0" in>
                <div className="card-body ">
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <img
                    className="me-2"
                    width="45px"
                    src="https://www.logo.wine/a/logo/PayPal/PayPal-Logo.wine.svg"
                    alt="PayPal acceptance mark"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-md-4"
              initial={{ x: "-100vh" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total
                      <span>Rs - {totalPrice}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Delivery
                      <span>Free</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>Rs - {totalPrice}</strong>
                      </span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                    onClick={makePayment}
                    disabled={cartItems.length === 0 || !authToken}
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
