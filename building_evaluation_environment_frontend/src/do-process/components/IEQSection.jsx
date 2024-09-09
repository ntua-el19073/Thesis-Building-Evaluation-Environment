import React from "react";
import "../ProcessPage.css";

const IEQSection = ({ formData, onChange, onImportanceChange }) => {
  return (
    <div className="section">
      <h3>Indoor Environmental Quality</h3>
      <div className="form-group">
        <label htmlFor="importance-ieqSection">Section Importance:</label>
        <select
          id="importance-ieqSection"
          value={formData.importance.ieqSection || "irrelevant"}
          onChange={(e) => onImportanceChange("ieqSection", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="airQuality">
          Air Quality Level:
          <Tooltip text="Air Quality Level refers to the percentage of time that the Air Quality Index's value is below the acceptable limit of 950ppm. This index is measured the concentration of pollutants in the air, expressed in parts per million (PPM). This value indicates the level of indoor air contaminants, including carbon dioxide (CO2), volatile organic compounds (VOCs), and other pollutants.  Lower PPM levels represent better air quality, contributing to a healthier indoor environment." />{" "}
        </label>
        <input
          type="number"
          id="airQuality"
          value={formData.airQuality}
          onChange={(e) => onChange("airQuality", e.target.value)}
          min="0"
          max="100"
        />
        <label className="importance-label" htmlFor="importance-airQuality">
          Importance:
        </label>
        <select
          id="importance-airQuality"
          value={formData.importance.airQuality || "irrelevant"}
          onChange={(e) => onImportanceChange("airQuality", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="humidity">
          Thermal comfort in terms of humidity:
          <Tooltip text="Thermal comfort in terms of humidity refers to the percentage of time that the indoor relative humidity levels are maintained within the optimal range of 20-70%. This range is considered comfortable for occupants and helps prevent issues such as mold growth, respiratory discomfort, and material degradation caused by excessive dryness or moisture." />
        </label>
        <input
          type="number"
          id="humidity"
          value={formData.humidity}
          onChange={(e) => onChange("humidity", e.target.value)}
          min="0"
          max="100"
        />
        <label className="importance-label" htmlFor="importance-humidity">
          Importance:
        </label>
        <select
          id="importance-humidity"
          value={formData.importance.humidity || "irrelevant"}
          onChange={(e) => onImportanceChange("humidity", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="temperature">
          Thermal comfort in terms of Temperature:
          <Tooltip text="Thermal comfort in terms of temperature indicates the percentage of time that indoor temperatures are maintained within the optimal range of 19-27°C (66-81°F). This range is considered ideal for occupant comfort, ensuring a balance between warmth and coolness, and contributing to a productive and healthy indoor environment." />
        </label>
        <input
          type="number"
          id="temperature"
          value={formData.temperature}
          onChange={(e) => onChange("temperature", e.target.value)}
          min="0"
          max="100"
        />
        <label className="importance-label" htmlFor="importance-temperature">
          Importance:
        </label>
        <select
          id="importance-temperature"
          value={formData.importance.temperature || "irrelevant"}
          onChange={(e) => onImportanceChange("temperature", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="noise">
          Accoustic Comfort:
          <Tooltip text="Accoustic comfort refers to the percentage of time that indoor sound levels are maintained below 35 decibels (dB). Keeping noise levels within this range is important for minimizing distractions and ensuring a quiet, peaceful environment conducive to concentration and relaxation." />
        </label>
        <input
          type="number"
          id="noise"
          value={formData.noise}
          onChange={(e) => onChange("noise", e.target.value)}
          min="0"
          max="100"
        />
        <label className="importance-label" htmlFor="importance-noise">
          Importance:
        </label>
        <select
          id="importance-noise"
          value={formData.importance.noise || "irrelevant"}
          onChange={(e) => onImportanceChange("noise", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="lighting">
          Visual Comfort:
          <Tooltip text="Visual comfort measures the percentage of time that indoor illumination levels are above 500 lux. This level of lighting is considered sufficient for most indoor activities, helping to reduce eye strain and improve visibility, which enhances comfort and productivity in the space." />
        </label>
        <input
          type="number"
          id="lighting"
          value={formData.lighting}
          onChange={(e) => onChange("lighting", e.target.value)}
          min="0"
          max="100"
        />
        <label className="importance-label" htmlFor="importance-lighting">
          Importance:
        </label>
        <select
          id="importance-lighting"
          value={formData.importance.lighting || "irrelevant"}
          onChange={(e) => onImportanceChange("lighting", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
    </div>
  );
};

export default IEQSection;

const Tooltip = ({ text }) => (
  <div className="tooltip-container">
    <span className="info-icon">i</span>
    <span className="tooltip-text">{text}</span>
  </div>
);
