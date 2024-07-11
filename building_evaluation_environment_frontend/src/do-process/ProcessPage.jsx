import React, { useState, useEffect } from "react";
import axios from "axios";
import ProcessForm from "./components/ProcessForm";
import "./components/ProcessForm.css";

const ProcessPage = () => {
  const [buildingsData, setBuildingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBuilding, setActiveBuilding] = useState(null);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/beeapp/api/buildings/get",
          {
            params: {
              email: userEmail,
            },
          }
        );
        setBuildingsData(response.data);
        setActiveBuilding(response.data[0]);
      } catch (error) {
        console.error("Error fetching buildings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildingsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleBuildingChange = (e) => {
    const selectedBuildingId = Number(e.target.value); // Convert to number if IDs are numbers
    const selectedBuilding = buildingsData.find(
      (building) => building.id === selectedBuildingId
    );
    setActiveBuilding(selectedBuilding);
  };

  return (
    <div className="process-page">
      <h2>Start an evaluation</h2>
      <br />
      <div>
        <label htmlFor="building">Select a building: </label>
        <select
          id="building"
          value={activeBuilding?.id || ""}
          onChange={handleBuildingChange}
        >
          <option value="">Select a building</option>
          {buildingsData
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
        </select>
      </div>
      <ProcessForm buildingId={activeBuilding ? activeBuilding.id : null} />
    </div>
  );
};

export default ProcessPage;
