import React from "react";
import AllEmpresas from "./AllEmpresas";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function EmpresasPage({ empresas, onDeleteEmpresa, updateEmpresa }) {
    return (
        <>
            <Header />
            <AllEmpresas 
                empresas={empresas} 
                onDelete={onDeleteEmpresa} 
                onEdit={updateEmpresa} 
            />
            <Footer />
        </>
    );
}

export default EmpresasPage;
