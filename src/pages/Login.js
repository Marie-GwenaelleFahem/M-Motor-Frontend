import React, { useState } from "react";
import api from "./api";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/token", formData);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setMessage("Connexion réussie !");
    } catch (error) {
      setMessage("Identifiants incorrects !");
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Connexion</h2>
        <div className="input-group">
          <label>Nom d'utilisateur</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button className="btn btn-login" onClick={handleLogin}>Se connecter</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
