import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FormCompany from "./Components/FormCompany";
import "./Styles/app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Main() {
    // Estado para migrantes
    const [migrantes, setMigrantes] = useState([]);
    // Estado para empresas
    const [empresas, setEmpresas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [busquedaEmp, setBusquedaEmp] = useState("");

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
        if (window.confirm("¿Estás seguro de que deseas eliminar este migrante?")) {
            try {
                await fetch(`http://localhost:3000/migrantes/${id}`, { method: "DELETE" });
                fetchMigrantes();
            } catch (error) {
                console.error("Error al eliminar migrante:", error);
            }
        }
    };

    // Eliminar empresa con confirmación
    const onDeleteEmpresa = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
            try {
                await fetch(`http://localhost:3000/empresas/${id}`, { method: "DELETE" });
                fetchEmpresas();
            } catch (error) {
                console.error("Error al eliminar empresa:", error);
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

    return (
        <>
            <div className="container mx-auto max-w-xl mt-4 mb-2">
                <input
                    className="form-input w-full p-3 border-2 border-amber-400 rounded-lg focus:border-amber-700 focus:outline-none"
                    type="text"
                    placeholder="Buscar migrante por nombre, país o habilidad..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>
            <div className="container mx-auto max-w-xl mt-4 mb-2">
                <input
                    className="form-input w-full p-3 border-2 border-blue-400 rounded-lg focus:border-blue-700 focus:outline-none"
                    type="text"
                    placeholder="Buscar empresa por nombre, sector o ayuda..."
                    value={busquedaEmp}
                    onChange={e => setBusquedaEmp(e.target.value)}
                />
            </div>
            <App
                resultado={migrantesFiltrados}
                empresas={empresasFiltradas}
                addMigrante={addMigrante}
                onDeleteMigrante={onDeleteMigrante}
                onDeleteEmpresa={onDeleteEmpresa}
                updateMigrante={updateMigrante}
                updateEmpresa={updateEmpresa}
            />
            {/* Formulario para registrar empresas */}
            <div className="container mx-auto max-w-xl mt-8">
                <FormCompany addEmpresa={addEmpresa} />
            </div>
        </>
    );
}

root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
);

export default Main;