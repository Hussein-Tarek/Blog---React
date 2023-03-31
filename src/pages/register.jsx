import { ThreeDots, FidgetSpinner } from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
  } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ------------------------- handlers ----------------------
  const notify = () => {
    toast("Sign up successfully");
  };
  const notifyError = (err) => {
    toast(err);
  };
  const handleSubmitting = async (data) => {
    setLoading(true);
    console.log(data);
    let response;
    try {
      response = await axios.post(
        "https://reactjs-blog.onrender.com/v1/users/sign-up",
        {
          email: data.email,
          username: data.name,
          password: data.password,
          confirm_password: data.ConfirmPassword,
        }
      );
      setLoading(false);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
      notify();
      setIsLoggedIn(true);
      setAuthUser(response.data.data.user.username);
      setUserId(response.data.data.user._id);
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userName", response.data.data.user.username);
      localStorage.setItem("id", response.data.data.user._id);
    } catch (err) {
      setLoading(false);
      notifyError(err.response.data.message[0]);
    }
  };

  return (
    <>
      <div className="register-background">
        <ToastContainer />
        <div className="flex mt-10 m-auto justify-center">
          <form
            className="w-3/4 lg:w-1/4 md:w-1/2 sm:w-3/4 loginForm"
            onSubmit={handleSubmit(handleSubmitting)}
          >
            <div class="text-center flex flex-col gap-5 w-full ">
              <h1 className="text-orange-500  text-4xl">Register</h1>
              <div className="form-control w-full ">
                <label htmlFor="name" className="label">
                  <span className="label-text text-white">User name</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full bg-transparent border-white text-white "
                  {...register("name", {
                    required: "name is required",
                  })}
                />
              </div>
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
              <div className="form-control w-full ">
                <label htmlFor="email" className="label">
                  <span className="label-text text-white ">Email</span>
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full bg-transparent border-white text-white "
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
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
              <div className="form-control w-full ">
                <label htmlFor="password" className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  id="Password"
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full bg-transparent border-white text-white "
                  {...register("password", {
                    required: "Password is required",
                    minLength: 5,
                  })}
                />
              </div>
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
              <div className="form-control w-full ">
                <label htmlFor="password" className="label">
                  <span className="label-text text-white">
                    Confirm Password
                  </span>
                </label>
                <input
                  id="ConfirmPassword"
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full bg-transparent border-white text-white "
                  {...register("ConfirmPassword", {
                    required: "Confirm Password is required",
                    minLength: 5,
                  })}
                />
              </div>
              {errors.ConfirmPassword && (
                <span style={{ color: "red" }}>
                  {errors.ConfirmPassword.message}
                </span>
              )}
              {loading ? (
                <div className="container mx-auto text-center h-10 flex justify-center items-center w-5">
                  <FidgetSpinner />
                </div>
              ) : (
                <button className="btn bg-orange-500" type="submit">
                  Sing up
                </button>
              )}
              <div className="text-white text-lg flex justify-around">
                <p className="py-2">Have account?</p>
                <button
                  type="button"
                  className="btn bg-transparent hover:bg-orange-500 border-white"
                >
                  <Link to="/login">Log in</Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
