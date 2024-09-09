import React from "react";
import "../ProcessPage.css";

const EnvironmentCircularitySection = ({
  formData,
  onChange,
  onImportanceChange,
}) => {
  return (
    <div className="section">
      <h3>Environment and Circularity</h3>
      <div className="form-group">
        <label htmlFor="importance-environmentCircularitySection">
          Section Importance:
        </label>
        <select
          id="importance-environmentCircularitySection"
          value={
            formData.importance.environmentCircularitySection || "irrelevant"
          }
          onChange={(e) =>
            onImportanceChange("environmentCircularitySection", e.target.value)
          }
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="waterConsumption">
          Water Consumption per occupant:
          <Tooltip text="Water Consumption per occupant refers to the total water consumption in the building divided by the number of occupants. Measured in m³ per inhabitant " />
        </label>
        <input
          type="number"
          id="waterConsumption"
          value={formData.waterConsumption}
          onChange={(e) => onChange("waterConsumption", e.target.value)}
          min="0"
        />
        <label
          className="importance-label"
          htmlFor="importance-waterConsumption"
        >
          Importance:
        </label>
        <select
          id="importance-waterConsumption"
          value={formData.importance.waterConsumption || "irrelevant"}
          onChange={(e) =>
            onImportanceChange("waterConsumption", e.target.value)
          }
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="waterReused">
          Water Recycling:
          <Tooltip text="Water recycling refers the percentage of water needs covered by the building from sources such as greywater and rainwater. " />
        </label>
        <input
          type="number"
          id="waterReused"
          value={formData.waterReused}
          onChange={(e) => onChange("waterReused", e.target.value)}
          min="0"
          max="100"
        />
        <label className="importance-label" htmlFor="importance-waterReused">
          Importance:
        </label>
        <select
          id="importance-waterReused"
          value={formData.importance.waterReused || "irrelevant"}
          onChange={(e) => onImportanceChange("waterReused", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="recycling">
          Material Recycling:
          <Tooltip text="Percentage of recyclable materials that are actually beeing recycled in the building." />
        </label>
        <input
          type="number"
          id="recycling"
          value={formData.recycling}
          onChange={(e) => onChange("recycling", e.target.value)}
          min="0"
          max="100"
        />
        <label className="importance-label" htmlFor="importance-recycling">
          Importance:
        </label>
        <select
          id="importance-recycling"
          value={formData.importance.recycling || "irrelevant"}
          onChange={(e) => onImportanceChange("recycling", e.target.value)}
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

export default EnvironmentCircularitySection;

const Tooltip = ({ text }) => (
  <div className="tooltip-container">
    <span className="info-icon">i</span>
    <span className="tooltip-text">{text}</span>
  </div>
);
