import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);

  return !posts.length ? (
    <h1>No hay memories</h1>
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
