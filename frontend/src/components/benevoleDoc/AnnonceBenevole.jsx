import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnnonceCard from '../annonceDoc/AnnonceCard';
import axios from 'axios';


const AnnonceBenevole = () => {
  // const { id } = useOutletContext();//recupérer l id du benevole
  const { id } = useParams();
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log("benevoleId :", id);
        const res = await axios.get(`http://localhost:5000/annonces/benevoleProfil/${id}`)
        console.log( "annonce benevole info : ", res.data)
        setAnnonces(res.data);
        console.log("Annonces récupérées: ", res.data);
        console.log("les info ", annonces)

      } catch (error) {
        console.log("Erreur lors de la récupération des annnonces:", error)
      }
    }
    fetchData();
  }, [])
  console.log("les info ", annonces)
  return (
    <div className='bg-zinc-100 mt-4 border-2 shadow-xl w-[340px] md:w-[800px] relative -top-2 rounded-lg p-6'>
      <h1 className='text-2xl font-bold text-purple-700 mb-4'>Découvrir Mes annonces</h1>
      {annonces.length > 0 ? (

        <div className='grid  md:grid-cols-2 gap-4'>
          {annonces.map((annonce) => (
            <AnnonceCard key={annonce._id} annonce={annonce} />
          ))}
        </div>
      ) : (
        <p>Aucune annonce disponible.</p>
      )}
    </div>
  );
};

export default AnnonceBenevole; 
