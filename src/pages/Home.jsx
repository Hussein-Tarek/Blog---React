import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";
import { useEffect, useState } from "react";

import Card from "../components/Card";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import AddPost from "../components/AddPost";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // --------------  for navigation ------------------
  const navigate = useNavigate();

  async function getPosts() {
    try {
      const { data } = await axios.get(
        "https://reactjs-blog.onrender.com/v1/post"
      );
      setPosts(data?.data);
    } catch (err) {
      setError(err);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  console.log("posts", posts);
  // --------------------- handlers --------------------
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
      getPosts();
    } catch (error) {
      setLoading(false);
    }
  }

  // ------------------------ pagination -------------
  const pageSize = 12;
  const [noOfPages, setNoOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const start = currentPage * pageSize - pageSize;
  const end = start + pageSize;
  let itemsToRender = posts.slice(start, end);

  return (
    <div>
      <Navbar />

      <Header />
      <div className="container m-auto mt-20 mb-20 flex gap-5 justify-center flex-wrap">
        {posts.length ? (
          itemsToRender.map((post) => (
            <Card
              key={post._id}
              post={post}
              handleDelete={handleDelete}
              loading={loading}
              getPosts={getPosts}
            />
          ))
        ) : !posts.length && !error ? (
          <>
            <div className="container mx-auto text-center h-screen flex justify-center items-center">
              <FidgetSpinner />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-5">
            <p>Something went wrong...</p>
            <p>Check your internet!</p>
          </div>
        )}
      </div>
      {noOfPages > 9 ? (
        ""
      ) : (
        <Pagination
          posts={posts}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          noOfPages={noOfPages}
          setNoOfPages={setNoOfPages}
        />
      )}
      <AddPost />
    </div>
  );
};

export default Home;
