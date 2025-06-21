import React from "react";
import Footer from './Components/Footer';
import Header from './Components/Header';
import FormMigrante from './Components/FormMigrante';
import ListOfMigrantes from './Components/ListOfMigrantes';
import ListOfCompanies from './Components/ListOfCompanies';

function App({ resultado, empresas, addMigrante, onDeleteMigrante, onDeleteEmpresa, updateMigrante, updateEmpresa, migranteSearchInput }) {
    return (
        <>
            <Header />
            <main className="container bg-amber-100 mx-auto p-4 rounded shadow-md">
                <section className="grid md:grid-cols-2 gap-8">
                    <div>
                        {/* Input de búsqueda de migrantes debajo del header y encima del título */}
                        {migranteSearchInput}
                        <h2 className="text-lg font-bold mb-2 text-amber-900">Cadastro de Migrantes</h2>
                        <FormMigrante addMigrante={addMigrante} />
                        <ListOfMigrantes migrantes={resultado} onDelete={onDeleteMigrante} onEdit={updateMigrante} />
                    </div>
                    <div>
                        <ListOfCompanies empresas={empresas || []} onDelete={onDeleteEmpresa} onEdit={updateEmpresa} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;