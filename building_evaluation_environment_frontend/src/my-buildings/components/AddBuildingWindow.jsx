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
              className="form-input"
              placeholder="Name *"
              required
              onChange={handleInputChange}
            />
            <select
              name="country"
              required
              className="form-input"
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select Country
              </option>
              {euCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              name="type"
              className="form-input"
              required
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Residential">Residential</option>
              <option value="Historic">Historic</option>
              <option value="Public">Public</option>
            </select>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="Address"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="yearConstructed"
              className="form-input"
              placeholder="Year Constructed"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="floor"
              className="form-input"
              placeholder="Floor"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="area"
              className="form-input"
              placeholder="Land Area (m2)"
              required
              onChange={handleInputChange}
            />
            <div className="image-input-container">
              <label htmlFor="image">Building Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                id="image"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="submit-div">
            <button type="submit">Add Building</button>
          </div>
        </form>
      </div>
    );
  }
