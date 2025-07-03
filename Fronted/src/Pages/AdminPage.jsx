import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function AdminPage() {
    const [dados, setDados] = useState({
        paises: [],
        setores: [],
        habilidades: [],
        idiomas: [],
        tiposAjuda: [],
        candidaturas: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('paises');

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setLoading(true);
            
            const [paisesRes, setoresRes, habilidadesRes, idiomasRes, tiposAjudaRes] = await Promise.all([
                fetch('http://localhost:3000/paises'),
                fetch('http://localhost:3000/setores'),
                fetch('http://localhost:3000/habilidades'),
                fetch('http://localhost:3000/idiomas'),
                fetch('http://localhost:3000/tipos-ajuda')
            ]);

            const [paises, setores, habilidades, idiomas, tiposAjuda] = await Promise.all([
                paisesRes.json(),
                setoresRes.json(),
                habilidadesRes.json(),
                idiomasRes.json(),
                tiposAjudaRes.json()
            ]);

            setDados({ paises, setores, habilidades, idiomas, tiposAjuda });
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'paises', nome: 'Países', icon: '🌍', dados: dados.paises },
        { id: 'setores', nome: 'Setores', icon: '🏢', dados: dados.setores },
        { id: 'habilidades', nome: 'Habilidades', icon: '💡', dados: dados.habilidades },
        { id: 'idiomas', nome: 'Idiomas', icon: '💬', dados: dados.idiomas },
        { id: 'tiposAjuda', nome: 'Tipos de Ajuda', icon: '🤝', dados: dados.tiposAjuda }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white text-xl">Carregando dados relacionais...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        🗄️ Sistema Relacional
                    </h1>
                    <p className="text-xl text-white/80 mb-6">
                        Dados normalizados e relacionamentos do sistema
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white/20 text-white/80 hover:bg-white/30'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.nome}
                                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                                    {tab.dados.length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Conteúdo das tabs */}
                    <div className="min-h-[400px]">
                        {tabs.map(tab => (
                            activeTab === tab.id && (
                                <div key={tab.id} className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <span className="mr-3">{tab.icon}</span>
                                            {tab.nome}
                                        </h2>
                                        <span className="text-white/70">
                                            Total: {tab.dados.length} registros
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {tab.dados.map(item => (
                                            <div 
                                                key={item.id} 
                                                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-white mb-1">
                                                            {item.nome}
                                                        </h3>
                                                        {item.descricao && (
                                                            <p className="text-white/70 text-sm mb-2">
                                                                {item.descricao}
                                                            </p>
                                                        )}
                                                        {item.categoria && (
                                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-100 border border-blue-500/50">
                                                                {item.categoria}
                                                            </span>
                                                        )}
                                                        {item.continente && (
                                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-100 border border-green-500/50">
                                                                {item.continente}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-white/50 text-xs font-mono">
                                                        #{item.id}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {tab.dados.length === 0 && (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">📭</div>
                                            <p className="text-white/70 text-lg">
                                                Nenhum registro encontrado
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Estatísticas gerais */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {tabs.map(tab => (
                        <div key={tab.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <div className="text-center">
                                <div className="text-3xl mb-2">{tab.icon}</div>
                                <div className="text-2xl font-bold text-white">{tab.dados.length}</div>
                                <div className="text-white/70 text-sm">{tab.nome}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Informações técnicas */}
                <div className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">
                        📊 Informações do Sistema Relacional
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-white mb-2">🔗 Relacionamentos</h4>
                            <ul className="text-white/80 text-sm space-y-1">
                                <li>• Vagas → Empresas (empresa_id)</li>
                                <li>• Candidaturas → Migrantes + Vagas</li>
                                <li>• Empresas → Setores (setor_id)</li>
                                <li>• Migrantes → Países (pais_id)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-2">📋 Tabelas Normalizadas</h4>
                            <ul className="text-white/80 text-sm space-y-1">
                                <li>• {dados.paises.length} países cadastrados</li>
                                <li>• {dados.setores.length} setores empresariais</li>
                                <li>• {dados.habilidades.length} habilidades técnicas/soft skills</li>
                                <li>• {dados.idiomas.length} idiomas disponíveis</li>
                                <li>• {dados.tiposAjuda.length} tipos de ajuda oferecidos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AdminPage;
