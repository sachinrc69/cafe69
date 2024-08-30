import React, { useState, useContext, useEffect } from "react";
import userContext from "../store/userInfo";
import Loading from "./Loading";
import { url } from "../url";
function Favorites() {
  const { user } = useContext(userContext);

  const [loading, setLoading] = useState(false);
  const [likedData, setLikedData] = useState([]);
  const [likedFoodData, serLikedFoodData] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const fetchUserFavorites = async () => {
    setLoading((prev) => !prev);
    const response = await fetch(`${url}/loggedinUser/likedData`, {
      method: "GET",
      headers: { Authorization: "Bearer " + authToken },
    });
    if (!response.ok) {
      console.log(await response.json());
    } else {
      const resData = await response.json();
      setLikedData(resData.liked);
    }
  };
  const fetchFoodDataOfFavorites = async () => {
    const response = await fetch(`${url}/loggedinUser/likedFoodData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likedData: likedData }),
    });
    if (!response.ok) {
      console.log(await response.json());
    } else {
      const resData = await response.json();
      serLikedFoodData(resData.food_data);
    }
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    fetchFoodDataOfFavorites();
  }, [likedData]);

  console.log(likedData.length);
  console.log(likedFoodData.length);

  if (loading) {
    return <Loading />;
  }

  if (likedFoodData.length === 0 && !loading) {
    return <h1>No favorites</h1>;
  }

  return (
    <div
      style={{
        padding: "50px",
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20PX",
      }}
    >
      <h2 style={{ textAlign: "center" }}>My Favorites</h2>
      {likedFoodData.map((item) => {
        return (
          <div className="card w-85">
            <div className="card-body">
              <div style={{ display: "flex", gap: "100px" }}>
                <img
                  src={item.img}
                  style={{ height: "100px", width: "100px" }}
                ></img>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
              {/* <a href="#" className="btn btn-primary">
                Button
              </a> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
