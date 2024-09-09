import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../ProcessPage.css";
import EnergySection from "./EnergySection";
import IEQSection from "./IEQSection";
import EnvironmentCircularitySection from "./EnvironmentCircularitySection";
import AccessibilitySection from "./AccessibilitySection";
import Footer from "../../components/Footer";

const ProcessForm = () => {
  const [score, setScore] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const buildingId = queryParams.get("buildingId");
  const year = queryParams.get("year");
  const editMode = queryParams.get("edit") === "true";
  const ownerEmail = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    eui: "",
    energyProduced: "",
    airQuality: "",
    temperature: "",
    humidity: "",
    noise: "",
    comfort: "",
    lighting: "",
    waterConsumption: "",
    waterReused: "",
    recycling: "",
    elevatorForEveryFloor: false,
    rampOrEntryForDisabled: false,
    bathroomForDisabled: false,
    gateWidth: false,
    publicTransport: false,
    parking: false,
    importance: {
      eui: "irrelevant",
      energyProduced: "irrelevant",
      airQuality: "irrelevant",
      temperature: "irrelevant",
      humidity: "irrelevant",
      noise: "irrelevant",
      lighting: "irrelevant",
      waterConsumption: "irrelevant",
      waterReused: "irrelevant",
      recycling: "irrelevant",
      energySection: "irrelevant",
      ieqSection: "irrelevant",
      environmentCircularitySection: "irrelevant",
      accessibilitySection: "irrelevant",
    },
  });

  useEffect(() => {
    if (editMode) {
      const fetchPreviousEvaluation = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/beeapp/api/process/${buildingId}/${year}`
          );
          const previousData = response.data;

          const importanceData = JSON.parse(previousData.importance);

          // Populate formData with previous evaluation data
          setFormData({
            eui: previousData.eui || "",
            energyProduced: previousData.energyProduced || "",
            airQuality: previousData.airQuality || "",
            temperature: previousData.temperature || "",
            humidity: previousData.humidity || "",
            noise: previousData.noise || "",
            comfort: previousData.comfort || "",
            lighting: previousData.lighting || "",
            waterConsumption: previousData.waterConsumption || "",
            waterReused: previousData.waterReused || "",
            recycling: previousData.recycling || "",
            elevatorForEveryFloor: previousData.elevatorForEveryFloor || false,
            rampOrEntryForDisabled:
              previousData.rampOrEntryForDisabled || false,
            bathroomForDisabled: previousData.bathroomForDisabled || false,
            gateWidth: previousData.gateWidth || false,
            publicTransport: previousData.publicTransport || false,
            parking: previousData.parking || false,
            importance: {
              eui: importanceData.eui || "irrelevant",
              energyProduced: importanceData.energyProduced || "irrelevant",
              airQuality: importanceData.airQuality || "irrelevant",
              temperature: importanceData.temperature || "irrelevant",
              humidity: importanceData.humidity || "irrelevant",
              noise: importanceData.noise || "irrelevant",
              lighting: importanceData.lighting || "irrelevant",
              waterConsumption: importanceData.waterConsumption || "irrelevant",
              waterReused: importanceData.waterReused || "irrelevant",
              recycling: importanceData.recycling || "irrelevant",
              energySection: importanceData.energySection || "irrelevant",
              ieqSection: importanceData.ieqSection || "irrelevant",
              environmentCircularitySection:
                importanceData.environmentCircularitySection || "irrelevant",
              accessibilitySection:
                importanceData.accessibilitySection || "irrelevant",
            },
          });
        } catch (error) {
          console.error("Error fetching previous evaluation data:", error);
        }
      };

      fetchPreviousEvaluation();
    }
  }, [editMode, buildingId, year]);

  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleImportanceChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      importance: {
        ...prevFormData.importance,
        [field]: value,
      },
    }));
  };

  const viewEvaluation = () => {
    navigate(`/evaluations?buildingId=${buildingId}&year=${year}`);
  };

  const handleBackToMainMenu = () => {
    navigate("/main-menu");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEnergySectionValid = validateSection(
      formData.importance.energySection,
      ["eui", "energyProduced"]
    );
    const isIEQSectionValid = validateSection(formData.importance.ieqSection, [
      "airQuality",
      "temperature",
      "humidity",
      "noise",
      "lighting",
    ]);
    const isEnvironmentCircularitySectionValid = validateSection(
      formData.importance.environmentCircularitySection,
      ["waterConsumption", "waterReused", "recycling"]
    );

    if (!isEnergySectionValid) {
      alert(
        'The Energy Performance section is not marked as irrelevant, but all the fields in this section have irrelevant importance. Please change the importance of the section to "Irrelevant" or make at least one of its fields relevant.'
      );
      return;
    }

    if (!isIEQSectionValid) {
      alert(
        'The Indoor Environmental Quality section is not marked as irrelevant, but all the fields in this section have irrelevant importance. Please change the importance of the section to "Irrelevant" or make at least one of its fields relevant.'
      );
      return;
    }

    if (!isEnvironmentCircularitySectionValid) {
      alert(
        'The Environment and Circularity section is not marked as irrelevant, but all the fields in this section have irrelevant importance. Please change the importance of the section to "Irrelevant" or make at least one of its fields relevant.'
      );
      return;
    }

    const cleanedFormData = { ...formData };

    // Iterate over the formData fields
    Object.keys(cleanedFormData).forEach((key) => {
      if (
        cleanedFormData[key] === null ||
        cleanedFormData[key] === "" ||
        cleanedFormData[key] === undefined
      ) {
        cleanedFormData[key] = 0; // Replace null, empty, or undefined values with 0
      }
    });

    const test = {
      buildingId,
      year,
      ...cleanedFormData,
      ownerEmail,
    };

    console.log(test);
    try {
      const response = await axios.post(
        "http://localhost:8080/beeapp/api/process",
        {
          buildingId,
          year,
          ...cleanedFormData,
          ownerEmail,
        }
      );
      console.log(response);
      console.log(response.data);
      setScore(response.data);
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  const validateSection = (sectionImportance, fields) => {
    if (sectionImportance !== "irrelevant") {
      const allFieldsIrrelevant = fields.every(
        (field) => formData.importance[field] === "irrelevant"
      );
      return !allFieldsIrrelevant; // Returns false if all fields are irrelevant but the section is not.
    }
    return true; // Pass validation if the section importance is not "irrelevant"
  };

  return (
    <div className="form-container">
      <div className="header-container">
        <div className="logo"></div>
        <div className="back-button-container">
          <button onClick={handleBackToMainMenu} className="back-button">
            Back to Main Menu
          </button>
        </div>
      </div>
      <div className="centered-h2">Evaluation Form</div>
      <br></br>
      <form onSubmit={handleSubmit}>
        <EnergySection
          formData={formData}
          onChange={handleChange}
          onImportanceChange={handleImportanceChange}
        />
        <br></br>
        <IEQSection
          formData={formData}
          onChange={handleChange}
          onImportanceChange={handleImportanceChange}
        />
        <br></br>
        <EnvironmentCircularitySection
          formData={formData}
          onChange={handleChange}
          onImportanceChange={handleImportanceChange}
        />
        <br></br>
        <AccessibilitySection
          formData={formData}
          onChange={handleChange}
          onImportanceChange={handleImportanceChange}
        />
        <div className="form-group"></div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <br />
      <div className="form-group2">
        <label htmlFor="score">Score:</label>
        <input
          type="number"
          id="score"
          value={score !== undefined ? score : ""}
          readOnly
        />
        {score === undefined && (
          <p>Score will be calculated after submission.</p>
        )}
        {score !== undefined && (
          <button className="view-evaluation-button" onClick={viewEvaluation}>
            View Evaluation
          </button>
        )}{" "}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProcessForm;

const Tooltip = ({ text }) => (
  <div className="tooltip-container">
    <span className="info-icon">i</span>
    <span className="tooltip-text">{text}</span>
  </div>
);
