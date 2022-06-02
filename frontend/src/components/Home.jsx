import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

import Form from "./Form/Form";
import Posts from "./Posts/Posts";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="flex p-10 justify-center">
      <div className="flex gap-2">
        <div className="p-4">
          <Posts setCurrentId={setCurrentId} />
        </div>

        <div className="grid grid-cols-1">
          <Form currentId={currentId} setCurrentId={setCurrentId} />

          <div className="mt-5">
            <ReactPaginate
              previousLabel={"anterior"}
              nextLabel={"siguiente"}
              pageCount={"5"}
              containerClassName={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
