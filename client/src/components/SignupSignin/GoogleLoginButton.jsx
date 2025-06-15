// src/components/GoogleLoginBtn.jsx
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const base_URL = "https://quotifyapi.onrender.com";

  const handleSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;

    // Send token to your backend
    try {
      const res = await fetch(base_URL + "/quotifyAuthAPI/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem(
          "auth-token",
          JSON.stringify({ user: data.user.name, token: data.authToken })
        );
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginButton;
