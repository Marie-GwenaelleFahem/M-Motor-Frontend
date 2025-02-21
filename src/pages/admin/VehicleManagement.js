import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Button,
  ButtonGroup,
  Alert,
} from "@mui/material";
import api from "../api";
import {Header} from "../../components/Header";
import { Footer } from "../../components/Footer";
import {EditModal} from "../../components/EditModal"

export const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    model: '',
    purchase_price: '',
    rental_price: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === "purchase") return vehicle.purchase_price !== null;
    if (filter === "rental") return vehicle.rental_price !== null;
    return true;
  });
  

  // Récupérer tous les véhicules
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/vehicles");
        setVehicles(response.data);
      } catch (error) {
        setNotification("Erreur lors du chargement des véhicules");
      }
    };
    fetchVehicles();
  }, []);


  // Créer un véhicule
  const createVehicle = async (newVehicle) => {
    try {
      const response = await api.post("/vehicles", newVehicle);
      setVehicles((prevVehicles) => [...prevVehicles, response.data]);
      setFormData({ model: '', purchase_price: '', rental_price: '' }); // Reset form
    } catch (error) {
      setNotification("Erreur lors de la création du véhicule");
    }
  };

  // Mettre à jour un véhicule
  const updateVehicle = async (vehicle) => {
    try {
      await api.put(`/vehicles/${vehicle.id}`, vehicle);
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => (v.id === vehicle.id ? vehicle : v))
      );
      setIsEditing(false); // Fermer le formulaire après mise à jour
    } catch (error) {
      setNotification("Erreur lors de la mise à jour du véhicule");
    }
  };

  // supprimer un véhicule
  const deleteVehicle = async (vehicleId) => {
    try {
      await api.delete(`/vehicles/${vehicleId}`);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
      );
      setNotification("Véhicule supprimé avec succès");
    } catch (error) {
      setNotification("Erreur lors de la suppression du véhicule");
    }
  };

  // Gérer les changements dans le formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Afficher le formulaire de mise à jour
  const startEdit = (vehicle) => {
    setIsEditing(true);
    setEditingVehicle(vehicle);
    setFormData({
      model: vehicle.model,
      purchase_price: vehicle.purchase_price || '',
      rental_price: vehicle.rental_price || '',
      is_sold: vehicle.is_sold,
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      model: formData.model,
      purchase_price: formData.purchase_price === '' ? null : formData.purchase_price,
      rental_price: formData.rental_price === '' ? null : formData.rental_price,
      is_sold: false,
    };
    createVehicle(newVehicle);
  };

  const handleFormSubmit = (e) => {

    const updatedVehicle = {
      ...editingVehicle,
      model: formData.model,
      purchase_price: formData.purchase_price,
      rental_price: formData.rental_price,
      is_sold: false,
    };
    updateVehicle(updatedVehicle);
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

        {/* Filtre */}
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

        {/* Formulaire pour créer un véhicule */}
        <form onSubmit={handleCreateSubmit} style={{ width: "100%", maxWidth: 500 }}>
          <h3>Créer une annonce</h3>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Modèle</Typography>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleFormChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Prix d'achat</Typography>
            <input
              type="number"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleFormChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Prix de location</Typography>
            <input
              type="number"
              name="rental_price"
              value={formData.rental_price}
              onChange={handleFormChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Créer
          </Button>
        </form>

        {/* Liste des véhicules */}
        <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: "center",
    mt: 5,
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
            Location: {vehicle.rental_price}€/jour
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => startEdit(vehicle)}
          sx={{ mt: 2 }}
        >
          Modifier
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteVehicle(vehicle.id)}
          sx={{ mt: 2, ml: 2 }}
        >
          Supprimer
        </Button>
      </CardContent>
    </Card>
  ))}
</Box>

      </Container>

      <EditModal
        open={isEditing}
        handleClose={() => setIsEditing(false)}
        vehicle={editingVehicle}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
      />
      <Footer />
    </Box>
  );
};

export default VehicleManagement;
