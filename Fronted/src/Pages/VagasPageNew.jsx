import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function VagasPageNew() {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Vagas Disponíveis</h2>
                        <button
                            onClick={fetchVagas}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Atualizar
                        </button>
                    </div>

                    {loading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-white">Carregando vagas...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
                            <p className="text-red-100">❌ {error}</p>
                            <button
                                onClick={fetchVagas}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-2"
                            >
                                Tentar Novamente
                            </button>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <p className="text-white/70 mb-4">
                                {vagas.length} vaga{vagas.length !== 1 ? 's' : ''} encontrada{vagas.length !== 1 ? 's' : ''}
                            </p>

                            {vagas.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-white/70 text-lg">Nenhuma vaga encontrada</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {vagas.map((vaga) => (
                                        <div key={vaga.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{vaga.titulo}</h3>
                                                    <p className="text-blue-200 font-semibold">{vaga.empresa_nombre}</p>
                                                </div>
                                                <div className="text-right">
                                                    {vaga.salario && (
                                                        <p className="text-green-300 font-bold">
                                                            R$ {new Intl.NumberFormat('pt-BR').format(vaga.salario)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-white/80 mb-4">{vaga.descripcion}</p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {vaga.modalidade && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-100 border border-blue-500/50">
                                                        {vaga.modalidade}
                                                    </span>
                                                )}
                                                {vaga.nivel_experiencia && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-100 border border-green-500/50">
                                                        {vaga.nivel_experiencia}
                                                    </span>
                                                )}
                                                {vaga.tipo_contrato && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-100 border border-purple-500/50">
                                                        {vaga.tipo_contrato}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex space-x-3">
                                                <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                                                    Candidatar-se
                                                </button>
                                                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 border border-white/20">
                                                    Ver Detalhes
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
        </div>
    );
}

export default VagasPageNew;
