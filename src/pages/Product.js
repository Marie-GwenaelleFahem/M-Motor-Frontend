import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Voiture Sport", price: 50000, image: "/images/sport.jpg" },
  { id: 2, name: "SUV Confort", price: 35000, image: "/images/suv.jpg" },
  { id: 3, name: "Moto Rapide", price: 15000, image: "/images/moto.jpg" },
  { id: 4, name: "Camion Utilitaire", price: 40000, image: "/images/camion.jpg" },
  { id: 5, name: "Voiture Électrique", price: 45000, image: "/images/electrique.jpg" },
  { id: 6, name: "Cabriolet Luxe", price: 60000, image: "/images/cabriolet.jpg" },
  { id: 7, name: "Voiture Classique", price: 30000, image: "/images/classique.jpg" },
  { id: 8, name: "4x4 Off-Road", price: 55000, image: "/images/4x4.jpg" },
  { id: 9, name: "Scooter Urbain", price: 5000, image: "/images/scooter.jpg" },
  { id: 10, name: "Van Familial", price: 32000, image: "/images/van.jpg" },
];

const Product = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} ajouté au panier !`);
    setTimeout(() => setNotification(null), 2000); // Disparaît après 2 secondes
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2>M-Motor 🚗</h2>
        <div>
          <button onClick={() => navigate("/home")}>👩‍💼 Client</button>
          <button onClick={() => navigate("/admin")}>⚙ Admin</button>
          <button onClick={() => navigate("/cart")}>🛒 Panier</button>
        </div>
      </nav>

      {/* Notification */}
      {notification && <div style={styles.notification}>{notification}</div>}

      {/* Section de bienvenue */}
      <header style={styles.header}>
        <h1>Bienvenue sur M-Motor</h1>
        <p>Découvrez nos meilleures offres sur les véhicules.</p>
      </header>

      {/* Liste des produits */}
      <div style={styles.products}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p>{product.price}€</p>
            <button onClick={() => handleAddToCart(product)} style={styles.addToCartBtn}>
              🛍 Ajouter au panier
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 M-Motor. Tous droits réservés.</p>
        <p>📍 Adresse : 123 Rue des Voitures, Paris, France</p>
        <p>📞 Téléphone : +33 1 23 45 67 89</p>
        <p>📧 Email : contact@m-motor.com</p>
      </footer>
    </div>
  );
};

// Styles CSS en JS
const styles = {
  container: { textAlign: "center", paddingBottom: "50px", position: "relative" },
  navbar: { display: "flex", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#222", color: "#fff" },
  header: { padding: "20px", backgroundColor: "#f4f4f4", marginBottom: "20px" },
  products: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", padding: "20px" },
  productCard: { border: "1px solid #ddd", padding: "10px", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" },
  image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" },
  addToCartBtn: { backgroundColor: "#28a745", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", marginTop: "10px" },
  footer: { backgroundColor: "#222", color: "#fff", padding: "10px", width: "100%", marginTop: "auto" },
  notification: { position: "fixed", top: "10px", right: "10px", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "5px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }
};

export default Product;
