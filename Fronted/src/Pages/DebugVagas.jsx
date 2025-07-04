import { useState, useEffect } from "react";

function DebugVagas() {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Componente DebugVagas montado');
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        console.log('Iniciando fetch de vagas...');
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/vagas');
            console.log('Response:', response);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Dados recebidos:', data);
                setVagas(data);
                setError('');
            } else {
                console.error('Erro na resposta:', response.status);
                setError('Erro ao carregar vagas');
            }
        } catch (error) {
            console.error('Erro no fetch:', error);
            setError('Erro ao conectar com o servidor');
        } finally {
            setLoading(false);
        }
    };

    console.log('Renderizando DebugVagas - loading:', loading, 'error:', error, 'vagas:', vagas);

    return (
        <div className="min-h-screen p-8 text-white">
            <h1 className="text-3xl mb-6">Debug - Vagas</h1>
            
            <div className="mb-4">
                <strong>Status:</strong>
                <ul className="ml-4">
                    <li>Loading: {loading ? 'SIM' : 'NÃO'}</li>
                    <li>Error: {error || 'Nenhum'}</li>
                    <li>Número de vagas: {vagas.length}</li>
                </ul>
            </div>

            {loading && (
                <div className="bg-blue-500/20 p-4 rounded mb-4">
                    <p>Carregando vagas...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-500/20 p-4 rounded mb-4">
                    <p>Erro: {error}</p>
                    <button 
                        onClick={fetchVagas}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-2"
                    >
                        Tentar Novamente
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="bg-green-500/20 p-4 rounded mb-4">
                    <h2 className="text-xl mb-2">Vagas encontradas: {vagas.length}</h2>
                    {vagas.map((vaga) => (
                        <div key={vaga.id} className="bg-white/10 p-3 rounded mb-2">
                            <h3 className="font-bold">{vaga.titulo}</h3>
                            <p>ID: {vaga.id} | Empresa: {vaga.empresa_nombre}</p>
                            <p>Descrição: {vaga.descripcion}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6">
                <a href="/vagas" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Voltar para Vagas
                </a>
            </div>
        </div>
    );
}

export default DebugVagas;
