import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./EvaluationsPage.css";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import BuildingClassBar from "./components/BuildingClassBar";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement
);

const EvaluationsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const buildingId = queryParams.get("buildingId");
  const year = queryParams.get("year");
  const [evaluations, setEvaluations] = useState([]);
  const [buildingsData, setBuildingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [activeEvaluation, setActiveEvaluation] = useState(null);
  const [compareEvaluation, setCompareEvaluation] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [radarChartData, setRadarChartData] = useState({});
  const [radarChartOptions, setRadarChartOptions] = useState({});
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const userEmail = localStorage.getItem("email");

  const fetchBuildingsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/beeapp/api/buildings/get",
        {
          params: {
            email: userEmail,
          },
        }
      );
      setBuildingsData(response.data);
      setActiveBuilding(response.data[0]); // Set the first building as active
    } catch (error) {
      console.error("Error fetching buildings data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvaluations = async () => {
    if (activeBuilding) {
      const buildingId = activeBuilding.id;
      try {
        const response = await axios.get(
          `http://localhost:8080/beeapp/api/evaluations/${buildingId}`
        );
        const evaluationsData = response.data;
        setEvaluations(evaluationsData);
        setAllDataLoaded(true); // Indicate that buildings data has been loaded

        // Sort evaluations by year and then map to chart data
        const sortedEvaluations = evaluationsData
          .slice()
          .sort((a, b) => a.year - b.year);
        const data = {
          labels: sortedEvaluations.map((evaluation) => evaluation.year),
          datasets: [
            {
              label: "Total Score",
              data: sortedEvaluations.map(
                (evaluation) => evaluation.totalScore
              ),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          plugins: {
            legend: {
              display: false,
              position: "top",
            },
            title: {
              display: true,
              text: `Total Score over the Years for ${
                activeBuilding?.name || ""
              }`,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Year",
              },
            },
            y: {
              title: {
                display: true,
                text: "Total Score",
              },
              beginAtZero: true,
              max: 100,
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
      } catch (error) {
        console.error("Error fetching evaluations:", error);
      }
    }
  };

  useEffect(() => {
    fetchBuildingsData();
  }, [userEmail]);

  useEffect(() => {
    fetchEvaluations();
  }, [activeBuilding]);

  // Radar chart data update
  useEffect(() => {
    if (activeEvaluation) {
      if (compareEvaluation == null) {
        const radarData = {
          labels: [
            "Indoor Environmental Quality",
            "Energy Performance",
            "Environment and Circularity",
            "Accessibility",
          ],
          datasets: [
            {
              label: `Scores for ${activeEvaluation.year}`,
              data: [
                activeEvaluation.indoorEnvironmentalQualityScore,
                activeEvaluation.energyPerformanceScore,
                activeEvaluation.environmentCircularityScore,
                activeEvaluation.accessibilityScore,
              ],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        };

        const radarOptions = {
          responsive: true,
          scales: {
            r: {
              angleLines: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: 100,
              pointLabels: {
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `Section Scores for ${activeEvaluation.year}`,
            },
          },
        };

        setRadarChartData(radarData);
        setRadarChartOptions(radarOptions);
      } else if (compareEvaluation != null) {
        const radarData = {
          labels: [
            "Indoor Environmental Quality",
            "Energy Performance",
            "Environment and Circularity",
            "Accessibility",
          ],
          datasets: [
            {
              label: `Scores for ${activeEvaluation.year}`,
              data: [
                activeEvaluation.indoorEnvironmentalQualityScore,
                activeEvaluation.energyPerformanceScore,
                activeEvaluation.environmentCircularityScore,
                activeEvaluation.accessibilityScore,
              ],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: `Scores for ${compareEvaluation.year}`,
              data: [
                compareEvaluation.indoorEnvironmentalQualityScore,
                compareEvaluation.energyPerformanceScore,
                compareEvaluation.environmentCircularityScore,
                compareEvaluation.accessibilityScore,
              ],
              backgroundColor: " rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",

              borderWidth: 1,
            },
          ],
        };

        const radarOptions = {
          responsive: true,

          scales: {
            r: {
              angleLines: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: 100,
              pointLabels: {
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `Section Scores for ${activeEvaluation.year} (blue) compared with scores for ${compareEvaluation.year} (red)`,
            },
          },
        };

        setRadarChartData(radarData);
        setRadarChartOptions(radarOptions);
      }
    } else {
      setRadarChartData({
        labels: [],
        datasets: [],
      });
    }
  }, [activeEvaluation, compareEvaluation]);

  const handleBuildingChange = (e) => {
    const selectedBuildingId = Number(e.target.value);
    const selectedBuilding = buildingsData.find(
      (building) => building.id === selectedBuildingId
    );
    setActiveBuilding(selectedBuilding);
    setEvaluations([]); // Clear previous evaluations
    setActiveEvaluation(null); // Clear the active evaluation
  };

  const handleYearChange = (e) => {
    const selectedYear = Number(e.target.value);
    const selectedEvaluation = evaluations.find(
      (evaluation) => evaluation.year === selectedYear
    );
    setActiveEvaluation(selectedEvaluation);
    setCompareEvaluation(null);
  };

  const handleCompareYearChange = (e) => {
    const selectedYear = Number(e.target.value);
    const selectedEvaluation = evaluations.find(
      (evaluation) => evaluation.year === selectedYear
    );
    setCompareEvaluation(selectedEvaluation);
  };

  useEffect(() => {
    fetchBuildingsData();
  }, [userEmail]);

  useEffect(() => {
    if (allDataLoaded) {
      console.log(buildingId);
      console.log(year);
      console.log(buildingsData);

      if (buildingId != null) {
        const selectedBuilding = buildingsData.find(
          (building) => building.id == buildingId
        );
        setActiveBuilding(selectedBuilding);
        console.log(selectedBuilding);

        if (year != null && selectedBuilding) {
          const selectedEvaluation = evaluations.find(
            (evaluation) => evaluation.year == year
          );

          setActiveEvaluation(selectedEvaluation);
          console.log(selectedEvaluation);
        }
      }
    }
  }, [allDataLoaded]);

  const deleteEvaluation = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this evaluation? This change is irreversible."
    );
    if (confirmDeletion) {
      try {
          await axios.delete(
          "http://localhost:8080/beeapp/api/evaluations/delete",
          {
            params: {
              year: activeEvaluation.year,
              buildingId: activeBuilding.id,
            },
          }
        );
        setActiveEvaluation(null);
        fetchEvaluations(); // Refetch evaluations after deletion
      } catch (error) {
        console.log("Error deleting evaluation:", error);
      }
    } else {
      console.log("Deletion cancelled by user.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="evaluations-page">
      <h2>Evaluations</h2>
      <div>
        <label htmlFor="building">Select a building:</label>
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

      {/* Display evaluations for the selected building */}
      {evaluations.length > 0 && (
        <div>
          <h3>Evaluations for {activeBuilding?.name}</h3>
          {evaluations.length > 0 && (
            <div style={{ width: "600px", height: "350px", margin: "0 auto" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

          <div className="evaluation-info">
            <label htmlFor="evaluation">Select the Year of Evaluation:</label>
            <select
              id="evaluation"
              value={activeEvaluation?.year || ""}
              onChange={handleYearChange}
            >
              <option value="">Select a Year</option>
              {evaluations
                .slice()
                .sort((a, b) => a.year - b.year)
                .map((evaluation) => (
                  <option key={evaluation.year} value={evaluation.year}>
                    {evaluation.year}
                  </option>
                ))}
            </select>
            <br></br>
            <br></br>
            {activeEvaluation && (
              <div>
                <div>
                  Energy Performance Score:{" "}
                  {activeEvaluation.energyPerformanceScore}
                </div>
                <div>
                  Indoor Environmental Quality Score:{" "}
                  {activeEvaluation.indoorEnvironmentalQualityScore}
                </div>
                <div>
                  Environment and Circularity Score:{" "}
                  {activeEvaluation.environmentCircularityScore}
                </div>
                <div>
                  Accessibility Score: {activeEvaluation.accessibilityScore}
                </div>
                <div>Total Score: {activeEvaluation.totalScore}</div>
                <br></br>
                <br></br>
              </div>
            )}

            {activeEvaluation && (
              <div>
                <label
                  className="comparison-label"
                  htmlFor="compare-evaluation"
                >
                  Select a Year for comparison:
                </label>
                <select
                  id="compare-evaluation"
                  value={compareEvaluation?.year || ""}
                  onChange={handleCompareYearChange}
                >
                  <option value="">Select a Year</option>
                  {evaluations
                    .slice()
                    .filter(
                      (evaluation) =>
                        !activeEvaluation ||
                        evaluation.year !== activeEvaluation.year
                    )
                    .sort((a, b) => a.year - b.year)
                    .map((evaluation) => (
                      <option key={evaluation.year} value={evaluation.year}>
                        {evaluation.year}
                      </option>
                    ))}
                </select>
                <div
                  className="radar-chart-container"
                  style={{
                    width: "600px",
                    height: "600px",
                    margin: "0px auto",
                  }}
                >
                  <Radar
                    style={{
                      margin: "10px auto",
                      width: "600px",
                      height: "600px",
                    }}
                    data={radarChartData}
                    options={radarChartOptions}
                  />
                </div>
                <BuildingClassBar
                  totalScore={activeEvaluation.totalScore}
                ></BuildingClassBar>
                <br></br>
                <br></br>
                <br></br>
                <button
                  className="delete-button"
                  onClick={() =>
                    deleteEvaluation(
                      activeEvaluation.year,
                      activeEvaluation.buildingId
                    )
                  }
                >
                  Delete this evaluation{" "}
                </button>
                <br></br>
                <br></br>
                <br></br>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationsPage;
