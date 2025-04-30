import React, { useEffect, useState } from 'react'
import axios from "axios"
import DemandeAideModal from './DemandeAideModal';
import DemandeAideCard from './DemandeAideCard';
import MenuParticulier from '../MenuParticulier';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';

export default function ListDemande() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(9) //nbr elements par page
  const [page, setPage] = useState(1);//current page
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const [selectedDemandeId, setSelectedDemandeId] = useState(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/demandeAide?page=${page}&limit=${limit}`)
        console.log("list des demandes:", response.data);
        console.log("info de la 1er demande", response.data[0])
        setDemandes(response.data.demandes || [])
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log("Erreur lors du chargement des demandes d'aide: ", error)
        setLoading(false);
      }
    }
    fetchDemandes();
  }, [page, limit])
  // OpenModal
  const handleOpenModal = (demandeId) => {
    setSelectedDemandeId(demandeId);
  };
  // close it 
  const handleCloseModal = () => {
    setSelectedDemandeId(null);
  };

   //changement des pages
   const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);

      window.scrollTo({ top: 1, behavior: 'smooth' })//remonter en haut de la page

    }
  }
  return (
    <>
      <div className='bg-[#f7ece1] pb-2 min-h-screen'>
        <div className='px-6 pt-24 md:pt-26 md:px-12 min-h-screen'>
          <MenuParticulier />
          <div className='text-white bg-violet-600 my-4 md:mx-8 flex flex-col p-6 rounded-xl  mb-6 justify-center '>
            <h1 className='text-2xl md:text-3xl font-bold sm:mb-4  mb-2 md:mb-6 md:text-center md:mt-4 text-left'>
              Demandes d'aide : Répondez aux besoins des particuliers </h1>
            <p className='text-lg text-start md:text-left md:text-xl'>
              Découvrez ici les demandes d'aide urgentes des particuliers qui ont besoin de votre soutien.
              Votre aide peut faire une réelle différence dans leur vie quotidienne.
            </p>
            <button onClick={()=> navigate('/formDemandeAide')} className=" bg-[#e1fc12f7] self-center mt-2 md:self-end lg:self-end  p-3  w-fit rounded-tl-full rounded-e-full transition-all  text-lg font-semibold text-white  hover:bg-white hover:text-gray-700">
                Créer une demande
              </button>
          </div>
          {loading === true ? (
            <div className='flex items-center mt-20 md:mt-40 lg:mt-52 justify-center '>
              <img src="images/Spinner.svg" alt="Chargement des demandes d'aide...." className='w-20 h-20 sm:w-28 sm:h-28 md:w-32 lg:w-40 lg:h-40' />
            </div>)
            : (
              <>
                {/* Partie présentation des listes des demandes d'aide */}

                {demandes.length > 0 ? (
                  // Afficher les cartes des demandes d'aide  (auto-rows-fr)
                  <div className=" mb-8 grid grid-cols-1 gap-6 mx-2 md:grid-cols-3 md:gap-8">
                    {demandes.map((demande) => (
                      <div key={demande._id} onClick={() => handleOpenModal(demande._id)} className='h-full flex'>
                        <DemandeAideCard demande={demande} onSelectDemande={handleOpenModal} />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Message si aucune demande trouvée
                  <div className="text-center py-6 lg:py-10">
                    <p className="text-lg md:text-xl text-gray-600">Aucune demande d'aide trouvée.</p>
                  </div>
                )}

                {/* Modal pour afficher les détails de la demande */}
                {selectedDemandeId && (
                  <DemandeAideModal
                    demandeId={selectedDemandeId}
                    onClose={handleCloseModal}
                  />
                )}
                {/* Pagination */}
                {demandes.length > 0 &&
                  (<Pagination page={page} totalPages={totalPages} onChangePage={changePage} />
                  )}
              </>
            )}
        </div>
      </div>
    </>
  )
}