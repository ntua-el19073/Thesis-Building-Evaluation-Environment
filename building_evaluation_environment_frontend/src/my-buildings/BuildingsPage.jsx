import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BuildingsPage.css";
import AddBuildingButton from "./components/AddBuildingButton";
import RemoveBuldingButton from "./components/RemoveBuildingButton";

const BuildingsPage = () => {
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

  const addBuilding = (newBuilding) => {
    setBuildingsData([...buildingsData, newBuilding]);
  };

  const removeBuilding = (id) => {
    setBuildingsData(buildingsData.filter(building => building.id !== id));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="buildings-page">
      {/* Building tabs */}
      <div className="building-tabs">
        {buildingsData.map((building) => (
          <div
            key={building.id}
            className={`tab ${building === activeBuilding ? "active" : ""}`}
            onClick={() => setActiveBuilding(building)}
          >
            {building.name}
          </div>
        ))}
      </div>

      {/* Data section */}
      {activeBuilding && (
        <div className="data-section">
          <div className="left-column">
            <div>Name: {activeBuilding.name}</div>
            <div>Country: {activeBuilding.country}</div>
            <div>Location: {activeBuilding.location}</div>
            <div>Type: {activeBuilding.type}</div>
            <div>Year Constructed: {activeBuilding.yearConstructed}</div>
            <div>Floor: {activeBuilding.floor}</div>
            <div>Area: {activeBuilding.area}</div>
          </div>
        </div>
      )}
      <RemoveBuldingButton removeBuilding={removeBuilding} id={activeBuilding ? activeBuilding.id : null}></RemoveBuldingButton>
      <AddBuildingButton addBuilding={addBuilding}></AddBuildingButton>
    </div>
  );
};

export default BuildingsPage;
