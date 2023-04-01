import axios from "axios";
import { useState, useEffect } from "react";

export default function CardDetails({ photo, title, content, id }) {
  // -------------- states
  const [userName, setUserName] = useState();
  // ------------- useEffect -----------
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
        <div className="avatar ml-3 mb-2">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="/images.png" />
          </div>
          <h2 className="mx-4 mt-1  text-xl font-semibold">{userName}</h2>
        </div>
        <h1 className="card-title m-auto text-orange-500">{title}</h1>
      </div>
      <figure>
        <img src={photo[0].url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <p className="text-xl mb-3">{content}</p>
      </div>
    </div>
  );
}
