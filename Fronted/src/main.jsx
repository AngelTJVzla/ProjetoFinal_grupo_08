import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FormCompany from "./Components/FormCompany";
import Footer from  "./Components/Footer" // Asegúrate de importar el Footer
import "./Styles/app.css";

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
                placeholder="Buscar migrante por CPF..."
                maxLength={11}
                inputMode="numeric"
                pattern="\d{11}"
            />
            {alertaBusqueda && (
                <div className="text-red-600 text-sm mt-1 font-semibold animate-pulse">{alertaBusqueda}</div>
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
                placeholder="Buscar empresa por CNPJ..."
                maxLength={14}
                inputMode="numeric"
                pattern="\d{14}"
            />
            {alertaBusquedaEmp && (
                <div className="text-red-600 text-sm mt-1 font-semibold animate-pulse">{alertaBusquedaEmp}</div>
            )}
        </>
    );

    return (
        <>
            <App
                resultado={migrantesFiltrados}
                empresas={empresasFiltradas}
                addMigrante={addMigrante}
                onDeleteMigrante={onDeleteMigrante}
                onDeleteEmpresa={onDeleteEmpresa}
                updateMigrante={updateMigrante}
                updateEmpresa={updateEmpresa}
                migranteSearchInput={migranteSearchInput}
                empresaSearchInput={empresaSearchInput}
                addEmpresa={addEmpresa}
            />
            <Footer />
        </>
    );
}

root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);

export default Main;