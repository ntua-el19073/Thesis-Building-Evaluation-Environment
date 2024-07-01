import "../App.css";
import ProfileBox from "../components/ProfileBox";
import { useNavigate } from "react-router-dom";

const MainMenu = ({ userName }) => {
  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page);
  };

  return (
    <div className="outer-panel">
      <div className="inner-panel">
        <div className="top-menu">
          <div>
            <div className="logo"></div>
          </div>
          <ProfileBox userName={userName} />
        </div>
        <div className="menu">
          {/* Menu buttons */}
          <button className="menu-button" onClick={() => goToPage("/process")}>
            New Evaluation
          </button>
          <button
            className="menu-button"
            onClick={() => goToPage("/evaluations")}
          >
            My Evaluations
          </button>
          <button className="menu-button" onClick={() => goToPage("/details")}>
            Details
          </button>
          <button
            className="menu-button"
            onClick={() => goToPage("/buildings")}
          >
            My Buildings
          </button>
          <button className="menu-button">About us</button>
          {/* Add more buttons as needed */}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
