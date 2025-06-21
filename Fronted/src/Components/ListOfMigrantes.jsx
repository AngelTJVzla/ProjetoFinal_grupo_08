import React from "react";

function ListOfMigrantes({ migrantes, onDelete }) {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-amber-800">Migrantes registrados</h2>
            <div className="grid gap-4">
                {migrantes.length === 0 ? (
                    <p className="text-gray-500">No hay migrantes registrados aún.</p>
                ) : (
                    migrantes.map((m, idx) => (
                        <div key={m.id || idx} className="bg-white border border-amber-100 rounded-lg p-4 shadow flex flex-col gap-2">
                            <h3 className="font-semibold text-lg text-amber-700">{m.nombre}</h3>
                            <p className="text-sm text-gray-700">País: {m.pais}</p>
                            <p className="text-sm text-gray-700">Habilidades: {m.habilidades}</p>
                            <p className="text-sm text-gray-700">Email: {m.email}</p>
                            {onDelete && (
                                <button
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-xs self-end"
                                    onClick={() => onDelete(m.id)}
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

export default ListOfMigrantes;
