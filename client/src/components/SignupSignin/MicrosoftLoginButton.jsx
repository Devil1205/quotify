// src/components/GitHubLoginButton.jsx
import React from "react";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import Button from "@mui/material/Button";

const MicrosoftLoginButton = ({ base_URL }) => {
  const handleLogin = () => {
    window.location.href = base_URL + "/quotifyAuthAPI/microsoft";
  };

  return (
    <Button
      variant="contained"
      startIcon={
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
          alt="Microsoft"
          style={{ width: 24, height: 24 }}
        />
      }
      onClick={handleLogin}
      sx={{
        backgroundColor: "#ffffff", // Microsoft buttons typically have a white background
        color: "#000000", // Black text/icon for contrast
        "&:hover": {
          backgroundColor: "#f3f2f1", // Slightly gray hover effect
        },
      }}
    >
      Login with Microsoft
    </Button>
  );
};

export default MicrosoftLoginButton;
