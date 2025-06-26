import { Link } from "react-router-dom";

function Header({ onLogout }) {
    return (
        <>
            <header className="bg-blue-700/60 text-white p-4 shadow-md border-b border-white/20 backdrop-blur-md flex items-center justify-between">
                <div className="text-center text-sm md:text-base font-semibold tracking-wide mb-2 text-blue-100/90 drop-shadow-lg animate-pulse w-full">
                    Projeto Final | Grupo 08 - Turma 51 full start| React, Node.js, Tailwind, Vite, Express &amp; SQLite | CRUD funcional de migrantes e empresas
                </div>
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="ml-4 px-4 py-2 bg-white/20 hover:bg-white/40 text-blue-900 font-bold rounded-lg border border-blue-200 shadow transition"
                    >
                        Cerrar sesión
                    </button>
                )}
            </header>
            <div className="w-full flex justify-center mt-2 mb-4">
                <Link to="/" className="btn-effect-7 w-full max-w-xs mt-2 bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold rounded-lg border border-amber-200 shadow transition text-center py-2 px-4">
                    Voltar para página inicial
                </Link>
            </div>
        </>
    );
}

export default Header;