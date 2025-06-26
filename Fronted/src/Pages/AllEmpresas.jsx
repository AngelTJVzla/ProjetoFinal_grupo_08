import React from "react";
import ListOfCompanies from "../Components/ListOfCompanies";

function AllEmpresas({ empresas, onDelete, onEdit }) {
    return (
        <main className="container mx-auto p-4 pt-8 rounded shadow-md pb-20">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Todas as empresas cadastradas</h1>
            <ListOfCompanies empresas={empresas} onDelete={onDelete} onEdit={onEdit} />
        </main>
    );
}

export default AllEmpresas;
