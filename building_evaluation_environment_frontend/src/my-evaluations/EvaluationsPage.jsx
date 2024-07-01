import React, { useState, useEffect } from "react";
import axios from "axios";

const EvaluationsPage = () => {
  // State variables
  const [evaluations, setEvaluations] = useState([]);
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
        setActiveBuilding(response.data[0]); // Set the first building as active
      } catch (error) {
        console.error("Error fetching buildings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildingsData();
  }, [userEmail]);

  // Fetch evaluations data when the selected building changes
  useEffect(() => {
    // Fetch evaluations data for the selected building from the server
    const fetchEvaluations = async () => {
      if (activeBuilding) {
        const buildingId = activeBuilding.id;
        try {
          const response = await axios.get(
            `http://localhost:8080/beeapp/api/evaluations/${buildingId}`
          );
          setEvaluations(response.data);
        } catch (error) {
          console.error("Error fetching evaluations:", error);
        }
      }
    };

    // Call the fetchEvaluations function
    fetchEvaluations();
  }, [activeBuilding]);

  // Handle building selection change
  const handleBuildingChange = (e) => {
    const selectedBuildingId = Number(e.target.value); // Convert to number if IDs are numbers
    const selectedBuilding = buildingsData.find(
      (building) => building.id === selectedBuildingId
    );
    setActiveBuilding(selectedBuilding);
  };

  return (
    <div>
      <h2>Evaluations</h2>
      <div>
        <label htmlFor="building">Select a building:</label>
        <select
          id="building"
          value={activeBuilding?.id || ""}
          onChange={handleBuildingChange}
        >
          <option value="">Select a building</option>
          {buildingsData.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display evaluations for the selected building */}
      {evaluations.length > 0 && (
        <div>
          <h3>Evaluations for {activeBuilding?.name}</h3>
          <ul>
            {evaluations.map((evaluation) => (
              <li key={evaluation.id}>
                {/* Display evaluation details */}
                <div>
                  Energy Consumption Score: {evaluation.energyConsumptionScore}
                </div>
                <div>
                  Indoor Air Quality Score: {evaluation.indoorAirQualityScore}
                </div>
                <div>
                  Water Consumption Score: {evaluation.waterConsumptionScore}
                </div>
                <div>Inclusivity Score: {evaluation.inclusivityScore}</div>
                <div>Total Score: {evaluation.totalScore}</div>
                <div>Year of Evaluation: {evaluation.yearOfEvaluation}</div>
                <div>Email of Owner: {evaluation.emailOfOwner}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EvaluationsPage;
