import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Edit from "./Edit";
export default function Card({ post, handleDelete, getPosts, loading }) {
  const { userId, setUserId } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  setUserId(localStorage.getItem("id"));
  // --------------------- handlers -----------------
  const showDetails = (post) => {
    console.log(post._id);
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="card w-[460px] min-h-5000px bg-base-100 shadow-xl border-orange-500 ">
      <figure>
        <img src={post.photo[0].url} alt="img" />
      </figure>
      <div className="flex gap-1 mt-3 justify-end mr-1 absolute top-64 right-5">
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
        <div className="avatar mb-2 relative  ">
          <div className="w-10 rounded-full">
            <img src="/images.png" />
          </div>
          <h2 className="mx-2 mt-2 text-xl font-semibold">
            {post.user.username}
          </h2>
        </div>
        <h2 className="text-orange-500 card-title">{post.title}</h2>
        <p className=" mb-5 text-left">{post.content.substring(0, 100)}...</p>
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

{
  /* <div className="card w-96 glass">
  <figure>
    <img src={photo[0].url} alt="car!" />
  </figure>
  <div className="card-body flex flex-wrap">
    <div className="avatar">
      <div className="w-5 rounded-full">
        <svg
          className="w-[20px] text-red"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
        </svg>
      </div>
      <h2 className="mx-2 mt-1 text-orange-500">
        {localStorage.getItem("userName")}
      </h2>
    </div>
    <h2 className="card-title">{title}</h2>
      <h3>{content}...</h3>
    </div>
    <div>
  </div>
</div>; */
}
/*
<div className="h-96 rounded-box flex items-center m-5">
      <div className="h-96 rounded-box flex  justify-around m-5">
        <div className=" rounded-box flex justify-center m-5 w-[1500px]">
          <div className="card w-25 bg-base-100 shadow-xl flex flex-row justify-center m-5 ">
            <div className="basis-1/2 ">
              <figure className="h-full">
                <img className="h-fit" src={photo[0].url} alt="Shoes" />
              </figure>
            </div>
            <div className="basis-1/2 h-96">
              <div className="card-body w-96">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="/1.jpg" />
                  </div>
                  <h2 className="mx-2 mt-2 text-xl">
                    {localStorage.getItem("userName")}
                  </h2>
                </div>
                <h2 className="card-title">{title}</h2>
                <p className="text-left">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
*/
