import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

console.log("Composant Benevole chargé");

function Benevole() {
  const [benevoles, setBenevoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Animation pour les cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.5 },
    })
  };


  useEffect(() => {
    let isMounted = true;

    const fetchBenevoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/benevoles");
        console.log(response.data.dataBenevole);

        if (isMounted) {
          setBenevoles(response.data.dataBenevole);
          setLoading(false);
        }
      } catch (error) {
        console.log("Erreur lors du chargement des bénévoles :", error);
        setLoading(false);
      }
    };

    fetchBenevoles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="pt-24  bg-purple-100 px-6  md:px-12  md:pt-26  min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center mt-20 sm:mt-32 md:mt-40 lg:mt-52">
          <img src="/images/Spinner.svg" alt="Chargement..." className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" />
        </div>
      ) : (
        <>
          <div className='bg-orange-400 p-4 rounded-2xl md:text-xl '>
            <h1 className="text-2xl sm:text-3xl text-white font-bold mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-4 md:mb-6 text-start md:text-left">Bénévoles à l'honneur</h1>
            <p className="text-white text-base sm:text-lg text-start md:text-left">
              Découvrez nos <span className="font-bold text-lg sm:text-xl text-gray-800">Bénévoles</span> les plus actifs et engagés.
              Leurs compétences et leur disponibilité peuvent correspondre à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-5 mt-4">
            {benevoles.length > 0 ? (
              benevoles.map((benevole, index) => (
                <motion.div
                  key={benevole._id}
                  className="relative hover:scale-[1.01] bg-white space-y-2 sm:space-y-3 mb-4 sm:mb-5 border rounded-lg shadow-lg p-3 sm:p-4 flex flex-col justify-between"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                // custom={index}// affiche les cartes une apret l'autre
                // whileHover={{ scale: 1.03 }}//ci en hover sur la carte
                // whileTap={{ scale: 0.95 }}// si en click il n ouvre pas mais il fair un mouvement
                >
                  <div>
                    <div className='flex justify-center items-center'>
                      {benevole.image ? (
                        <img src={benevole.image} alt={benevole.nom} className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover" />
                      ) : (
                        <div className='rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-black'></div>
                      )}
                    </div>

                    <div>
                      <span className='absolute top-2 right-2 sm:top-3 sm:right-3 border border-purple-400 p-1 font-semibold text-gray-600 bg-orange-50 text-[8px] sm:text-[10px] rounded-3xl'>2 missions</span>
                    </div>

                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-center truncate">{benevole.nom} {benevole.prenom}</h2>
                      {benevole.ville && (<p className="text-center text-xs sm:text-sm">{benevole.ville}</p>)}
                    </div>

                    {benevole.description && (
                      <p className="text-xs sm:text-sm text-gray-800 text-center line-clamp-2">
                        {benevole.description}
                      </p>
                    )}

                    <div className="justify-center flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-8 text-xs sm:text-sm">
                      {benevole.disponible && (
                        <span className="border border-orange-400 p-1 sm:p-2 rounded-3xl text-center">{benevole.disponible}</span>
                      )}
                      {benevole.heure && (
                        <span className="border border-orange-400 p-1 sm:p-2 rounded-3xl text-center">{benevole.heure}</span>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/profileBenevole/${benevole._id}`)}
                      className="mt-2 hover:scale-[1.02] hover:border-orange-600 ease-in-out active:scale-[.98] active:duration-75 border-2 text-gray-900 font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-full w-full text-sm sm:text-base"
                    >
                      Voir le profil
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-6 sm:py-10">
                <p className="text-lg sm:text-xl text-gray-600">Aucun bénévole trouvé</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Benevole;
