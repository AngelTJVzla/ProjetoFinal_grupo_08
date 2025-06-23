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
            // Solo permitir letras y espacios, pero NO modificar el casing aquí
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
            nombre: form.nome.toUpperCase(), // backend espera 'nombre' en mayúsculas
            pais: form.pais.toUpperCase(),
            habilidades: form.habilidades.toUpperCase(),
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
                            <th className="px-4 py-2 border-b">CPF</th>
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
                                <td colSpan="6" className="text-center text-gray-500 py-4">Ainda não há migrantes registrados.</td>
                            </tr>
                        ) : (
                            migrantes.map((m, idx) => (
                                <tr key={m.id || idx} className="border-b">
                                    <>
                                        <td className="px-2 py-1 font-mono text-purple-700">{m.cpf || ""}</td>
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
                    <input className="border p-2 rounded" name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF (11 números)" maxLength={11} pattern="\d{11}" />
                    <input className="border p-2 rounded" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
                    <input className="border p-2 rounded bg-gray-100 cursor-not-allowed" name="pais" value={form.pais} placeholder="País de origem" readOnly tabIndex={-1} />
                    <input className="border p-2 rounded" name="habilidades" value={form.habilidades} onChange={handleChange} placeholder="Habilidades ou profissão" />
                    <input className="border p-2 rounded" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" />
                    {editError && <p className="text-red-600 text-sm mb-2">{editError}</p>}
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
