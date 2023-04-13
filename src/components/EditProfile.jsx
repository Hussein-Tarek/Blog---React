import { FidgetSpinner } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfile({ user, getUser }) {
  const id = localStorage.getItem("id");
  const userName = localStorage.getItem("userName");
  const [loading, setLoading] = useState(false);
  console.log("User name ", user.username);
  const preloadedValues = {
    name: userName,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
  });

  // ------------------------ handlers ----------------
  const handleEdit = async (data, e) => {
    setLoading(true);
    console.log({ data });
    const formData = new FormData();
    formData.append("username", data.name);
    if (data.photo.length > 0) {
      formData.append("photo", data?.photo[0]);
    }
    if (data.cover_photo.length > 0) {
      formData.append("cover_photo", data?.cover_photo[0]);
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.patch(
        `https://reactjs-blog.onrender.com/v1/user/profile`,
        // `http://localhost:3000/v1/user/profile`,
        formData,
        config
      );
      if (data.photo.length > 0) {
        console.log(response.data.data.photo[0].url);
        localStorage.setItem("profileImg", response.data.data.photo[0].url);
      }
      localStorage.setItem("userName", data.name);
      setLoading(false);
      e.target.reset();
      getUser();
      console.log({ response });
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  };
  return (
    <>
      <div className="z-10">
        <label>
          <label htmlFor={`my-modal_${id}`}>
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
            id={`my-modal_${id}`}
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
                      <label htmlFor="name" className="label">
                        <span className="label-text text-gray-600 font-bold">
                          User name
                        </span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        name:name
                        className="input input-bordered w-full bg-transparent border-orange-400 text-gray-900 "
                        {...register("name", {
                          required: "Name is required",
                        })}
                      />
                    </div>
                    {errors.name && (
                      <span style={{ color: "red" }}>
                        {errors.name?.message}
                      </span>
                    )}
                    <div className="form-control w-full ">
                      <label htmlFor="photo" className="label">
                        <span className="label-text text-gray-600 font-bold">
                          profile Image
                        </span>
                      </label>
                      <input
                        id="photo"
                        type="file"
                        name:photo
                        className="file-input file-input-warning w-full max-w-xs bg-transparent border-orange-400 text-gray-900"
                        {...register("photo")}
                      />
                    </div>
                    {errors.photo && (
                      <p style={{ color: "red" }}>{errors.photo?.message}</p>
                    )}
                    <div className="form-control w-full ">
                      <label htmlFor="cover_photo" className="label">
                        <span className="label-text text-gray-600 font-bold">
                          profile cover
                        </span>
                      </label>
                      <input
                        id="cover_photo"
                        type="file"
                        name:cover_photo
                        className="file-input file-input-warning w-full max-w-xs bg-transparent border-orange-400 text-gray-900"
                        {...register("cover_photo")}
                      />
                    </div>
                    {errors.cover_photo && (
                      <p style={{ color: "red" }}>
                        {errors.cover_photo?.message}
                      </p>
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
                <div className="container mx-auto text-center h-10 flex justify-center items-center w-10">
                  <FidgetSpinner />
                </div>
              ) : (
                <div className="modal-action">
                  <label
                    htmlFor={`my-modal_${id}`}
                    className="btn bg-orange-500 border-0 hover:bg-orange-600 "
                  >
                    Close
                  </label>
                </div>
              )}
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
