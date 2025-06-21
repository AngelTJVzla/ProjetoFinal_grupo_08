import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-blue-700/60 text-white p-4 shadow-md border-b border-white/20 backdrop-blur-md">
            <div className="text-center text-sm md:text-base font-semibold tracking-wide mb-2 text-blue-100/90 drop-shadow-lg animate-pulse">
                Projeto Final | Grupo 08 - Turma 51 full start| React, Node.js, Tailwind, Vite, Express &amp; SQLite | CRUD funcional de migrantes e empresas
            </div>
            
        </header>
    );
}

export default Header;