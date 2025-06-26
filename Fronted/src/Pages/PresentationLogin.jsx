import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const INFO = {
  title: "Projeto Grupo 08 - Turma 51",
  description: `Sistema para cadastro e busca de migrantes e empresas interessadas em ajudar. Moderno, responsivo e com validações completas. Desenvolvido por Grupo 08 para a Turma 51.`
};

export default function PresentationLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login simple: usuario: admin, senha: 1234
    if (user === "admin" && pass === "1234") {
      setError("");
      if (onLogin) onLogin();
      navigate("/");
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-2 text-center drop-shadow">{INFO.title}</h1>
        <p className="text-gray-700 text-center mb-8">{INFO.description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="form-input p-3 border-2 border-blue-300 rounded-lg focus:border-blue-700 focus:outline-none"
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={e => setUser(e.target.value)}
            required
          />
          <input
            className="form-input p-3 border-2 border-blue-300 rounded-lg focus:border-blue-700 focus:outline-none"
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm text-center animate-pulse">{error}</div>}
          <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition" type="submit">Entrar</button>
        </form>
        <div className="mt-8 text-xs text-gray-400 text-center">
          <span>Usuário: <b>admin</b> | Senha: <b>1234</b></span>
        </div>
      </div>
      <footer className="mt-10 text-gray-400 text-xs">&copy; 2025 Grupo 08 - Turma 51</footer>
    </div>
  );
}

export function BackToHomeButton({ label = "Voltar para a página inicial" }) {
  const navigate = useNavigate();
  return (
    <button
      className="btn-effect-7 px-6 py-2 rounded-lg font-bold text-white bg-purple-400 hover:bg-purple-600 shadow-lg transition text-base"
      onClick={() => navigate("/Login")}
    >
      {label}
    </button>
  );
}
