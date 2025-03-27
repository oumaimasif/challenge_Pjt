import React, { useEffect, useState } from 'react';

import {  useParams } from 'react-router-dom';
import AnnonceCard from '../annonceDoc/AnnonceCard';
import axios from 'axios';


const AnnonceBenevole = () => {
  // const { id } = useOutletContext();//recupérer l id du benevole
  const { id } = useParams();
  const [annoncebenevole, setAnnonces] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      console.log("benevoleID :", id);
      const res = await axios.get(`http://localhost:5000/annonces/benevole/${id}`)
      setAnnonces(res.data);
      console.log("benevoleID voire Res.data :", res.data);

    }
    fetchData();
  }, [id])
  console.log("les info ",annoncebenevole)
  return (
    <div className='bg-zinc-100 mt-4 border-2 shadow-xl w-[340px] md:w-[800px] relative -top-2 rounded-lg p-6'>
      <h1 className='text-2xl font-bold text-purple-700 mb-4'>Decouvrire Mes annonces</h1>
      {annoncebenevole.length > 0 ? (

<div className='grid  md:grid-cols-2 gap-4'>
{annoncebenevole.map((an) => (
    <AnnonceCard key={an._id} annonce={an}  />
  ))}
</div>
) : (
  <p>Aucune annonce disponible.</p>
)}
    </div>
  );
};

export default AnnonceBenevole; 
