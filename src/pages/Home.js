import React from "react";
import Feed from "./Feed";

const Home = ({ posts }) => {
  return (
    <main>
      <h1>Home</h1>
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ color: "red", marginTop: "2rem" }}>No posts to display</p>
      )}
    </main>
  );
};

export default Home;
