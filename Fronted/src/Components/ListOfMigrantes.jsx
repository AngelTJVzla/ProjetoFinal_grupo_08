import React, { useState } from "react";
import ModalEdit from "./ModalEdit";

function ListOfMigrantes({ migrantes, onDelete, onEdit }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ nome: "", pais: "", habilidades: "", email: "" });
    const [modalOpen, setModalOpen] = useState(false);

    const startEdit = (m) => {
        setEditId(m.id);
        setForm({ nome: m.nombre, pais: m.pais, habilidades: m.habilidades, email: m.email });
        setModalOpen(true);
    };
    const cancelEdit = () => {
        setEditId(null);
        setForm({ nome: "", pais: "", habilidades: "", email: "" });
        setModalOpen(false);
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSave = () => {
        if (onEdit) onEdit(editId, {
            nombre: form.nome, // backend espera 'nombre'
            pais: form.pais,
            habilidades: form.habilidades,
            email: form.email
        });
        cancelEdit();
    };

    return (
        <section className="mt-4">
            <h2 className="text-lg font-bold mb-2 text-white title-animate">Migrantes registrados</h2>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                <table className="min-w-full bg-white rounded-lg shadow text-sm md:text-base">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Nome</th>
                            <th className="px-4 py-2 border-b">País</th>
                            <th className="px-4 py-2 border-b">Habilidades</th>
                            <th className="px-4 py-2 border-b">E-mail</th>
                            <th className="px-4 py-2 border-b">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {migrantes.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-4">Ainda não há migrantes registrados.</td>
                            </tr>
                        ) : (
                            migrantes.map((m, idx) => (
                                <tr key={m.id || idx} className="border-b">
                                    <>
                                        <td className="px-2 py-1 font-semibold text-blue-700">{m.nombre}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{m.pais}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{m.habilidades}</td>
                                        <td className="px-2 py-1 text-gray-700 text-opacity-60">{m.email}</td>
                                        <td className="px-2 py-1 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-center">
                                            <button
                                                className="relative overflow-hidden px-4 py-2 text-sm rounded text-white font-semibold bg-blue-500 hover:bg-blue-700 btn-effect-18-blue transition-all duration-200"
                                                onClick={() => startEdit(m)}
                                            >
                                                Editar
                                            </button>
                                            {onDelete && (
                                                <button
                                                    className="relative overflow-hidden px-4 py-2 text-sm rounded text-white font-semibold bg-red-500 hover:bg-red-700 btn-effect-18-red transition-all duration-200"
                                                    onClick={() => onDelete(m.id)}
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
            <ModalEdit open={modalOpen} title="Editar migrante" onClose={cancelEdit}>
                <form className="flex flex-col gap-3">
                    <input className="border p-2 rounded" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
                    <input className="border p-2 rounded" name="pais" value={form.pais} onChange={handleChange} placeholder="País de origem" />
                    <input className="border p-2 rounded" name="habilidades" value={form.habilidades} onChange={handleChange} placeholder="Habilidades ou profissão" />
                    <input className="border p-2 rounded" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" />
                    <div className="flex gap-2 justify-end mt-2">
                        <button type="button" className="px-4 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-700" onClick={handleSave}>Salvar</button>
                        <button type="button" className="px-4 py-1 rounded bg-gray-400 text-white font-semibold hover:bg-gray-600" onClick={cancelEdit}>Cancelar</button>
                    </div>
                </form>
            </ModalEdit>
        </section>
    );
}

export default ListOfMigrantes;
