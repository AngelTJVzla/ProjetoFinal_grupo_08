import React, { useState } from "react";

function FormMigrante({ addMigrante }) {
    const [form, setForm] = useState({
        nombre: "",
        pais: "",
        habilidades: "",
        email: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMigrante(form);
        setForm({ nombre: "", pais: "", habilidades: "", email: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 border border-amber-200">
            <h3 className="font-semibold text-amber-700 mb-2">Registrar migrante</h3>
            <input className="form-input mb-2 p-2 border rounded w-full" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="pais" value={form.pais} onChange={handleChange} placeholder="País de origen" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="habilidades" value={form.habilidades} onChange={handleChange} placeholder="Habilidades o profesión" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" required type="email" />
            <button className="bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded w-full mt-2" type="submit">Registrar migrante</button>
        </form>
    );
}

export default FormMigrante;
