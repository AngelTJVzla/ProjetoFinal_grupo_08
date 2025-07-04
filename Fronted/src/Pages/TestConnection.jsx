import { useState } from 'react';

function TestConnection() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testBackend = async () => {
        setLoading(true);
        setResult('Testando...');
        
        try {
            // Test 1: Fetch vagas
            const response = await fetch('http://localhost:3000/vagas');
            console.log('Response:', response);
            
            if (response.ok) {
                const data = await response.json();
                setResult(`✅ Sucesso! ${data.length} vagas encontradas\n\nPrimeira vaga:\n${JSON.stringify(data[0], null, 2)}`);
            } else {
                setResult(`❌ Erro HTTP: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            setResult(`❌ Erro de conexão: ${error.message}`);
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 text-white">
            <h1 className="text-3xl mb-6">Teste de Conexão</h1>
            
            <button 
                onClick={testBackend}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg mb-4"
            >
                {loading ? 'Testando...' : 'Testar Conexão com Backend'}
            </button>
            
            {result && (
                <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-auto">
                    {result}
                </pre>
            )}
            
            <div className="mt-6">
                <a href="/vagas" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    Ir para Vagas
                </a>
            </div>
        </div>
    );
}

export default TestConnection;
