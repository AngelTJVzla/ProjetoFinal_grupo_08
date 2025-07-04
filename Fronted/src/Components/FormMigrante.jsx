import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/candidatura-animations.css";

function FormMigrante({ addMigrante, migrantes }) {
    const [form, setForm] = useState({
        nome: "",
        pais: "",
        habilidades: "",
        email: "",
        cpf: ""
    });
    const [error, setError] = useState("");
    const [habilidadesDisponiveis, setHabilidadesDisponiveis] = useState([]);
    const [loadingHabilidades, setLoadingHabilidades] = useState(true);

    // Carregar habilidades do backend
    useEffect(() => {
        const carregarHabilidades = async () => {
            try {
                setLoadingHabilidades(true);
                const response = await fetch('http://localhost:3000/habilidades');
                const habilidades = await response.json();
                
                // Organizar habilidades por categoria
                const habilidadesOrganizadas = habilidades.map(hab => ({
                    ...hab,
                    categoria: hab.categoria.charAt(0).toUpperCase() + hab.categoria.slice(1).toLowerCase()
                })).sort((a, b) => {
                    // Primeiro por categoria, depois por nome
                    if (a.categoria !== b.categoria) {
                        return a.categoria.localeCompare(b.categoria);
                    }
                    return a.nome.localeCompare(b.nome);
                });
                
                setHabilidadesDisponiveis(habilidadesOrganizadas);
            } catch (error) {
                console.error('Erro ao carregar habilidades:', error);
                // Fallback para habilidades estáticas em caso de erro
                setHabilidadesDisponiveis([]);
            } finally {
                setLoadingHabilidades(false);
            }
        };

        carregarHabilidades();
    }, []);

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
        if (!onlyLetters(form.nome) || !onlyLetters(form.pais)) {
            setError("Nome e país devem conter apenas letras e espaços.");
            return;
        }
        if (!form.habilidades.trim()) {
            setError("Por favor, selecione uma habilidade ou profissão.");
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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Cadastro de Migrante
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">CPF</label>
                    <input 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 button-candidatura" 
                        name="cpf" 
                        value={form.cpf} 
                        onChange={handleChange} 
                        placeholder="CPF (11 números)" 
                        required 
                        maxLength={11} 
                        pattern="\d{11}" 
                    />
                    {/* Mensaje visual si el CPF ya está registrado */}
                    {form.cpf.length === 11 && migrantes && migrantes.some(m => m.cpf === form.cpf) && (
                        <div className="text-yellow-600 text-sm mt-1 font-semibold animate-pulse flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            CPF já cadastrado
                        </div>
                    )}
                </div>
                
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Nome Completo</label>
                    <input 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 button-candidatura" 
                        name="nome" 
                        value={form.nome} 
                        onChange={handleChange} 
                        placeholder="Nome e sobrenome" 
                        required 
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">País de Origem</label>
                    <select 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 button-candidatura font-normal text-gray-700" 
                        name="pais" 
                        value={form.pais} 
                        onChange={handleChange} 
                        required
                    >
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
            </div>
            
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Habilidades ou Profissão</label>
                    <select 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 button-candidatura"
                        name="habilidades" 
                        value={form.habilidades} 
                        onChange={handleChange} 
                        required
                        disabled={loadingHabilidades}
                    >
                        <option value="">
                            {loadingHabilidades ? "Carregando habilidades..." : "Selecione sua principal habilidade ou profissão"}
                        </option>
                        {!loadingHabilidades && habilidadesDisponiveis.length > 0 && (
                            <>
                                {/* Agrupar por categoria */}
                                {['Técnica', 'Soft Skill'].map(categoria => {
                                    const habilidadesDaCategoria = habilidadesDisponiveis.filter(hab => 
                                        hab.categoria.toLowerCase().includes(categoria.toLowerCase())
                                    );
                                    
                                    return habilidadesDaCategoria.length > 0 ? (
                                        <optgroup key={categoria} label={`${categoria} (${habilidadesDaCategoria.length})`}>
                                            {habilidadesDaCategoria.map((habilidade) => (
                                                <option key={habilidade.id} value={habilidade.nome.toUpperCase()}>
                                                    {habilidade.nome}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ) : null;
                                })}
                                {/* Opção para outras habilidades */}
                                <optgroup label="Outras">
                                    <option value="OUTRAS">Outras habilidades não listadas</option>
                                </optgroup>
                            </>
                        )}
                    </select>
                    <p className="text-gray-500 text-xs mt-1">
                        💡 Escolha a opção que melhor representa sua experiência principal
                        {loadingHabilidades && (
                            <span className="ml-2 inline-flex items-center">
                                <svg className="animate-spin h-3 w-3 text-purple-500" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </span>
                        )}
                    </p>
                </div>
                
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
                    <input 
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 button-candidatura" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        placeholder="E-mail" 
                        required 
                        type="email" 
                    />
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                )}
                
                <button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl button-candidatura ripple-effect" 
                    type="submit"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Cadastrar Migrante</span>
                    <div className="particle">✨</div>
                </button>
            </div>
            
            {/* Link para ver lista de migrantes */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-3">Quer conhecer outros migrantes cadastrados?</p>
                <Link 
                    to="/migrantes" 
                    className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Ver Migrantes Cadastrados
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </form>
    );
}

export default FormMigrante;
