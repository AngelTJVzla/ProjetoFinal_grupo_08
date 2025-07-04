import React from "react";
import EmpresasPage from "./Pages/EmpresasPage";
import MigrantesPage from "./Pages/MigrantesPage";
import HomePage from "./Pages/HomePage";
import CadastroMigrantes from "./Pages/CadastroMigrantes";
import CadastroEmpresas from "./Pages/CadastroEmpresas";
import VagasPageNew from "./Pages/VagasPageNew";
import CandidaturasPage from "./Pages/CandidaturasPage";
import AdminPage from "./Pages/AdminPage";
import { Routes, Route } from "react-router-dom";

export default function MainRoutes(props) {
  return (
    <Routes>
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
        path="/cadastro-migrantes" 
        element={
          <CadastroMigrantes 
            addMigrante={props.addMigrante} 
            migrantes={props.migrantes} 
          />
        } 
      />
      <Route 
        path="/cadastro-empresas" 
        element={
          <CadastroEmpresas 
            addEmpresa={props.addEmpresa} 
            empresas={props.empresas} 
          />
        } 
      />
      <Route path="/vagas" element={<VagasPageNew />} />
      <Route path="/candidaturas" element={<CandidaturasPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
