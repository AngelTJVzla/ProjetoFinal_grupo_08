import React, { useState, useEffect } from 'react';

const ModalCandidatura = ({ isOpen, onClose, vaga, onCandidaturaSuccess }) => {
    const [formData, setFormData] = useState({
        migrante_id: '',
        carta_apresentacao: '',
        pretensao_salarial: '',
        disponibilidade_inicio: ''
    });
    const [migrantes, setMigrantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchMigrantes();
            // Limpar dados do formulário ao abrir
            setFormData({
                migrante_id: '',
                carta_apresentacao: '',
                pretensao_salarial: '',
                disponibilidade_inicio: ''
            });
            setError('');
        }
    }, [isOpen]);

    const fetchMigrantes = async () => {
        try {
            const response = await fetch('http://localhost:3000/migrantes');
            if (response.ok) {
                const data = await response.json();
                setMigrantes(data);
            }
        } catch (error) {
            console.error('Erro ao carregar migrantes:', error);
            setError('Erro ao carregar lista de migrantes');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.migrante_id) {
            setError('Por favor, selecione um migrante');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const candidaturaData = {
                migrante_id: parseInt(formData.migrante_id),
                vaga_id: vaga.id,
                carta_apresentacao: formData.carta_apresentacao,
                pretensao_salarial: formData.pretensao_salarial ? parseFloat(formData.pretensao_salarial) : null,
                disponibilidade_inicio: formData.disponibilidade_inicio || null
            };

            const response = await fetch('http://localhost:3000/candidaturas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidaturaData),
            });

            const data = await response.json();

            if (response.ok) {
                onCandidaturaSuccess();
                onClose();
                alert('🎉 Candidatura enviada com sucesso!');
            } else {
                setError(data.error || 'Erro ao enviar candidatura');
            }
        } catch (error) {
            setError('Erro ao conectar com o servidor');
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl mr-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Candidatar-se à Vaga</h2>
                                <p className="text-white/70">{vaga?.titulo} - {vaga?.empresa_nombre}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Informações da Vaga */}
                    <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                        <h3 className="font-semibold text-white mb-2">📋 Detalhes da Vaga</h3>
                        <div className="text-white/80 text-sm space-y-1">
                            <p><strong>Empresa:</strong> {vaga?.empresa_nombre}</p>
                            <p><strong>Título:</strong> {vaga?.titulo}</p>
                            {vaga?.salario && (
                                <p><strong>Salário:</strong> R$ {new Intl.NumberFormat('pt-BR').format(vaga.salario)}</p>
                            )}
                            {vaga?.modalidade && <p><strong>Modalidade:</strong> {vaga.modalidade}</p>}
                            {vaga?.nivel_experiencia && <p><strong>Nível:</strong> {vaga.nivel_experiencia}</p>}
                        </div>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Seleção de Migrante */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Migrante * 👤
                            </label>
                            <select
                                name="migrante_id"
                                value={formData.migrante_id}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pr-10 rounded-xl bg-gray-800 text-white border-2 border-white/30 focus:border-blue-500 focus:outline-none appearance-none"
                            >
                                <option value="">Selecione o migrante</option>
                                {migrantes.map(migrante => (
                                    <option key={migrante.id} value={migrante.id}>
                                        {migrante.nombre} - {migrante.pais}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Carta de Apresentação */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Carta de Apresentação 📝
                            </label>
                            <textarea
                                name="carta_apresentacao"
                                value={formData.carta_apresentacao}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Conte um pouco sobre você, sua experiência e por que tem interesse nesta vaga..."
                                className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                            />
                        </div>

                        {/* Pretensão Salarial */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Pretensão Salarial (R$) 💰
                            </label>
                            <input
                                type="number"
                                name="pretensao_salarial"
                                value={formData.pretensao_salarial}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                placeholder="Ex: 3500.00"
                                className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                            />
                        </div>

                        {/* Disponibilidade */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Disponibilidade para Início 📅
                            </label>
                            <input
                                type="date"
                                name="disponibilidade_inicio"
                                value={formData.disponibilidade_inicio}
                                onChange={handleChange}
                                className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                            />
                        </div>

                        {/* Erro */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                                <p className="text-red-100">❌ {error}</p>
                            </div>
                        )}

                        {/* Botões */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 btn-candidatura-force transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Enviando...
                                    </div>
                                ) : (
                                    'Enviar Candidatura 🚀'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalCandidatura;
