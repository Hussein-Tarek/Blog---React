import axios from "axios";
import { useState, useEffect } from "react";

export default function CardDetails({ photo, title, content, id, post }) {
  // -------------- states
  const [userName, setUserName] = useState();
  // ------------- useEffect -----------
  console.log(post);
  useEffect(() => {
    // ---------------- To get user name ------------
    const getUserById = async function () {
      // console.log(post.user);
      try {
        const response = await axios.get(
          `https://reactjs-blog.onrender.com/v1/user/profile/${id}`
        );
        console.log("User", response.data.data.username);
        setUserName(response.data.data.username);
        console.log("userName", userName);
      } catch (err) {
        console.log(err);
      }
    };
    getUserById();
  }, []);
  return (
    <div className="card card-compact m-3 p-5 w-96 lg:w-2/4 bg-base-100 shadow-xl mb-10">
      <div className="card-header flex justify-start flex-col">
        <div className="avatar lg:ml-10">
          <div className="w-12 h-12 lg:ml-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={post.user.photo[0] ? post.user.photo[0].url : "/images.png"}
            />
          </div>
          <div className="w-52 h-16 flex flex-col items-start justify-start ml-4">
            <h2 className=" mt-1  text-xl text-start font-semibold">
              {userName}
            </h2>
            <p className="text-gray-400 text-start ml-1 text-xs">
              {new Date(post.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <h1 className="card-title m-auto text-orange-500 text-justify px-14">
          {title}
        </h1>
      </div>
      <figure>
        <img src={photo[0].url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <p className="text-xl text-justify mb-3  lg:px-10">{content}</p>
      </div>
    </div>
  );
}
