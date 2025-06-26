import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./Routes";
import "./Styles/app.css";
import { ErrorBoundary } from "./Components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Main() {
    // Estado para migrantes
    const [migrantes, setMigrantes] = useState([]);
    // Estado para empresas
    const [empresas, setEmpresas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [busquedaEmp, setBusquedaEmp] = useState("");
    // Estado para mostrar alerta si se ingresan letras en el buscador de migrantes
    const [alertaBusqueda, setAlertaBusqueda] = useState("");
    // Estado para mostrar alerta si se ingresan letras en el buscador de empresas
    const [alertaBusquedaEmp, setAlertaBusquedaEmp] = useState("");
    const [isLogged, setIsLogged] = useState(false);

    // Fetch real para migrantes desde el backend
    const fetchMigrantes = async () => {
        try {
            const res = await fetch("http://localhost:3000/migrantes");
            const data = await res.json();
            setMigrantes(data);
        } catch (error) {
            console.error("Error al obtener migrantes:", error);
        }
    };

    // Fetch real para empresas desde el backend
    const fetchEmpresas = async () => {
        try {
            const res = await fetch("http://localhost:3000/empresas");
            const data = await res.json();
            setEmpresas(data);
        } catch (error) {
            console.error("Error al obtener empresas:", error);
        }
    };

    // Agregar empresa y actualizar lista desde backend
    const addEmpresa = async (empresa) => {
        try {
            await fetch("http://localhost:3000/empresas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empresa)
            });
            fetchEmpresas();
        } catch (error) {
            console.error("Error al agregar empresa:", error);
        }
    };

    // Agregar migrante y actualizar lista desde backend
    const addMigrante = async (migrante) => {
        try {
            await fetch("http://localhost:3000/migrantes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(migrante)
            });
            fetchMigrantes();
        } catch (error) {
            console.error("Error al agregar migrante:", error);
        }
    };

    // Eliminar migrante con confirmación
    const onDeleteMigrante = async (id) => {
        if (window.confirm("Tem certeza de que deseja excluir este migrante?")) {
            try {
                await fetch(`http://localhost:3000/migrantes/${id}`, { method: "DELETE" });
                fetchMigrantes();
            } catch (error) {
                console.error("Error ao eliminar migrante:", error);
            }
        }
    };

    // Eliminar empresa con confirmación
    const onDeleteEmpresa = async (id) => {
        if (window.confirm("Tem certeza de que deseja excluir esta empresa?")) {
            try {
                await fetch(`http://localhost:3000/empresas/${id}`, { method: "DELETE" });
                fetchEmpresas();
            } catch (error) {
                console.error("Error ao eliminar empresa:", error);
            }
        }
    };

    // Actualizar migrante (PUT o PATCH)
    const updateMigrante = async (id, migranteActualizado, method = "PUT") => {
        try {
            await fetch(`http://localhost:3000/migrantes/${id}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(migranteActualizado)
            });
            fetchMigrantes();
        } catch (error) {
            console.error("Error al actualizar migrante:", error);
        }
    };

    // Actualizar empresa (PUT o PATCH)
    const updateEmpresa = async (id, empresaActualizada, method = "PUT") => {
        try {
            await fetch(`http://localhost:3000/empresas/${id}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empresaActualizada)
            });
            fetchEmpresas();
        } catch (error) {
            console.error("Error al actualizar empresa:", error);
        }
    };

    // Cargar migrantes y empresas al iniciar
    React.useEffect(() => {
        fetchMigrantes();
        fetchEmpresas();
    }, []);

    // Filtrar migrantes por nombre, país o habilidades
    const migrantesFiltrados = migrantes.filter(m =>
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.pais.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.habilidades.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Filtrar empresas por nombre, sector o ayuda
    const empresasFiltradas = empresas.filter(e =>
        e.nombre.toLowerCase().includes(busquedaEmp.toLowerCase()) ||
        e.sector.toLowerCase().includes(busquedaEmp.toLowerCase()) ||
        e.ayuda.toLowerCase().includes(busquedaEmp.toLowerCase())
    );

    // Input controlado para buscar migrante SOLO CPF (11 números)
    const migranteSearchInput = (
        <>
            <input
                className="form-input w-full p-3 border-2 border-blue-400 rounded-lg focus:border-blue-700 focus:outline-none"
                type="text"
                value={busqueda}
                onChange={e => {
                    const original = e.target.value;
                    const val = original.replace(/\D/g, "").slice(0, 11);
                    setBusqueda(val);
                    if (original && /[^\d]/.test(original)) {
                        setAlertaBusqueda("Solo se permiten números (CPF)");
                        setTimeout(() => setAlertaBusqueda(""), 2000);
                    }
                }}
                onBlur={() => setBusqueda("")}
                placeholder="Buscar migrante por CPF..."
                maxLength={11}
                inputMode="numeric"
                pattern="\d{11}"
            />
            {alertaBusqueda && (
                <div className="text-red-600 text-sm mt-1 font-semibold animate-pulse">{alertaBusqueda}</div>
            )}
            {/* Mensaje si el CPF está registrado */}
            {busqueda.length === 11 && migrantes.some(m => m.cpf === busqueda) && (
                <div className="text-green-600 text-sm mt-1 font-semibold animate-pulse">CPF cadastrado ✔️</div>
            )}
            {busqueda.length === 11 && !migrantes.some(m => m.cpf === busqueda) && (
                <div className="text-yellow-600 text-sm mt-1 font-semibold animate-pulse">CPF não cadastrado</div>
            )}
        </>
    );

    // Input controlado para buscar empresa SOLO CNPJ (14 números)
    const empresaSearchInput = (
        <>
            <input
                className="form-input w-full p-3 border-2 border-blue-400 rounded-lg focus:border-blue-700 focus:outline-none"
                type="text"
                value={busquedaEmp}
                onChange={e => {
                    const original = e.target.value;
                    const val = original.replace(/\D/g, "").slice(0, 14);
                    setBusquedaEmp(val);
                    if (original && /[^\d]/.test(original)) {
                        setAlertaBusquedaEmp("Solo se permiten números (CNPJ)");
                        setTimeout(() => setAlertaBusquedaEmp(""), 2000);
                    }
                }}
                onBlur={() => setBusquedaEmp("")}
                placeholder="Buscar empresa por CNPJ..."
                maxLength={14}
                inputMode="numeric"
                pattern="\d{14}"
            />
            {alertaBusquedaEmp && (
                <div className="text-red-600 text-sm mt-1 font-semibold animate-pulse">{alertaBusquedaEmp}</div>
            )}
            {/* Mensaje si el CNPJ está registrado */}
            {busquedaEmp.length === 14 && empresas.some(e => e.cnpj === busquedaEmp) && (
                <div className="text-green-600 text-sm mt-1 font-semibold animate-pulse">CNPJ cadastrado ✔️</div>
            )}
            {busquedaEmp.length === 14 && !empresas.some(e => e.cnpj === busquedaEmp) && (
                <div className="text-yellow-600 text-sm mt-1 font-semibold animate-pulse">CNPJ não cadastrado</div>
            )}
        </>
    );

    // Login y logout
    const onLogin = () => {
        setIsLogged(true);
        // Navegación ahora se hace en PresentationLogin.jsx
    };
    const onLogout = () => {
        setIsLogged(false);
        // Navegación ahora se hace en PresentationLogin.jsx
    };

    if (!isLogged) {
        return <MainRoutes {...{
            migrantes,
            setMigrantes,
            empresas,
            setEmpresas,
            busqueda,
            setBusqueda,
            busquedaEmp,
            setBusquedaEmp,
            alertaBusqueda,
            setAlertaBusqueda,
            alertaBusquedaEmp,
            setAlertaBusquedaEmp,
            addMigrante,
            addEmpresa,
            onDeleteMigrante,
            onDeleteEmpresa,
            updateMigrante,
            updateEmpresa,
            migrantesFiltrados,
            empresasFiltradas,
            migranteSearchInput,
            empresaSearchInput,
            onLogin
        }} />;
    }

    return (
        <MainRoutes
            migrantes={migrantes}
            setMigrantes={setMigrantes}
            empresas={empresas}
            setEmpresas={setEmpresas}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            busquedaEmp={busquedaEmp}
            setBusquedaEmp={setBusquedaEmp}
            alertaBusqueda={alertaBusqueda}
            setAlertaBusqueda={setAlertaBusqueda}
            alertaBusquedaEmp={alertaBusquedaEmp}
            setAlertaBusquedaEmp={setAlertaBusquedaEmp}
            addMigrante={addMigrante}
            addEmpresa={addEmpresa}
            onDeleteMigrante={onDeleteMigrante}
            onDeleteEmpresa={onDeleteEmpresa}
            updateMigrante={updateMigrante}
            updateEmpresa={updateEmpresa}
            migrantesFiltrados={migrantesFiltrados}
            empresasFiltradas={empresasFiltradas}
            migranteSearchInput={migranteSearchInput}
            empresaSearchInput={empresaSearchInput}
            onLogin={onLogin}
            onLogout={onLogout}
            isLogged={isLogged}
        />
    );
}

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </ErrorBoundary>
);

export default Main;