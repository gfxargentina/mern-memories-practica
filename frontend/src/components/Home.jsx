import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { getPostBySearch, getPosts } from "../actions/posts";

import Form from "./Form/Form";
import Posts from "./Posts/Posts";

import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

//select options
const categorias = [
  { id: 1, categoria: "placas madre" },
  { id: 2, categoria: "rocknacional" },
  { id: 3, categoria: "display" },
  { id: 4, categoria: "tvshow" },
];

const Home = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  const query = useQuery();

  const [seleccionarPagina, setSeleccionarPagina] = useState(1);

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  //const [categoria, setCategoria] = useState([]);
  const [tags, setTags] = useState([]);
  //console.log(categoria);

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    if (seleccionarPagina) dispatch(getPosts(seleccionarPagina));
  }, [seleccionarPagina, dispatch]);

  //cuando se tiene un array de state, primero se usa el spread operator para añadir los tags previos
  //y despues se agrega el tag nuevo al array
  // const handleAddTag = (e) => {
  //   setTags([...tags, e]);
  // };

  const searchPost = () => {
    if (search.trim() || tags) {
      //no se puede pasar un array por parametros, entonces hay que convertilo a string con join
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const seleccionarCategoria = (categ) => {
    //setCategoria(categ);
    //const catego = categ[0].categoria;
    setTags([categ.categoria]);
  };

  const changePage = ({ selected }) => {
    setSeleccionarPagina(selected + 1);
  };

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
            //onKeyDown={handleKeyPress}
            placeholder="Buscar"
            class="input w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            onChange={(opcion) => seleccionarCategoria(opcion)}
            options={categorias}
            //getOptionValue={(opciones) => opciones.id}
            getOptionLabel={(opciones) => opciones.categoria}
            placeholder="Busque por categoria"
          />
          {/* <input
            type="text"
            placeholder="Type here"
            onChange={(e) => handleAddTag(e.target.value)}
            class="input input-bordered w-full max-w-xs"
          /> */}
          <button onClick={searchPost} class="btn btn-outline btn-primary">
            Buscar
          </button>

          <Form currentId={currentId} setCurrentId={setCurrentId} />

          <div className="mt-5">
            {!searchQuery && !tags.length && (
              <ReactPaginate
                previousLabel={"anterior"}
                nextLabel={"siguiente"}
                page={Number(page) || 1}
                pageCount={Number(numberOfPages)}
                onPageChange={changePage}
                containerClassName={
                  "mt-5 mb-5 flex items-center flex-row justify-center"
                }
                previousLinkClassName={
                  "mr-3 p-2 rounded border border-blue-300 hover:border-blue-500"
                }
                nextLinkClassName={
                  "ml-3 p-2 rounded border border-blue-300 hover:border-blue-500"
                }
                pageClassName={
                  "mr-3 p-1 px-2 rounded border border-blue-300 hover:border-blue-700"
                }
                disabledLinkClassName={""}
                activeClassName={"bg-cyan-600 text-white"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
