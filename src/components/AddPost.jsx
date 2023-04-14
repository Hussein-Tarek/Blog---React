import React from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const addPost = () => {
    navigate("/add");
  };
  return (
    <button
      onClick={addPost}
      className="btn btn-circle items-center bg-orange-500 hover:bg-orange-600 fixed -right-5 lg:right-0 bottom-0 m-6 border-none"
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
  );
};

export default AddPost;
