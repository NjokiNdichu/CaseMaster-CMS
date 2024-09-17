import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "./Search"


const Topbar = () => {
  return (
    <div className="topbar">
      <div className="search-container">
      <Search />
      </div>
      <div className="topbar-icons">
        <Link to="/account">
          <FaUser className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
