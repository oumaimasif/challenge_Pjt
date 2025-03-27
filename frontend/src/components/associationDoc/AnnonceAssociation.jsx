import React from 'react';

const AnnonceAssociation = ({ association }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Missions</h2>
      {association.missions && association.missions.length > 0 ? (
        <div className="space-y-4">
          {association.missions.map((mission, index) => (
            <div 
              key={index} 
              className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-lg">{mission.nom}</h3>
              <p className="text-gray-600">{mission.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucune mission disponible.</p>
      )}
    </div>
  );
};

export default AnnonceAssociation;
