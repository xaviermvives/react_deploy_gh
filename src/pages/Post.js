import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <article>
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p>{post.datetime}</p>
      </Link>
      <p>
        {post.body.length >= 25 ? `${post.body.slice(0, 25)}...` : post.body}
      </p>
    </article>
  );
};

export default Post;
