// src/components/GitHubLoginButton.jsx
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";

const GithubLoginButton = ({ base_URL }) => {
  const handleLogin = () => {
    window.location.href = base_URL + "/quotifyAuthAPI/github";
  };

  return (
    <Button
      variant="contained"
      startIcon={<GitHubIcon />}
      onClick={handleLogin}
      sx={{
        backgroundColor: "#24292f",
        "&:hover": {
          backgroundColor: "#1b1f23",
        },
        textTransform: "none",
        fontSize: "16px",
        padding: "8px 20px",
      }}
    >
      Login with GitHub
    </Button>
  );
};

export default GithubLoginButton;
