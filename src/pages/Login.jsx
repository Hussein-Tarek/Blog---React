import { ThreeDots, ColorRing, FidgetSpinner } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
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
  const notifyError = (err) => {
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
      // setIsLoggedIn(true);
      setAuthUser(response.data.data.user.username);
      setUserId(response.data.data.user._id);
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userName", response.data.data.user.username);
      localStorage.setItem("id", response.data.data.user._id);
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
      <div className="login-background">
        <ToastContainer />
        <div className="flex mt-10 m-auto justify-center relative   ">
          <form
            className="w-3/4 lg:w-1/4 md:w-1/2 sm:w-3/4  loginForm "
            onSubmit={handleSubmit(handleSubmitting)}
          >
            <div className="text-center flex flex-col gap-5 w-full">
              <h1 className="text-orange-500  text-4xl">Login</h1>
              <div className="form-control w-full ">
                <label htmlFor="email" className="label ">
                  <span className="label-text text-white ">Email</span>
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full bg-transparent border-white text-white"
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
              <div className="form-control w-full text-white ">
                <label htmlFor="password" className="label">
                  <span className="label-text text-white ">Password</span>
                </label>
                <input
                  id="Password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full bg-transparent border-white text-white "
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
                <div className="container mx-auto text-center h-10 flex justify-center items-center w-5">
                  <FidgetSpinner />
                </div>
              ) : (
                <button
                  className="btn bg-orange-500 hover:bg-orange-700"
                  type="submit"
                >
                  Login
                </button>
              )}
              <div className="text-white lg:text-lg lg:flex justify-around">
                <p className="lg:pt-2 ">Don't have account?</p>
                <button
                  type="button"
                  className="btn bg-transparent hover:bg-orange-500 border-white"
                >
                  <Link to="/register">Sign up</Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
