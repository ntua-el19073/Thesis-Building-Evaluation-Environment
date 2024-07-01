import React, { useState } from "react";
import axios from "axios";

const ProcessForm = ({ buildingId }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const [eui, setEui] = useState("");
  const [energyProduced, setEnergyProduced] = useState("");
  const [maxCo2Level, setMaxCo2Level] = useState("");
  const [humidityRange, setHumidityRange] = useState("");
  const [temperatureRange, setTemperatureRange] = useState("");
  const [minLightingLevel, setMinLightingLevel] = useState("");
  const [maxNoiseLevel, setMaxNoiseLevel] = useState("");
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
      console.log("Minimum Lighting Level:", minLightingLevel);
      console.log("Maximum Noise Level:", maxNoiseLevel);
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
          minLightingLevel,
          maxNoiseLevel,
          waterConsumptionPerOccupant,
          waterReusePercentage,
          elevatorForEveryFloor,
          rampOrEntryForDisabled,
          bathroomForDisabled,
        }
      );
      const { score: newScore } = response.data;
      setScore(newScore);
      setEui("");
      setEnergyProduced("");
      setMaxCo2Level("");
      setHumidityRange("");
      setTemperatureRange("");
      setMinLightingLevel("");
      setMaxNoiseLevel("");
      setWaterConsumptionPerOccupant("");
      setWaterReusePercentage("");
      setElevatorForEveryFloor(false);
      setRampOrEntryForDisabled(false);
      setBathroomForDisabled(false);
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  return (
    <div>
      <h3>Evaluation Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eui">EUI:</label>
          <input
            type="text"
            id="eui"
            value={eui}
            onChange={(e) => setEui(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="energyProduced">Energy Produced:</label>
          <input
            type="text"
            id="energyProduced"
            value={energyProduced}
            onChange={(e) => setEnergyProduced(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="maxCo2Level">Maximum CO2 Level:</label>
          <input
            type="text"
            id="maxCo2Level"
            value={maxCo2Level}
            onChange={(e) => setMaxCo2Level(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="humidityRange">Humidity Range:</label>
          <input
            type="text"
            id="humidityRange"
            value={humidityRange}
            onChange={(e) => setHumidityRange(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="temperatureRange">Temperature Range:</label>
          <input
            type="text"
            id="temperatureRange"
            value={temperatureRange}
            onChange={(e) => setTemperatureRange(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="minLightingLevel">Minimum Lighting Level:</label>
          <input
            type="text"
            id="minLightingLevel"
            value={minLightingLevel}
            onChange={(e) => setMinLightingLevel(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="maxNoiseLevel">Maximum Noise Level:</label>
          <input
            type="text"
            id="maxNoiseLevel"
            value={maxNoiseLevel}
            onChange={(e) => setMaxNoiseLevel(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="waterConsumptionPerOccupant">
            m3/yr of Water Consumption per Occupant:
          </label>
          <input
            type="text"
            id="waterConsumptionPerOccupant"
            value={waterConsumptionPerOccupant}
            onChange={(e) => setWaterConsumptionPerOccupant(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="waterReusePercentage">
            Percentage of Water Reused:
          </label>
          <input
            type="text"
            id="waterReusePercentage"
            value={waterReusePercentage}
            onChange={(e) => setWaterReusePercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="elevatorForEveryFloor">
            Existence of Elevator for Every Floor:
          </label>
          <input
            type="checkbox"
            id="elevatorForEveryFloor"
            checked={elevatorForEveryFloor}
            onChange={(e) => setElevatorForEveryFloor(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="rampOrEntryForDisabled">
            Existence of Ramp/Entry for Disabled People, Parking:
          </label>
          <input
            type="checkbox"
            id="rampOrEntryForDisabled"
            checked={rampOrEntryForDisabled}
            onChange={(e) => setRampOrEntryForDisabled(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="bathroomForDisabled">
            Existence of Bathroom for Disabled:
          </label>
          <input
            type="checkbox"
            id="bathroomForDisabled"
            checked={bathroomForDisabled}
            onChange={(e) => setBathroomForDisabled(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="yearOfEvaluation">Year of Evaluation:</label>
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
        <button type="submit">Submit</button>
      </form>
      <div>
        <label htmlFor="score">Score:</label>
        <input
          type="text"
          id="score"
          value={score !== null ? score : ""}
          readOnly
        />
      </div>
    </div>
  );
};

export default ProcessForm;
