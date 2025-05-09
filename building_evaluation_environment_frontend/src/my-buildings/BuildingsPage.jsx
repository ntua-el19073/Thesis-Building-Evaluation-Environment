  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import "./BuildingsPage.css";
  import AddBuildingButton from "./components/AddBuildingButton";
  import RemoveBuldingButton from "./components/RemoveBuildingButton";
  import EditBuildingButton from "./components/EditBuildingButton";

  const BuildingsPage = () => {
    const [buildingsData, setBuildingsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeBuilding, setActiveBuilding] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const userEmail = localStorage.getItem("email");

    const fetchBuildingsData = async () => {
      try {
        console.log("Hi");
        const response = await axios.get(
          "http://localhost:8080/beeapp/api/buildings/get",
          {
            params: {
              email: userEmail,
            },
          }
        );
        setBuildingsData(response.data);
        setActiveBuilding("");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching buildings data:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchBuildingsData();
    }, []);

    const removeBuilding = (id) => {
      setBuildingsData(buildingsData.filter((building) => building.id !== id));
      setActiveBuilding(null);
    };

    if (loading) {
      return <div>Loading...</div>;
    }
    const handleBuildingChange = (e) => {
      const selectedBuildingId = Number(e.target.value); // Convert to number if IDs are numbers
      const selectedBuilding = buildingsData.find(
        (building) => building.id === selectedBuildingId
      );
      setActiveBuilding(selectedBuilding);
      setShowEditForm(false);
    };

    return (
      <div className="buildings-page">
        {/* Building tabs */}
        <div>
          <label htmlFor="building">Select a building: </label>
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
        <br />
        <br />
        <br />
        {/* <div className="building-tabs">
            {buildingsData.map((building) => (
              <div
                key={building.id}
                className={`tab ${building === activeBuilding ? "active" : ""}`}
                onClick={() => setActiveBuilding(building)}
              >
                {building.name}
              </div>
            ))}
          </div> */}
        {/* Data section */}
        {/* {activeBuilding && (
          <div className="data-section">
            <div className="left-column">
              <div>Name: {activeBuilding.name}</div>
              <div>Country: {activeBuilding.country}</div>
              <div>Location: {activeBuilding.location}</div>
              <div>Type: {activeBuilding.type}</div>
              <div>Year Constructed: {activeBuilding.yearConstructed}</div>
              <div>Floor: {activeBuilding.floor}</div>
              <div>Area: {activeBuilding.area}</div>
              {activeBuilding.imagePath && (
                <div>
                  <img
                    src={`http://localhost:8080/beeapp/static/images/${activeBuilding.imagePath}`}
                    alt={activeBuilding.name}
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>
        )} */}
        {activeBuilding && (
          <div className="data-section">
            <div className="left-column">
              <div className="building-info">
                <div>Name: {activeBuilding.name}</div>
                <div>Country: {activeBuilding.country}</div>
                <div>Type: {activeBuilding.type}</div>
                <div>Address: {activeBuilding.location}</div>
                <div>Year Constructed: {activeBuilding.yearConstructed}</div>
                <div>Floor: {activeBuilding.floor}</div>
                <div>Land Area (m2): {activeBuilding.area}</div>
              </div>
              {activeBuilding.imagePath && (
                <div className="right-column">
                  <img
                    src={`http://localhost:8080/beeapp/static/images/${activeBuilding.imagePath}`}
                    alt={activeBuilding.name}
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <br></br>
        {activeBuilding && (
          <EditBuildingButton
            refreshBuildings={fetchBuildingsData}
            building={activeBuilding}
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
          />
        )}
        {activeBuilding && (
          <RemoveBuldingButton
            removeBuilding={removeBuilding}
            id={activeBuilding ? activeBuilding.id : null}
          />
        )}
        <br /> <br />
        <AddBuildingButton
          buildingsData={buildingsData}
          refreshBuildings={fetchBuildingsData}
        />
      </div>
    );
  };

  export default BuildingsPage;
