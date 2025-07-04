import React from "react";
import AllMigrantes from "./AllMigrantes";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function MigrantesPage({ migrantes, onDeleteMigrante, updateMigrante }) {
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Gerenciar Migrantes
                            </h1>
                        </div>
                        <div className="bg-blue-600/20 rounded-xl p-4 border border-blue-400/30">
                            <p className="text-xl text-blue-100 mb-2">
                                Visualize e gerencie todos os migrantes cadastrados no sistema
                            </p>
                            <div className="flex items-center justify-center space-x-6 text-blue-200 text-sm">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Editar Perfis</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <span>Visualizar Dados</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AllMigrantes 
                    migrantes={migrantes} 
                    onDelete={onDeleteMigrante} 
                    onEdit={updateMigrante} 
                />
            </main>
            <Footer />
        </div>
    );
}

export default MigrantesPage;
