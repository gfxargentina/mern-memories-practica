import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

import Form from "./Form/Form";
import Posts from "./Posts/Posts";

import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim()) {
      //disptach logic for fetch search post
    }
  };

  const handleKeyPress = (e) => {
    //si aprieta la tecla enter realiza la busqueda
    if (e.keyCode === 13) {
      //search post
      searchPost();
    } else {
      navigate("/");
    }
  };

  //cuando se tiene un array de state, primero se usa el spread operator para añadir los tags previos
  //y despues se agrega el tag nuevo al array
  const handleAddTag = (tag) => setTags([...tags, tag]);

  return (
    <div className="flex p-10 justify-center">
      <div className="flex gap-2">
        <div className="p-4">
          <Posts setCurrentId={setCurrentId} />
        </div>

        <div className="grid grid-cols-1">
          <input
            name="search"
            type="text"
            onKeyPress={handleKeyPress}
            placeholder="Buscar"
            class="input w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => handleAddTag(e.target.value)}
            class="input input-bordered w-full max-w-xs"
          />
          <button onClick={searchPost} class="btn btn-outline btn-primary">
            Buscar
          </button>

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
