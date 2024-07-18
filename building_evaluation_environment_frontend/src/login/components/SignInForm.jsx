import "../../App.css";
import "../LoginPage.css";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post(
        "http://localhost:8080/beeapp/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      // Handle successful login response
      console.log("API call successful:", response.data);

      const decodedToken = jwtDecode(response.data.token);
      console.log(decodedToken);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("username", decodedToken.username);

      navigate("/main-menu");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Display specific error message from the server
      } else {
        console.error("API call failed:", error);
        alert("An error occurred during sign-in. Please try again later.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && email && password) {
      handleSignIn();
    }
  };

  return (
    <form>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button className="signin-button" type="button" onClick={handleSignIn}>
        Sign in
      </button>
    </form>
  );
}
