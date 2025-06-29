import React from "react";

function DebugPage({ empresas, addEmpresa }) {
    const testAddEmpresa = () => {
        const testEmpresa = {
            cnpj: "98765432000111",
            nombre: "EMPRESA DE TESTE DEBUG",
            sector: "DEBUG",
            contacto: "debug@test.com",
            ayuda: "Teste de debug"
        };
        console.log("🧪 Agregando empresa de teste...");
        addEmpresa(testEmpresa);
    };

    const refreshEmpresas = async () => {
        try {
            console.log("🔄 Refrescando empresas manualmente...");
            const response = await fetch("http://localhost:3000/empresas");
            const data = await response.json();
            console.log("📋 Empresas desde API directa:", data);
        } catch (error) {
            console.error("❌ Error al refrescar:", error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Página de Debug</h1>
            
            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold mb-2">Estado de Empresas</h2>
                <p><strong>Cantidad:</strong> {empresas?.length || 0}</p>
                <p><strong>Array:</strong> {JSON.stringify(empresas, null, 2)}</p>
            </div>
            
            <button 
                onClick={testAddEmpresa}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
                Agregar Empresa de Teste
            </button>
            
            <button 
                onClick={refreshEmpresas}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Refrescar desde API
            </button>
            
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Lista de Empresas:</h3>
                {empresas && empresas.length > 0 ? (
                    <ul className="bg-gray-100 p-4 rounded">
                        {empresas.map((empresa, idx) => (
                            <li key={empresa.id || idx} className="mb-2 p-2 bg-white rounded">
                                <strong>{empresa.nombre}</strong> - {empresa.sector} - CNPJ: {empresa.cnpj}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No hay empresas para mostrar</p>
                )}
            </div>
        </div>
    );
}

export default DebugPage;
