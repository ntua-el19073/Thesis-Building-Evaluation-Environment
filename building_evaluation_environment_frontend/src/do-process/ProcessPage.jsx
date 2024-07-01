import React, { useState, useEffect } from "react";
import axios from "axios";
import ProcessForm from "./components/ProcessForm";

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

  return (
    <div>
      <h2>Start an evaluation</h2>
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
      <ProcessForm buildingId={activeBuilding ? activeBuilding.id : null} />
    </div>
  );
};

export default ProcessPage;
