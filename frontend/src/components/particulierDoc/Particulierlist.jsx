import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParticulierCard from './ParticulierCard'
import MenuParticulier from '../MenuParticulier';


export default function Particulierlist() {
  const [particuliers, setParticuliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticuliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/particuliers');
        setParticuliers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des particuliers:", error);
        setLoading(false);
      }
    };

    fetchParticuliers();
  }, []);


  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4 pt-24 md:pt-28">
                <MenuParticulier />
        <div className="text-white bg-violet-600 p-6 rounded-xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            Nos Particuliers
          </h1>
          <p className="text-lg text-center md:text-xl">
            Découvrez les particuliers inscrits sur notre plateforme et leurs demandes d'aide.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <img
              src="images/Spinner.svg"
              alt="Chargement..."
              className="w-20 h-20"
            />
          </div>
        ) : particuliers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {particuliers.map(particulier => (
              <ParticulierCard
                key={particulier._id}
                particulier={particulier}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Aucun particulier trouvé correspondant à votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
























