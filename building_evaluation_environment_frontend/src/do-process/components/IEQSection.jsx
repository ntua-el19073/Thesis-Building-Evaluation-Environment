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
          Air Quality:
          <Tooltip text="Measure of the indoor air quality, including the presence of pollutants." />
        </label>
        <input
          type="text"
          id="airQuality"
          value={formData.airQuality}
          onChange={(e) => onChange("airQuality", e.target.value)}
          required
        />
        <label htmlFor="importance-airQuality">Importance:</label>
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
          Humidity:
          <Tooltip text="Measure of the indoor humidity levels, indicating thermal comfort." />
        </label>
        <input
          type="text"
          id="humidity"
          value={formData.humidity}
          onChange={(e) => onChange("humidity", e.target.value)}
          required
        />
        <label htmlFor="importance-humidity">Importance:</label>
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
          Temperature:
          <Tooltip text="Measure of the indoor temperature, indicating thermal comfort." />
        </label>
        <input
          type="text"
          id="temperature"
          value={formData.temperature}
          onChange={(e) => onChange("temperature", e.target.value)}
          required
        />
        <label htmlFor="importance-temperature">Importance:</label>
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
          Noise Comfort:
          <Tooltip text="Measure of the indoor noise levels, indicating acoustic comfort." />
        </label>
        <input
          type="text"
          id="noise"
          value={formData.noise}
          onChange={(e) => onChange("noise", e.target.value)}
          required
        />
        <label htmlFor="importance-noise">Importance:</label>
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
          Lighting Comfort:
          <Tooltip text="Measure of the indoor lighting levels, indicating visual comfort." />
        </label>
        <input
          type="text"
          id="lighting"
          value={formData.lighting}
          onChange={(e) => onChange("lighting", e.target.value)}
          required
        />
        <label htmlFor="importance-lighting">Importance:</label>
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
