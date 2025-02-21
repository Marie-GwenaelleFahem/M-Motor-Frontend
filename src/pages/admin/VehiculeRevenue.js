import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Card, CardContent, Alert } from "@mui/material";
import api from "../api";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const VehicleRevenue = () => {
  const [revenues, setRevenues] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchRevenues = async () => {
      try {
        const response = await api.get("/vehicles/revenue");
        // On suppose que la réponse renvoie { data: [ {id, model, total_revenue}, ... ] }
        setRevenues(response.data.data);
      } catch (error) {
        setNotification("Erreur lors du chargement des revenus");
      }
    };
    fetchRevenues();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container sx={{ flex: 1, mt: 10, mb: 10 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Revenus des véhicules
        </Typography>
        {notification && <Alert severity="error">{notification}</Alert>}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {revenues.length > 0 ? (
            revenues.map((vehicle) => (
              <Card key={vehicle.id} sx={{ width: 300 }}>
                <CardContent>
                  <Typography variant="h6">{vehicle.model}</Typography>
                  <Typography variant="body1">
                    Revenus totaux : {vehicle.total_revenue}€
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">
              Aucun revenu enregistré.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default VehicleRevenue;
