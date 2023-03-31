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
    <div className="h-96 carousel carousel-vertical rounded-box flex items-center m-5">
      <div className="h-96  carousel-item rounded-box flex  justify-around m-5">
        <div className=" rounded-box flex justify-center m-5 w-[1500px]">
          <div className="card carousel carousel-vertical w-25 bg-base-100 shadow-xl flex flex-row justify-center m-5 ">
            <div className="basis-1/2  ">
              <figure className="h-full">
                <img className="h-fit" src={photo[0].url} alt="Shoes" />
              </figure>
            </div>
            <div className="basis-1/2   h-96">
              <div className="card-body carousel carousel-vertical w-96">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="/images.png" />
                  </div>
                  <h2 className="mx-2 mt-2 text-orange-500 font-semibold">
                    {userName}
                  </h2>
                </div>
                <div className="h-auto">
                  <h2 className="card-title">{title}</h2>
                  <p className="max-w-10">{content}</p>
                </div>
              </div>
            </div>
          </div>
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
      <div>
        <h2 className="card-title">{title}</h2>
        <h3>{content}...</h3>
      </div>
    </div>
  </div>; */
}
