import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ModalCandidatura from "../Components/ModalCandidatura";

function VagasPageNew() {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalCandidatura, setModalCandidatura] = useState({
        isOpen: false,
        vaga: null
    });

    useEffect(() => {
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch('http://localhost:3000/vagas');
            
            if (response.ok) {
                const data = await response.json();
                setVagas(data);
            } else {
                setError('Erro ao carregar vagas');
            }
        } catch (error) {
            setError('Erro ao conectar com o servidor: ' + error.message);
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteVaga = async (vagaId) => {
        if (!confirm('Tem certeza que deseja deletar esta vaga?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/vagas/${vagaId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setVagas(prev => prev.filter(vaga => vaga.id !== vagaId));
                alert('Vaga deletada com sucesso!');
            } else {
                const data = await response.json();
                alert(`Erro ao deletar vaga: ${data.error}`);
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor');
            console.error('Erro:', error);
        }
    };

    const handleCandidatar = (vaga) => {
        setModalCandidatura({
            isOpen: true,
            vaga: vaga
        });
    };

    const closeCandidaturaModal = () => {
        setModalCandidatura({
            isOpen: false,
            vaga: null
        });
    };

    const handleCandidaturaSuccess = () => {
        // Refresh das vagas após candidatura bem-sucedida
        fetchVagas();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Vagas de Emprego
                    </h1>
                    <p className="text-xl text-white/80 mb-6">
                        Conectando migrantes com oportunidades de trabalho
                    </p>
                </div>

                <div className="bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/40 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Vagas Disponíveis</h2>
                        </div>
                        <button
                            onClick={fetchVagas}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105"
                        >
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Atualizar</span>
                            </div>
                        </button>
                    </div>

                    {loading && (
                        <div className="text-center py-12">
                            <div className="bg-blue-600 rounded-full h-16 w-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                            <p className="text-blue-200 text-lg font-medium">Carregando vagas...</p>
                            <p className="text-blue-300 text-sm mt-2">Buscando as melhores oportunidades para você</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-600/80 border-2 border-red-400 rounded-2xl p-6 mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-red-500 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-white font-semibold text-lg">❌ {error}</p>
                            </div>
                            <button
                                onClick={fetchVagas}
                                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105"
                            >
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Tentar Novamente</span>
                                </div>
                            </button>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <p className="text-blue-200 mb-4">
                                {vagas.length} vaga{vagas.length !== 1 ? 's' : ''} encontrada{vagas.length !== 1 ? 's' : ''}
                            </p>

                            {vagas.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-blue-200 text-lg">Nenhuma vaga encontrada</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {vagas.map((vaga) => (
                                        <div key={vaga.id} className="bg-gray-700/80 rounded-xl p-6 border border-blue-400/50 hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{vaga.titulo}</h3>
                                                    <p className="text-blue-300 font-semibold">{vaga.empresa_nombre}</p>
                                                </div>
                                                <div className="text-right">
                                                    {vaga.salario && (
                                                        <p className="text-green-400 font-bold">
                                                            R$ {new Intl.NumberFormat('pt-BR').format(vaga.salario)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-gray-200 mb-4">{vaga.descripcion}</p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {vaga.modalidade && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                                                        {vaga.modalidade}
                                                    </span>
                                                )}
                                                {vaga.nivel_experiencia && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">
                                                        {vaga.nivel_experiencia}
                                                    </span>
                                                )}
                                                {vaga.tipo_contrato && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">
                                                        {vaga.tipo_contrato}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex space-x-3">
                                                <button 
                                                    onClick={() => handleCandidatar(vaga)}
                                                    className="group flex-1 btn-candidatura-force"
                                                    title={`Candidatar-se para a vaga: ${vaga.titulo}`}
                                                >
                                                    {/* Efecto de brillo animado */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
                                                    
                                                    <div className="relative flex items-center justify-center space-x-2">
                                                        <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="font-bold">Candidatar-se</span>
                                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </div>
                                                    
                                                    {/* Partículas decorativas */}
                                                    <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                                                    <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-300"></div>
                                                </button>
                                                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40 group">
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        <span>Ver Detalhes</span>
                                                    </div>
                                                </button>
                                                <button 
                                                    onClick={() => deleteVaga(vaga.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200"
                                                    title="Deletar Vaga"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />

            {/* Modal de Candidatura */}
            <ModalCandidatura
                isOpen={modalCandidatura.isOpen}
                onClose={closeCandidaturaModal}
                vaga={modalCandidatura.vaga}
                onCandidaturaSuccess={handleCandidaturaSuccess}
            />
        </div>
    );
}

export default VagasPageNew;
