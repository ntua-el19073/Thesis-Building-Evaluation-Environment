import React, { useEffect } from "react";
import "./../App.css";
import "./../styles.css"; // Import your CSS file for styling
import LoginContainer from "./components/LoginContainer";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = () => {
      return !!localStorage.getItem("token");
    };

    if (isAuthenticated()) {
      navigate("/main-menu");
    }
  }, [navigate]);

  console.log("login page");
  return (
    <div className="login-page">
      {/* Background image */}
      <div className="login-background">
        <div className="welcome-box">
          <p className="welcome-text">Welcome back!</p>
          <p className="welcome-text">Please sign in to continue.</p>
        </div>
        {/* Login form */}
        <LoginContainer />
      </div>
    </div>
  );
}
