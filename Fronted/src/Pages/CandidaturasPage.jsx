import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function CandidaturasPage() {
    const [candidaturas, setCandidaturas] = useState([]);
    const [migrantes, setMigrantes] = useState([]);
    const [selectedMigrante, setSelectedMigrante] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMigrantes();
    }, []);

    const fetchMigrantes = async () => {
        try {
            const response = await fetch('http://localhost:3000/migrantes');
            if (response.ok) {
                const data = await response.json();
                setMigrantes(data);
            }
        } catch (error) {
            console.error('Erro ao carregar migrantes:', error);
        }
    };

    const fetchCandidaturas = async (migranteId) => {
        if (!migranteId) return;
        
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/migrantes/${migranteId}/candidaturas`);
            
            if (response.ok) {
                const data = await response.json();
                setCandidaturas(data);
                setError('');
            } else {
                setError('Erro ao carregar candidaturas');
            }
        } catch (error) {
            setError('Erro ao conectar com o servidor');
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (candidaturaId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/candidaturas/${candidaturaId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Atualizar a lista
                fetchCandidaturas(selectedMigrante);
            } else {
                setError('Erro ao atualizar status');
            }
        } catch (error) {
            setError('Erro ao conectar com o servidor');
            console.error('Erro:', error);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pendente': 'bg-yellow-500/20 text-yellow-100 border-yellow-500/50',
            'analisando': 'bg-blue-500/20 text-blue-100 border-blue-500/50',
            'aprovado': 'bg-green-500/20 text-green-100 border-green-500/50',
            'rejeitado': 'bg-red-500/20 text-red-100 border-red-500/50'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-100 border-gray-500/50';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pendente': (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            'analisando': (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            'aprovado': (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            'rejeitado': (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        };
        return icons[status] || null;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Gerenciar Candidaturas
                        </h1>
                        <p className="text-xl text-white/80 mb-6">
                            Acompanhe o status das candidaturas dos migrantes
                        </p>
                    </div>
                </div>

                {/* Seletor de Migrante */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
                    <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl mr-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Selecionar Migrante</h2>
                    </div>
                    
                    <select
                        value={selectedMigrante}
                        onChange={(e) => {
                            setSelectedMigrante(e.target.value);
                            if (e.target.value) {
                                fetchCandidaturas(e.target.value);
                            } else {
                                setCandidaturas([]);
                            }
                        }}
                        className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                    >
                        <option value="" className="bg-gray-800">Selecione um migrante</option>
                        {migrantes.map(migrante => (
                            <option key={migrante.id} value={migrante.id} className="bg-gray-800">
                                {migrante.nombre} - {migrante.email}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista de Candidaturas */}
                {loading ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-white">Carregando candidaturas...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/50 shadow-xl">
                        <div className="text-center">
                            <p className="text-red-100">{error}</p>
                        </div>
                    </div>
                ) : selectedMigrante && candidaturas.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                        <div className="text-center">
                            <svg className="w-16 h-16 text-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-white/70 text-lg">Este migrante ainda não possui candidaturas</p>
                        </div>
                    </div>
                ) : candidaturas.length > 0 ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl mr-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Candidaturas</h2>
                                <p className="text-white/70">{candidaturas.length} candidatura{candidaturas.length !== 1 ? 's' : ''} encontrada{candidaturas.length !== 1 ? 's' : ''}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {candidaturas.map((candidatura) => (
                                <div key={candidatura.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{candidatura.vaga_titulo}</h3>
                                            <p className="text-blue-200 font-semibold">{candidatura.empresa_nombre}</p>
                                            <p className="text-white/60 text-sm">Candidatura enviada em {formatDate(candidatura.data_candidatura)}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full border flex items-center space-x-2 ${getStatusColor(candidatura.status)}`}>
                                            {getStatusIcon(candidatura.status)}
                                            <span className="font-semibold capitalize">{candidatura.status}</span>
                                        </div>
                                    </div>

                                    {candidatura.mensagem && (
                                        <div className="bg-white/10 rounded-lg p-4 mb-4">
                                            <h4 className="text-white font-semibold mb-2">Mensagem do Candidato:</h4>
                                            <p className="text-white/80">{candidatura.mensagem}</p>
                                        </div>
                                    )}

                                    {/* Ações para RH */}
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => updateStatus(candidatura.id, 'analisando')}
                                            disabled={candidatura.status === 'analisando'}
                                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors text-sm"
                                        >
                                            Marcar como Analisando
                                        </button>
                                        <button
                                            onClick={() => updateStatus(candidatura.id, 'aprovado')}
                                            disabled={candidatura.status === 'aprovado'}
                                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors text-sm"
                                        >
                                            Aprovar
                                        </button>
                                        <button
                                            onClick={() => updateStatus(candidatura.id, 'rejeitado')}
                                            disabled={candidatura.status === 'rejeitado'}
                                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors text-sm"
                                        >
                                            Rejeitar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </main>

            <Footer />
        </div>
    );
}

export default CandidaturasPage;
