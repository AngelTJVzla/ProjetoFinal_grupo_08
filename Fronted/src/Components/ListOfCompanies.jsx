import React, { useState, useEffect } from "react";
import ModalEdit from "./ModalEdit";

function ListOfCompanies({ empresas, onDelete, onEdit }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ cnpj: "", nome: "", setor: "", contato: "", ajuda: "" });
    const [empresasState, setEmpresasState] = useState(empresas);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setEmpresasState(empresas);
    }, [empresas]);

    const onlyLetters = (str) => /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ ]+$/i.test(str);
    const onlyCNPJ = (str) => /^\d{14}$/.test(str);

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
        if (["nome", "setor"].includes(ev.target.name)) {
            value = value.toUpperCase();
            if (error) setError("");
        }
        setForm({ ...form, [ev.target.name]: value });
    };
    const handleSave = () => {
        if (!onlyCNPJ(form.cnpj)) {
            setError("CNPJ deve conter exatamente 14 números.");
            return;
        }
        if (!onlyLetters(form.nome) || !onlyLetters(form.setor)) {
            setError("Nome e setor devem conter apenas letras e espaços.");
            return;
        }
        if (onEdit) onEdit(editId, {
            cnpj: form.cnpj,
            nombre: form.nome,
            sector: form.setor,
            contacto: form.contato,
            ajuda: form.ajuda
        });
        cancelEdit();
    };

    return (
        <section className="mt-4 ">
            <h2 className="text-lg font-bold mb-2 text-white title-animate">Empresas interessadas em ajudar</h2>
            <div className="overflow-x-auto mt-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                <table className="min-w-full bg-white rounded-lg shadow text-sm md:text-base">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">CNPJ</th>
                            <th className="px-4 py-2 border-b">Nome</th>
                            <th className="px-4 py-2 border-b">Setor</th>
                            <th className="px-4 py-2 border-b">Contato</th>
                            <th className="px-4 py-2 border-b">Tipo de ajuda</th>
                            <th className="px-4 py-2 border-b">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresasState.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-4">Ainda não há empresas registradas.</td>
                            </tr>
                        ) : (
                            empresasState.map((empresa, idx) => (
                                <tr key={empresa.id || idx} className="border-b">
                                    <>
                                        <td className="px-2 py-1 font-mono text-purple-700">{empresa.cnpj || <span className="text-gray-400">---</span>}</td>
                                        <td className="px-2 py-1 font-semibold text-blue-700">{empresa.nombre}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{empresa.sector}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{empresa.contacto}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{empresa.ayuda}</td>
                                        <td className="px-2 py-1 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-center">
                                            <button
                                                className="relative overflow-hidden px-4 py-2 text-sm rounded text-white font-semibold bg-blue-500 hover:bg-blue-700 btn-effect-18-blue transition-all duration-200"
                                                onClick={() => startEdit(empresa)}
                                            >Editar</button>
                                            <button
                                                className="relative overflow-hidden px-4 py-2 text-sm rounded text-white font-semibold bg-red-500 hover:bg-red-700 btn-effect-18-red transition-all duration-200"
                                                onClick={() => onDelete(empresa.id)}
                                            >Excluir</button>
                                        </td>
                                    </>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {modalOpen && (
                <ModalEdit
                    title="Editar Empresa"
                    open={modalOpen}
                    onClose={cancelEdit}
                >
                    <div className="flex flex-col gap-2">
                        <input className="form-input mb-2 p-2 border rounded w-full" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ (apenas números)" maxLength={14} />
                        <input className="form-input mb-2 p-2 border rounded w-full" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da empresa" />
                        <input className="form-input mb-2 p-2 border rounded w-full" name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" />
                        <input className="form-input mb-2 p-2 border rounded w-full" name="contato" value={form.contato} onChange={handleChange} placeholder="Contato (e-mail ou telefone)" />
                        <input className="form-input mb-2 p-2 border rounded w-full" name="ajuda" value={form.ajuda} onChange={handleChange} placeholder="Tipo de ajuda oferecida" />
                        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                        <div className="flex gap-2 mt-2">
                            <button className="btn-effect-7 flex-1 bg-purple-600 text-white" onClick={handleSave}>Salvar</button>
                            <button className="btn-effect-7 flex-1 bg-gray-400 text-white" onClick={cancelEdit}>Cancelar</button>
                        </div>
                    </div>
                </ModalEdit>
            )}
        </section>
    );
}

export default ListOfCompanies;
