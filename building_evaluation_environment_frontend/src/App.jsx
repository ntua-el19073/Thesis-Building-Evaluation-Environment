import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import MainMenu from "./main-menu/MainMenu";
import PillarDetails from "./pillar-details/PillarDetails";
import BuildingsPage from "./my-buildings/BuildingsPage";
import ProcessPage from "./do-process/ProcessPage";
import EvaluationsPage from "./my-evaluations/EvaluationsPage";

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
      <Route
        path="/buildings"
        element={<ProtectedRoute element={BuildingsPage} />}
      />

      <Route
        path="/process"
        element={<ProtectedRoute element={ProcessPage} />}
      />

      <Route
        path="/evaluations"
        element={<ProtectedRoute element={EvaluationsPage} />}
      />
    </Routes>
  );
};

export default App;
