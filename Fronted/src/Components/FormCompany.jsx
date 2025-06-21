import React, { useState } from "react";

function FormCompany({ addEmpresa }) {
    const [form, setForm] = useState({
        nombre: "",
        sector: "",
        contacto: "",
        ayuda: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmpresa(form);
        setForm({ nombre: "", sector: "", contacto: "", ayuda: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 border border-blue-100">
            <h3 className="font-semibold text-blue-700 mb-2">Registrar nueva empresa</h3>
            <input className="form-input mb-2 p-2 border rounded w-full" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre de la empresa" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="sector" value={form.sector} onChange={handleChange} placeholder="Sector" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="contacto" value={form.contacto} onChange={handleChange} placeholder="Contacto (email o teléfono)" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="ayuda" value={form.ayuda} onChange={handleChange} placeholder="Tipo de ayuda ofrecida" required />
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full mt-2" type="submit">Registrar empresa</button>
        </form>
    );
}

export default FormCompany;
