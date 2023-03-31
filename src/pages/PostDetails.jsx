import axios from "axios";
import Card from "../components/Card";
import { ThreeDots, FidgetSpinner } from "react-loader-spinner";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardDetails from "../components/CardDetails";
const PostDetails = () => {
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const params = useParams();
  useEffect(() => {
    async function getPostById() {
      try {
        const { data } = await axios.get(
          `https://reactjs-blog.onrender.com/v1/post/${params.id}`
        );
        setPost(data?.data);
      } catch (err) {
        setError(err);
      }
    }
    getPostById();
    console.log("post", post);
  }, []);
  //   console.log("post", post.title);
  return (
    <>
      <div className="cardDetails mt-10 flex justify-around">
        {post ? (
          <CardDetails
            title={post.title}
            content={post.content}
            photo={post.photo}
            id={post.user._id}
          />
        ) : !post && !error ? (
          <>
            <div className="container mx-auto text-center h-screen flex justify-center items-center">
              <FidgetSpinner />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PostDetails;
