import { useNavigate } from 'react-router-dom';
function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Página não encontrada</h1>
            <button onClick={() => navigate("/")}>Voltar</button>
        </>
    )
};
export default ErrorPage;