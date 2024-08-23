import React, { useState } from "react";
import axios from "axios";

export default function EditBuildingWindow({
  building,
  refreshBuildings,
  onClose,
}) {
  console.log(building);
  const [formData, setFormData] = useState({
    id: building.id,
    name: building.name,
    country: building.country,
    location: building.location,
    type: building.type,
    yearConstructed: building.yearConstructed,
    floor: building.floor,
    area: building.area,
  });

  const euCountries = [
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "United Kingdom (UK)",
  ];
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
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
      const response = await axios.put(
        `http://localhost:8080/beeapp/api/buildings/update`,
        formDataWithEmail,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update local state with the new building data
      console.log(response.data);
    } catch (error) {
      console.error("Error editing building:", error);
    }
    refreshBuildings();
    onClose(); // Hide the add form after successful submission
  };

  return (
    <div>
      <h3>Edit Building form:</h3>
      <form className="add-building-form" onSubmit={handleSubmit}>
        <div>
          <input
            readOnly
            type="text"
            name="name"
            className="form-input"
            placeholder="Name "
            value={formData.name}
            required
            onChange={handleInputChange}
          />
          <input
            readOnly
            type="text"
            name="country"
            className="form-input"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
          />
          <select
            name="type"
            className="form-input"
            required
            onChange={handleInputChange}
            defaultValue={formData.country}
          >
            <option value="Residential">Residential</option>
            <option value="Historic">Historic</option>
            <option value="Public">Public</option>
          </select>
          {/* <input
            type="text"
            name="type"
            className="form-input"
            placeholder="Type"
            value={formData.type}
            onChange={handleInputChange}
          /> */}
          <input
            type="text"
            name="location"
            className="form-input"
            placeholder="Address"
            value={formData.location}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="yearConstructed"
            className="form-input"
            placeholder="Year Constructed"
            value={formData.yearConstructed}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="floor"
            className="form-input"
            placeholder="Floor"
            value={formData.floor}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="area"
            className="form-input"
            placeholder="Land Area (m2)"
            value={formData.area}
            required
            onChange={handleInputChange}
          />
          <div className="image-input-container">
            <label htmlFor="image">Building Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submit-div">
          <button className="submit-button2" type="submit">
            Update Building
          </button>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
}
