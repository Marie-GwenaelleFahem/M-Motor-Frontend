import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Connexion</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Entrez votre email" />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" placeholder="Entrez votre mot de passe" />
          </div>
          <button className="btn btn-login">Se connecter</button>
        </form>
        <p>Pas encore inscrit ? <Link to="/register">Créer un compte</Link></p>
      </div>
    </div>
  );
};

export default Login;
