import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormMigrante({ addMigrante, migrantes }) {
    const [form, setForm] = useState({
        nome: "",
        pais: "",
        habilidades: "",
        email: "",
        cpf: ""
    });
    const [error, setError] = useState("");

    const onlyLetters = (str) => /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ ]+$/i.test(str);
    const onlyNumbers = (str) => /^\d{11}$/.test(str);

    const handleChange = (e) => {
        let value = e.target.value;
        // Convertir a mayúsculas en los campos de texto
        if (["nome", "pais", "habilidades"].includes(e.target.name)) {
            value = value.toUpperCase();
        }
        setForm({ ...form, [e.target.name]: value });
        if (e.target.name === "email") setError("");
    };

    const validateEmail = (email) => {
        // Validação básica de e-mail
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(form.email.trim())) {
            setError("Por favor, insira um e-mail válido.");
            return;
        }
        if (form.nome.trim().split(/\s+/).length < 2) {
            setError("O nome deve conter pelo menos nome e sobrenome.");
            return;
        }
        if (!onlyLetters(form.nome) || !onlyLetters(form.pais) || !onlyLetters(form.habilidades)) {
            setError("Nome, país e habilidades devem conter apenas letras e espaços.");
            return;
        }
        if (!onlyNumbers(form.cpf)) {
            setError("CPF deve conter exatamente 11 números.");
            return;
        }
        // Verificar si el CPF ya está registrado (comparar con todos los migrantes, no solo filtrados)
        if (migrantes && migrantes.some(m => m.cpf === form.cpf)) {
            setError("Este CPF já está cadastrado.");
            return;
        }
        addMigrante({
            nombre: form.nome, // backend espera 'nombre'
            pais: form.pais,
            habilidades: form.habilidades,
            email: form.email.trim(),
            cpf: form.cpf
        });
        setForm({ nome: "", pais: "", habilidades: "", email: "", cpf: "" });
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 border border-amber-200">
            <input className="form-input mb-2 p-2 border rounded w-full" name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF (11 números)" required maxLength={11} pattern="\d{11}" />
            {/* Mensaje visual si el CPF ya está registrado */}
            {form.cpf.length === 11 && migrantes && migrantes.some(m => m.cpf === form.cpf) && (
                <div className="text-yellow-600 text-sm mb-2 font-semibold animate-pulse">CPF já cadastrado</div>
            )}
            <input className="form-input mb-2 p-2 border rounded w-full" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" required />
            <select className="form-input mb-2 p-2 border rounded w-full font-normal text-gray-700" name="pais" value={form.pais} onChange={handleChange} required>
                <option value="" disabled hidden>Selecione o país de origem</option>
                <option value="AFEGANISTÃO">Afeganistão</option>
                <option value="ÁFRICA DO SUL">África do Sul</option>
                <option value="ALEMANHA">Alemanha</option>
                <option value="ANGOLA">Angola</option>
                <option value="ARÁBIA SAUDITA">Arábia Saudita</option>
                <option value="ARGENTINA">Argentina</option>
                <option value="AUSTRÁLIA">Austrália</option>
                <option value="ÁUSTRIA">Áustria</option>
                <option value="BANGLADESH">Bangladesh</option>
                <option value="BÉLGICA">Bélgica</option>
                <option value="BOLÍVIA">Bolívia</option>
                <option value="BRASIL">Brasil</option>
                <option value="CANADÁ">Canadá</option>
                <option value="CHILE">Chile</option>
                <option value="CHINA">China</option>
                <option value="COLÔMBIA">Colômbia</option>
                <option value="CUBA">Cuba</option>
                <option value="DINAMARCA">Dinamarca</option>
                <option value="EGITO">Egito</option>
                <option value="EMIRADOS ÁRABES UNIDOS">Emirados Árabes Unidos</option>
                <option value="EQUADOR">Equador</option>
                <option value="ESPANHA">Espanha</option>
                <option value="ESTADOS UNIDOS">Estados Unidos</option>
                <option value="FILIPINAS">Filipinas</option>
                <option value="FINLÂNDIA">Finlândia</option>
                <option value="FRANÇA">França</option>
                <option value="GRÉCIA">Grécia</option>
                <option value="GUATEMALA">Guatemala</option>
                <option value="HAITI">Haiti</option>
                <option value="HOLANDA">Holanda</option>
                <option value="HONDURAS">Honduras</option>
                <option value="HUNGRIA">Hungria</option>
                <option value="ÍNDIA">Índia</option>
                <option value="INDONÉSIA">Indonésia</option>
                <option value="INGLATERRA">Inglaterra</option>
                <option value="IRÃ">Irã</option>
                <option value="IRAQUE">Iraque</option>
                <option value="IRLANDA">Irlanda</option>
                <option value="ISRAEL">Israel</option>
                <option value="ITÁLIA">Itália</option>
                <option value="JAPÃO">Japão</option>
                <option value="LÍBANO">Líbano</option>
                <option value="LUXEMBURGO">Luxemburgo</option>
                <option value="MÉXICO">México</option>
                <option value="MOÇAMBIQUE">Moçambique</option>
                <option value="NIGÉRIA">Nigéria</option>
                <option value="NORUEGA">Noruega</option>
                <option value="NOVA ZELÂNDIA">Nova Zelândia</option>
                <option value="PAQUISTÃO">Paquistão</option>
                <option value="PARAGUAI">Paraguai</option>
                <option value="PERU">Peru</option>
                <option value="POLÔNIA">Polônia</option>
                <option value="PORTUGAL">Portugal</option>
                <option value="QUÊNIA">Quênia</option>
                <option value="REINO UNIDO">Reino Unido</option>
                <option value="REPÚBLICA DOMINICANA">República Dominicana</option>
                <option value="RÚSSIA">Rússia</option>
                <option value="SUÉCIA">Suécia</option>
                <option value="SUÍÇA">Suíça</option>
                <option value="TURQUIA">Turquia</option>
                <option value="UCRÂNIA">Ucrânia</option>
                <option value="URUGUAI">Uruguai</option>
                <option value="VENEZUELA">Venezuela</option>
                {/* Puedes agregar más países si lo deseas */}
            </select>
            <input className="form-input mb-2 p-2 border rounded w-full" name="habilidades" value={form.habilidades} onChange={handleChange} placeholder="Habilidades ou profissão" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" required type="email" />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button className="btn-effect-7 w-full mt-2 bg-purple-600 text-white" type="submit">Cadastrar migrante</button>
            
            {/* Link para ver lista de migrantes */}
            <div className="text-center mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-2">Quer conhecer outros migrantes cadastrados?</p>
                <Link 
                    to="/migrantes" 
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-300"
                >
                    👥 Ver lista de migrantes cadastrados
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </form>
    );
}

export default FormMigrante;
