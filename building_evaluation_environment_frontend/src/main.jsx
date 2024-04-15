import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Wrap the entire application with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId="806081166138-vr3sq6cq14kt91shrrgpbp6oqf65snf0.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
