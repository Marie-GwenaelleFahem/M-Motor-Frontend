import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Cars } from "./pages/Cars";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
