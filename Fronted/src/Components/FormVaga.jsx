import { useState } from "react";

function FormVaga({ onVagaAdded, empresas }) {
    const [formData, setFormData] = useState({
        empresa_id: '',
        titulo: '',
        descripcion: '',
        salario: '',
        tipo_contrato: '',
        nivel_experiencia: '',
        modalidade: '',
        requisitos: '',
        beneficios: '',
        data_limite: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const tiposContrato = ['CLT', 'PJ', 'Estágio', 'Temporário', 'Freelancer'];
    const niveisExperiencia = ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Especialista'];
    const modalidades = ['Presencial', 'Remoto', 'Híbrido'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/vagas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Vaga criada com sucesso!');
                setFormData({
                    empresa_id: '',
                    titulo: '',
                    descripcion: '',
                    salario: '',
                    tipo_contrato: '',
                    nivel_experiencia: '',
                    modalidade: '',
                    requisitos: '',
                    beneficios: '',
                    data_limite: ''
                });
                if (onVagaAdded) onVagaAdded();
            } else {
                setMessage(`❌ Erro: ${data.error}`);
            }
        } catch (error) {
            setMessage('❌ Erro ao conectar com o servidor');
            console.error('Erro:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Nova Vaga de Emprego</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Empresa */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Empresa *
                        </label>
                        <select
                            name="empresa_id"
                            value={formData.empresa_id}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        >
                            <option value="" className="bg-gray-800">Selecione uma empresa</option>
                            {empresas.map(empresa => (
                                <option key={empresa.id} value={empresa.id} className="bg-gray-800">
                                    {empresa.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Título */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Título da Vaga *
                        </label>
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Desenvolvedor React Júnior"
                            className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        />
                    </div>
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-white font-semibold mb-2">
                        Descrição da Vaga *
                    </label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Descreva as principais responsabilidades e atividades da vaga..."
                        className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Salário */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Salário (R$)
                        </label>
                        <input
                            type="number"
                            name="salario"
                            value={formData.salario}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            placeholder="Ex: 3500.00"
                            className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        />
                    </div>

                    {/* Tipo de Contrato */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Tipo de Contrato
                        </label>
                        <select
                            name="tipo_contrato"
                            value={formData.tipo_contrato}
                            onChange={handleChange}
                            className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        >
                            <option value="" className="bg-gray-800">Selecione</option>
                            {tiposContrato.map(tipo => (
                                <option key={tipo} value={tipo} className="bg-gray-800">
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nível de Experiência */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Nível de Experiência
                        </label>
                        <select
                            name="nivel_experiencia"
                            value={formData.nivel_experiencia}
                            onChange={handleChange}
                            className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        >
                            <option value="" className="bg-gray-800">Selecione</option>
                            {niveisExperiencia.map(nivel => (
                                <option key={nivel} value={nivel} className="bg-gray-800">
                                    {nivel}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Modalidade */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Modalidade
                        </label>
                        <select
                            name="modalidade"
                            value={formData.modalidade}
                            onChange={handleChange}
                            className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        >
                            <option value="" className="bg-gray-800">Selecione</option>
                            {modalidades.map(modalidade => (
                                <option key={modalidade} value={modalidade} className="bg-gray-800">
                                    {modalidade}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Data Limite */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Data Limite para Candidaturas
                        </label>
                        <input
                            type="date"
                            name="data_limite"
                            value={formData.data_limite}
                            onChange={handleChange}
                            className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        />
                    </div>
                </div>

                {/* Requisitos */}
                <div>
                    <label className="block text-white font-semibold mb-2">
                        Requisitos
                    </label>
                    <textarea
                        name="requisitos"
                        value={formData.requisitos}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Ex: Conhecimento em React, TypeScript, experiência com APIs REST..."
                        className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                    />
                </div>

                {/* Benefícios */}
                <div>
                    <label className="block text-white font-semibold mb-2">
                        Benefícios
                    </label>
                    <textarea
                        name="beneficios"
                        value={formData.beneficios}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Ex: Vale alimentação, plano de saúde, home office..."
                        className="w-full p-3 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                    />
                </div>

                {message && (
                    <div className={`p-4 rounded-xl ${message.includes('✅') ? 'bg-green-500/20 border border-green-500/50 text-green-100' : 'bg-red-500/20 border border-red-500/50 text-red-100'}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSubmitting ? 'Criando vaga...' : 'Criar Vaga'}
                </button>
            </form>
        </div>
    );
}

export default FormVaga;
