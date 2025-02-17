import React, { useState } from "react";
import api from "./api";
import "../App.css"; 

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await api.post("/addusers/", formData);
      setMessage("Inscription réussie ! Connectez-vous maintenant.");
    } catch (error) {
      setMessage("Erreur lors de l'inscription.");
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Inscription</h2>
        <div className="input-group">
          <label>Nom d'utilisateur</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button className="btn btn-register" onClick={handleRegister}>S'inscrire</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
