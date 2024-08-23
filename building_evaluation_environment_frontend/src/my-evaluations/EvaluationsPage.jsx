import React, { useState, useEffect } from "react";
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
  // State variables
  const [evaluations, setEvaluations] = useState([]);
  const [buildingsData, setBuildingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [activeEvaluation, setActiveEvaluation] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [radarChartData, setRadarChartData] = useState({});
  const [radarChartOptions, setRadarChartOptions] = useState({});

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
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

    fetchBuildingsData();
  }, [userEmail]);

  // Fetch evaluations data when the selected building changes
  useEffect(() => {
    const fetchEvaluations = async () => {
      if (activeBuilding) {
        const buildingId = activeBuilding.id;
        try {
          const response = await axios.get(
            `http://localhost:8080/beeapp/api/evaluations/${buildingId}`
          );
          const evaluationsData = response.data;
          setEvaluations(evaluationsData);

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

    fetchEvaluations();
  }, [activeBuilding]);

  useEffect(() => {
    if (activeEvaluation) {
      const radarData = {
        labels: [
          "Energy Performance",
          "Indoor Environmental Quality",
          "Environment and Circularity",
          "Accessibility",
        ],
        datasets: [
          {
            label: `Scores for ${activeEvaluation.year}`,
            data: [
              activeEvaluation.energyPerformanceScore,
              activeEvaluation.indoorEnvironmentalQualityScore,
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
            position: "top",
          },
          title: {
            display: true,
            text: `Section Scores for ${activeEvaluation.year}`,
          },
        },
      };

      setRadarChartData(radarData);
      setRadarChartOptions(radarOptions);
    } else {
      setRadarChartData({
        labels: [],
        datasets: [],
      });
    }
  }, [activeEvaluation]);

  useEffect(() => {
    if (activeEvaluation) {
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
            position: "top",
          },
          title: {
            display: true,
            text: `Section Scores for ${activeEvaluation.year}`,
          },
        },
      };

      setRadarChartData(radarData);
      setRadarChartOptions(radarOptions);
    }
  }, [activeEvaluation]);

  const handleBuildingChange = (e) => {
    const selectedBuildingId = Number(e.target.value); // Convert to number if IDs are numbers
    const selectedBuilding = buildingsData.find(
      (building) => building.id === selectedBuildingId
    );
    setActiveBuilding(selectedBuilding);
  };
  const handleYearChange = (e) => {
    const selectedYear = Number(e.target.value); // Convert to number if IDs are numbers
    const selectedEvaluation = evaluations.find(
      (evaluation) => evaluation.year === selectedYear
    );
    setActiveEvaluation(selectedEvaluation);
    console.log(activeEvaluation);
  };

  return (
    <div>
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
          {evaluations.length > 1 && (
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
                <div>Year of Evaluation: {activeEvaluation.year}</div>
                <br></br>
              </div>
            )}
            {activeEvaluation && (
              <div
                className="radar-chart-container"
                style={{
                  width: "600px",
                  height: "600px",
                  margin: "10px auto",
                }}
              >
                <Radar data={radarChartData} options={radarChartOptions} />
                <BuildingClassBar
                  totalScore={activeEvaluation.totalScore}
                ></BuildingClassBar>
                <br></br>
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
