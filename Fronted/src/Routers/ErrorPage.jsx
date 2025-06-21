import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
            <h1 className="text-5xl font-bold mb-4 animate-pulse drop-shadow-lg">Página não encontrada</h1>
            <p className="mb-8 text-lg text-white text-opacity-80">A página que você procura não existe ou foi movida.</p>
            <button
                onClick={() => navigate("/")}
                className="btn-effect-7 px-6 py-2 text-lg shadow-lg hover:scale-105 transition-transform"
            >
                Voltar ao início
            </button>
        </div>
    );
}

export default ErrorPage;