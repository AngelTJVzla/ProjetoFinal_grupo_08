import React from "react";
import AllMigrantes from "./AllMigrantes";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function MigrantesPage({ migrantes, onDeleteMigrante, updateMigrante }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <AllMigrantes 
                    migrantes={migrantes} 
                    onDelete={onDeleteMigrante} 
                    onEdit={updateMigrante} 
                />
            </div>
            <Footer />
        </div>
    );
}

export default MigrantesPage;
