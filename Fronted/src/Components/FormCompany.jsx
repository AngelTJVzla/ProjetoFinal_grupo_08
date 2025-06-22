import React, { useState } from "react";

function FormCompany({ addEmpresa }) {
    const [form, setForm] = useState({
        nome: "",
        setor: "",
        contato: "",
        ajuda: ""
    });
    const [error, setError] = useState("");

    const onlyLetters = (str) => /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ ]+$/i.test(str);

    const handleChange = (e) => {
        let value = e.target.value;
        // Convertir a mayúsculas en los campos de texto
        if (["nome", "setor"].includes(e.target.name)) {
            value = value.toUpperCase();
            // Limpiar error si el usuario corrige el campo
            if (error) setError("");
        }
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onlyLetters(form.nome) || !onlyLetters(form.setor)) {
            setError("Nome e setor devem conter apenas letras e espaços.");
            return;
        }
        addEmpresa({
            nombre: form.nome, // backend espera 'nombre'
            sector: form.setor,
            contacto: form.contato,
            ayuda: form.ajuda
        });
        setForm({ nome: "", setor: "", contato: "", ajuda: "" });
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 border border-blue-100">
            
            <input className="form-input mb-2 p-2 border rounded w-full" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da empresa" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="contato" value={form.contato} onChange={handleChange} placeholder="Contato (e-mail ou telefone)" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="ajuda" value={form.ajuda} onChange={handleChange} placeholder="Tipo de ajuda oferecida" required />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button className="btn-effect-7 w-full mt-2 bg-purple-600 text-white" type="submit">Cadastrar empresa</button>
        </form>
    );
}

export default FormCompany;
