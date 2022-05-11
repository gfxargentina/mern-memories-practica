import React from "react";

const Post = ({ post }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={post.selectedFile} alt={post.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {post.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p> {post.message} </p>
        <div className="badge badge-outline">{post.creator}</div>
        <div className="card-actions justify-end">
          {/* <div className="badge badge-outline">Fashion</div> */}
          {post.tags.map((tag) => `#${tag} `)}
        </div>
      </div>
      <div>
        <button>Like {post.likeCount} </button>
      </div>
    </div>
  );
};

export default Post;
