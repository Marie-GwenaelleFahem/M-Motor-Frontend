import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Bienvenue sur M-Motor</h1>
        <p>Connectez-vous ou inscrivez-vous pour accéder à nos services 🚗</p>
        
        <div className="button-group">
          <Link to="/login" className="btn btn-login">
            <FaSignInAlt className="icon" /> Connexion
          </Link>
          <Link to="/register" className="btn btn-register">
            <FaUserPlus className="icon" /> Inscription
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
