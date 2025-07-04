import React, { useState } from "react";
import ModalEdit from "./ModalEdit";

function ListOfMigrantes({ migrantes, onDelete, onEdit }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ cpf: "", nome: "", pais: "", habilidades: "", email: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const [editError, setEditError] = useState("");

    const onlyLetters = (str) => /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ ]+$/i.test(str);
    const onlyNumbers = (str) => /^\d{11}$/.test(str);

    const startEdit = (m) => {
        setEditId(m.id);
        setForm({ cpf: m.cpf || "", nome: m.nombre, pais: m.pais, habilidades: m.habilidades, email: m.email });
        setModalOpen(true);
    };

    const cancelEdit = () => {
        setEditId(null);
        setForm({ cpf: "", nome: "", pais: "", habilidades: "", email: "" });
        setModalOpen(false);
    };

    const handleChange = (e) => {
        let value = e.target.value;
        if (["nome", "pais", "habilidades"].includes(e.target.name)) {
            value = value.replace(/[^A-Za-zÁÉÍÓÚÃÕÂÊÎÔÛÇáéíóúãõâêîôûç ]/g, "");
        }
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSave = () => {
        if (form.nome.trim().split(/\s+/).length < 2) {
            setEditError("O nome deve conter pelo menos nome e sobrenome.");
            return;
        }
        if (!onlyLetters(form.nome) || !onlyLetters(form.pais) || !onlyLetters(form.habilidades)) {
            setEditError("Nome, país e habilidades devem conter apenas letras e espaços.");
            return;
        }
        if (!onlyNumbers(form.cpf)) {
            setEditError("CPF deve conter exatamente 11 números.");
            return;
        }
        setEditError("");
        if (onEdit) onEdit(editId, {
            cpf: form.cpf,
            nombre: form.nome.toUpperCase(),
            pais: form.pais.toUpperCase(),
            habilidades: form.habilidades.toUpperCase(),
            email: form.email
        });
        cancelEdit();
    };

    const formatCPF = (cpf) => {
        if (!cpf) return "";
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    return (
        <section>
            {migrantes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-800/90 rounded-2xl p-8 border border-blue-400/40 shadow-xl">
                        <svg className="w-16 h-16 text-blue-400/60 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-white text-lg font-semibold mb-2">Ainda não há migrantes registrados no sistema</p>
                        <p className="text-blue-200/70 text-sm">Os migrantes cadastrados aparecerão aqui</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {migrantes.map((migrante, idx) => (
                        <div key={migrante.id || idx} className="bg-gray-800/90 rounded-xl p-6 border border-blue-400/40 hover:bg-gray-700/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{migrante.nombre}</h3>
                                        <p className="text-blue-300 text-sm">ID: {migrante.id}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-purple-600/30 p-2 rounded-lg border border-purple-500/50">
                                        <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-blue-200/70 text-xs font-medium uppercase tracking-wide">CPF</p>
                                        <p className="text-purple-300 font-mono text-sm">{formatCPF(migrante.cpf) || "Não informado"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-600/30 p-2 rounded-lg border border-green-500/50">
                                        <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-blue-200/70 text-xs font-medium uppercase tracking-wide">País de Origem</p>
                                        <p className="text-green-300 text-sm font-medium">{migrante.pais}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-600/30 p-2 rounded-lg border border-blue-500/50">
                                        <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-blue-200/70 text-xs font-medium uppercase tracking-wide">Habilidades</p>
                                        <p className="text-blue-300 text-sm font-medium">{migrante.habilidades}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="bg-yellow-600/30 p-2 rounded-lg border border-yellow-500/50">
                                        <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-blue-200/70 text-xs font-medium uppercase tracking-wide">E-mail</p>
                                        <p className="text-yellow-300 text-sm break-all font-medium">{migrante.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
                                    onClick={() => startEdit(migrante)}
                                >
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Editar</span>
                                </button>
                                {onDelete && (
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
                                        onClick={() => onDelete(migrante.id)}
                                    >
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span>Excluir</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ModalEdit open={modalOpen} title="Editar Migrante" onClose={cancelEdit}>
                <div className="bg-gray-50 rounded-lg p-6">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">CPF</label>
                            <input 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                name="cpf" 
                                value={form.cpf} 
                                onChange={handleChange} 
                                placeholder="CPF (11 números)" 
                                maxLength={11} 
                                pattern="\d{11}" 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Nome Completo</label>
                            <input 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                name="nome" 
                                value={form.nome} 
                                onChange={handleChange} 
                                placeholder="Nome completo" 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">País de Origem</label>
                            <input 
                                className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed" 
                                name="pais" 
                                value={form.pais} 
                                placeholder="País de origem" 
                                readOnly 
                                tabIndex={-1} 
                            />
                            <p className="text-gray-500 text-xs mt-1">Este campo não pode ser editado</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Habilidades</label>
                            <input 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                name="habilidades" 
                                value={form.habilidades} 
                                onChange={handleChange} 
                                placeholder="Habilidades ou profissão" 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
                            <input 
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                name="email" 
                                value={form.email} 
                                onChange={handleChange} 
                                placeholder="E-mail" 
                            />
                        </div>
                        {editError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                <p className="text-sm">{editError}</p>
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
        </section>
    );
}

export default ListOfMigrantes;
