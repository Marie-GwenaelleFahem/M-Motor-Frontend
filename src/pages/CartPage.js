import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Achat finalisé ! Merci pour votre confiance.");
    clearCart();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Votre Panier</h2>
      {cart.length === 0 ? (
        <p style={styles.emptyCart}>Votre panier est vide.</p>
      ) : (
        <div style={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.details}>
                <h3>{item.name}</h3>
                <p>{item.price}€</p>
                <div style={styles.quantityControls}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.btn}>➖</button>
                  <input type="number" value={item.quantity} readOnly style={styles.quantityInput} />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.btn}>➕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <button onClick={handleCheckout} style={styles.checkoutBtn}>✅ Finaliser l'achat</button>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  emptyCart: { fontSize: "18px", color: "#888" },
  cartList: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", padding: "20px" },
  cartItem: { display: "flex", alignItems: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "5px", backgroundColor: "#fff" },
  image: { width: "80px", height: "80px", borderRadius: "5px", objectFit: "cover", marginRight: "10px" },
  details: { textAlign: "left", flexGrow: 1 },
  quantityControls: { display: "flex", alignItems: "center", marginTop: "10px" },
  quantityInput: { width: "40px", textAlign: "center", fontSize: "16px", fontWeight: "bold", border: "1px solid #ddd", borderRadius: "5px", margin: "0 10px" },
  btn: { cursor: "pointer", padding: "5px 10px", fontSize: "16px", border: "none", backgroundColor: "#87CEFA", color: "white", borderRadius: "5px" },
  checkoutBtn: { marginTop: "20px", padding: "10px 20px", fontSize: "18px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default CartPage;
