import React, { useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import api from "../api/posts";

//Context
import DataContext from "../context/DataContext";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const newPostList = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPostList);
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="PostPage">
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
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
