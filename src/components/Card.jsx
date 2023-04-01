import { FidgetSpinner } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Edit from "./Edit";
export default function Card({ post, handleDelete, getPosts, loading }) {
  const { userId, setUserId } = useAuth();
  const navigate = useNavigate();
  setUserId(localStorage.getItem("id"));
  // --------------------- handlers -----------------
  const showDetails = (post) => {
    console.log(post._id);
    navigate(`/post/${post._id}`);
  };
  console.log("post", post);
  return (
    <div className="card p-2  m-auto lg:m-0 lg:w-[460px] w-[350px] min-h-2000px max-h-572px bg-base-100 shadow-xl border-orange-500 ">
      <figure>
        <img className="card-img " src={post.photo[0].url} alt="img" />
      </figure>
      <div className="flex gap-1 mt-3 justify-end mr-1 absolute top-64 right-5 lg:top-80 lg:right-5 z-10">
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
              <div className="modal-box relative">
                <label
                  htmlFor={`my-modal-3_${post._id}`}
                  className="btn btn-sm btn-circle absolute right-2 top-2 border-none"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">Are you sure?..</h3>
                <p className="py-4">This post will be deleted permanently.</p>
                {loading ? (
                  <FidgetSpinner />
                ) : (
                  <button
                    className="btn bg-orange-500 border-none"
                    onClick={() => {
                      console.log("delete clicked");
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
      <div className="card-body">
        <div className="avatar ">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="/images.png" />
          </div>
          <h2 className="mx-4 mt-1  text-xl font-semibold">
            {post.user.username}
          </h2>
        </div>
        <h2 className="text-orange-500 card-title">
          {post.title.substring(0, 35)}
          {post.title.length > 35 ? "..." : ""}
        </h2>
        <p className=" mb-5 text-left">
          {post.content.substring(0, 100)}
          {post.content.length > 100 ? "..." : ""}
        </p>
        <div classNae="card-actions justify-end">
          <button
            onClick={() => {
              showDetails(post);
            }}
            className="btn bg-orange-500 border-none hover:bg-orange-400 "
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}
