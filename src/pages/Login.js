import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import api from "./api";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const formdata = new FormData();
    formdata.append('username', formData.username);
    formdata.append('password', formData.password);
    try {
      const response = await api.post("/token", formdata,{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username" , formData.username);
      setMessage("Connexion réussie !");
      navigate("/");
    } catch (error) {
      setMessage("Identifiants incorrects !");
      console.error("Erreur:", error);
      navigate("/login")
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

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
