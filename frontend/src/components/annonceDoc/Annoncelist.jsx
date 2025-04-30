import React, { useEffect, useState } from 'react'
import axios from "axios"
import AnnonceCard from './AnnonceCard'
import { toast } from 'react-toastify';
import Pagination from '../Pagination';

// console.log('Partie ANOONCES')


export default function Annoncelist() {

  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour la pagination
  const [limit] = useState(6) //nbr elements par page
  const [page, setPage] = useState(1);//current page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAnnoces = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/annonces?page=${page}&limit=${limit}`)
        console.log("Annonces av info benevoles//associations", res.data.data)
        setAnnonces(res.data.data || [])
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log("Erreur lors de chargement des annonces: ", error)
        toast.error("Erreur lors du chargement des données. Veuillez réessayer.")
        setLoading(false);

      }

    }
    fetchAnnoces();
  }, [page,limit])

  
  //changement des pages
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);

      window.scrollTo({ top: 1, behavior: 'smooth' })//remonter en haut de la page

    }
  }

  return (
    <>
      <div className=' bg-purple-100 pb-2 min-h-screen '>

        <div className='px-6 pt-24  md:pt-26  md:px-12 min-h-screen '>
          {loading === true ? (
            <div className='flex items-center mt-20 md:mt-40 lg:mt-52 justify-center '>
              <img src="images/Spinner.svg" alt="Chargement des annonces..." className='w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40' />
            </div>
          ) :
            (
              <>
                {/* Partie presentations des listes des annonces */}
                <div className='text-white my-6 bg-violet-600  md:mx-8 md:my-6 flex flex-col p-6 rounded-xl  justify-conter  '>
                  <h1 className='text-2xl md:text-3xl font-bold mb-2  sm:mb-4 md:mb-6 md:text-centre md:mt-4 text-center'>Besoins & Services : Ensemble, Aidons-nous !</h1>
                  <p className='text-lg text-start   md:text-left md:text-xl'>Retrouvez ici les besoins urgents des associations et les services généreusement proposés par nos bénévoles.
                    Ensemble, nous construisons une communauté solidaire et engagée.</p>
                </div>
                {annonces.length > 0 ? (
                  //afficher les cartes des annonces

                  <div className=' mb-8 grid grid-cols-1 mt-12 gap-6 mx-2 md:grid-cols-3  auto-rows-fr md:gap-8'>
                    {annonces.map((annonce) =>
                    (
                      <AnnonceCard key={annonce._id} annonce={annonce} />
                    ))}
                  </div>

                )
                  : (
                    //message d'erreur si ancune annonce trouvée
                    <div className='text-center py-6 lg:py-10'>
                      <p className='text-lg md:text-xl text-gray-600'>Aucune annonce Trouvée.</p>
                    </div>
                  )
                  
                  }
                 {/* Pagination */}
                 {annonces.length > 0 &&
                        (<Pagination page={page} totalPages={totalPages} onChangePage={changePage} />
                        )}
              </>        
            )}

        </div>

      </div>
    </>
  )
}

