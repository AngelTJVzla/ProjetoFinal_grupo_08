import React from "react";
import AllEmpresas from "./AllEmpresas";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function EmpresasPage({ empresas, onDeleteEmpresa, updateEmpresa }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
            <Header />
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="bg-gray-800/90 rounded-3xl p-8 border border-blue-400/40 shadow-2xl">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-blue-600 p-4 rounded-2xl mr-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Gerenciar Empresas
                            </h1>
                        </div>
                        <div className="bg-blue-600/20 rounded-xl p-4 border border-blue-400/30">
                            <p className="text-xl text-blue-100 mb-2">
                                Visualize e gerencie todas as empresas parceiras interessadas em ajudar
                            </p>
                            <div className="flex items-center justify-center space-x-6 text-blue-200 text-sm">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Editar Informações</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>Parceiros Solidários</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AllEmpresas 
                    empresas={empresas} 
                    onDelete={onDeleteEmpresa} 
                    onEdit={updateEmpresa} 
                />
            </main>
            <Footer />
        </div>
    );
}

export default EmpresasPage;
