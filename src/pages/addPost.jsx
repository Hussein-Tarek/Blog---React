import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import styles from "./register.module.css";

const AddPost = () => {
  const [postImg, setPostImg] = useState();
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitting = async (data) => {
    setLoading(true);
    const { image, title, description } = data;
    console.log("from add post", { data });
    const userName = localStorage.getItem("userName");
    setAuthUser(userName);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("photo", image[0]);

    console.log(formData);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.post(
        "https://reactjs-blog.onrender.com/v1/post",
        // "http://localhost:3000/v1/post",
        formData,
        config
      );
      setLoading(false);
      console.log(response);
      toast.success("Posted successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setLoading(false);
      toast.error(`Something went wrong 😞`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
              <svg
                className="w-14"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#F97316"
              >
                <path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z" />
              </svg>
              <h1>Game On</h1>
            </div>
            <h1 className="text-orange-500  text-4xl ml-4">Add Post</h1>
            <form
              className={styles.signForm}
              onSubmit={handleSubmit(handleSubmitting)}
            >
              <div class="text-center flex flex-col gap-1 w-full">
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="title" className="label">
                    <span className="label-text text-white">Title</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full bg-transparent border-white text-gray-700  "
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                </div>
                {errors.title && (
                  <span style={{ color: "red" }}>{errors.title?.message}</span>
                )}
                <div className={`${styles.formControl} w-full`}>
                  <label htmlFor="description" className="label">
                    <span className="label-text text-white">Description</span>
                  </label>
                  <textarea
                    rows={60}
                    id="description"
                    type="text"
                    placeholder="Description"
                    className="input input-bordered textarea-md w-full bg-transparent border-orange-400 text-gray-700 h-40 "
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>
                {errors.description && (
                  <p style={{ color: "red" }}>{errors.description?.message}</p>
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
                        setPostImg(e.target.files[0].name);
                      }}
                      id="image"
                      type="file"
                      className="input input-bordered w-full bg-transparent border-white text-gray-700  "
                      {...register("image")}
                    />
                    <p className="input input-bordered w-full bg-transparent border-white text-gray-700 ">
                      <span>{!postImg ? "Choose Image " : postImg}</span>
                      <img src="./upload-photo-svgrepo-com.svg" alt="" />
                    </p>
                  </div>
                </div>
                {errors.image && (
                  <p style={{ color: "red" }}>{errors.image?.message}</p>
                )}
                {loading ? (
                  <div className="container mx-auto text-center h-15 flex justify-center items-center w-15">
                    <FidgetSpinner />
                  </div>
                ) : (
                  <div className="flex justify-between mt-5">
                    <button
                      className="btn bg-orange-500 hover:bg-orange-600 w-40 lg:w-80 border-0"
                      type="submit"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="btn bg-gray-900 hover:bg-black w-40 lg:w-80"
                    >
                      Cancel
                    </button>
                  </div>
                )}
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
          {/* Posting Error
          <ToastContainer
            limit={1}
            position="top-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          /> */}
        </div>
      </div>
    </>
  );
};

export default AddPost;
