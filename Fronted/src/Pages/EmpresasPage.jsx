import React from "react";
import AllEmpresas from "./AllEmpresas";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function EmpresasPage({ empresas, onDeleteEmpresa, updateEmpresa }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <AllEmpresas 
                    empresas={empresas} 
                    onDelete={onDeleteEmpresa} 
                    onEdit={updateEmpresa} 
                />
            </div>
            <Footer />
        </div>
    );
}

export default EmpresasPage;
