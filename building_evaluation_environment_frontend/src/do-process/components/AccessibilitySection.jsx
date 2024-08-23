import React from "react";
import "../ProcessPage.css";

const AccessibilitySection = ({ formData, onChange, onImportanceChange }) => {
  return (
    <div className="section">
      <h3>Accessibility</h3>
      <div className="form-group">
        <label htmlFor="importance-accessibilitySection">
          Section Importance:
        </label>
        <select
          id="importance-accessibilitySection"
          value={formData.importance.accessibilitySection || "irrelevant"}
          onChange={(e) =>
            onImportanceChange("accessibilitySection", e.target.value)
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
        <label htmlFor="elevatorForEveryFloor">
          Elevator for Every Floor:
          <Tooltip text="Indicates whether there is an elevator that serves every floor of the building." />
        </label>
        <input
          type="checkbox"
          id="elevatorForEveryFloor"
          checked={formData.elevatorForEveryFloor}
          onChange={(e) => onChange("elevatorForEveryFloor", e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rampOrEntryForDisabled">
          Ramp or Entry for Disabled:
          <Tooltip text="Indicates whether there is a ramp or accessible entry for disabled individuals." />
        </label>
        <input
          type="checkbox"
          id="rampOrEntryForDisabled"
          checked={formData.rampOrEntryForDisabled}
          onChange={(e) => onChange("rampOrEntryForDisabled", e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bathroomForDisabled">
          Bathroom for Disabled:
          <Tooltip text="Indicates whether there are bathrooms that are accessible for disabled individuals." />
        </label>
        <input
          type="checkbox"
          id="bathroomForDisabled"
          checked={formData.bathroomForDisabled}
          onChange={(e) => onChange("bathroomForDisabled", e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gateWidth">
          Gate Width Larger than 1m:
          <Tooltip text="Indicates whether the width of the gate is at least 1 meter." />
        </label>
        <input
          type="checkbox"
          id="gateWidth"
          checked={formData.gateWidth}
          onChange={(e) => onChange("gateWidth", e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="publicTransport">
          Public Transport within Walking Distance:
          <Tooltip text="Indicates whether there is public transport within walking distance of the building." />
        </label>
        <input
          type="checkbox"
          id="publicTransport"
          checked={formData.publicTransport}
          onChange={(e) => onChange("publicTransport", e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="parking">
          Parking:
          <Tooltip text="Indicates whether there is parking available at the building." />
        </label>
        <input
          type="checkbox"
          id="parking"
          checked={formData.parking}
          onChange={(e) => onChange("parking", e.target.checked)}
        />
      </div>
    </div>
  );
};

export default AccessibilitySection;

const Tooltip = ({ text }) => (
  <div className="tooltip-container">
    <span className="info-icon">i</span>
    <span className="tooltip-text">{text}</span>
  </div>
);
