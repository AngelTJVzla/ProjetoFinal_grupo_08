import { useState, useEffect } from "react";
import SimpleSelect from "./SimpleSelect";

function FormEditVaga({ vaga, onVagaUpdated, onCancel, empresas }) {
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

    useEffect(() => {
        if (vaga) {
            setFormData({
                empresa_id: vaga.empresa_id || '',
                titulo: vaga.titulo || '',
                descripcion: vaga.descripcion || '',
                salario: vaga.salario || '',
                tipo_contrato: vaga.tipo_contrato || '',
                nivel_experiencia: vaga.nivel_experiencia || '',
                modalidade: vaga.modalidade || '',
                requisitos: vaga.requisitos || '',
                beneficios: vaga.beneficios || '',
                data_limite: vaga.data_limite ? vaga.data_limite.split('T')[0] : ''
            });
        }
    }, [vaga]);

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
            const response = await fetch(`http://localhost:3000/vagas/${vaga.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Vaga atualizada com sucesso!');
                setTimeout(() => {
                    if (onVagaUpdated) onVagaUpdated();
                }, 1000);
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
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-xl mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Editar Vaga</h2>
                </div>
                <button
                    onClick={onCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Cancelar
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Empresa */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Empresa *
                        </label>
                        <div className="relative">
                            <select
                                name="empresa_id"
                                value={formData.empresa_id}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pr-10 rounded-xl bg-gray-800 text-white border-2 border-white/30 focus:border-blue-500 focus:outline-none appearance-none"
                            >
                                <option value="" className="bg-gray-800 text-white">
                                    Selecione uma empresa
                                </option>
                                {empresas.map(empresa => (
                                    <option 
                                        key={empresa.id} 
                                        value={empresa.id} 
                                        className="bg-gray-800 text-white"
                                    >
                                        {empresa.nombre}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
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
                        <SimpleSelect
                            name="tipo_contrato"
                            value={formData.tipo_contrato}
                            onChange={handleChange}
                            options={tiposContrato}
                            placeholder="Selecione"
                        />
                    </div>

                    {/* Nível de Experiência */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Nível de Experiência
                        </label>
                        <SimpleSelect
                            name="nivel_experiencia"
                            value={formData.nivel_experiencia}
                            onChange={handleChange}
                            options={niveisExperiencia}
                            placeholder="Selecione"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Modalidade */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Modalidade
                        </label>
                        <SimpleSelect
                            name="modalidade"
                            value={formData.modalidade}
                            onChange={handleChange}
                            options={modalidades}
                            placeholder="Selecione"
                        />
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

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? 'Atualizando vaga...' : 'Atualizar Vaga'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormEditVaga;
