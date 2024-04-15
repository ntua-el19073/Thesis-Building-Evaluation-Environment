import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import MainMenu from "./main-menu/MainMenu";
import PillarDetails from "./pillar-details/PillarDetails";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = (props) => {
  const { element: Element, ...rest } = props;
  return isAuthenticated() ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/main-menu"
        element={<ProtectedRoute element={MainMenu} />}
      />
      <Route
        path="/details"
        element={<ProtectedRoute element={PillarDetails} />}
      />
    </Routes>
  );
};

export default App;
