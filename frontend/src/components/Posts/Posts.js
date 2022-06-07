import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  //si no hay ningun post y si tampoco no hay nada cargando devuelve 'No memories'
  if (!posts.length && !isLoading) return "No Memories";

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {posts?.map((post) => (
        <div key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
