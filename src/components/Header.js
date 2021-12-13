import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <h1>My Blog</h1>
        <nav>
          <ul style={{ display: "flex", listStyle: "none" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/post">Post</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
