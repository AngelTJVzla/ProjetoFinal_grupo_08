import React, { useState } from "react";

function FormCompany({ addEmpresa }) {
    const [form, setForm] = useState({
        nome: "",
        setor: "",
        contato: "",
        ajuda: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmpresa({
            nombre: form.nome, // backend espera 'nombre'
            sector: form.setor,
            contacto: form.contato,
            ayuda: form.ajuda
        });
        setForm({ nome: "", setor: "", contato: "", ajuda: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 border border-blue-100">
            <h3 className="font-semibold text-blue-700 mb-2">Registrar nova empresa</h3>
            <input className="form-input mb-2 p-2 border rounded w-full" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da empresa" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="contato" value={form.contato} onChange={handleChange} placeholder="Contato (e-mail ou telefone)" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="ajuda" value={form.ajuda} onChange={handleChange} placeholder="Tipo de ajuda oferecida" required />
            <button className="btn-effect-7 w-full mt-2 bg-purple-600 text-white" type="submit">Registrar empresa</button>
        </form>
    );
}

export default FormCompany;
