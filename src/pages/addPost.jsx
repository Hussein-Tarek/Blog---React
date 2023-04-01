import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
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
      console.log(err);
      setLoading(false);
      toast.error(`${err.response.data} 😞`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <>
      <div className="add-background">
        <div className="flex mt-10 m-auto justify-center  ">
          <form
            className="w-3/4 lg:w-1/4 md:w-1/2 sm:w-full z-1 loginForm"
            onSubmit={handleSubmit(handleSubmitting)}
          >
            <div class="text-center flex flex-col gap-5 w-full">
              <div className="form-control w-full ">
                <label htmlFor="title" className="label">
                  <span className="label-text text-white">Title</span>
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full bg-transparent border-white text-white "
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
              </div>
              {errors.title && (
                <span style={{ color: "red" }}>{errors.title?.message}</span>
              )}
              <div className="form-control w-full ">
                <label htmlFor="description" className="label">
                  <span className="label-text text-white">Description</span>
                </label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Description"
                  className="input input-bordered textarea-md w-full bg-transparent border-white text-white  "
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              </div>
              {errors.description && (
                <p style={{ color: "red" }}>{errors.description?.message}</p>
              )}

              <div className="form-control w-full ">
                <label htmlFor="image" className="label">
                  <span className="label-text text-white">Image</span>
                </label>
                <input
                  id="image"
                  type="file"
                  className="file-input file-input-warning w-full max-w-xs bg-transparent border-white text-white "
                  {...register("image", {
                    required: "image is required",
                  })}
                />
              </div>
              {errors.image && (
                <p style={{ color: "red" }}>{errors.image?.message}</p>
              )}
              {loading ? (
                <div className="container mx-auto text-center h-10 flex justify-center items-center w-5">
                  <FidgetSpinner />
                </div>
              ) : (
                <button
                  className="btn bg-orange-500 hover:bg-orange-600"
                  type="submit"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posting Error */}
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
        />

        {/* Posting success */}
        <ToastContainer
          position="top-right"
          autoClose={1500}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </>
  );
};

export default AddPost;
