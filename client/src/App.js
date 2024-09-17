import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Lawyers from "./pages/Lawyers";
import Clients from "./pages/Clients";
import Cases from "./pages/Cases";
import NewLawyer from './pages/NewLawyer';
import NewClient from './pages/NewClient';
import NewCase from './pages/NewCase';
import EditCases from "./pages/EditCases";
import EditClients from "./pages/EditClients";
import EditLawyers from "./pages/EditLawyers";
import Representation from "./pages/Representation";
import LawyerCases from "./pages/Lawyer_cases";
import './App.css';  

function App() {
  const location = useLocation();  // Hook to get the current route

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/";

  return (
    <div className="app-container">
      
      {<Sidebar />}
      <div className="main-content">
        {<Navbar />}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/representation" element={<Representation />} />
            <Route path="/lawyer_cases" element={<LawyerCases />} />
            <Route path="/lawyers/new" element={<NewLawyer />} />
            <Route path="/clients/new" element={<NewClient />} />
            <Route path="/cases/new" element={<NewCase />} />
            <Route path="/cases/edit/:id" element={<EditCases />} />
            <Route path="/clients/edit/:id" element={<EditClients />} />
            <Route path="/lawyers/edit/:id" element={<EditLawyers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
