import React from 'react';

const ProfilAss = ({ association }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Description de l'Association</h2>
      <p>{association.description || "Aucune description disponible."}</p>
      
      <div className="mt-4 space-y-2">
        <div>
          <span className="font-semibold text-blue-500">Catégorie:</span>
          <span className="ml-2 px-3 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
            {association.categorie}
          </span>
        </div>
        <div>
          <span className="font-semibold">Nombre de missions:</span>
          <span className="ml-2">{association.mission || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilAss;