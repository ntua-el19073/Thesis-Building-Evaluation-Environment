import "../../App.css";
import React, { useState } from "react";
import axios from "axios";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      const decodedToken = jwtDecode(apiResponse.data.token);
      console.log(decodedToken);

      localStorage.setItem("token", apiResponse.data.token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("username", decodedToken.username);

      navigate("/main-menu");
    } catch (error) {
      // Handle login error
      console.error("API call failed:", error);
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
