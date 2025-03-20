import React from 'react';

const AnnonceBenevole = () => {
  return (
    <div className="bg-white shadow-lg w-full rounded-lg p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Mes annonces disponibles</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-lg font-medium text-purple-600">Aucune annonce disponible pour le moment.</p>
      </div>
    </div>
      );
};

export default AnnonceBenevole;