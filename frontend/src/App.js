import "./App.css";
import { useState, useEffect } from "react";
import Menu from "./screens/Menu";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import SignUp from "./screens/SignUp";
import Cart from "./screens/Cart.js";
import User from "./screens/User";
import Footer from "./components/Footer";
import userContext from "./store/userInfo";
import Home from "./screens/Home";
import Success from "./screens/Success";
import { url } from "./url";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [user, setUser] = useState({});
  const [authToken, setAuthToken] = useState("");

  const fetchUserDetails = async () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      try {
        const response = await fetch(`${url}/user/getUser/${authToken}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData.message);
        } else {
          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [authToken]);

  const contextValue = {
    user,
    setUser,
    setAuthToken,
    authToken,
  };
  const [newReview, setNewReview] = useState();

  return (
    <userContext.Provider value={contextValue}>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home newReview={newReview} />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/user/edituser" element={<SignUp />}></Route>
            <Route path="/success" element={<Success />}></Route>
          </Routes>
        </div>

        <div>
          <Footer setNewReview={setNewReview} />
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
