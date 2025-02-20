import React from "react";
import { Box, Typography, Container } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        mt: 4,
        py: 2,
        textAlign: "center",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <Container>
        <Typography variant="body2">
          © 2025 M-Motor. Tous droits réservés.
        </Typography>
        <Typography variant="body2">
          📍 Adresse : 123 Rue des Voitures, Paris, France
        </Typography>
        <Typography variant="body2">
          📞 Téléphone : +33 1 23 45 67 89
        </Typography>
        <Typography variant="body2">📧 Email : contact@m-motor.com</Typography>
      </Container>
    </Box>
  );
};
