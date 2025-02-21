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
import { EditModal } from "../../components/EditModal";

export const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    model: "",
    purchase_price: "",
    rental_price: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === "all") return true; // Tous les véhicules
    if (filter === "purchase" && vehicle.purchase_price !== null) return true; // Véhicules avec prix d'achat
    if (filter === "rental" && vehicle.rental_price !== null) return true; // Véhicules avec prix de location
    return false; // Ne pas inclure les véhicules qui ne correspondent pas au filtre
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log("Fetching vehicles...");
        const response = await api.get("/vehicles");
        console.log("Vehicles fetched:", response.data);
        setVehicles(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules:", error);
        setNotification("Erreur lors du chargement des véhicules");
      }
    };
    fetchVehicles();
  }, []);

  const createVehicle = async (newVehicle) => {
    try {
      console.log("Données envoyées pour la création :", newVehicle);
      const response = await api.post("/vehicles", newVehicle);
      console.log("Réponse après création :", response.data);
      setVehicles((prevVehicles) => [...prevVehicles, response.data]);
      setFormData({ model: "", purchase_price: "", rental_price: "" });
    } catch (error) {
      console.error("Erreur lors de la création du véhicule :", error);
      setNotification("Erreur lors de la création du véhicule");
    }
  };

  const updateVehicle = async (vehicle) => {
    try {
      console.log("Données envoyées pour la mise à jour :", vehicle);
      const response = await api.put(`/vehicles/${vehicle.id}`, vehicle);
      console.log("Réponse après mise à jour :", response.data);
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => (v.id === vehicle.id ? vehicle : v))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du véhicule :", error);
      setNotification("Erreur lors de la mise à jour du véhicule");
    }
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      console.log("Suppression du véhicule avec ID :", vehicleId);
      await api.delete(`/vehicles/${vehicleId}`);
      console.log("Véhicule supprimé !");
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
      );
      setNotification("Véhicule supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule :", error);
      setNotification("Erreur lors de la suppression du véhicule");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log("FormData mis à jour :", formData);
  };

  const startEdit = (vehicle) => {
    console.log("Véhicule sélectionné pour modification :", vehicle);
    setIsEditing(true);
    setEditingVehicle(vehicle);
    setFormData({
      model: vehicle.model,
      purchase_price: vehicle.purchase_price || "",
      rental_price: vehicle.rental_price || "",
      is_sold: vehicle.is_sold || false,
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      model: formData.model,
      purchase_price: formData.purchase_price === "" ? null : formData.purchase_price,
      rental_price: formData.rental_price === "" ? null : formData.rental_price,
      is_sold: false,
    };
    console.log("Soumission du formulaire de création :", newVehicle);
    createVehicle(newVehicle);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedVehicle = {
      ...editingVehicle,
      model: formData.model,
      purchase_price: formData.purchase_price || "",
      rental_price: formData.rental_price || "",
      is_sold: formData.is_sold || false,
    };
    console.log("Soumission du formulaire de mise à jour :", updatedVehicle);
    updateVehicle(updatedVehicle);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
            <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>
              Tous
            </Button>
            <Button variant={filter === "purchase" ? "contained" : "outlined"} onClick={() => setFilter("purchase")}>
              Achat uniquement
            </Button>
            <Button variant={filter === "rental" ? "contained" : "outlined"} onClick={() => setFilter("rental")}>
              Location uniquement
            </Button>
          </ButtonGroup>
        </Box>

        <form onSubmit={handleCreateSubmit} style={{    display: "flex", padding: 30 , width: 370, borderRadius: 15, flexDirection: "column", alignItems: "center", gap: 2, border: "2px solid #1976d2", color: "#FFF",
    backgroundColor: "#1976d2",  }}>
          <h3>Créer une annonce</h3>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Modèle</Typography>
            <input type="text" name="model" value={formData.model} onChange={handleFormChange} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Prix d'achat</Typography>
            <input type="number" name="purchase_price" value={formData.purchase_price} onChange={handleFormChange} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Prix de location</Typography>
            <input type="number" name="rental_price" value={formData.rental_price} onChange={handleFormChange} />
          </Box>
          <Button type="submit" variant="contained" color="success">
            Créer
          </Button>
        </form>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", mt: 5 }}>
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">{vehicle.model}</Typography>
                {vehicle.purchase_price !== null && <Typography variant="body1">Achat: {vehicle.purchase_price}€</Typography>}
                {vehicle.rental_price !== null && <Typography variant="body1">Location: {vehicle.rental_price}€/jour</Typography>}
                <Button variant="contained" color="primary" onClick={() => startEdit(vehicle)} sx={{ mt: 2 }}>
                  Modifier
                </Button>
                <Button variant="contained" color="error" onClick={() => deleteVehicle(vehicle.id)} sx={{ mt: 2, ml: 2 }}>
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <EditModal open={isEditing} handleClose={() => setIsEditing(false)} vehicle={editingVehicle} onSubmit={updateVehicle} formData={formData} setFormData={setFormData} />
    </Box>
  );
};

export default VehicleManagement;
