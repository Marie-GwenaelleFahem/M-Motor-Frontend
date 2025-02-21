import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../pages/api";

export const OrderModal = ({ vehicle, open, handleClose }) => {
  const [orderType, setOrderType] = useState(
    vehicle.rental_price ? "rental" : "purchase"
  );
  const [startDate, setStartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [abonnement, setAbonnement] = useState(true);
  const [options, setOptions] = useState({
    insurance: false,
    accessories: false,
    gps: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formatDate = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      return date.toISOString().slice(0, 10);
    };

    const formattedStartDate = formatDate(startDate);
    const formattedReturnDate = formatDate(returnDate);
    console.log(formattedStartDate);
    const orderData = {
      user_id: 1,
      vehicle_id: vehicle.id,
      order_type: orderType,
      status: "pending",
      subscription: orderType === "rental" ? abonnement : null,
      options: orderType === "rental" && !abonnement ? options : null,
      start_date: orderType === "rental" ? formattedStartDate : null,
      return_date: orderType === "rental" ? formattedReturnDate : null,
    };

    try {
      if (orderType === "purchase") {
        console.log(orderType);
        const response = await api.post("/purchase/", orderData);
        console.log(response.data);
      } else {
        console.log(orderData);
        const response = await api.post("/rental/", orderData);
        console.log(response.data);
      }
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande", error);
    }
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
        <Typography variant="h6">
          Créer un Dossier de {orderType === "purchase" ? "Achat" : "Location"}
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type de commande</InputLabel>
          <Select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            label="Type de commande"
            disabled={!vehicle.purchase_price || !vehicle.rental_price}
          >
            {vehicle.purchase_price && (
              <MenuItem value="purchase">Achat</MenuItem>
            )}
            {vehicle.rental_price && (
              <MenuItem value="rental">Location</MenuItem>
            )}
          </Select>
        </FormControl>

        {orderType === "rental" && vehicle.rental_price && (
          <>
            <TextField
              fullWidth
              label="Date de début"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Date de retour"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={abonnement}
                    onChange={(e) => setAbonnement(e.target.checked)}
                  />
                }
                label="Abonnement"
              />
            </FormGroup>

            {!abonnement && (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.insurance}
                      onChange={(e) =>
                        setOptions({ ...options, insurance: e.target.checked })
                      }
                    />
                  }
                  label="Assurance"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.accessories}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          accessories: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Accessoires"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.gps}
                      onChange={(e) =>
                        setOptions({ ...options, gps: e.target.checked })
                      }
                    />
                  }
                  label="GPS"
                />
              </FormGroup>
            )}
          </>
        )}

        {orderType === "purchase" && vehicle.purchase_price && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Prix de l'achat : {vehicle.purchase_price}€
          </Typography>
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {orderType === "purchase" ? "Acheter" : "Valider Location"}
        </Button>
      </Box>
    </Modal>
  );
};
