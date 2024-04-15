import "../../App.css";
import React, { useState } from "react";
import SignUpWindow from "./SignUpWindow"; // Import the SignUpForm component

export default function SignUpButton() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      <button className="signup-button" onClick={toggleSignUp}>
        Sign up
      </button>
      {showSignUp && <SignUpWindow onClose={toggleSignUp} />}
    </div>
  );
}
