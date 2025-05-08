import React, { useState } from "react";
import axios from "axios";
import "../LoginPage.css";

export default function SignUpWindow({ onClose }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // Check if any input is empty
    if (!email || !username || !password) {
      // At least one input is empty, show an error message or handle it accordingly
      alert("Please fill in all fields.");
      return; // Exit the function early
    }

    try {
      // Make a POST request to your signup API endpoint
      const response = await axios.post(
        "http://localhost:8080/beeapp/api/users/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );
      console.error(response);

      //Handle successful signup response
      alert(response.data);
      // Close the signup modal
      onClose();
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(error.response.data); // Display the error message from the response
      } else {
        // No response from the server or other error
        alert("Signup failed: An unknown error occurred.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && email && password) {
      handleSignUp();
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form>
        <input
          className="field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <input
          className="field"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <input
          className="field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
