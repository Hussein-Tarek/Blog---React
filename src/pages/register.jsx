import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import "./register.css";
import styles from "./register.module.css";
import { useAuth } from "../Context/AuthContext";

const Register = () => {
  const [profileImg, setProfileImg] = useState();
  const [profileCover, setProfileCover] = useState();
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
    const { image, email, name, password, ConfirmPassword } = data;
    console.log(image);
    const formData = new FormData();
    if (data.image.length > 0) {
      formData.append("photo", data.image[0]);
    }
    if (data.cover.length > 0) {
      formData.append("cover_photo", data.cover[0]);
    }
    formData.append("email", email);
    formData.append("username", name);
    formData.append("password", password);
    formData.append("confirm_password", ConfirmPassword);
    let response;
    try {
      response = await axios.post(
        "https://reactjs-blog.onrender.com/v1/users/sign-up",
        formData
        // {
        //   email: data.email,
        //   username: data.name,
        //   password: data.password,
        //   confirm_password: data.ConfirmPassword,
        // }
      );
      console.log(response);
      console.log("formData", formData);
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
      if (data.image.length > 0) {
        localStorage.setItem(
          "profileImg",
          response.data.data.user.photo[0].url
        );
      }
    } catch (err) {
      setLoading(false);
      notifyError(err.response.data.message[0]);
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
              <h1>Game On</h1>
            </div>
            <h1 className="text-orange-500  text-4xl ml-4">Register</h1>
            <form
              className={styles.signForm}
              onSubmit={handleSubmit(handleSubmitting)}
            >
              <div class="text-center flex flex-col gap-1 w-full ">
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="name" className="label">
                    <span className="label-text text-gray-700">User name</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full bg-transparent border-white text-gray-700 "
                    {...register("name", {
                      required: "name is required",
                    })}
                  />
                </div>
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name?.message}</span>
                )}
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="email" className="label">
                    <span className="label-text text-gray-700 ">Email</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full bg-transparent border-white text-gray-700 "
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
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="password" className="label">
                    <span className="label-text text-gray-700">Password</span>
                  </label>
                  <input
                    id="Password"
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered w-full bg-transparent border-white text-gray-700 "
                    {...register("password", {
                      required: "Password is required",
                      minLength: 5,
                    })}
                  />
                </div>
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="password" className="label">
                    <span className="label-text text-gray-700">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    id="ConfirmPassword"
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered w-full bg-transparent border-white text-gray-700 "
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
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="image" className="label">
                    <span className="label-text text-[#6a6a6a] mb-2 ">
                      Image
                    </span>
                  </label>
                  <div class="upload w-full">
                    <input
                      onInput={(e) => {
                        setProfileImg(e.target.files[0].name);
                      }}
                      id="image"
                      type="file"
                      className="input input-bordered w-full bg-transparent border-white text-gray-700  "
                      {...register("image")}
                    />
                    <p className="input input-bordered w-full bg-transparent border-white text-gray-700 ">
                      <span>
                        {!profileImg ? "Choose Image (Optional)" : profileImg}
                      </span>
                      <img src="./upload-photo-svgrepo-com.svg" alt="" />
                    </p>
                  </div>
                </div>
                {errors.image && (
                  <p style={{ color: "red" }}>{errors.image?.message}</p>
                )}
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="cover" className="label">
                    <span className="label-text text-[#6a6a6a] mb-2 ">
                      cover
                    </span>
                  </label>
                  <div class="upload w-full">
                    <input
                      onInput={(e) => {
                        setProfileCover(e.target.files[0].name);
                      }}
                      id="cover"
                      type="file"
                      className="input input-bordered w-full bg-transparent border-white text-gray-700  "
                      {...register("cover")}
                    />
                    <p className="input input-bordered w-full bg-transparent border-white text-gray-700 ">
                      <span>
                        {!profileCover
                          ? "Choose Image (Optional)"
                          : profileCover}
                      </span>
                      <img src="./upload-photo-svgrepo-com.svg" alt="" />
                    </p>
                  </div>
                </div>
                {errors.cover && (
                  <p style={{ color: "red" }}>{errors.cover?.message}</p>
                )}
                {loading ? (
                  <div
                    // className={`${styles.container} mx-auto text-center h-10 flex justify-center items-center w-5 `}
                    className="m-auto"
                  >
                    <FidgetSpinner />
                  </div>
                ) : (
                  <button
                    className="btn bg-orange-500 w-full m-auto outline-0 border-0 hover:bg-orange-600 mt-5"
                    type="submit"
                  >
                    Sing up
                  </button>
                )}
                <div className=" text-lg flex justify-around">
                  <p className="py-2">
                    Have account?{" "}
                    <Link className="font-bold underline" to="/login">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className={`${styles.signImg} `}>
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

export default Register;
