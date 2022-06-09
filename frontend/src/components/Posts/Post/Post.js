import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others like this post`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return <>&nbsp;Like</>;
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div
      onClick={openPost}
      className="card w-96 bg-base-100 shadow-xl cursor-pointer"
    >
      <figure>
        <img src={post.selectedFile} alt={post.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {post.title}
          <div className="badge badge-secondary">NUEVO</div>
        </h2>
        <p> {post.message} </p>
        <div className="badge badge-outline">{post.name}</div>
        <div className="card-actions justify-end">
          {/* <div className="badge badge-outline">Fashion</div> */}
          {post.tags.map((tag) => `#${tag} `)}
        </div>
      </div>
      <div>
        <button
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </button>
      </div>

      <div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <button onClick={() => setCurrentId(post._id)}>Edit</button>
        )}
      </div>

      <div>
        {/* verifica quien es el usuario logueado, recien muestra el boton si el usuario es el que creo el post */}
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default Post;
