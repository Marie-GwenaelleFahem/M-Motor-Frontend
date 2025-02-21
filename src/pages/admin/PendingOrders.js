import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Card, CardContent, Alert } from "@mui/material";
import api from "../api";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/pending");
        // On suppose que la réponse renvoie { data: orders }
        setOrders(response.data.data);
      } catch (error) {
        setNotification("Erreur lors du chargement des commandes en attente");
      }
    };
    fetchOrders();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    
      <Container sx={{ flex: 1, mt: 10, mb: 10 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Commandes en attente
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
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order.id} sx={{ width: 300 }}>
                <CardContent>
                  <Typography variant="h6">Commande #{order.id}</Typography>
                  <Typography variant="body1">
                    Type : {order.order_type}
                  </Typography>
                  <Typography variant="body2">
                    Statut : {order.status}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">
              Aucune commande en attente.
            </Typography>
          )}
        </Box>
      </Container>

    </Box>
  );
};

export default PendingOrders;
