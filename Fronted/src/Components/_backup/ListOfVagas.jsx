import { useState, useEffect } from "react";

function ListOfVagas({ onEditVaga }) {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        console.log('ListOfVagas: Componente montado, iniciando fetchVagas');
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        console.log('ListOfVagas: fetchVagas iniciado');
        try {
            setLoading(true);
            console.log('ListOfVagas: Fazendo fetch para http://localhost:3000/vagas');
            const response = await fetch('http://localhost:3000/vagas');
            console.log('ListOfVagas: Response recebida:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('ListOfVagas: Dados recebidos:', data);
                setVagas(data);
                setError('');
            } else {
                console.error('ListOfVagas: Erro na resposta:', response.status);
                setError('Erro ao carregar vagas');
            }
        } catch (error) {
            console.error('ListOfVagas: Erro no fetch:', error);
            setError('Erro ao conectar com o servidor');
        } finally {
            setLoading(false);
            console.log('ListOfVagas: fetchVagas finalizado');
        }
    };

    const deleteVaga = async (vagaId) => {
        if (!confirm('Tem certeza que deseja deletar esta vaga?')) {
            return;
        }

        try {
            setDeletingId(vagaId);
            const response = await fetch(`http://localhost:3000/vagas/${vagaId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setVagas(prev => prev.filter(vaga => vaga.id !== vagaId));
                setError('');
            } else {
                const data = await response.json();
                setError(`Erro ao deletar vaga: ${data.error}`);
            }
        } catch (error) {
            setError('Erro ao conectar com o servidor');
            console.error('Erro:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const formatSalary = (salario) => {
        if (!salario) return 'A combinar';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(salario);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getBadgeColor = (type, value) => {
        const colors = {
            modalidade: {
                'Remoto': 'bg-green-500/20 text-green-100 border-green-500/50',
                'Presencial': 'bg-blue-500/20 text-blue-100 border-blue-500/50',
                'Híbrido': 'bg-purple-500/20 text-purple-100 border-purple-500/50'
            },
            nivel_experiencia: {
                'Estágio': 'bg-yellow-500/20 text-yellow-100 border-yellow-500/50',
                'Júnior': 'bg-green-500/20 text-green-100 border-green-500/50',
                'Pleno': 'bg-blue-500/20 text-blue-100 border-blue-500/50',
                'Sênior': 'bg-purple-500/20 text-purple-100 border-purple-500/50',
                'Especialista': 'bg-red-500/20 text-red-100 border-red-500/50'
            },
            tipo_contrato: {
                'CLT': 'bg-green-500/20 text-green-100 border-green-500/50',
                'PJ': 'bg-blue-500/20 text-blue-100 border-blue-500/50',
                'Estágio': 'bg-yellow-500/20 text-yellow-100 border-yellow-500/50',
                'Temporário': 'bg-orange-500/20 text-orange-100 border-orange-500/50',
                'Freelancer': 'bg-purple-500/20 text-purple-100 border-purple-500/50'
            }
        };
        return colors[type]?.[value] || 'bg-gray-500/20 text-gray-100 border-gray-500/50';
    };

    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white">Carregando vagas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/50 shadow-xl">
                <div className="text-center">
                    <svg className="w-12 h-12 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-100 mb-4">{error}</p>
                    <button
                        onClick={fetchVagas}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Vagas Disponíveis</h2>
                        <p className="text-white/70">{vagas.length} vaga{vagas.length !== 1 ? 's' : ''} encontrada{vagas.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
                <button
                    onClick={fetchVagas}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Atualizar</span>
                </button>
            </div>

            {vagas.length === 0 ? (
                <div className="text-center py-8">
                    <svg className="w-16 h-16 text-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341" />
                    </svg>
                    <p className="text-white/70 text-lg">Nenhuma vaga encontrada</p>
                    <p className="text-white/50">As empresas podem cadastrar novas vagas a qualquer momento</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {vagas.map((vaga) => (
                        <div key={vaga.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:transform hover:scale-105">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{vaga.titulo}</h3>
                                    <p className="text-blue-200 font-semibold">{vaga.empresa_nombre}</p>
                                    {vaga.setor_nome && (
                                        <p className="text-white/60 text-sm">{vaga.setor_nome}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-green-300 font-bold text-lg">{formatSalary(vaga.salario)}</p>
                                    <p className="text-white/60 text-sm">
                                        {formatDate(vaga.data_criacao)}
                                    </p>
                                </div>
                            </div>

                            <p className="text-white/80 mb-4 line-clamp-3">{vaga.descripcion}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {vaga.modalidade && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor('modalidade', vaga.modalidade)}`}>
                                        {vaga.modalidade}
                                    </span>
                                )}
                                {vaga.nivel_experiencia && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor('nivel_experiencia', vaga.nivel_experiencia)}`}>
                                        {vaga.nivel_experiencia}
                                    </span>
                                )}
                                {vaga.tipo_contrato && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor('tipo_contrato', vaga.tipo_contrato)}`}>
                                        {vaga.tipo_contrato}
                                    </span>
                                )}
                            </div>

                            {vaga.requisitos && (
                                <div className="mb-4">
                                    <h4 className="text-white font-semibold mb-2">Requisitos:</h4>
                                    <p className="text-white/70 text-sm">{vaga.requisitos}</p>
                                </div>
                            )}

                            {vaga.beneficios && (
                                <div className="mb-4">
                                    <h4 className="text-white font-semibold mb-2">Benefícios:</h4>
                                    <p className="text-white/70 text-sm">{vaga.beneficios}</p>
                                </div>
                            )}

                            {vaga.data_limite && (
                                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-4">
                                    <p className="text-yellow-100 text-sm">
                                        <strong>Prazo:</strong> Até {formatDate(vaga.data_limite)}
                                    </p>
                                </div>
                            )}

                            <div className="flex space-x-3">
                                <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                                    Candidatar-se
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 border border-white/20">
                                    Ver Detalhes
                                </button>
                                
                                {/* Botões de administração */}
                                <button 
                                    onClick={() => onEditVaga && onEditVaga(vaga)}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center"
                                    title="Editar Vaga"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                
                                <button 
                                    onClick={() => deleteVaga(vaga.id)}
                                    disabled={deletingId === vaga.id}
                                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center"
                                    title="Deletar Vaga"
                                >
                                    {deletingId === vaga.id ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListOfVagas;
