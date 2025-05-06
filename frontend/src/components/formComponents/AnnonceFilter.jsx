import React, { useState } from 'react';

const AnnonceFilter = ({ onFilter }) => {
    const [ville, setVille] = useState('');
    const [type, setType] = useState('');
    const [statut, setStatut] = useState('');

    const handleFilter = () => {
        onFilter({ ville, type, statut });
    };

    return (
        <div className="flex items-center justify-center flex-wrap gap-4 bg-white p-4 rounded shadow">
            <input
                type="text"
                placeholder="Ville.."
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="border border-gray-300 rounded-md p-2 "
            />
            <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className=" border border-gray-300 rounded-md p-2 "
            >
                <option value="tous">Tous les types</option>
                <option value="Besoin">Besoin</option>
                <option value="Service">Service</option>
            </select>
            <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="border border-gray-300 rounded-md p-2 "
            >
                <option value="">Tous les statuts</option>
                <option value="Publié">Publié</option>
                <option value="brouillon">Brouillon</option>
                <option value="Rejeté">Rejeté</option>
            </select>
            <button
                onClick={handleFilter}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
                Filtrer
            </button>
        </div>
    );
};

export default AnnonceFilter;
