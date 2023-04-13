import { FidgetSpinner } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Edit({ post, getPosts }) {
  const [loading, setLoading] = useState(false);
  console.log("post title", post.title);
  const preloadedValues = {
    title: post.title,
    description: post.content,
    // image: post.photo[0].url,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
  });

  // ------------------------ handlers ----------------
  const handleEdit = async (data, e) => {
    setLoading(true);
    const { image, title, description } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    if (data.image.length) formData.append("photo", data?.image[0]);

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.patch(
        `https://reactjs-blog.onrender.com/v1/post/${post._id}`,
        formData,
        config
      );
      setLoading(false);
      e.target.reset();
      getPosts();
      console.log(response);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <label>
        <label htmlFor={`my-modal_${post._id}`}>
          <svg
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#FB913B"
              d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
            />
          </svg>
        </label>
        <input
          type="checkbox"
          id={`my-modal_${post._id}`}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <div className="flex mt-10 m-auto justify-center ">
              <form
                className=" z-1 loginForm"
                onSubmit={handleSubmit(handleEdit)}
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
                      name:title
                      className="input input-bordered w-full bg-transparent border-orange-400 text-gray-900 "
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                  </div>
                  {errors.title && (
                    <span style={{ color: "red" }}>
                      {errors.title?.message}
                    </span>
                  )}
                  <div className="form-control w-full ">
                    <label htmlFor="description" className="label">
                      <span className="label-text text-white">Description</span>
                    </label>
                    <textarea
                      id="description"
                      type="text"
                      placeholder="Description"
                      name:description
                      className="input input-bordered textarea-md w-full bg-transparent border-orange-400 text-gray-900  "
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                  </div>
                  {errors.description && (
                    <p style={{ color: "red" }}>
                      {errors.description?.message}
                    </p>
                  )}

                  <div className="form-control w-full ">
                    <label htmlFor="image" className="label">
                      <span className="label-text text-white">Image</span>
                    </label>
                    <input
                      id="image"
                      type="file"
                      name:image
                      className="file-input file-input-warning w-full max-w-xs bg-transparent border-orange-400 text-gray-900"
                      {...register("image", {
                        // required: "image is required",
                      })}
                    />
                  </div>
                  {errors.image && (
                    <p style={{ color: "red" }}>{errors.image?.message}</p>
                  )}
                  <button
                    className="btn bg-orange-500 border-0 hover:bg-orange-600 "
                    type="submit"
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
            {loading ? (
              <div className="container mx-auto text-center h-10 flex justify-center items-center w-5">
                <FidgetSpinner />
              </div>
            ) : (
              <div className="modal-action">
                <label
                  htmlFor={`my-modal_${post._id}`}
                  className="btn bg-orange-500 border-0 hover:bg-orange-600 "
                >
                  Close
                </label>
              </div>
            )}
          </div>
        </div>
      </label>
    </>
  );
}
