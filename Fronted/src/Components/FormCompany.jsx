import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormCompany({ addEmpresa, empresas }) {
    const [form, setForm] = useState({
        cnpj: "",
        nome: "",
        setor: "",
        contato: "",
        ajuda: ""
    });
    const [error, setError] = useState("");

    // Opções predefinidas para setores
    const setoresDisponiveis = [
        "TECNOLOGIA",
        "CONSTRUÇÃO CIVIL",
        "ALIMENTÍCIO",
        "SAÚDE",
        "EDUCAÇÃO",
        "COMÉRCIO",
        "SERVIÇOS",
        "INDÚSTRIA",
        "TRANSPORTE",
        "AGRICULTURA",
        "HOTELARIA E TURISMO",
        "CONSULTORIA",
        "FINANCEIRO",
        "ENERGIA",
        "TELECOMUNICAÇÕES"
    ];

    // Opções predefinidas para tipos de ajuda
    const tiposAjudaDisponiveis = [
        "OFERTA DE EMPREGOS",
        "CAPACITAÇÃO PROFISSIONAL",
        "CURSOS DE IDIOMAS",
        "MENTORIA EMPRESARIAL",
        "APOIO JURÍDICO",
        "ASSISTÊNCIA MÉDICA",
        "SUPORTE PSICOLÓGICO",
        "DOAÇÃO DE MATERIAIS",
        "MORADIA TEMPORÁRIA",
        "APOIO ALIMENTAR",
        "INCLUSÃO DIGITAL",
        "REGULARIZAÇÃO DOCUMENTAL",
        "NETWORKING PROFISSIONAL",
        "MICROCRÉDITO",
        "OUTROS SERVIÇOS"
    ];

    const onlyLetters = (str) => /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ ]+$/i.test(str);
    const onlyCNPJ = (str) => /^\d{14}$/.test(str);

    const handleChange = (e) => { 
        let value = e.target.value;
        if (e.target.name === "nome") {
            value = value.toUpperCase();
            if (error) setError("");
        }
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar espacios en blanco al inicio o final
        const cnpj = form.cnpj.trim();
        const nome = form.nome.trim();
        const setor = form.setor.trim();
        const contato = form.contato.trim();
        const ajuda = form.ajuda.trim();

        if (!onlyCNPJ(cnpj)) {
            setError("CNPJ deve conter exatamente 14 números.");
            return;
        }
        if (!onlyLetters(nome)) {
            setError("Nome da empresa deve conter apenas letras e espaços.");
            return;
        }
        // Verificar si el CNPJ ya está registrado
        if (empresas && empresas.some(emp => emp.cnpj === cnpj)) {
            setError("Este CNPJ já está cadastrado.");
            return;
        }
        // Validar que ningún campo esté vacío después de trim
        if (!cnpj || !nome || !setor || !contato || !ajuda) {
            setError("Todos os campos são obrigatórios.");
            return;
        }
        addEmpresa({
            cnpj,
            nombre: nome, // backend espera 'nombre'
            sector: setor,
            contacto: contato,
            ayuda: ajuda
        });
        setForm({ cnpj: "", nome: "", setor: "", contato: "", ajuda: "" });
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Cadastro de Empresa Parceira
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">CNPJ</label>
                    <input 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        name="cnpj" 
                        value={form.cnpj} 
                        onChange={handleChange} 
                        placeholder="CNPJ (14 números)" 
                        required 
                        maxLength={14} 
                    />
                    {/* Mensaje visual si el CNPJ ya está registrado */}
                    {form.cnpj.length === 14 && empresas && empresas.some(emp => emp.cnpj === form.cnpj.trim()) && (
                        <div className="text-yellow-600 text-sm mt-1 font-semibold animate-pulse flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            CNPJ já cadastrado
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Nome da Empresa</label>
                    <input 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        name="nome" 
                        value={form.nome} 
                        onChange={handleChange} 
                        placeholder="Nome da empresa" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Setor de Atuação</label>
                    <select 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="setor" 
                        value={form.setor} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Selecione o setor de atuação</option>
                        {setoresDisponiveis.map((setor) => (
                            <option key={setor} value={setor}>{setor}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Contato</label>
                    <input 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        name="contato" 
                        value={form.contato} 
                        onChange={handleChange} 
                        placeholder="E-mail ou telefone de contato" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Tipo de Ajuda Oferecida</label>
                    <select 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="ajuda" 
                        value={form.ajuda} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Selecione o tipo de ajuda que pode oferecer</option>
                        {tiposAjudaDisponiveis.map((ajuda) => (
                            <option key={ajuda} value={ajuda}>{ajuda}</option>
                        ))}
                    </select>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    type="submit"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Cadastrar Empresa Parceira</span>
                </button>
            </div>
            
            {/* Link para ver lista de empresas */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-3">Quer conhecer outras empresas cadastradas?</p>
                <Link 
                    to="/empresas" 
                    className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Ver Empresas Cadastradas
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </form>
    );
}

export default FormCompany;
