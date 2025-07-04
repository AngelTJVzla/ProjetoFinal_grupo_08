import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ModalCandidatura from "../Components/ModalCandidatura";

function CandidaturasPage() {
    const [candidaturas, setCandidaturas] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [migrantes, setMigrantes] = useState([]);
    const [selectedMigrante, setSelectedMigrante] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('candidaturas'); // 'candidaturas' ou 'vagas'
    const [modalCandidatura, setModalCandidatura] = useState({
        isOpen: false,
        vaga: null
    });
    const [candidaturasMap, setCandidaturasMap] = useState(new Map()); // Para mapear vagas já candidatadas
    const [loadingCandidatura, setLoadingCandidatura] = useState(null); // ID da vaga em processo de candidatura

    useEffect(() => {
        fetchMigrantes();
        fetchVagas();
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

    const fetchVagas = async () => {
        try {
            const response = await fetch('http://localhost:3000/vagas');
            if (response.ok) {
                const data = await response.json();
                setVagas(data);
            }
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
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
                
                // Criar mapa de candidaturas para verificação rápida
                const newMap = new Map();
                data.forEach(candidatura => {
                    newMap.set(candidatura.vaga_id, candidatura);
                });
                setCandidaturasMap(newMap);
                
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

    // Função para verificar se já se candidatou a uma vaga
    const jaSeCandidata = (vagaId) => {
        return selectedMigrante && candidaturasMap.has(vagaId);
    };

    // Função para obter o status da candidatura
    const getStatusCandidatura = (vagaId) => {
        return candidaturasMap.get(vagaId)?.status || null;
    };

    const handleCandidatar = (vaga) => {
        setLoadingCandidatura(vaga.id);
        setModalCandidatura({
            isOpen: true,
            vaga: vaga
        });
    };

    const closeCandidaturaModal = () => {
        setLoadingCandidatura(null);
        setModalCandidatura({
            isOpen: false,
            vaga: null
        });
    };

    const handleCandidaturaSuccess = () => {
        // Refresh das candidaturas após candidatura bem-sucedida
        if (selectedMigrante) {
            fetchCandidaturas(selectedMigrante);
        }
        fetchVagas(); // Refresh das vagas também
    };

    // Componente do botão melhorado para candidatar-se
    const CandidatarButton = ({ vaga }) => {
        const jaCandidatado = jaSeCandidata(vaga.id);
        const statusCandidatura = getStatusCandidatura(vaga.id);
        const isLoading = loadingCandidatura === vaga.id;
        
        if (!selectedMigrante) {
            return (
                <div className="flex-1 btn-candidatura-disabled text-center cursor-not-allowed">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span>Selecione um migrante</span>
                    </div>
                </div>
            );
        }

        if (jaCandidatado) {
            const statusClasses = {
                'pendente': 'btn-candidatura-pendente',
                'analisando': 'btn-candidatura-analisando', 
                'aprovado': 'btn-candidatura-aprovado',
                'rejeitado': 'btn-candidatura-rejeitado'
            };

            const statusIcons = {
                'pendente': (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                'analisando': (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                ),
                'aprovado': (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                'rejeitado': (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };

            return (
                <div className={`flex-1 text-center cursor-default ${statusClasses[statusCandidatura] || statusClasses.pendente}`}>
                    <div className="flex items-center justify-center space-x-2">
                        {statusIcons[statusCandidatura] || statusIcons.pendente}
                        <span className="capitalize">
                            {statusCandidatura === 'pendente' && 'Candidatura Enviada'}
                            {statusCandidatura === 'analisando' && 'Em Análise'}
                            {statusCandidatura === 'aprovado' && 'Aprovado! 🎉'}
                            {statusCandidatura === 'rejeitado' && 'Não Selecionado'}
                            {!statusCandidatura && 'Já Candidatado'}
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <button 
                onClick={() => handleCandidatar(vaga)}
                disabled={isLoading}
                className={`group flex-1 btn-candidatura-force ${isLoading ? 'btn-candidatura:disabled' : ''}`}
                title={`Candidatar-se para a vaga: ${vaga.titulo}`}
            >
                {/* Efecto de brillo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
                
                <div className="relative flex items-center justify-center space-x-2">
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span className="font-bold">Abrindo...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-bold">Candidatar-se</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )}
                </div>
                
                {/* Partículas decorativas */}
                {!isLoading && (
                    <>
                        <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                        <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-300"></div>
                    </>
                )}
            </button>
        );
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
            'pendente': 'bg-yellow-600 text-white border-yellow-500',
            'analisando': 'bg-blue-600 text-white border-blue-500',
            'aprovado': 'bg-green-600 text-white border-green-500',
            'rejeitado': 'bg-red-600 text-white border-red-500'
        };
        return colors[status] || 'bg-gray-600 text-white border-gray-500';
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
                    <div className="bg-gray-800/90 rounded-3xl p-8 border border-blue-400/40 shadow-2xl">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-blue-600 p-4 rounded-2xl mr-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Central de Candidaturas
                            </h1>
                        </div>
                        <div className="bg-blue-600/20 rounded-xl p-4 border border-blue-400/30">
                            <p className="text-xl text-blue-100 mb-2">
                                Gerencie candidaturas e aplique-se para novas vagas
                            </p>
                            <div className="flex items-center justify-center space-x-6 text-blue-200 text-sm">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <span>Acompanhar Status</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                                    </svg>
                                    <span>Novas Oportunidades</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Abas */}
                <div className="bg-gray-800/90 rounded-2xl p-2 border border-blue-400/40 shadow-xl mb-8">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('candidaturas')}
                            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                                activeTab === 'candidaturas'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-blue-200 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            📋 Minhas Candidaturas
                        </button>
                        <button
                            onClick={() => setActiveTab('vagas')}
                            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                                activeTab === 'vagas'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-blue-200 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            💼 Candidatar-se a Vagas
                        </button>
                    </div>
                </div>

                {/* Conteúdo das Abas */}
                {activeTab === 'candidaturas' ? (
                    <>
                        {/* Seletor de Migrante */}
                        <div className="bg-gray-800/90 rounded-2xl p-6 border border-blue-400/40 shadow-xl mb-8">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-600 p-3 rounded-xl mr-4">
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
                                className="w-full p-3 border-2 border-blue-400 rounded-xl bg-gray-700 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    <button
                                        onClick={() => setActiveTab('vagas')}
                                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                                    >
                                        Candidatar-se a Vagas
                                    </button>
                                </div>
                            </div>
                        ) : candidaturas.length > 0 ? (
                            <div className="bg-gray-800/90 rounded-2xl p-6 border border-blue-400/40 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <div className="bg-blue-600 p-3 rounded-xl mr-4 shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Candidaturas</h2>
                                            <p className="text-blue-200">{candidaturas.length} candidatura{candidaturas.length !== 1 ? 's' : ''} encontrada{candidaturas.length !== 1 ? 's' : ''}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('vagas')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:scale-105"
                                    >
                                        Nova Candidatura
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {candidaturas.map((candidatura) => (
                                        <div key={candidatura.id} className="bg-gray-800/90 rounded-xl p-6 border border-blue-400/40 hover:bg-gray-700/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{candidatura.vaga_titulo}</h3>
                                                    <p className="text-blue-300 font-semibold">{candidatura.empresa_nombre}</p>
                                                    <p className="text-blue-200/70 text-sm">Candidatura enviada em {formatDate(candidatura.data_candidatura)}</p>
                                                </div>
                                                <div className={`px-4 py-2 rounded-full border flex items-center space-x-2 ${getStatusColor(candidatura.status)}`}>
                                                    {getStatusIcon(candidatura.status)}
                                                    <span className="font-semibold capitalize">{candidatura.status}</span>
                                                </div>
                                            </div>

                                            {candidatura.carta_apresentacao && (
                                                <div className="bg-gray-600/60 rounded-lg p-4 mb-4 border border-blue-400/30">
                                                    <h4 className="text-white font-semibold mb-2">Carta de Apresentação:</h4>
                                                    <p className="text-gray-200">{candidatura.carta_apresentacao}</p>
                                                </div>
                                            )}

                                            {candidatura.pretensao_salarial && (
                                                <div className="bg-gray-600/60 rounded-lg p-4 mb-4 border border-blue-400/30">
                                                    <h4 className="text-white font-semibold mb-2">Pretensão Salarial:</h4>
                                                    <p className="text-green-400 font-bold">R$ {new Intl.NumberFormat('pt-BR').format(candidatura.pretensao_salarial)}</p>
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
                    </>
                ) : (
                    /* Aba de Vagas Disponíveis */
                    <div className="bg-gray-800/90 rounded-2xl p-6 border border-blue-400/40 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="bg-green-600 p-3 rounded-xl mr-4 shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Vagas Disponíveis</h2>
                                    <p className="text-blue-200">{vagas.length} vaga{vagas.length !== 1 ? 's' : ''} disponível{vagas.length !== 1 ? 'eis' : ''}</p>
                                </div>
                            </div>
                            <button
                                onClick={fetchVagas}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105"
                            >
                                Atualizar
                            </button>
                        </div>

                        {vagas.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-blue-200 text-lg">Nenhuma vaga encontrada</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {vagas.map((vaga) => (
                                    <div key={vaga.id} className="bg-gray-800/90 rounded-xl p-6 border border-blue-400/40 hover:bg-gray-700/90 transition-all duration-200 shadow-lg hover:shadow-xl">
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
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white border border-blue-500">
                                                    {vaga.modalidade}
                                                </span>
                                            )}
                                            {vaga.nivel_experiencia && (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white border border-green-500">
                                                    {vaga.nivel_experiencia}
                                                </span>
                                            )}
                                            {vaga.tipo_contrato && (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white border border-purple-500">
                                                    {vaga.tipo_contrato}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex space-x-3">
                                            <CandidatarButton vaga={vaga} />
                                            <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40 group">
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span>Ver Detalhes</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
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

export default CandidaturasPage;
