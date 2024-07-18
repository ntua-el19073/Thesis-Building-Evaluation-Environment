import React, { useState } from "react";
import axios from "axios";
import "../ProcessForm.css";

const ProcessForm = ({ buildingId }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const [eui, setEui] = useState("");
  const [energyProduced, setEnergyProduced] = useState("");
  const [maxCo2Level, setMaxCo2Level] = useState("");
  const [humidityRange, setHumidityRange] = useState("");
  const [temperatureRange, setTemperatureRange] = useState("");
  const [lightingRange, setlightingRange] = useState("");
  const [noiseRange, setnoiseRange] = useState("");
  const [waterConsumptionPerOccupant, setWaterConsumptionPerOccupant] =
    useState("");
  const [waterReusePercentage, setWaterReusePercentage] = useState("");
  const [elevatorForEveryFloor, setElevatorForEveryFloor] = useState(false);
  const [rampOrEntryForDisabled, setRampOrEntryForDisabled] = useState(false);
  const [bathroomForDisabled, setBathroomForDisabled] = useState(false);
  const [yearOfEvaluation, setYearOfEvaluation] = useState(currentYear);
  const [score, setScore] = useState(undefined);

  const ownerEmail = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Building ID:", buildingId);
      console.log("EUI:", eui);
      console.log("Energy Produced:", energyProduced);
      console.log("Maximum CO2 Level:", maxCo2Level);
      console.log("Humidity Range:", humidityRange);
      console.log("Temperature Range:", temperatureRange);
      console.log("Minimum Lighting Level:", lightingRange);
      console.log("Maximum Noise Level:", noiseRange);
      console.log(
        "Water Consumption per Occupant:",
        waterConsumptionPerOccupant
      );
      console.log("Water Reuse Percentage:", waterReusePercentage);
      console.log("Elevator for Every Floor:", elevatorForEveryFloor);
      console.log("Ramp/Entry for Disabled:", rampOrEntryForDisabled);
      console.log("Bathroom for Disabled:", bathroomForDisabled);

      const response = await axios.post(
        "http://localhost:8080/beeapp/api/process",
        {
          buildingId,
          eui,
          yearOfEvaluation,
          ownerEmail,
          energyProduced,
          maxCo2Level,
          humidityRange,
          temperatureRange,
          lightingRange,
          noiseRange,
          waterConsumptionPerOccupant,
          waterReusePercentage,
          elevatorForEveryFloor,
          rampOrEntryForDisabled,
          bathroomForDisabled,
        }
      );
      const { score: newScore } = response.data;
      setScore(newScore);
      // setEui("");
      // setEnergyProduced("");
      // setMaxCo2Level("");
      // setHumidityRange("");
      // setTemperatureRange("");
      // setlightingRange("");
      // setnoiseRange("");
      // setWaterConsumptionPerOccupant("");
      // setWaterReusePercentage("");
      // setElevatorForEveryFloor(false);
      // setRampOrEntryForDisabled(false);
      // setBathroomForDisabled(false);
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  const Tooltip = ({ text }) => (
    <div className="tooltip-container">
      <span className="info-icon">i</span>
      <span className="tooltip-text">{text}</span>
    </div>
  );

  return (
    <div className="form-container">
      <h3>Evaluation Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eui">
            EUI:
            <Tooltip text="EUI is expressed as energy per square foot per year. It's calculated by dividing the total energy consumed by the building in one year (measured in kBtu or GJ) by the total gross floor area of the building." />
          </label>
          <input
            type="text"
            id="eui"
            value={eui}
            onChange={(e) => setEui(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="energyProduced">
            Energy Produced:
            <Tooltip text="The amount of energy produced by the building, measured in kWh." />
          </label>
          <input
            type="text"
            id="energyProduced"
            value={energyProduced}
            onChange={(e) => setEnergyProduced(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxCo2Level">
            Maximum CO2 Level:
            <Tooltip text="The highest level of CO2 measured in the building, measured in ppm." />
          </label>
          <input
            type="text"
            id="maxCo2Level"
            value={maxCo2Level}
            onChange={(e) => setMaxCo2Level(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="humidityRange">
            Humidity Range (%):
            <Tooltip text="The humidity level in the building represents the percentage of time spent within the acceptable humidity range." />
          </label>
          <input
            type="text"
            id="humidityRange"
            value={humidityRange}
            onChange={(e) => setHumidityRange(e.target.value)}
            required
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="temperatureRange">
            Temperature Range (%):
            <Tooltip text="The temperature level in the building represents the percentage of time spent within the acceptable temperature range." />
          </label>
          <input
            type="number"
            id="temperatureRange"
            value={temperatureRange}
            onChange={(e) => setTemperatureRange(e.target.value)}
            required
            min="1"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lightingRange">
            Lighting Level (%):
            <Tooltip text="The lighting level in the building represents the percentage of time spent within the acceptable lighting range." />
          </label>
          <input
            type="text"
            id="lightingRange"
            value={lightingRange}
            onChange={(e) => setlightingRange(e.target.value)}
            required
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="noiseRange">
            Noise Level (%):
            <Tooltip text="The noise level in the building represents the percentage of time spent within the acceptable noise range." />
          </label>
          <input
            type="text"
            id="noiseRange"
            value={noiseRange}
            onChange={(e) => setnoiseRange(e.target.value)}
            required
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="waterConsumptionPerOccupant">
            Water Consumption per Occupant:
            <Tooltip text="The annual water consumption per occupant in cubic meters." />
          </label>
          <input
            type="text"
            id="waterConsumptionPerOccupant"
            value={waterConsumptionPerOccupant}
            onChange={(e) => setWaterConsumptionPerOccupant(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="waterReusePercentage">
            Percentage of Water Reused:
            <Tooltip text="The percentage of water reused in the building such as greywater and rainwater." />
          </label>
          <input
            type="text"
            id="waterReusePercentage"
            value={waterReusePercentage}
            onChange={(e) => setWaterReusePercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="elevatorForEveryFloor">
            Existence of Elevator for Every Floor:
            <Tooltip text="Indicates if there is an elevator for every floor in the building." />
          </label>
          <input
            type="checkbox"
            id="elevatorForEveryFloor"
            checked={elevatorForEveryFloor}
            onChange={(e) => setElevatorForEveryFloor(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rampOrEntryForDisabled">
            Existence of Ramp/Entry for Disabled People, Parking:
            <Tooltip text="Indicates if there is a ramp or entry for disabled people in the building." />
          </label>
          <input
            type="checkbox"
            id="rampOrEntryForDisabled"
            checked={rampOrEntryForDisabled}
            onChange={(e) => setRampOrEntryForDisabled(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bathroomForDisabled">
            Existence of Bathroom for Disabled:
            <Tooltip text="Indicates if there is a bathroom for disabled people in the building." />
          </label>
          <input
            type="checkbox"
            id="bathroomForDisabled"
            checked={bathroomForDisabled}
            onChange={(e) => setBathroomForDisabled(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearOfEvaluation">
            Year of Evaluation:
            <Tooltip text="The year in which the building is being evaluated." />
          </label>
          <select
            id="yearOfEvaluation"
            value={yearOfEvaluation}
            onChange={(e) => setYearOfEvaluation(e.target.value)}
            required
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <br /> {/* Empty line for separation */}
      <div className="form-group">
        <label htmlFor="score">Score:</label>
        <input type="text" id="score" value={score || ""} readOnly />
      </div>
    </div>
  );
};

export default ProcessForm;
