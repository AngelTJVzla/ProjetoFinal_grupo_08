import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header({ onLogout }) {
    return (
        <>
            <header className="bg-gradient-to-r from-[#78b3ff] via-[#4480ff] to-[#1a4fff] text-white p-4 shadow-xl border-b-2 border-[#002eff]/30 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                        <img 
                            src={logo}
                            alt="Esboço Alóctone"
                            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
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
