import "../EvaluationsPage.css";

const BuildingClassBar = ({ totalScore }) => {
  // Determine the building class based on the total score
  let buildingClass = "";

  if (totalScore >= 95) {
    buildingClass = "A+++";
  } else if (totalScore >= 85) {
    buildingClass = "A++";
  } else if (totalScore >= 75) {
    buildingClass = "A+";
  } else if (totalScore >= 65) {
    buildingClass = "A";
  } else if (totalScore >= 55) {
    buildingClass = "B";
  } else if (totalScore >= 45) {
    buildingClass = "C";
  } else if (totalScore >= 35) {
    buildingClass = "D";
  } else {
    buildingClass = "E";
  }

  return (
    <div className="building-class-bar">
      <div className="building-class-label">
        <span>Building Class: {buildingClass}</span>
      </div>
      <br></br>
      <div className="building-arrow-container">
        <div className={`building-arrow ${buildingClass}`} />
      </div>
      <div className="building-bar">
        <div
          className={`building-segment A+++ ${
            buildingClass === "A+++" ? "active" : ""
          }`}
        >
          A+++
        </div>
        <div
          className={`building-segment A++ ${
            buildingClass === "A++" ? "active" : ""
          }`}
        >
          A++
        </div>
        <div
          className={`building-segment A+ ${
            buildingClass === "A+" ? "active" : ""
          }`}
        >
          A+
        </div>
        <div
          className={`building-segment A ${
            buildingClass === "A" ? "active" : ""
          }`}
        >
          A
        </div>
        <div
          className={`building-segment B ${
            buildingClass === "B" ? "active" : ""
          }`}
        >
          B
        </div>
        <div
          className={`building-segment C ${
            buildingClass === "C" ? "active" : ""
          }`}
        >
          C
        </div>
        <div
          className={`building-segment D ${
            buildingClass === "D" ? "active" : ""
          }`}
        >
          D
        </div>
        <div
          className={`building-segment E ${
            buildingClass === "E" ? "active" : ""
          }`}
        >
          E
        </div>
      </div>
    </div>
  );
};

export default BuildingClassBar;
