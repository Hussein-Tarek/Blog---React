import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const pageSize = 9;
  const [noOfPages, setNoOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --------------  for navigation ------------------
  const navigate = useNavigate();
  // --------------  get token from local storage  ------------------
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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
    // setNoOfPages(Math.ceil(posts.length / pageSize));
    getPosts();
  }, []);

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

  const addPost = () => {
    navigate("/add");
  };
  // ------------------------ pagination -------------

  const start = currentPage * pageSize - pageSize;
  const end = start + pageSize;
  let itemsToRender = posts.slice(start, end);
  // function increment() {
  //   if (currentPage < noOfPages) setCurrentPage(currentPage + 1);
  //   console.log(currentPage);
  // }
  // function decrement() {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  //   console.log(currentPage);
  // }
  return (
    <div>
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
          ""
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

      <button
        onClick={addPost}
        className="btn btn-circle items-center bg-orange-500 fixed right-0 bottom-0 m-6 border-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
};

export default Home;
