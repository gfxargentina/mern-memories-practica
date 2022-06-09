import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../actions/posts";
import Spinner from "./Spinner";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  if (!post) return null;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
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
    </section>
  );
};

export default PostDetails;
