import React from "react";
import App from "./App";
import EmpresasPage from "./Pages/EmpresasPage";
import MigrantesPage from "./Pages/MigrantesPage";
import PresentationLogin from "./Pages/PresentationLogin";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";

export default function MainRoutes(props) {
  return (
    <Routes>
      <Route path="/Login" element={<PresentationLogin onLogin={props.onLogin} />} />
      <Route
        path="/migrantes"
        element={
          <MigrantesPage
            migrantes={props.migrantes}
            onDeleteMigrante={props.onDeleteMigrante}
            updateMigrante={props.updateMigrante}
          />
        }
      />
      <Route
        path="/empresas"
        element={
          <EmpresasPage
            empresas={props.empresas}
            onDeleteEmpresa={props.onDeleteEmpresa}
            updateEmpresa={props.updateEmpresa}
          />
        }
      />
      <Route
        path="/app"
        element={<App {...props} onLogout={props.onLogout} />}
      />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
