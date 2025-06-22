import React, { useState, useEffect } from "react";
import ModalEdit from "./ModalEdit";

function ListOfCompanies({ empresas, onDelete, onEdit }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ nome: "", setor: "", contato: "", ajuda: "" });
    const [empresasState, setEmpresasState] = useState(empresas);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setEmpresasState(empresas);
    }, [empresas]);

    const startEdit = (empresa) => {
        setEditId(empresa.id);
        setForm({ nome: empresa.nombre, setor: empresa.sector, contato: empresa.contacto, ajuda: empresa.ayuda });
        setModalOpen(true);
    };
    const cancelEdit = () => {
        setEditId(null);
        setForm({ nome: "", setor: "", contato: "", ajuda: "" });
        setModalOpen(false);
    };
    const handleChange = (ev) => {
        setForm({ ...form, [ev.target.name]: ev.target.value });
    };
    const handleSave = () => {
        if (onEdit) onEdit(editId, {
            nombre: form.nome, // backend espera 'nombre'
            sector: form.setor,
            contacto: form.contato,
            ayuda: form.ajuda
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
                                <td colSpan="5" className="text-center text-gray-500 py-4">Ainda não há empresas registradas.</td>
                            </tr>
                        ) : (
                            empresasState.map((empresa, idx) => (
                                <tr key={empresa.id || idx} className="border-b">
                                    <>
                                        <td className="px-2 py-1 font-semibold text-blue-700">{empresa.nombre}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{empresa.sector}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{empresa.contacto}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{empresa.ayuda}</td>
                                        <td className="px-2 py-1 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-center">
                                            <button
                                                className="relative overflow-hidden px-4 py-2 text-sm rounded text-white font-semibold bg-blue-500 hover:bg-blue-700 btn-effect-18-blue transition-all duration-200"
                                                onClick={() => startEdit(empresa)}
                                            >
                                                Editar
                                            </button>
                                            {onDelete && (
                                                <button
                                                    className="relative overflow-hidden px-4 py-2 text-sm rounded text-white font-semibold bg-red-500 hover:bg-red-700 btn-effect-18-red transition-all duration-200"
                                                    onClick={() => onDelete(empresa.id)}
                                                >
                                                    Excluir
                                                </button>
                                            )}
                                        </td>
                                    </>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <ModalEdit open={modalOpen} title="Editar empresa" onClose={cancelEdit}>
                <form className="flex flex-col gap-3">
                    <input className="border p-2 rounded" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da empresa" />
                    <input className="border p-2 rounded" name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" />
                    <input className="border p-2 rounded" name="contato" value={form.contato} onChange={handleChange} placeholder="Contato (e-mail ou telefone)" />
                    <input className="border p-2 rounded" name="ajuda" value={form.ajuda} onChange={handleChange} placeholder="Tipo de ajuda oferecida" />
                    <div className="flex gap-2 justify-end mt-2">
                        <button type="button" className="px-4 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-700" onClick={handleSave}>Salvar</button>
                        <button type="button" className="px-4 py-1 rounded bg-gray-400 text-white font-semibold hover:bg-gray-600" onClick={cancelEdit}>Cancelar</button>
                    </div>
                </form>
            </ModalEdit>
        </section>
    );
}

export default ListOfCompanies;
