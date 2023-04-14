import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

import Edit from "../components/Edit";
import styles from "./profile.module.css";
import AddPost from "../components/AddPost";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  console.log(userId);
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const getUser = async function () {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reactjs-blog.onrender.com/v1/user/profile/${id}`
      );
      setLoading(false);
      setData(response?.data.data);
      setPosts(response?.data.data.posts);
      console.log("response", response);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  //------------------------- handlers  -----------------

  async function handleDelete(post) {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.delete(
        `https://reactjs-blog.onrender.com/v1/post/${post._id}`,
        config
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const showDetails = (post) => {
    navigate(`/post/${post._id}`);
  };

  // console.log("data", data.data.data.photo[0].url);
  console.log("posts", posts);
  // console.log("posts", posts[0]?.photo[0].url);

  console.log({ error, loading });
  return (
    <>
      <Navbar />
      <div className={`${styles.container} mt-[60px] `}>
        <div
          className="w-[80vw] h-[50vh] "
          // style={{
          //   border: "2px solid orange",
          //   height: "50vh",
          //   width: `${data.cover_photo?.length > 0 ? "80vw" : "80vw"}`,
          //   background: `url( ${
          //     data.cover_photo?.length > 0 ? data.cover_photo[0]?.url : "/6.jpg"
          //   }) 0px 0% / cover no-repeat `,
          //   marginTop: "70px",
          // }}
        >
          <img
            className={`${
              data.cover_photo?.length > 0 ? "w-[100%]" : "w-[80vw]"
            } ${data.cover_photo?.length > 0 ? "mr-[50vw]" : ""}  ${
              data.cover_photo?.length > 0 ? "" : ""
            }  h-[50vh] relative `}
            src={`${
              data.cover_photo?.length > 0 ? data.cover_photo[0]?.url : "/6.jpg"
            }`}
            alt=""
          />
        </div>
      </div>
      <div className={`${styles.container}  text-black relative z-10 `}>
        <div
          className={`${styles.side} lg:block lg:sticky hidden  bg-black text-white w-96`}
        >
          <div className={`${styles.profileImg}`}>
            <img
              src={data.photo?.length > 0 ? data.photo[0].url : "/images.png"}
              alt=""
            />
            <p className=" mt-5 font-bold text-2xl  text-orange-400">
              {data.username}
            </p>
            {/* <p className=" mt-3  text-xl ">Bio will be here</p> */}
          </div>
          <div className={`${styles.about} text-start  text-orange-400 p-5`}>
            <div className="grid grid-flow-col justify-between z-50 relative">
              <h1 className="m-auto text-2xl font-bold mb-2">About</h1>
              {userId === id ? (
                <EditProfile user={data} getUser={getUser} />
              ) : (
                ""
              )}
            </div>
            <hr />
            <div className="flex gap-16 p-2 text-start justify-start items-start m-0">
              <h3 className="font-bold">Name</h3>
              <p className="text-start">{data.username}</p>
            </div>
            <div className="flex gap-16 p-2 ">
              <h3 className="font-bold">Email</h3>
              <p>{data.email}</p>
            </div>
            <div className="flex gap-16 p-2">
              <h3 className="font-bold ">posts</h3>
              <p>{data.posts?.length}</p>
            </div>
            {data.posts?.length > 0 ? (
              <ul className={styles.bar}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>

        {posts.length ? (
          <div className={`${styles.main} my-10 m-auto -z-10`}>
            {posts.map((post) => (
              <div className="card p-2 text-center m-auto lg:m-0  w-[300px] lg:w-[500px] lg:h-[550px]  max-h-572px bg-base-100 shadow-xl border-orange-500  ">
                <div className="flex gap-4 ml-4 mt-2">
                  <div className="avatar ">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          data.photo.length > 0
                            ? data.photo[0].url
                            : "/images.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h2 className=" mt-1  text-xl font-semibold text-gray-700">
                      {data.username}
                    </h2>
                    <p className="text-gray-400 text-xs">
                      {new Date(post.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <h2 className="text-orange-500 card-title min-h-[70px] mt-2 pt-2 m-auto">
                  {post.title}
                </h2>
                <figure>
                  <img
                    className="card-img "
                    src={post.photo[0].url}
                    alt="img"
                  />
                </figure>
                {post.user === userId ? (
                  <div className="flex gap-1 mt-3 justify-end mr-1 absolute  right-5  lg:right-5">
                    <Edit post={post} getPosts={getUser} />
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
                        <p className="py-4">
                          This post will be deleted permanently.
                        </p>
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
                  </div>
                ) : (
                  ""
                )}
                <div className="card-body p-2 ">
                  {post.content.length > 100 ? (
                    <button
                      onClick={() => {
                        showDetails(post);
                      }}
                    >
                      <p className=" mb-5 text-left">
                        {post.content.substring(0, 100)}
                        <span className="text-orange-500 font-bold">
                          {" "}
                          Read More....
                        </span>
                      </p>
                    </button>
                  ) : (
                    <p className=" mb-5 text-left">{post.content}</p>
                  )}
                  {/* <div className="card-actions justify-end">
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
            ))}
          </div>
        ) : !error && !loading ? (
          <div className="flex flex-col mt-20">
            <p>No posts</p>
            {/* <p>Check your internet</p> */}
          </div>
        ) : error && !loading ? (
          <div className="flex flex-col mt-20">
            <p>Something went wrong</p>
            <p>Check your internet</p>
          </div>
        ) : (
          <>
            <div className="container mx-auto text-center h-screen flex justify-center items-center">
              <FidgetSpinner />
            </div>
          </>
        )}
      </div>
      {/* <div className="mt-10 ml-10 lg:mt-0"> */}
      <AddPost />
      {/* </div> */}
    </>
  );
};

export default Profile;
