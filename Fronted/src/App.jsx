import React from "react";
import Header from './Components/Header';
import FormMigrante from './Components/FormMigrante';
import ListOfMigrantes from './Components/ListOfMigrantes';
import ListOfCompanies from './Components/ListOfCompanies';
import FormCompany from './Components/FormCompany';

function App({ migrantes, empresas, addMigrante, onDeleteMigrante, onDeleteEmpresa, updateMigrante, updateEmpresa, migranteSearchInput, empresaSearchInput, addEmpresa, onLogout }) {
    // Mostrar solo los primeros 6 migrantes en la página principal
    const migrantesVisibles = migrantes ? migrantes.slice(0, 6) : [];
    const hayMasMigrantes = migrantes && migrantes.length > 6;

    return (
        <>
            <Header onLogout={onLogout} />
            <main className="container mx-auto p-4 pt-8 rounded shadow-md pb-20">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[80vh] mt-0">
                    {/* Fila 1: Buscador migrante */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col justify-start bg-white/10 rounded-xl shadow-lg border border-white/20 p-4 backdrop-blur">
                        {migranteSearchInput && React.cloneElement(migranteSearchInput, {
                            className: (migranteSearchInput.props.className || '') + ' text-white placeholder-white',
                            placeholder: 'Buscar migrante por CPF...'
                        })}
                    </div>
                    {/* Fila 2: Form migrante y tabla migrantes */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-start bg-white/10 rounded-xl shadow-lg border border-white/20 p-4 pt-2 backdrop-blur">
                        <h2 className="text-lg font-bold mb-2 text-white title-animate">Cadastrar migrantes</h2>
                        <FormMigrante addMigrante={addMigrante} migrantes={migrantes} />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-start bg-white/10 rounded-xl shadow-lg border border-white/20 p-4 pt-0 backdrop-blur">
                        {migrantesVisibles && migrantesVisibles.length > 0 ? (
                            <ListOfMigrantes migrantes={migrantesVisibles} onDelete={onDeleteMigrante} onEdit={updateMigrante} />
                        ) : (
                            <div className="text-center text-gray-300 mt-10">No hay migrantes para mostrar.</div>
                        )}
                        {migrantes && migrantes.length > 0 && (
                            <div className="text-center mt-4">
                                <a href="/migrantes" className="text-blue-400 underline hover:text-blue-600 transition">Ver todos os migrantes cadastrados</a>
                            </div>
                        )}
                    </div>
                    {/* Fila 3: Buscador empresa */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col justify-start bg-white/10 rounded-xl shadow-lg border border-white/20 p-4 backdrop-blur">
                        {empresaSearchInput && React.cloneElement(empresaSearchInput, {
                            className: (empresaSearchInput.props.className || '') + ' text-white placeholder-white',
                            placeholder: 'Buscar empresa por CNPJ...'
                        })}
                    </div>
                    {/* Fila 4: Form empresa y tabla empresas */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-start bg-white/10 rounded-xl shadow-lg border border-white/20 p-4 backdrop-blur">
                        <h2 className="text-lg font-bold mb-2 text-white title-animate">Cadastrar empresa</h2>
                        <FormCompany addEmpresa={addEmpresa} empresas={empresas} />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-start bg-white/10 rounded-xl shadow-lg border border-white/20 p-4 pt-0 backdrop-blur">
                        {empresas && empresas.length > 0 ? (
                            <ListOfCompanies empresas={empresas} onDelete={onDeleteEmpresa} onEdit={updateEmpresa} />
                        ) : (
                            <div className="text-center text-gray-300 mt-10">No hay empresas para mostrar.</div>
                        )}
                        {empresas && empresas.length > 0 && (
                            <div className="text-center mt-4">
                                <a href="/empresas" className="text-blue-400 underline hover:text-blue-600 transition">Ver todas as empresas cadastradas</a>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default App;