import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AnnonceCard from '../annonceDoc/AnnonceCard';
import axios from 'axios';

export default function AnnonceAssociation() {
  const { id } = useParams();
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {

    const fetchData = async () => {
      try {
        //  console.log("association id :" ,id);
        const res = await axios.get(`http://localhost:5000/annonces/associationProfil/${id}`);
        // console.log("Annonces association : ", res.data);
        setAnnonces(res.data);
        setLoading(false);

      } catch (error) {
        console.log("Erreur lors de la récuperation des annonces: ", error)
        setError("Impossible de charger les annonces. Veuillez réessayer.")
        setLoading(false);

      }
    }
    fetchData();

  }, [id])

  if (loading) {
    return (
      <div className='bg-blue-100 mt-4 border-2 shadow-xl w-[340px] md:w-[800px] relative -top-2 rounded-lg p-6'>
        <p className='text-center'>
          Chargement des annonces
        </p>
      </div>
    )
  }

  if (error) {
    <div className='bg-orange-100 mt-4 border-2 shadow-xl w-[340px] md:w-[800px] relative -top-2 rounded-lg p-6'>
      <p className='text-center'>
        {error}
      </p>
    </div>
  }
  return (
    <div className='bg-blue-100 mt-4 border-2 shadow-xl w-[340px] md:w-[800px] relative -top-2 rounded-lg p-6'>
      <h1 className='text-2xl font-bold text-purple-700 mb-4'>Nos annonces</h1>

      {annonces.length > 0 ? (
        <div className='grid md:grid-cols-2 gap-4'>
          {annonces.map((annonce => (
            <AnnonceCard key={annonce._id} annonce={annonce} />
          )))}

        </div>
      ):(
        <p>Ancune annonce disponible.</p>
      )
    }
    </div>
  )
}
