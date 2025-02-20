import React, { useState } from "react";
import api from "./api";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await api.post("/addusers/", formData);
      setMessage("Inscription réussie ! Connectez-vous maintenant.");
    } catch (error) {
      setMessage("Erreur lors de l'inscription.");
      console.error("Erreur:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Inscription
          </Typography>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mot de passe"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
            sx={{ mt: 2 }}
          >
            S'inscrire
          </Button>
          {message && (
            <Alert
              severity={message.includes("réussie") ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              {message}
            </Alert>
          )}
        </Box>
      </Container>
      <Footer sx={{ marginTop: "auto" }} />
    </Box>
  );
};
