import React, { useState } from "react";
import Menu from "./components/Menu";
import Table from "./components/Table";
import "../App.css"

const sectionsData = {
  section1: [
    {
      name: "Item 1",
      participation: "50%",
      description: "Description for Item 1 Description for Item 1Description for Item 1Description for Item 1asfasfa",
    },
    {
      name: "Item 2sss",
      participation: "50%",
      description: "Description for Item 2",
    },
  ],
  section2: [
    {
      name: "Item 3",
      participation: "50%",
      description: "Description for Item 1",
    },
    {
      name: "Item 4",
      participation: "50%",
      description: "Description for Item 2",
    },
  ],
  section3: [
    {
      name: "Item 5",
      participation: "50%",
      description: "Description for Item 1",
    },
    {
      name: "Item 6",
      participation: "50%",
      description: "Description for Item 2",
    },
  ],
};

export default function DetailsPage() {
  const [selectedSection, setSelectedSection] = useState("section1");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  console.log(selectedSection)
  return (
    <div className="details-page">
      <div className="details-menu">
        <Menu
          sections={Object.keys(sectionsData)}
          onSelectSection={handleSectionChange}
        />
      </div>
      <div>
        <div className="title">{selectedSection}</div>
        <Table data={sectionsData[selectedSection]} />
      </div>
    </div>
  );
}
