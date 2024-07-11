import "../BuildingsPage.css";
import React, { useState } from "react";
import EditBuildingWindow from "./EditBuildingWindow"; // Import the SignUpForm component

export default function SignUpButton({
  building,
  refreshBuildings,
  showEditForm,
  setShowEditForm,
}) {

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <div>
      <button className="add-building-button" onClick={toggleEditForm}>
        Edit this Building
      </button>
      {showEditForm && (
        <EditBuildingWindow
          building={building}
          refreshBuildings={refreshBuildings}
          onClose={toggleEditForm}
        />
      )}
    </div>
  );
}
