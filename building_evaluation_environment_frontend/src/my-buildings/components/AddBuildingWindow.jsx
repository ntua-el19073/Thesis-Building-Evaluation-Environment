import React, { useState } from "react";
import axios from "axios";

export default function AddBuldingWindow({
  buildingsData,
  refreshBuildings,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    location: "",
    type: "",
    yearConstructed: 0,
    floor: 0,
    area: 0,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const buildingExists = buildingsData.some(
      (building) => building.name === formData.name
    );

    if (buildingExists) {
      alert(
        "Building with this name already exists! Please select another name for your building."
      );
      return;
    }

    const userEmail = localStorage.getItem("email");
    const formDataWithEmail = {
      ...formData,
      ownerEmail: userEmail,
    };
    console.log(formDataWithEmail);
    try {
      const response = await axios.post(
        "http://localhost:8080/beeapp/api/buildings/add",

        formDataWithEmail,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update local state with the new building data
      refreshBuildings();
      console.log(response.data.message);
      onClose(); // Hide the add form after successful submission
    } catch (error) {
      console.error("Error adding new building:", error);
    }
  };

  return (
    <div>
      <h3>Add Building form:</h3>
      <form className="add-building-form" onSubmit={handleSubmit}>
        <div>
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
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-div">
          <button type="submit">Add Building</button>
        </div>
      </form>
    </div>
  );
}
