import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
  } = useAuth();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    setAuthUser(localStorage.getItem("userName"));
    // setUserId("");
  }, []);
  console.log("from nav is logged in", isLoggedIn);

  //  -------------------- handlers ------------------------
  const logOut = () => {
    setIsLoggedIn(false);
    setAuthUser("");
    setUserId("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  console.log("from nav is logged in 2", isLoggedIn);
  return (
    <div className="navbar bg-black border-b-2 border-orange-400 text-orange-400 flex justify-between ">
      <div className="px-5">
        <h2 className="font-semibold normal-case text-xl logo ">Sports Blog</h2>
      </div>
      {authUser ? (
        <div>
          <h2 className="text-white font-bold">Welcome {authUser}</h2>
        </div>
      ) : (
        ""
      )}
      <ul className="flex gap-4 mr-5 text-lg">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <NavLink
              onClick={logOut}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              to="/"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              to="/login"
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
}
