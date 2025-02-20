import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import api from "./api";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/token", formData);
      localStorage.setItem("token", response.data.access_token);
      setMessage("Connexion réussie !");
    } catch (error) {
      setMessage("Identifiants incorrects !");
      console.error("Erreur:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Container
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
          mb: 10,
        }}
      >
        <Box
          sx={{
            width: 350,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Connexion
          </Typography>

          <TextField
            label="Nom d'utilisateur"
            name="username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Mot de passe"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Se connecter
          </Button>

          {message && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}

          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<FaUserPlus />}
              fullWidth
              sx={{ mt: 2, color: "primary.main" }}
            >
              Inscription
            </Button>
          </Link>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};
