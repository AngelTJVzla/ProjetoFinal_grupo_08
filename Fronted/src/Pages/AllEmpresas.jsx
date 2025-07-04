import React from "react";
import ListOfCompanies from "../Components/ListOfCompanies";

function AllEmpresas({ empresas, onDelete, onEdit }) {
    return (
        <div className="bg-gray-800/90 rounded-2xl p-6 border border-blue-400/40 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="bg-blue-600 p-3 rounded-xl mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Empresas Parceiras</h2>
                        <p className="text-blue-200">{empresas.length} empresa{empresas.length !== 1 ? 's' : ''} registrada{empresas.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
            </div>
            <ListOfCompanies empresas={empresas} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export default AllEmpresas;
