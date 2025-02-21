import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export const EditModal = ({
  open,
  handleClose,
  vehicle,
  onSubmit,
  formData,
  setFormData,
}) => {
  useEffect(() => {
    if (vehicle) {
      const data = {
        model: vehicle.model,
        purchase_price: vehicle.purchase_price !== null ? vehicle.purchase_price : "",
        rental_price: vehicle.rental_price || "",
        is_sold: vehicle.is_sold,
      };
/* 
      // On ajoute is_sold uniquement si purchase_price n'est pas null
      if (vehicle.purchase_price !== null) {
        data.is_sold = vehicle.is_sold || false;
      } */
      setFormData(data);
    }
  }, [vehicle, setFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedVehicle = {
      ...vehicle,
      model: formData.model,
      purchase_price: formData.purchase_price || null,
      rental_price: formData.rental_price || null,
      is_sold: formData.is_sold || false,
    };
  
    console.log("Véhicule mis à jour :", updatedVehicle);
    onSubmit(updatedVehicle);
    handleClose(); // Ferme la modal après la soumission
  };
  
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          margin: "100px auto",
          padding: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Modifier le véhicule
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Modèle"
              name="model"
              value={formData.model}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Prix d'achat"
              name="purchase_price"
              type="number"
              value={formData.purchase_price}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Prix de location"
              name="rental_price"
              type="number"
              value={formData.rental_price}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {/* Afficher le champ "Vendu" uniquement si le prix d'achat n'est pas vide */}
          {formData.purchase_price !== "" && (
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_sold || false}
                    name="is_sold"
                    onChange={handleChange}
                  />
                }
                label="Vendu"
              />
            </Box>
          )}

          <Button type="submit" variant="contained" color="primary">
            Sauvegarder
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
