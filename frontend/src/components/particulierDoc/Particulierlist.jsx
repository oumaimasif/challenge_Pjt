import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParticulierCard from './ParticulierCard';
import MenuParticulier from '../MenuParticulier';
import { useNavigate } from 'react-router-dom';

export default function Particulierlist() {
  const [particuliers, setParticuliers] = useState([]);
  const [loading, SetLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticuliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/particuliers');
        setParticuliers(response.data)
        SetLoading(false);

      } catch (error) {
        console.log('erreur lors du chargement des particuliers: ', error)
        SetLoading(false)
      }
    }

    fetchParticuliers();
  }, [])
  const handleAddDemande = () => {
    navigate('/formDemandeAide');
  }

  return (
    <>
      <div className='bg-[#f7ece1] pb-8 min-h-screen'>
        <div className='px-6 pt-24 md:pt-26 md:px-12 min-h-screen'>
          <MenuParticulier />
          <div className='text-white bg-violet-600 my-4 md:mx-8 flex flex-col p-6 rounded-xl  mb-6 justify-center '>
            <h1 className='text-2xl md:text-3xl font-bold sm:mb-4  mb-2 md:mb-6 md:text-center md:mt-4 text-center'> Nos Particuliers</h1>
            <div className='flex justify-between items-center'>
              <p className='text-lg text-start md:text-left md:text-xl flex-1'> {/* p prendre tt l'espace dispo */}
                
                Découvrez les particuliers inscrits sur notre plateforme et leurs demandes d'aide.
              </p>

              <button onClick={handleAddDemande} className=" bg-orange-200 gap-2 px-3 py-4 ml-4 rounded-md transition-all  text-white font-medium hover:bg-white hover:text-gray-700">
                
              </button>
            </div>

          </div>
          {loading === true ? (
            <div className='flex items-center mt-20 md:mt-40 lg:mt-52 justify-center '>
              <img src="images/Spinner.svg" alt="Chargement de la listes des particulier..." className='w-20 h-20 sm:w-28 sm:h-28 md:w-32 lg:w-40 lg:h-40' />
            </div>
          ) : (
            <>
              {particuliers.length > 0 ? (
                /* --------Partie listes des particuliers---------- */
                < div className='grid grid-clos-1 md:grid-clos-2 mt-9  lg:grid-cols-3 gap-8'>
                  {particuliers.map(particulier => (
                    <ParticulierCard key={particulier._id} particulier={particulier} />
                  ))}
                </div>

              ) : (
                <div className='text-center py-12'>
                  <p className='text-xl text-gray-600'>
                    Aucun particulier triuvé correspondant à votre recherche.
                  </p>
                </div>
              )}

            </>
          )
          }
        </div>
      </div >

    </>

  )
}


























