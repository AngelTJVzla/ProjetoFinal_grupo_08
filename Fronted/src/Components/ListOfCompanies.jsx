import React from "react";

function ListOfCompanies({ empresas, onDelete }) {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Empresas interesadas en ayudar</h2>
            <div className="grid gap-4 md:grid-cols-2">
                {empresas.length === 0 ? (
                    <p className="text-gray-500">No hay empresas registradas aún.</p>
                ) : (
                    empresas.map((empresa, idx) => (
                        <div key={empresa.id || idx} className="bg-white border border-blue-100 rounded-lg p-4 shadow flex flex-col gap-2">
                            <h3 className="font-semibold text-lg text-blue-700">{empresa.nombre}</h3>
                            <p className="text-sm text-gray-700">Sector: {empresa.sector}</p>
                            <p className="text-sm text-gray-700">Contacto: {empresa.contacto}</p>
                            <p className="text-sm text-gray-700">Tipo de ayuda: {empresa.ayuda}</p>
                            {onDelete && (
                                <button
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-xs self-end"
                                    onClick={() => onDelete(empresa.id)}
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default ListOfCompanies;
