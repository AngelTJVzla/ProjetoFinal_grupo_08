import React from "react";
import Header from './Components/Header';
import FormMigrante from './Components/FormMigrante';
import ListOfMigrantes from './Components/ListOfMigrantes';
import ListOfCompanies from './Components/ListOfCompanies';

function App({ resultado, empresas, addMigrante, onDeleteMigrante, onDeleteEmpresa, updateMigrante, updateEmpresa, migranteSearchInput }) {
    return (
        <>
            <Header />
            <main className="container bg-css-grid mx-auto p-4 rounded shadow-md pb-20">
                <section className="grid md:grid-cols-2 gap-8">
                    <div>
                        {/* Input de búsqueda de migrantes debajo del header y encima del título */}
                        {migranteSearchInput && React.cloneElement(migranteSearchInput, {
                            className: (migranteSearchInput.props.className || '') + ' text-white placeholder-white',
                            placeholder: 'Buscar migrante por nome, país ou habilidade...'
                        })}
                        <h2 className="text-lg font-bold mb-2 text-white title-animate">Migrantes registrados</h2>
                        <FormMigrante addMigrante={addMigrante} />
                        <ListOfMigrantes migrantes={resultado} onDelete={onDeleteMigrante} onEdit={updateMigrante} />
                    </div>
                    <div>
                        <ListOfCompanies empresas={empresas || []} onDelete={onDeleteEmpresa} onEdit={updateEmpresa} />
                    </div>
                </section>
            </main>
        </>
    );
}

export default App;