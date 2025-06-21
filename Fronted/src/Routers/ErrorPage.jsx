import{useNavigate} from 'react-router-dom';
function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <h1> Pagina no existe </h1>
            <button onClick={() => navigate("/")}> Volver </button>
        </>
    )
};
export default ErrorPage;