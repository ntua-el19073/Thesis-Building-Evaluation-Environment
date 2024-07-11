import "../BuildingsPage.css";
import React, { useState } from "react";
import AddBuildingWindow from "./AddBuildingWindow"; // Import the SignUpForm component

export default function SignUpButton({ addBuilding }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      <button className="add-building-button" onClick={toggleSignUp}>
        New Building
      </button>
      {showSignUp && (
        <AddBuildingWindow addBuilding={addBuilding} onClose={toggleSignUp} />
      )}
    </div>
  );
}
