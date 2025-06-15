// src/components/GitHubLoginButton.jsx
import React from "react";

const GithubLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/quotifyAuthAPI/github";
  };

  return <button onClick={handleLogin}>Login with GitHub</button>;
};

export default GithubLoginButton;
