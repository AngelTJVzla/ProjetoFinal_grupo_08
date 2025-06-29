import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header({ onLogout }) {
    return (
        <>
            <header className="bg-blue-700/60 text-white p-4 shadow-md border-b border-white/20 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img 
                            src={logo}
                            alt="Esboço Alóctone"
                            className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-lg"
                        />
                    </Link>
                </div>
                
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex space-x-6">
                        <Link 
                            to="/migrantes" 
                            className="text-blue-100 hover:text-white transition-colors font-semibold text-lg drop-shadow-sm"
                        >
                            Migrantes
                        </Link>
                        <Link 
                            to="/empresas" 
                            className="text-blue-100 hover:text-white transition-colors font-semibold text-lg drop-shadow-sm"
                        >
                            Empresas
                        </Link>
                    </nav>
                    
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="bg-gradient-to-r from-[#002eff] to-[#0031ff] hover:from-[#0031ff] hover:to-[#002eff] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Logout
                        </button>
                    )}
                </div>
             </header>
        </>
    );
}

export default Header;
