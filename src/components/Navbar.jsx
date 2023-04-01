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
      <div className="px-5 ">
        {/* <h2 className="font-semibold normal-case text-xl logo ">Sports Blog</h2> */}
        <svg
          className="w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#F97316"
        >
          <path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z" />
        </svg>
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
