import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserFriends,
  FaBriefcase,
  FaBalanceScale,
  FaHome,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>Case Management</h2>
      <ul>
        <li>
          <Link 
            to="/" 
            className={location.pathname === "/dashboard" ? "active" : ""}>
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/cases"
            className={location.pathname === "/cases" ? "active" : ""}
          >
            <FaBriefcase /> Cases
          </Link>
        </li>
        <li>
          <Link
            to="/clients"
            className={location.pathname === "/clients" ? "active" : ""}
          >
            <FaUserFriends /> Clients
          </Link>
        </li>
        <li>
          <Link
            to="/lawyers"
            className={location.pathname === "/lawyers" ? "active" : ""}
          >
            <FaBalanceScale /> Lawyers
          </Link>
        </li>
        <li>
          <Link
            to="/representation"
            className={location.pathname === "/representation" ? "active" : ""}
          >
            <FaBalanceScale /> Representation
          </Link>
        </li>
        <li>
          <Link
            to="/lawyer_cases"
            className={location.pathname === "/lawyer_cases" ? "active" : ""}
          >
            <FaBalanceScale /> Lawyers per case
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
