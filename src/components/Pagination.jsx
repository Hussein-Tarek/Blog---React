import React from "react";
import { useState } from "react";
const Pagination = ({
  posts,
  pageSize,
  currentPage,
  setCurrentPage,
  noOfPages,
  setNoOfPages,
}) => {
  setNoOfPages(Math.ceil(posts.length / pageSize));

  function increment() {
    if (currentPage < noOfPages) setCurrentPage(currentPage + 1);
    console.log(currentPage);
  }
  function decrement() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    console.log(currentPage);
  }
  return (
    <div className="btn-group mb-16">
      <button
        onClick={decrement}
        className="btn bg-orange-500 hover:bg-orange-600"
      >
        «
      </button>
      <button className="btn  bg-orange-400 hover:bg-orange-600">
        page {currentPage}
      </button>
      <button
        onClick={increment}
        className="btn  bg-orange-500 hover:bg-orange-600"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
