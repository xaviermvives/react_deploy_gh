import React from "react";
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

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/post">
          <NewPost />
        </Route>
        <Route exact path="/edit">
          <EditPost />
        </Route>
        <Route path="/post/:id">
          <PostPage />
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
