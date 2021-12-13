import React from "react";

const NewPost = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) => {
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
