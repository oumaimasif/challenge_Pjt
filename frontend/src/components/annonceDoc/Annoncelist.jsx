import React, { useEffect, useState } from 'react'
import axios from "axios"
import AnnonceCard from './AnnonceCard'
console.log('Partie ANOONCES')

export default function Annoncelist() {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAnnoces = async () => {
      try {
        const res = await axios.get("http://localhost:5000/annonces/")
        console.log(res.data)
        setAnnonces(res.data || [])
        setLoading(false);
      } catch (error) {
        console.log("Erreur lors deu chargement des annonces: ", error)
        setLoading(false);

      }

    }
    fetchAnnoces();
  }, [])
  return (
    <>
      <div className=' bg-purple-100 pt-28 min-h-screen'>


        {/* Partie des cartes d'annonces */}
        <div className='px-6 py-4 '>
          {loading === true ? (
            <div className='flex justify-center'>
              <img src="images/Spinner.svg" alt="Chargement des annonces..." />
            </div>
          ) :
            (
              <>
                {/* Partie presentations des listes dess annonces */}
                <div className='text-white bg-violet-600 m-auto flex flex-col p-6 space-x-3 justify-conter mx-20  '>
                  <h1 className='text-xl md:text-2xl font-bold mb-4 md:my-6 text-center'>Besoins & Services : Ensemble, Aidons-nous !</h1>
                  <p className='text-lg md:text-xl'>Retrouvez ici les besoins urgents des associations et les services généreusement proposés par nos bénévoles.
                    Ensemble, nous construisons une communauté solidaire et engagée.</p>
                </div>
                {annonces.length > 0 ? (
                  //afficher les cartes des annonces

                  annonces.map((a) =>
                  (<AnnonceCard key={a._id} annonces={annonces} />
                  ))

                )
                  : (
                    //message d'erreur si ancune annonce trouvée
                    <div>
                      <p>Aucune annonce Trouvée pour le moment.</p>
                    </div>
                  )}
              </>
            )}
        </div>
      </div>
    </>
  )
}