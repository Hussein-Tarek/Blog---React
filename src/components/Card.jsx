import { FidgetSpinner } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Edit from "./Edit";

export default function Card({ post, handleDelete, getPosts, loading }) {
  const { userId, setUserId } = useAuth();
  const navigate = useNavigate();
  setUserId(localStorage.getItem("id"));
  // --------------------- handlers -----------------
  const showDetails = (post) => {
    navigate(`/post/${post._id}`);
  };
  return (
    <div className="card p-2 text-center m-auto lg:m-0 lg:w-[460px] w-[350px] min-h-2000px max-h-572px bg-base-100 shadow-xl border-orange-500 ">
      <div className="flex gap-4 ml-4 mt-2">
        <div className="avatar ">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={post.user.photo[0] ? post.user.photo[0].url : "/images.png"}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <Link to={`/profile/${post.user._id}`}>
            <h2 className=" mt-1  text-xl font-semibold text-gray-700">
              {post.user.username}
            </h2>
          </Link>
          <p className="text-gray-400 text-xs">
            {new Date(post.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <h2 className="text-orange-500 card-title min-h-[70px] mt-2 pt-2 m-auto">
        {post.title}
      </h2>
      <figure>
        <img className="card-img " src={post.photo[0].url} alt="img" />
      </figure>
      <div className="flex gap-1 mt-3 justify-end mr-1 absolute  right-5  lg:right-5 z-10">
        {post.user._id === userId ? (
          <>
            <Edit post={post} getPosts={getPosts} />
            <label htmlFor={`my-modal-3_${post._id}`}>
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#FB913B"
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                />
              </svg>
            </label>
            <input
              type="checkbox"
              id={`my-modal-3_${post._id}`}
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative m-auto">
                <label
                  htmlFor={`my-modal-3_${post._id}`}
                  className="btn btn-sm btn-circle absolute right-2 top-2 border-none"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">Are you sure?..</h3>
                <p className="py-4">This post will be deleted permanently.</p>
                {loading ? (
                  <div className=" ml-32 sm:ml:48 md:ml-48">
                    <FidgetSpinner />
                  </div>
                ) : (
                  <button
                    className="btn bg-orange-500 border-none"
                    onClick={() => {
                      handleDelete(post);
                    }}
                  >
                    Yes
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="card-body p-2 ">
        {/* <p className=" mb-5 text-left"> */}
        {/* {post.content.substring(0, 100)}
          {post.content.length > 100 ? "..." : ""} */}
        {post.content.length > 200 ? (
          <button
            onClick={() => {
              showDetails(post);
            }}
          >
            <p className=" mb-5 text-justify">
              {post.content.substring(0, 200)}
              <span className="text-orange-500 font-bold"> Read More....</span>
            </p>
          </button>
        ) : (
          <p className=" mb-5  text-justify ">{post.content}</p>
        )}
        {/* </p> */}
        {/* <div classNae="card-actions justify-end">
          <button
            onClick={() => {
              showDetails(post);
            }}
            className="btn bg-orange-500 border-none hover:bg-orange-400 "
          >
            Read more
          </button>
        </div> */}
      </div>
    </div>
  );
}
