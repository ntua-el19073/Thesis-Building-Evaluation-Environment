import React, { useState } from "react";
import axios from "axios";

export default function AddBuldingWindow({ onClose, addBuilding }) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    location: "",
    type: "",
    yearConstructed: 0,
    floor: 0,
    area: 0,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("email");
    const formDataWithEmail = {
      ...formData,
      ownerEmail: userEmail,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/beeapp/api/buildings/add",
        
        formDataWithEmail
      );
      // Update local state with the new building data
      addBuilding(response.data.building);
      console.log(response.data.message);
      onClose(); // Hide the add form after successful submission
    } catch (error) {
      console.error("Error adding new building:", error);
    }
  };

  return (
    <div>
      <form className="add-building-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          required
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="yearConstructed"
          placeholder="Year Constructed"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="floor"
          placeholder="Floor"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="area"
          placeholder="Area *"
          required
          onChange={handleInputChange}
        />
        <button type="submit">Add Building</button>
      </form>
    </div>
  );
}
