import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [username , setUsername] = useState();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };
 return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" onClick={() => navigate("/")}>
            M-Motor 
          </Typography>
          <div>
            {username ? (
              <>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  {username}
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                   Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                   Connexion
                </Button>
                <Button color="inherit" onClick={() => navigate("/admin")}>
                  ⚙ Admin
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};