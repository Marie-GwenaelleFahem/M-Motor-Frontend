import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Cars } from "./pages/Cars";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AdminPage from "./pages/admin/AdminPage";
import VehicleManagement from "./pages/admin/VehicleManagement";
import PendingOrders from "./pages/admin/PendingOrders";
import VehicleRevenue from "./pages/admin/VehiculeRevenue";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  return (
    
      <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Cars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/vehicles" element={<VehicleManagement />} />
         <Route path="/admin/orders" element={<PendingOrders />} />
        <Route path="/admin/revenue" element={<VehicleRevenue />} />
      </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
