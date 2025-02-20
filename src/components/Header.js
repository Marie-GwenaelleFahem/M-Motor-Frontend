import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" onClick={() => navigate("/")}>
            M-Motor 🚗
          </Typography>
          <div>
            <Button color="inherit" onClick={() => navigate("/login")}>
              👩‍💼 Connexion
            </Button>
            <Button color="inherit" onClick={() => navigate("/admin")}>
              ⚙ Admin
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
