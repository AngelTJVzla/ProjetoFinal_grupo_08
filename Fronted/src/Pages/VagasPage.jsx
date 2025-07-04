import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FormVaga from "../Components/FormVaga";
import FormEditVaga from "../Components/FormEditVaga";
import ListOfVagas from "../Components/ListOfVagas";
import SimpleListOfVagas from "../Components/SimpleListOfVagas";

function VagasPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingVaga, setEditingVaga] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const response = await fetch('http://localhost:3000/empresas');
            if (response.ok) {
                const data = await response.json();
                setEmpresas(data);
            }
        } catch (error) {
            console.error('Erro ao carregar empresas:', error);
        }
    };

    const handleVagaAdded = () => {
        setRefreshKey(prev => prev + 1);
        setShowForm(false);
    };

    const handleEditVaga = (vaga) => {
        setEditingVaga(vaga);
        setShowForm(false);
    };

    const handleVagaUpdated = () => {
        setRefreshKey(prev => prev + 1);
        setEditingVaga(null);
    };

    const handleCancelEdit = () => {
        setEditingVaga(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Vagas de Emprego
                        </h1>
                        <p className="text-xl text-white/80 mb-6">
                            Conectando migrantes com oportunidades de trabalho
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setShowForm(!showForm);
                                    setEditingVaga(null);
                                }}
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                {showForm ? 'Ver Vagas' : 'Publicar Nova Vaga'}
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 border border-white/20">
                                Minhas Candidaturas
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                        <div className="bg-green-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
                        <p className="text-white/80">Vagas Ativas</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                        <div className="bg-purple-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">80+</h3>
                        <p className="text-white/80">Empresas Parceiras</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                        <div className="bg-yellow-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
                        <p className="text-white/80">Contratações Realizadas</p>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {editingVaga ? (
                        <FormEditVaga 
                            vaga={editingVaga} 
                            onVagaUpdated={handleVagaUpdated} 
                            onCancel={handleCancelEdit}
                            empresas={empresas}
                        />
                    ) : showForm ? (
                        <FormVaga onVagaAdded={handleVagaAdded} empresas={empresas} />
                    ) : (
                        <ListOfVagas key={refreshKey} onEditVaga={handleEditVaga} />
                    )}
                </div>

                {/* Call to Action */}
                {!showForm && !editingVaga && (
                    <div className="text-center mt-12">
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Sua empresa busca talentos diversos?
                            </h2>
                            <p className="text-white/80 mb-6">
                                Publique suas vagas e conecte-se com profissionais migrantes qualificados
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Publicar Vaga Agora
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default VagasPage;
