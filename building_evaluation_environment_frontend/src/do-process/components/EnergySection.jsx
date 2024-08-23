import React from "react";
import "../ProcessPage.css";

const EnergySection = ({ formData, onChange, onImportanceChange }) => {
  return (
    <div className="section">
      <h3>Energy Performance</h3>
      <div className="form-group">
        <label htmlFor="importance-energySection">Section Importance:</label>
        <select
          id="importance-energySection"
          value={formData.importance.energySection || "irrelevant"}
          onChange={(e) => onImportanceChange("energySection", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="eui">
          EUI:
          <Tooltip text="EUI is expressed as energy per square foot per year. It's calculated by dividing the total energy consumed by the building in one year (measured in kBtu or GJ) by the total gross floor area of the building." />
        </label>
        <input
          type="text"
          id="eui"
          value={formData.eui}
          onChange={(e) => onChange("eui", e.target.value)}
          required
        />
        <label htmlFor="importance-eui">Importance:</label>
        <select
          id="importance-eui"
          value={formData.importance.eui || "irrelevant"}
          onChange={(e) => onImportanceChange("eui", e.target.value)}
        >
          <option value="irrelevant">Irrelevant</option>
          <option value="minor">Minor</option>
          <option value="medium">Medium</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="energyProduced">
          Energy Produced:
          <Tooltip text="The amount of energy produced by the building, measured in kWh." />
        </label>
        <input
          type="text"
          id="energyProduced"
          value={formData.energyProduced}
          onChange={(e) => onChange("energyProduced", e.target.value)}
          required
        />
        <label htmlFor="importance-energyProduced">Importance:</label>
        <select
          id="importance-energyProduced"
          value={formData.importance.energyProduced || "irrelevant"}
          onChange={(e) => onImportanceChange("energyProduced", e.target.value)}
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

export default EnergySection;

const Tooltip = ({ text }) => (
  <div className="tooltip-container">
    <span className="info-icon">i</span>
    <span className="tooltip-text">{text}</span>
  </div>
);
