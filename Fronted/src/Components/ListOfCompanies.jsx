import React, { useState, useEffect } from "react";
import ModalEdit from "./ModalEdit";

function ListOfCompanies({ empresas, onDelete, onEdit }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ cnpj: "", nome: "", setor: "", contato: "", ajuda: "" });
    const [empresasState, setEmpresasState] = useState(empresas);
    const [modalOpen, setModalOpen] = useState(false);
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

    useEffect(() => {
        setEmpresasState(empresas);
    }, [empresas]);

    const onlyLetters = (str) => /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ ]+$/i.test(str);
    const onlyCNPJ = (str) => /^\d{14}$/.test(str);

    const formatCNPJ = (cnpj) => {
        if (!cnpj) return "";
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    };

    const startEdit = (empresa) => {
        setEditId(empresa.id);
        setForm({ cnpj: empresa.cnpj || "", nome: empresa.nombre, setor: empresa.sector, contato: empresa.contacto, ajuda: empresa.ayuda });
        setError("");
        setModalOpen(true);
    };

    const cancelEdit = () => {
        setEditId(null);
        setForm({ cnpj: "", nome: "", setor: "", contato: "", ajuda: "" });
        setModalOpen(false);
    };

    const handleChange = (ev) => {
        let value = ev.target.value;
        if (ev.target.name === "nome") {
            value = value.toUpperCase();
            if (error) setError("");
        }
        setForm({ ...form, [ev.target.name]: value });
    };

    const handleSave = () => {
        // Validar campos obligatorios
        if (!form.cnpj.trim() || !form.nome.trim() || !form.setor.trim() || !form.contato.trim() || !form.ajuda.trim()) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        if (!onlyCNPJ(form.cnpj)) {
            setError("CNPJ deve conter exatamente 14 números.");
            return;
        }
        if (!onlyLetters(form.nome)) {
            setError("Nome da empresa deve conter apenas letras e espaços.");
            return;
        }
        if (onEdit) onEdit(editId, {
            cnpj: form.cnpj,
            nombre: form.nome,
            sector: form.setor,
            contacto: form.contato,
            ayuda: form.ajuda
        });
        cancelEdit();
    };

    return (
        <section>
            {empresasState.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-800/90 rounded-2xl p-8 border border-blue-400/40 shadow-xl">
                        <svg className="w-16 h-16 text-blue-400/60 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-white text-lg font-semibold mb-2">Ainda não há empresas registradas no sistema</p>
                        <p className="text-blue-200/70 text-sm">As empresas parceiras aparecerão aqui</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {empresasState.map((empresa, idx) => (
                        <div key={empresa.id || idx} className="bg-gray-800/90 rounded-xl p-6 border border-blue-400/40 hover:bg-gray-700/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{empresa.nombre}</h3>
                                        <p className="text-blue-300 text-sm font-medium">{empresa.sector}</p>
                                    </div>
                                </div>
                                <div className="bg-blue-600/20 px-3 py-1 rounded-full">
                                    <span className="text-blue-300 text-xs font-semibold">PARCEIRA</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">{formatCNPJ(empresa.cnpj)}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm break-all">{empresa.contacto}</span>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">{empresa.ayuda}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group flex-1"
                                    onClick={() => startEdit(empresa)}
                                >
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Editar</span>
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
                                    onClick={() => onDelete(empresa.id)}
                                >
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span>Excluir</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modalOpen && (
                <ModalEdit
                    title="Editar Empresa"
                    open={modalOpen}
                    onClose={cancelEdit}
                >
                    <div className="bg-gray-50 rounded-lg p-6">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">CNPJ</label>
                                <input 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                    name="cnpj" 
                                    value={form.cnpj} 
                                    onChange={handleChange} 
                                    placeholder="CNPJ (14 números)" 
                                    maxLength={14} 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Nome da Empresa</label>
                                <input 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                    name="nome" 
                                    value={form.nome} 
                                    onChange={handleChange} 
                                    placeholder="Nome da empresa" 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Setor de Atuação</label>
                                <select 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="setor" 
                                    value={form.setor} 
                                    onChange={handleChange}
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
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Tipo de Ajuda Oferecida</label>
                                <select 
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="ajuda" 
                                    value={form.ajuda} 
                                    onChange={handleChange}
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
                            <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
                                <button 
                                    type="button" 
                                    className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 flex items-center space-x-2" 
                                    onClick={handleSave}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Salvar</span>
                                </button>
                                <button 
                                    type="button" 
                                    className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all duration-200 flex items-center space-x-2" 
                                    onClick={cancelEdit}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Cancelar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalEdit>
            )}
        </section>
    );
}

export default ListOfCompanies;
