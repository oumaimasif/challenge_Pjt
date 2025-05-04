import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnnonceCard from '../annonceDoc/AnnonceCard';
import axios from 'axios';
import { Turtle } from 'lucide-react';
import { toast } from 'react-toastify';



const AnnonceBenevole = () => {


  const { id } = useParams();
  const [annonces, setAnnonces] = useState([]);
  const [doubleFetch, setDoubleFetch] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setDoubleFetch(false);

    const fetchData = async () => {
      try {
        // console.log("benevoleId :", id);
        const res = await axios.get(`http://localhost:5000/annonces/benevoleProfil/${id}`)
        if (!isMounted) {
          console.log("annonce benevole info : ", res.data)
          setAnnonces(res.data || []);
          setDoubleFetch(Turtle);
          console.log("Annonces récupérées: ", res.data);
          console.log("les info 1 ", res.data)
        }

      } catch (error) {
        if (!isMounted) {
          console.log("Erreur lors de la récupération des annnonces:", error)
          toast.error("Erreur lors de la récupération des annnonces ")
          setDoubleFetch(true);
        }
      }
    }
    fetchData();

    return () => { isMounted = false }
  }, [])

  // console.log("les info final ", annonces)

  return (
    <div className='bg-orange-100 mt-4 border-2 shadow-xl w-[340px] md:w-[850px] relative -top-2 rounded-lg p-6'>
      <h1 className='text-2xl font-bold text-orange-700 mb-4'>Découvrir Mes annonces</h1>
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
