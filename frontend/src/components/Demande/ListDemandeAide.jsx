import React, { useEffect, useState } from 'react'
import axios from "axios"
import DemandeAideModal from './DemandeAideModal';
import DemandeAideCard from './DemandeAideCard';
import MenuParticulier from '../MenuParticulier';

export default function ListDemande() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDemandeId, setSelectedDemandeId] = useState(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/demandeAide")
        console.log("list des demandes:", res.data);
        console.log("info de la 1er demande", res.data[0])
        setDemandes(res.data || [])
        setLoading(false);
      } catch (error) {
        console.log("Erreur lors du chargement des demandes d'aide: ", error)
        setLoading(false);
      }
    }
    fetchDemandes();
  }, [])
  // OpenModal
  const handleOpenModal = (demandeId) => {
    setSelectedDemandeId(demandeId);
  };
  // close it 
  const handleCloseModal = () => {
    setSelectedDemandeId(null);
  };
  return (
    <>
      <div className='bg-purple-100 pb-8 min-h-screen'>
        <div className='px-6 pt-24 md:pt-26 md:px-12 min-h-screen'>
          {loading === true ? (
            <div className='flex items-center mt-20 md:mt-40 lg:mt-52 justify-center'>
              <img
                src="images/Spinner.svg"
                alt="Chargement des demandes d'aide..."
                className='w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40'
              />
            </div>
          ) : (
            <>
            <MenuParticulier />
              {/* Partie présentation des listes des demandes d'aide */}
              <div className='text-white bg-violet-600 my-4 md:mx-8 md:my-6 flex flex-col p-6 rounded-xl mb-6 justify-center'>
                <h1 className='text-2xl md:text-3xl font-bold mb-2 sm:mb-4 md:mb-6 md:text-center md:mt-4 text-center'>
                  Demandes d'aide : Répondez aux besoins des particuliers
                </h1>
                <p className='text-lg text-start md:text-left md:text-xl'>
                  Découvrez ici les demandes d'aide urgentes des particuliers qui ont besoin de votre soutien.
                  Votre aide peut faire une réelle différence dans leur vie quotidienne.
                </p>
              </div>
              {demandes.length > 0 ? (
              // Afficher les cartes des demandes d'aide
              <div className="grid grid-cols-1 gap-6 mx-2 md:grid-cols-3 auto-rows-fr md:gap-8">
                {demandes.map((demande) => (
                  <div key={demande._id} onClick={() => handleOpenModal(demande._id)}>
                    <DemandeAideCard demande={demande} onSelectDemande={handleOpenModal}  />
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
          </>
        )}
        </div>
      </div>
    </>
  )
}