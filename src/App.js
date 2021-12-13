import React, { useState, useEffect } from "react";
//Components:
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";

import { Switch, Route, useHistory } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const history = useHistory();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const updatedPost = {
      id,
      datetime,
      title: editTitle,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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
    <div className="App">
      <Header />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home
            posts={searchResults}
            fetchError={fetchError}
            isLoading={isLoading}
          />
        </Route>
        <Route exact path="/post">
          <NewPost
            postTitle={postTitle}
            postBody={postBody}
            setPostTitle={setPostTitle}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
        </Route>
        <Route path="/edit/:id">
          <EditPost
            handleEdit={handleEdit}
            posts={posts}
            editTitle={editTitle}
            editBody={editBody}
            setEditTitle={setEditTitle}
            setEditBody={setEditBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="*">
          <Missing />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
