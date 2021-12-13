import React from "react";
import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main>
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
          </>
        )}
        {!post && (
          <>
            <h2>Post not Found</h2>
            <p>Well it's disappointing</p>
            <p>
              <Link to="/">Visit our Home page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
