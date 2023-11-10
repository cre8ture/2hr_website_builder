import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Layout = ({ children }) => (
  <div>
    <Navbar />
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
