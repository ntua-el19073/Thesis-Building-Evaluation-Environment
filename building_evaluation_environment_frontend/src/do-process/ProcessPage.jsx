import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProcessPage.css";

const ProcessPage = () => {
  const [buildingsData, setBuildingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/beeapp/api/buildings/get",
          {
            params: { email: userEmail },
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

  const handleBuildingChange = (e) => {
    const selectedBuildingId = Number(e.target.value);
    const selectedBuilding = buildingsData.find(
      (building) => building.id === selectedBuildingId
    );
    setActiveBuilding(selectedBuilding);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleStartEvaluation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/beeapp/api/evaluations/check",
        {
          params: {
            buildingId: activeBuilding.id,
            yearOfEvaluation: selectedYear,
          },
        }
      );

      const exists = response.data;
      console.log(exists);
      if (exists) {
        const userChoice = window.confirm(
          "An evaluation already exists for this building and year. Do you want to edit the previous evaluation?"
        );
        if (userChoice) {
          // Navigate to process form page to redo or edit
          navigate(
            `/processform?buildingId=${activeBuilding.id}&year=${selectedYear}&edit=true`
          );
        }
      } else {
        // Navigate to process form page to create a new evaluation
        navigate(
          `/processform?buildingId=${activeBuilding.id}&year=${selectedYear}`
        );
      }
    } catch (error) {
      console.error("Error checking evaluation existence:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="process-page">
      <h2>Start an Evaluation</h2>
      <br />
      <div className="form-group2">
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
      <div className="form-group2">
        <label htmlFor="year">Select the year of evaluation: </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange} //{(e) => setSelectedYear(e.target.value)}
          required
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleStartEvaluation} className="submit-button">
        Start Evaluation
      </button>
    </div>
  );
};

export default ProcessPage;
