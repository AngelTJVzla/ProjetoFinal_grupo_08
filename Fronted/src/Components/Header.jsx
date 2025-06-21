import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-blue-700 text-white p-4 shadow-md">
            <nav className="flex flex-wrap gap-6 text-lg justify-center">
                <Link to="/" className="hover:text-blue-200 transition-colors">Início</Link>
                <Link to="/migrantes" className="hover:text-blue-200 transition-colors">Migrantes</Link>
                <Link to="/migrantes/novo" className="hover:text-blue-200 transition-colors">Cadastrar Migrante</Link>
                <Link to="/empresas" className="hover:text-blue-200 transition-colors">Empresas</Link>
                <Link to="/toti" className="hover:text-blue-200 transition-colors">Sobre a Toti</Link>
                <Link to="/estatisticas" className="hover:text-blue-200 transition-colors">Estatísticas</Link>
            </nav>
        </header>
    );
}

export default Header;