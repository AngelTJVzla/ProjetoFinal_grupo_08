import React, { useState } from "react";

function FormMigrante({ addMigrante }) {
    const [form, setForm] = useState({
        nome: "",
        pais: "",
        habilidades: "",
        email: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === "email") setError("");
    };

    const validateEmail = (email) => {
        // Validação básica de e-mail
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(form.email)) {
            setError("Por favor, insira um e-mail válido.");
            return;
        }
        addMigrante({
            nombre: form.nome, // backend espera 'nombre'
            pais: form.pais,
            habilidades: form.habilidades,
            email: form.email
        });
        setForm({ nome: "", pais: "", habilidades: "", email: "" });
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 border border-amber-200">
            <h3 className="font-semibold text-amber-700 mb-2">Registrar migrante</h3>
            <input className="form-input mb-2 p-2 border rounded w-full" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="pais" value={form.pais} onChange={handleChange} placeholder="País de origem" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="habilidades" value={form.habilidades} onChange={handleChange} placeholder="Habilidades ou profissão" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" required type="email" />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button className="btn-effect-7 w-full mt-2 bg-purple-600 text-white" type="submit">Registrar migrante</button>
        </form>
    );
}

export default FormMigrante;
