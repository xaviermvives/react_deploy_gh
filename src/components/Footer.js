import React from "react";

const Footer = () => {
  const today = new Date();
  return <footer>&copy; Copyright {today.getFullYear()}</footer>;
};

export default Footer;
