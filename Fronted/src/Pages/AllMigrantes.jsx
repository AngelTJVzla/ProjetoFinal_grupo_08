import React from "react";
import ListOfMigrantes from "../Components/ListOfMigrantes";

function AllMigrantes({ migrantes, onDelete, onEdit }) {
    return (
        <main className="container mx-auto p-4 pt-8 rounded shadow-md pb-20">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Todos os migrantes cadastrados</h1>
            <ListOfMigrantes migrantes={migrantes} onDelete={onDelete} onEdit={onEdit} />
        </main>
    );
}

export default AllMigrantes;
