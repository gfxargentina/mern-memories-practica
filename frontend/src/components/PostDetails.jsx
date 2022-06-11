import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostBySearch } from "../actions/posts";
import Spinner from "./Spinner";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [post, dispatch]);

  if (!post) return null;

  if (isLoading) {
    return <Spinner />;
  }

  //hace un filtro para que el post que esta viendo el usuario no aparezca en los post recomendados
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  console.log(recommendedPosts);

  return (
    <section className="container mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={post.selectedFile} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p> {post.message} </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Contactar</button>
          </div>
        </div>
      </div>
      {/* si hay post recomendados */}
      {recommendedPosts.length && (
        // mostrar lo siguiente
        <div>
          <h2>Tambien le puede gustar</h2>
          <div>
            {/* hace una desestructuracion de lo que queres mostrar en los posts recomendados */}
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div key={_id}>{title}</div>
              )
            )}
          </div>
        </div>
      )}
      <div></div>
    </section>
  );
};

export default PostDetails;
