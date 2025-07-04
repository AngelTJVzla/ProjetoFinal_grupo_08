import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function AdminPage() {
    console.log('AdminPage: Componente iniciado');
    
    const [dados, setDados] = useState({
        paises: [],
        setores: [],
        habilidades: [],
        idiomas: [],
        tiposAjuda: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('paises');

    useEffect(() => {
        console.log('AdminPage: useEffect executado');
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            console.log('AdminPage: Iniciando carregamento de dados');
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

            console.log('AdminPage: Dados carregados', { paises, setores, habilidades, idiomas, tiposAjuda });
            setDados({ paises, setores, habilidades, idiomas, tiposAjuda });
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            console.log('AdminPage: Finalizando carregamento');
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
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="bg-gray-800/90 rounded-3xl p-8 border border-blue-400/40 shadow-2xl">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-blue-600 p-4 rounded-2xl mr-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM12 19l9-7-9-7-9 7 9 7z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Central de Administração
                            </h1>
                        </div>
                        <div className="bg-blue-600/20 rounded-xl p-4 border border-blue-400/30">
                            <p className="text-xl text-blue-100 mb-2">
                                Gerencie dados relacionais e configurações do sistema
                            </p>
                            <div className="flex items-center justify-center space-x-6 text-blue-200 text-sm">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                    </svg>
                                    <span>Dados Normalizados</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Sistema Relacional</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Abas */}
                <div className="bg-gray-800/90 rounded-2xl p-2 border border-blue-400/40 shadow-xl mb-8">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-blue-200 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                <span className="mr-2 text-lg">{tab.icon}</span>
                                {tab.nome}
                                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                                    {tab.dados.length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Conteúdo das Abas */}
                <div className="bg-gray-800/90 rounded-2xl p-6 border border-blue-400/40 shadow-xl mb-8">
                    <div className="min-h-[400px]">
                        {tabs.map(tab => (
                            activeTab === tab.id && (
                                <div key={tab.id} className="space-y-6">
                                    {/* Header da seção */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center">
                                            <div className="bg-blue-600 p-3 rounded-xl mr-4">
                                                <span className="text-2xl">{tab.icon}</span>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">
                                                    {tab.nome}
                                                </h2>
                                                <p className="text-blue-200 text-sm">
                                                    Dados normalizados e relacionais
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-blue-600/20 rounded-xl px-4 py-2 border border-blue-400/30">
                                            <span className="text-blue-100 font-semibold">
                                                {tab.dados.length} registros
                                            </span>
                                        </div>
                                    </div>

                                    {/* Grid de cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {tab.dados.map(item => (
                                            <div 
                                                key={item.id} 
                                                className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 hover:shadow-xl"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-800 text-lg mb-2">
                                                            {item.nome}
                                                        </h3>
                                                        {item.descricao && (
                                                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                                                {item.descricao}
                                                            </p>
                                                        )}
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.categoria && (
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                                    </svg>
                                                                    {item.categoria}
                                                                </span>
                                                            )}
                                                            {item.continente && (
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    {item.continente}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-100 rounded-lg px-2 py-1 ml-3">
                                                        <span className="text-gray-500 text-xs font-mono">
                                                            #{item.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Estado vazio */}
                                    {tab.dados.length === 0 && (
                                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 shadow-xl">
                                            <div className="text-center">
                                                <div className="text-6xl mb-4">📭</div>
                                                <h3 className="text-xl font-bold text-white mb-2">
                                                    Nenhum registro encontrado
                                                </h3>
                                                <p className="text-blue-200">
                                                    Não há dados para exibir nesta categoria
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Estadísticas generales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {tabs.map(tab => (
                        <div key={tab.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">{tab.icon}</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mb-1">{tab.dados.length}</div>
                            <div className="text-gray-600 text-sm font-semibold">{tab.nome}</div>
                        </div>
                    ))}
                </div>

                {/* Informações técnicas */}
                <div className="bg-gray-800/90 rounded-2xl p-6 border border-blue-400/40 shadow-xl">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-600 p-3 rounded-xl mr-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                            Informações do Sistema Relacional
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                Relacionamentos
                            </h4>
                            <ul className="text-blue-200 text-sm space-y-2">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                    Vagas → Empresas (empresa_id)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                    Candidaturas → Migrantes + Vagas
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                    Empresas → Setores (setor_id)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                    Migrantes → Países (pais_id)
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
                                </svg>
                                Tabelas Normalizadas
                            </h4>
                            <ul className="text-blue-200 text-sm space-y-2">
                                <li className="flex items-center justify-between">
                                    <span>Países cadastrados</span>
                                    <span className="bg-blue-600/20 px-2 py-1 rounded-full text-xs font-semibold">
                                        {dados.paises.length}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Setores empresariais</span>
                                    <span className="bg-blue-600/20 px-2 py-1 rounded-full text-xs font-semibold">
                                        {dados.setores.length}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Habilidades técnicas</span>
                                    <span className="bg-blue-600/20 px-2 py-1 rounded-full text-xs font-semibold">
                                        {dados.habilidades.length}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Idiomas disponíveis</span>
                                    <span className="bg-blue-600/20 px-2 py-1 rounded-full text-xs font-semibold">
                                        {dados.idiomas.length}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Tipos de ajuda</span>
                                    <span className="bg-blue-600/20 px-2 py-1 rounded-full text-xs font-semibold">
                                        {dados.tiposAjuda.length}
                                    </span>
                                </li>
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