import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormCompany({ addEmpresa, empresas }) {
    const [form, setForm] = useState({
        cnpj: "",
        nome: "",
        setor: "",
        contato: "",
        ajuda: ""
    });
    const [error, setError] = useState("");

    const onlyLetters = (str) => /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ ]+$/i.test(str);
    const onlyCNPJ = (str) => /^\d{14}$/.test(str);

    const handleChange = (e) => { 
        let value = e.target.value;
        if (["nome", "setor"].includes(e.target.name)) {
            value = value.toUpperCase();
            if (error) setError("");
        }
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar espacios en blanco al inicio o final
        const cnpj = form.cnpj.trim();
        const nome = form.nome.trim();
        const setor = form.setor.trim();
        const contato = form.contato.trim();
        const ajuda = form.ajuda.trim();

        if (!onlyCNPJ(cnpj)) {
            setError("CNPJ deve conter exatamente 14 números.");
            return;
        }
        if (!onlyLetters(nome) || !onlyLetters(setor)) {
            setError("Nome e setor devem conter apenas letras e espaços.");
            return;
        }
        // Verificar si el CNPJ ya está registrado
        if (empresas && empresas.some(emp => emp.cnpj === cnpj)) {
            setError("Este CNPJ já está cadastrado.");
            return;
        }
        // Validar que ningún campo esté vacío después de trim
        if (!cnpj || !nome || !setor || !contato || !ajuda) {
            setError("Todos os campos são obrigatórios e não podem conter apenas espaços.");
            return;
        }
        addEmpresa({
            cnpj,
            nombre: nome, // backend espera 'nombre'
            sector: setor,
            contacto: contato,
            ayuda: ajuda
        });
        setForm({ cnpj: "", nome: "", setor: "", contato: "", ajuda: "" });
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 border border-blue-100">
            <input className="form-input mb-2 p-2 border rounded w-full" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ (apenas números)" required maxLength={14} />
            {/* Mensaje visual si el CNPJ ya está registrado */}
            {form.cnpj.length === 14 && empresas && empresas.some(emp => emp.cnpj === form.cnpj.trim()) && (
                <div className="text-yellow-600 text-sm mb-2 font-semibold animate-pulse">CNPJ já cadastrado</div>
            )}
            <input className="form-input mb-2 p-2 border rounded w-full" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da empresa" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="contato" value={form.contato} onChange={handleChange} placeholder="Contato (e-mail ou telefone)" required />
            <input className="form-input mb-2 p-2 border rounded w-full" name="ajuda" value={form.ajuda} onChange={handleChange} placeholder="Tipo de ajuda oferecida" required />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button className="btn-effect-7 w-full mt-2 bg-purple-600 text-white" type="submit">Cadastrar empresa</button>
            
            {/* Link para ver lista de empresas */}
            <div className="text-center mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-2">Quer conhecer outras empresas cadastradas?</p>
                <Link 
                    to="/empresas" 
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors duration-300"
                >
                    🏢 Ver lista de empresas cadastradas
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </form>
    );
}

export default FormCompany;
