import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Inscription</h2>
        <form>
          <div className="input-group">
            <label>Nom</label>
            <input type="text" placeholder="Entrez votre nom" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Entrez votre email" />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" placeholder="Entrez votre mot de passe" />
          </div>
          <button className="btn btn-register">S'inscrire</button>
        </form>
        <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
      </div>
    </div>
  );
};

export default Register;
