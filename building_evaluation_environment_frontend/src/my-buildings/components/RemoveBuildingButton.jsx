import "../BuildingsPage.css";
import React, { useState } from "react";
import axios from "axios";

export default function SignUpButton({ removeBuilding, id }) {
  const deleteBuilding = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this building? All its evaluations will be deleted as well. This change is irreversible."
    );
    if (confirmDeletion) {
      try {
        console.log(id);
        const response = await axios.delete(
          "http://localhost:8080/beeapp/api/buildings/delete",
          {
            params: {
              id: id,
            },
          }
        );
        console.log(response.data);
        removeBuilding(id);
      } catch (error) {
        console.log("Error deleting building:", error);
      }
    } else {
      // Do nothing if the user cancels the deletion
      console.log("Deletion cancelled by user.");
    }
  };
  return (
    <div>
      <button className="add-building-button" onClick={deleteBuilding}>
        Remove This Building
      </button>
    </div>
  );
}
