import React from "react";
import { Link } from "react-router-dom";
function AdminPage() {
  return (
    <div>
      <h2>Page Admin</h2>
      <p>Gestion des véhicules, commandes et revenus.</p>
      <nav>
        <ul>
          <li>
            <Link to="/admin/vehicles">Gestion des Véhicules (CRUD)</Link>
          </li>
          <li>
            <Link to="/admin/orders">Demandes en cours</Link>
          </li>
          <li>
            <Link to="/admin/revenue">Revenus des véhicules</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminPage;
