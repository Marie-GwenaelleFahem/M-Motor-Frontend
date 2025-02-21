import React from "react";
import { Container, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <Container 
      sx={{
        mt: 8, 
        mb: 8, 
        width: "fit-content", 
        mx: "auto", 
        backgroundColor: "#f5f5f5", // Ajout d'une couleur de fond
        padding: 4, // Espacement intérieur
        borderRadius: 2, // Arrondi des coins
        boxShadow: 3 // Ombre portée pour plus de visibilité
      }}
    >
      <h2>Page Admin</h2>
      <p>Gestion des véhicules, commandes et revenus.</p>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "fit-content" }}
          component={Link}
          to="/admin/vehicles"
        >
          Gestion des Véhicules 
          
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "fit-content" }}
          component={Link}
          to="/admin/orders"
        >
          Demandes en cours
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "fit-content" }}
          component={Link}
          to="/admin/revenue"
        >
          Revenus des véhicules
        </Button>
      </Box>
    </Container>
  );
}

export default AdminPage;
