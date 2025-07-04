import { useState, useEffect } from "react";

function SimpleListOfVagas() {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('SimpleListOfVagas: Iniciando fetch...');
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        console.log('fetchVagas: Começando...');
        try {
            setLoading(true);
            setError('');
            console.log('fetchVagas: Fazendo fetch para http://localhost:3000/vagas');
            
            const response = await fetch('http://localhost:3000/vagas');
            console.log('fetchVagas: Response recebida:', response);
            
            if (response.ok) {
                const data = await response.json();
                console.log('fetchVagas: Dados recebidos:', data);
                setVagas(data);
            } else {
                console.error('fetchVagas: Erro na resposta:', response.status, response.statusText);
                setError(`Erro ao carregar vagas: ${response.status}`);
            }
        } catch (error) {
            console.error('fetchVagas: Erro na requisição:', error);
            setError('Erro ao conectar com o servidor: ' + error.message);
        } finally {
            setLoading(false);
            console.log('fetchVagas: Finalizado');
        }
    };

    console.log('SimpleListOfVagas: Renderizando - Loading:', loading, 'Error:', error, 'Vagas:', vagas.length);

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
                    <p className="text-red-100 mb-4">ERRO: {error}</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">
                Lista Simples de Vagas ({vagas.length} encontradas)
            </h2>

            {vagas.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-white/70 text-lg">Nenhuma vaga encontrada</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {vagas.map((vaga) => (
                        <div key={vaga.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">{vaga.titulo}</h3>
                            <p className="text-blue-200">ID: {vaga.id} | Empresa: {vaga.empresa_nombre}</p>
                            <p className="text-white/80 mt-2">{vaga.descripcion}</p>
                            
                            <div className="flex space-x-2 mt-3">
                                {vaga.modalidade && (
                                    <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-100">
                                        {vaga.modalidade}
                                    </span>
                                )}
                                {vaga.tipo_contrato && (
                                    <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-100">
                                        {vaga.tipo_contrato}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SimpleListOfVagas;
