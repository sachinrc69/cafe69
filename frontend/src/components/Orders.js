import React, { useEffect, useState } from "react";
import { url } from "../url";
import Loading from "./Loading";

export default function Orders() {
  const authToken = localStorage.getItem("authToken");
  const [foodName, setFoodName] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading((prev) => !prev);
    const response = await fetch(`${url}/orders/allOrders`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    if (!response.ok) {
      console.log("Error in fetching orders");
    } else {
      const resData = await response.json();
      setOrders(resData.orders);
    }
  };

  const fetchFoodDataOfFavorites = async () => {
    const response = await fetch(`${url}/orders/foodNames`);
    if (!response.ok) {
      console.log(await response.json());
    } else {
      const resData = await response.json();
      setFoodName(resData.foodNames);
    }
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchFoodDataOfFavorites();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="container"
      style={{
        width: "100%",
        padding: "50px",
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",

        justifyContent: "flex-start",
        gap: "20PX",
      }}
    >
      <h2 style={{ textAlign: "center" }}>My Orders</h2>

      {orders.length === 0 ? (
        <h2>No Orders Yet</h2>
      ) : (
        orders.map((item) => {
          return (
            <div style={{ marginBottom: "20px" }}>
              <div
                className="row"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                <div className="col-sm" style={{ textAlign: "center" }}>
                  Name
                </div>
                <div className="col-sm" style={{ textAlign: "center" }}>
                  Quantiy
                </div>
                <div className="col-sm" style={{ textAlign: "center" }}>
                  Size
                </div>
                <div className="col-sm" style={{ textAlign: "center" }}>
                  Amount
                </div>
              </div>
              {item.foodList.map((x) => {
                return (
                  <div
                  // style={{
                  //   overflowY: "auto",
                  //   display: "flex",
                  //   flexDirection: "row",
                  //   flexWrap: "nowrap",
                  // }}
                  >
                    <div className="row">
                      <div className="col-sm" style={{ textAlign: "center" }}>
                        {foodName.map((name) => {
                          console.log(name._id === x.foodId);
                          if (name._id === x.foodId) return name.name;
                        })}
                      </div>
                      <div className="col-sm" style={{ textAlign: "center" }}>
                        {x.quantity}
                      </div>
                      <div className="col-sm" style={{ textAlign: "center" }}>
                        {x.size}
                      </div>
                      <div className="col-sm" style={{ textAlign: "center" }}>
                        {x.price}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="row">
                <div className="col-sm">{}</div>
                <div className="col-sm"></div>
                <div
                  className="col-sm"
                  style={{ borderTop: "1px solid black", textAlign: "end" }}
                >
                  Total - {item.totalAmount}
                </div>
              </div>
              <h3 className="col-sm"></h3>
              {/* <h5>paymentMethod - {item.paymentMethod}</h5> */}
              <hr></hr>
            </div>
          );
        })
      )}
    </div>
  );
}
