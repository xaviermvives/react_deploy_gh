import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/posts";
import { format } from "date-fns";

//Context:
import DataContext from "../context/DataContext";

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts.length + 1 : 1;
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const newPost = {
      id,
      datetime,
      title: postTitle,
      body: postBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="post-group">
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="post-group">
          <label htmlFor="postBody">Post:</label>
          <textarea
            id="postBody"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
