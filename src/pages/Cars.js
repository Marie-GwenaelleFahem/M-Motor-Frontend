import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Alert,
  Button,
  ButtonGroup,
} from "@mui/material";
import api from "./api";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OrderModal } from "../components/OrderModal";

export const Cars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    api
      .get("/vehicles")
      .then((response) => setVehicles(response.data))
      .catch(() => setNotification("Erreur lors du chargement des véhicules"));
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === "purchase") return vehicle.purchase_price !== null;
    if (filter === "rental") return vehicle.rental_price !== null;
    return true;
  });

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
          mb: 10,
        }}
      >
        {notification && <Alert severity="error">{notification}</Alert>}

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ButtonGroup>
            <Button
              variant={filter === "all" ? "contained" : "outlined"}
              onClick={() => setFilter("all")}
            >
              Tous
            </Button>
            <Button
              variant={filter === "purchase" ? "contained" : "outlined"}
              onClick={() => setFilter("purchase")}
            >
              Achat uniquement
            </Button>
            <Button
              variant={filter === "rental" ? "contained" : "outlined"}
              onClick={() => setFilter("rental")}
            >
              Location uniquement
            </Button>
          </ButtonGroup>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">{vehicle.model}</Typography>
                {vehicle.purchase_price !== null && (
                  <Typography variant="body1">
                    Achat: {vehicle.purchase_price}€
                  </Typography>
                )}
                {vehicle.rental_price !== null && (
                  <Typography variant="body1">
                    Location: {vehicle.rental_price}€
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openModal(vehicle)}
                >
                  Créer Dossier
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {selectedVehicle && (
        <OrderModal
          vehicle={selectedVehicle}
          open={modalOpen}
          handleClose={handleCloseModal}
        />
      )}

      <Footer />
    </Box>
  );
};
