import React, { useState } from "react";

function ListOfCompanies({ empresas, onDelete, onEdit }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ nome: "", setor: "", contato: "", ajuda: "" });

    const startEdit = (empresa) => {
        setEditId(empresa.id);
        setForm({ nome: empresa.nombre, setor: empresa.sector, contato: empresa.contacto, ajuda: empresa.ayuda });
    };
    const cancelEdit = () => {
        setEditId(null);
        setForm({ nome: "", setor: "", contato: "", ajuda: "" });
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
        <section className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-white title-animate">Empresas interessadas em ajudar</h2>
            <div className="grid gap-4 md:grid-cols-2">
                {empresas.length === 0 ? (
                    <p className="text-white text-opacity-90">Ainda não há empresas registradas.</p>
                ) : (
                    empresas.map((empresa, idx) => (
                        <div key={empresa.id || idx} className="bg-white border border-blue-100 rounded-lg p-4 shadow flex flex-col gap-2">
                            {editId === empresa.id ? (
                                <>
                                    <input className="border p-1 rounded" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da empresa" />
                                    <input className="border p-1 rounded" name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" />
                                    <input className="border p-1 rounded" name="contato" value={form.contato} onChange={handleChange} placeholder="Contato (e-mail ou telefone)" />
                                    <input className="border p-1 rounded" name="ajuda" value={form.ajuda} onChange={handleChange} placeholder="Tipo de ajuda oferecida" />
                                    <div className="flex gap-2 mt-2 self-end">
                                        <button
                                            className="relative overflow-hidden px-3 py-1 text-xs rounded text-white font-semibold bg-green-500 hover:bg-green-700 btn-effect-18-green"
                                            onClick={handleSave}
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            className="relative overflow-hidden px-3 py-1 text-xs rounded text-white font-semibold bg-gray-400 hover:bg-gray-600 btn-effect-18-gray"
                                            onClick={cancelEdit}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-semibold text-lg text-blue-700">{empresa.nombre}</h3>
                                    <p className="text-sm text-gray-700 text-opacity-60">Setor: {empresa.sector}</p>
                                    <p className="text-sm text-gray-700 text-opacity-60">Contato: {empresa.contacto}</p>
                                    <p className="text-sm text-gray-700 text-opacity-60">Tipo de ajuda: {empresa.ayuda}</p>
                                    <div className="flex gap-2 self-end">
                                        {onEdit && (
                                            <button
                                                className="relative overflow-hidden px-3 py-1 text-xs rounded text-white font-semibold bg-blue-500 hover:bg-blue-700 btn-effect-18-blue"
                                                onClick={() => startEdit(empresa)}
                                            >
                                                Editar
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                className="relative overflow-hidden px-3 py-1 text-xs rounded text-white font-semibold bg-red-500 hover:bg-red-700 btn-effect-18-red"
                                                onClick={() => onDelete(empresa.id)}
                                            >
                                                Excluir
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default ListOfCompanies;
