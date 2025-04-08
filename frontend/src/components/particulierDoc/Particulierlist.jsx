import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ParticulierCard from './ParticulierCard';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import MenuParticulier from '../MenuParticulier';


export default function Particulierlist() {
  const [particuliers, setParticuliers] = useState([]);
  const navigate = useNavigate()

  const handlenavigation = () => {
    navigate('/formDemandeAide')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get("http://localhost:5000/particuliers");
        console.log("listes des particuliers", result.data);
        setParticuliers(result.data);

      } catch (err) {
        console.log("Erreur lors du chargement des données: ", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>    
     <MenuParticulier />
    <div className="pt-28 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Liste des demandes particuliers</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={handlenavigation} className="ml-auto bg-blue-500 text-white px-4 py-3 flex rounded hover:bg-blue-600">
          <Plus className=" mr-2"  />
          Ajouter une demande
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {particuliers.map((particulier) => (
          <ParticulierCard key={particulier._id} particulier={particulier} />
        ))}
      </div>
    </div>
    </>
  );
}