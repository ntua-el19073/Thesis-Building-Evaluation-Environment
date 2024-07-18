import "../BuildingsPage.css";
import React, { useState } from "react";
import AddBuildingWindow from "./AddBuildingWindow"; // Import the SignUpForm component

export default function SignUpButton({ buildingsData, refreshBuildings }) {
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
        <AddBuildingWindow
          buildingsData={buildingsData}
          refreshBuildings={refreshBuildings}
          onClose={toggleSignUp}
        />
      )}
    </div>
  );
}
