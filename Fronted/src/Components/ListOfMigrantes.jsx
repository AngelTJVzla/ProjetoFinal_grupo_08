import React, { useState } from "react";

function ListOfMigrantes({ migrantes, onDelete, onEdit }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ nome: "", pais: "", habilidades: "", email: "" });

    const startEdit = (m) => {
        setEditId(m.id);
        setForm({ nome: m.nombre, pais: m.pais, habilidades: m.habilidades, email: m.email });
    };
    const cancelEdit = () => {
        setEditId(null);
        setForm({ nome: "", pais: "", habilidades: "", email: "" });
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
        <section className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-amber-800">Migrantes registrados</h2>
            <div className="grid gap-4">
                {migrantes.length === 0 ? (
                    <p className="text-gray-500">Ainda não há migrantes registrados.</p>
                ) : (
                    migrantes.map((m, idx) => (
                        <div key={m.id || idx} className="bg-white border border-amber-100 rounded-lg p-4 shadow flex flex-col gap-2">
                            {editId === m.id ? (
                                <>
                                    <input className="border p-1 rounded" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
                                    <input className="border p-1 rounded" name="pais" value={form.pais} onChange={handleChange} placeholder="País de origem" />
                                    <input className="border p-1 rounded" name="habilidades" value={form.habilidades} onChange={handleChange} placeholder="Habilidades ou profissão" />
                                    <input className="border p-1 rounded" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" />
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
                                    <h3 className="font-semibold text-lg text-amber-700">{m.nombre}</h3>
                                    <p className="text-sm text-gray-700">País: {m.pais}</p>
                                    <p className="text-sm text-gray-700">Habilidades: {m.habilidades}</p>
                                    <p className="text-sm text-gray-700">E-mail: {m.email}</p>
                                    <div className="flex gap-2 self-end">
                                        {onEdit && (
                                            <button
                                                className="relative overflow-hidden px-3 py-1 text-xs rounded text-white font-semibold bg-blue-500 hover:bg-blue-700 btn-effect-18-blue"
                                                onClick={() => startEdit(m)}
                                            >
                                                Editar
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                className="relative overflow-hidden px-3 py-1 text-xs rounded text-white font-semibold bg-red-500 hover:bg-red-700 btn-effect-18-red"
                                                onClick={() => onDelete(m.id)}
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

export default ListOfMigrantes;

/* Agregar estilos personalizados para el efecto */
/*
.btn-effect-18-blue::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
  transition: left 0.4s ease;
}
.btn-effect-18-blue:hover::after {
  left: 100%;
}
.btn-effect-18-blue:hover {
  box-shadow: 0 0 10px #2563eb, 0 0 30px #2563eb;
}
.btn-effect-18-red::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
  transition: left 0.4s ease;
}
.btn-effect-18-red:hover::after {
  left: 100%;
}
.btn-effect-18-red:hover {
  box-shadow: 0 0 10px #dc2626, 0 0 30px #dc2626;
}
.btn-effect-18-green::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
  transition: left 0.4s ease;
}
.btn-effect-18-green:hover::after {
  left: 100%;
}
.btn-effect-18-green:hover {
  box-shadow: 0 0 10px #16a34a, 0 0 30px #16a34a;
}
.btn-effect-18-gray::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
  transition: left 0.4s ease;
}
.btn-effect-18-gray:hover::after {
  left: 100%;
}
.btn-effect-18-gray:hover {
  box-shadow: 0 0 10px #6b7280, 0 0 30px #6b7280;
}
*/
