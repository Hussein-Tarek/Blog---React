import axios from "axios";

import { FidgetSpinner } from "react-loader-spinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./register.module.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
  } = useAuth();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ------------------------ handlers ------------------
  const notify = (msg) => {
    toast(msg);
  };
  const notifyError = () => {
    toast("Invalid Email or password");
  };
  const handleSubmitting = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await axios.post(
        "https://reactjs-blog.onrender.com/v1/users/sign-in",
        {
          email: data.email,
          password: data.password,
        }
      );
      setLoading(false);
      console.log("response", response);
      setIsLoggedIn(true);
      console.log(isLoggedIn);
      // setAuthUser(response.data.data.user.username);
      notify(response.data.length);
      resetField("email");
      resetField("password");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
      console.log(response);
      setAuthUser(response.data.data.user.username);
      setUserId(response.data.data.user._id);
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userName", response.data.data.user.username);
      localStorage.setItem("id", response.data.data.user._id);
      localStorage.setItem("profileImg", response.data.data.user.photo[0].url);
    } catch (err) {
      setLoading(false);
      notifyError(err.response.data.message);
      resetField("email");
      resetField("password");
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  return (
    <>
      <div className={styles.sign}>
        <ToastContainer />
        <div className={styles.container}>
          <ul className={styles.bars}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className={`${styles.signForm} w-full`}>
            <div className={styles.signLogo}>
              <NavLink to="/">
                {/* <h2 className="font-semibold normal-case text-xl logo ">Sports Blog</h2> */}
                <svg
                  className="w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#F97316"
                >
                  <path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z" />
                </svg>
              </NavLink>
              <h1 className={styles.slogan}>Game On</h1>
            </div>
            <h1 className="text-orange-500  text-4xl ml-4">Login</h1>
            <form
              className={styles.signForm}
              onSubmit={handleSubmit(handleSubmitting)}
            >
              <div className="text-center flex flex-col gap-1 w-full">
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="email" className="label ">
                    <span className="label-text text-gray-700 ">Email</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full bg-transparent border-white text-gray-700"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email?.message}</span>
                )}
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="password" className="label">
                    <span className="label-text text-gray-700 ">Password</span>
                  </label>
                  <input
                    id="Password"
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full bg-transparent border-white text-gray-700 "
                    {...register("password", {
                      required: "Password is required",
                      minLength: 5,
                    })}
                  />
                </div>
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password?.message}</p>
                )}
                {loading ? (
                  <div
                    // className={`${styles.container} m-80 text-center h-10 flex justify-center items-center w-5 `}
                    className="m-auto"
                  >
                    <FidgetSpinner />
                  </div>
                ) : (
                  <button
                    className="btn bg-orange-500 border-0 hover:bg-orange-600 mt-5"
                    type="submit"
                  >
                    Login
                  </button>
                )}
                <div className=" text-lg flex justify-around">
                  <p className="py-2">
                    have account?
                    <Link className="font-bold underline" to="/register">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className={`${styles.loginImg} `}>
            <ul className={styles.bar}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
