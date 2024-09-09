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
          <Tooltip text="Indicates whether the building has elevators that provide access to different floors for people with disabilities or mobility challenges. Elevator access is essential for ensuring that all areas of the building are accessible to everyone." />
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
          <Tooltip text="Indicates whether the building is equipped with ramps to ensure accessibility for individuals using wheelchairs or those with mobility impairments. Proper ramp access is crucial for compliance with accessibility standards and for promoting inclusivity." />
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
          <Tooltip text="Indicates whether the building includes restrooms that are designed to be accessible for individuals with disabilities. Accessible restrooms typically feature grab bars, wider stalls, and other accommodations to meet accessibility standards." />
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
          <Tooltip text="Indicates whether the building’s gates have a width of more than 1 meter, providing sufficient space for wheelchairs, strollers, and other mobility aids. Wider gates are essential for ensuring smooth and safe access for all users." />
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
          <Tooltip text="Indicates whether there is access to public transportation within walking distance (500m) from the building. Proximity to public transport options is crucial for improving accessibility and reducing reliance on personal vehicles." />
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
          <Tooltip text="Indicates whether the building provides parking facilities, including designated accessible parking spaces." />
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
