import React from "react";
import AllMigrantes from "./AllMigrantes";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function MigrantesPage({ migrantes, onDeleteMigrante, updateMigrante }) {
    return (
        <>
            <Header />
            <AllMigrantes 
                migrantes={migrantes} 
                onDelete={onDeleteMigrante} 
                onEdit={updateMigrante} 
            />
            <Footer />
        </>
    );
}

export default MigrantesPage;
