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

  const isValidData = (benevole) => {
    return benevole && benevole.nom && benevole.prenom && benevole.ville;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchBenevoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/benevoles");
        console.log(response.data.dataBenevole);

        if (isMounted) {
          const data = response.data.dataBenevole || [];
          const validBenevoles = data.filter(benevole => isValidData(benevole));
          setBenevoles(validBenevoles);
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
    <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 bg-purple-100 px-4 sm:px-8 md:px-12 lg:px-14 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center mt-20 sm:mt-32 md:mt-40 lg:mt-52">
          <img src="/images/Spinner.svg" alt="Chargement..." className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" />
        </div>
      ) : (
        <>
          <div className='bg-purple-600 p-8 rounded-2xl '>          
            <h1 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-4 md:mb-6 text-center md:text-left">Bénévoles à l'honneur</h1>
            <p className="text-white text-base sm:text-lg px-2 sm:px-0 text-center md:text-left">
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
                  custom={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                    className="mt-2 hover:scale-[1.01] ease-in-out active:scale-[.98] active:duration-75 border-2 text-gray-900 font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-full w-full text-sm sm:text-base"
                  >
                    Voir le profil
                  </button>
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


// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion';
// import { Navigate, useNavigate } from 'react-router-dom'


// console.log("Composant Benevole chargé");
// function Benevole() {
//   const [benevoles, setBenevoles] = useState([]);
//   const [loading, setLoading] = useState(true);//premier affichage avant le rerende
//   const navigate = useNavigate();

//   //faire une animation pour les carte
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (index) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: index * 0.2, duration: 0.5 },
//     })

//   }

//   useEffect(() => {
//     let isMounted = true;
//     const fetchBenevoles = async () => {
//       try {
//         const listBenevoles = await axios.get("http://localhost:5000/benevoles");
//         console.log(listBenevoles.data.dataBenevole);
//         if (isMounted) {

//           setBenevoles(listBenevoles.data.dataBenevole || []);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.log("Erreurlors du chargement des bénévoles :", error);
//         setLoading(false)
//       }
//     }
//     fetchBenevoles();
//     return () => { isMounted = false; }
//   }, [])


//   return (
//     <div className="pt-28 bg-purple-100 px-14 min-h-screen">


//       {loading ? (
//         <div className="flex justify-center items-center mt-52">
//           {/* Spinner pendant le chargement */}
//           <img src="/images/Spinner.svg" alt="Chargement..." className="w-40  h-40" />
//         </div>
//       ) : (
//         <>
//           <h1 className="text-3xl font-bold mt-8 mb-6">Bénévoles à l'honneur</h1>
//           <p className="text-gray-600 text-lg">
//             Découvrez nos <span className="font-bold text-xl text-gray-800">Bénévoles</span> les plus actifs et engagés.
//             Leurs compétences et leur disponibilité peuvent correspondre à vos besoins.
//           </p>

//           <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 auto-rows-fr gap-4 px-8 py-5">
//             {
//               // verifier l afichage des benevoles existe ou nn 
//               benevoles.length > 0 ? (benevoles.map((benevole, index) => (
//                 <motion.div key={benevole._id} className="relative hover:scale-[1.01] bg-white space-y-3  mb-5 border rounded-lg shadow-lg p-4 flex flex-col justify-between "
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                   custom={index}
//                  whileHover={{ scale: 1.05 }}// Animation au survol
//                   // whileTap={{ scale: 0.95 }} //Animation au clic
//                 >
//                   <div className='flex gap-x-28  items-center'>

//                     {/* Afficher l'image si elle existe, sinon une alternative */}
//                     {benevole.image ?
//                       (
//                         <img src={benevole.image} alt={benevole.nom} className="rounded-full w-24 h-24 mx-auto" />
//                       ) : (
//                         <div className='rounded-full w-28 bg-black h-28 mx-auto'></div>
//                       )}
//                   </div>

//                   {/* Vérifier la mission et l'afficher si elle existe */}
//                   {/* //todo il faut calculer le nbre des annoce publier par chaque benevole */}
//                   {
//                     <div>
//                       <span className='absolute top-3 right-3 border border-purple-400 p-1 font-semibold text-gray-600 bg-orange-50 text-[10px] rounded-3xl'>2 mission</span>
//                     </div>
//                   }

//                   <div>
//                     <h2 className="text-xl font-bold  text-center">{benevole.nom} {benevole.prenom}</h2>

//                     {/* si le nom existe en l'affiche */}
//                     {benevole.ville && (<p className=" text-center text-xs">{benevole.ville}</p>)}
//                   </div>

//                   {/* <p className=" text-center">{benevole.competence}</p> */}

//                   {/*  afficher la description si elle existe */}
//                   {benevole.description && (
//                     <p className="lg:text-sm  text-[12px] text-gray-800 text-center lg:line-clamp-2 line-clamp-2">{benevole.description}</p>
//                   )}

//                   <div className="justify-center  flex gap-8 text-sm ">
//                     {benevole.disponible && (
//                       <span className="border border-orange-400 p-2 rounded-3xl">{benevole.disponible}</span>
//                     )}
//                     {benevole.heure && (
//                       <span className="border border-orange-400 p-2 rounded-3xl">{benevole.heure}</span>
//                     )}

//                   </div>

//                   <button
//                     onClick={() => navigate(`/profileBenevole/${benevole._id}`)}
//                     className=" hover:scale-[1.01] ease-in-out active:scale-[.98] hover:bg-purple-100 text-purple-700  active:duration-75 border-2  font-semibold py-2 px-4 rounded-full w-full"
//                   >
//                     Voir le profil
//                   </button>
//                 </motion.div>
//               ))
//               ) : (
//                 <div className="col-span-full text-center py-10">
//                   <p className="text-xl text-gray-600">Aucun bénévole trouvé</p>
//                 </div>
//               )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Benevole;


{/* 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom'

console.log("Composant Benevole chargé");
function Benevole() {
  const [benevoles, setBenevoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchBenevoles = async () => {
      try {
        const listBenevoles = await axios.get("http://localhost:5000/benevoles");
        console.log(listBenevoles.data.dataBenevole);
        if (isMounted) {
          setBenevoles(listBenevoles.data.dataBenevole || []);
        }
      } catch (error) {
        console.log("Erreur lors du chargement des bénévoles :", error);
      }
    }
    fetchBenevoles();
    return () => { isMounted = false; }
  }, [])

  Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="pt-28 bg-purple-100 px-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-3xl font-bold mt-8 mb-6"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Bénévoles à l'honneur
      </motion.h1>

      <motion.p 
        className='text-gray-600 text-lg'
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      > 
        Découvrez nos <span className='font-bold text-xl text-gray-800'>Bénévoles</span> les plus actifs et engagés. 
        Leurs compétences et leur disponibilité peuvent correspondre à vos besoins.
      </motion.p>

      <motion.div 
        className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 auto-rows-fr gap-4 px-8 py-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benevoles.length > 0 ? (
          benevoles.map((benevole, index) => (
            <motion.div 
              key={benevole._id} 
              className="relative bg-white space-y-3 mb-5 border rounded-lg shadow-lg p-4 flex flex-col justify-between"
              variants={itemVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
            >
              <div className='flex gap-x-28 items-center'>
                {benevole.image ? (
                  <motion.img 
                    src={benevole.image} 
                    alt={benevole.nom} 
                    className="rounded-full w-24 h-24 mx-auto"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                ) : (
                  <motion.div 
                    className='rounded-full w-28 bg-black h-28 mx-auto'
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                )}
              </div>

              <div>
                <motion.span 
                  className='absolute top-3 right-3 border border-purple-400 p-1 font-semibold text-gray-600 bg-orange-50 text-[10px] rounded-3xl'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  2 missions
                </motion.span>
              </div>

              <div>
                <motion.h2 
                  className="text-xl font-bold text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {benevole.nom} {benevole.prenom}
                </motion.h2>

                {benevole.ville && (
                  <motion.p 
                    className="text-center text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {benevole.ville}
                  </motion.p>
                )}
              </div>

              {benevole.description && (
                <motion.p 
                  className="lg:text-sm text-[12px] text-gray-800 text-center lg:line-clamp-2 line-clamp-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {benevole.description}
                </motion.p>
              )}

              <motion.div 
                className="justify-center flex gap-8 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {benevole.disponible && (
                  <motion.span 
                    className="border border-orange-400 p-2 rounded-3xl"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 146, 60, 0.1)" }}
                  >
                    {benevole.disponible}
                  </motion.span>
                )}
                {benevole.heure && (
                  <motion.span 
                    className="border border-orange-400 p-2 rounded-3xl"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 146, 60, 0.1)" }}
                  >
                    {benevole.heure}
                  </motion.span>
                )}
              </motion.div>

              <motion.button
                onClick={() => navigate(`/profileBenevole/${benevole._id}`)}
                className="border-2 text-gray-900 font-semibold py-2 px-4 rounded-full w-full"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                Voir le profil
              </motion.button>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="text-center py-12 bg-secondary/50 rounded-lg border border-border col-span-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            <motion.p 
              className="text-lg font-medium mb-2"
              animate={{ 
                opacity: [0.5, 1, 0.5], 
                scale: [0.98, 1, 0.98] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5 
              }}
            >
               <img src='./images/Spinner.svg'/> 
              Chargement...
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Benevole */}

{/* 

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Benevole() {
  const [benevoles, setBenevoles] = useState([]);
  const [loading, setLoading] = useState(true); État pour le spinner
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, Les cartes commencent cachées
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.5 }, Décalage progressif
    }),
  };

  useEffect(() => {
    let isMounted = true;
    const fetchBenevoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/benevoles");
        if (isMounted) {
          setBenevoles(response.data.dataBenevole || []);
          setLoading(false); Fin du chargement
        }
      } catch (error) {
        console.log("Erreur lors du chargement des bénévoles :", error);
        setLoading(false); Fin du chargement même si erreur
      }
    };
    fetchBenevoles();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="pt-28 bg-purple-100 px-14 min-h-screen">


      {loading ? (
        <div className="flex justify-center items-center mt-52">
          // Spinner pendant le chargement 
          <img src="/images/Spinner.svg" alt="Chargement..." className="w-40  h-40" />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mt-8 mb-6">Bénévoles à l'honneur</h1>
          <p className="text-gray-600 text-lg">
            Découvrez nos <span className="font-bold text-xl text-gray-800">Bénévoles</span> les plus actifs et engagés.
            Leurs compétences et leur disponibilité peuvent correspondre à vos besoins.
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 auto-rows-fr gap-4 px-8 py-5">
            {benevoles.map((benevole, index) => (
              <motion.div
                key={benevole._id}
                className="relative hover:scale-[1.01] bg-white space-y-3 mb-5 border rounded-lg shadow-lg p-4 flex flex-col justify-between"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ scale: 1.05 }} Animation au survol
                whileTap={{ scale: 0.95 }}  Animation au clic
                onClick={() => navigate(`/profileBenevole/${benevole._id}`)} Redirection au clic
              >
                <div className="flex gap-x-28 items-center">
                  {benevole.image ? (
                    <img
                      src={benevole.image}
                      alt={benevole.nom}
                      className="rounded-full w-24 h-24 mx-auto"
                    />
                  ) : (
                    <div className="rounded-full w-28 bg-black h-28 mx-auto"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-center">{benevole.nom} {benevole.prenom}</h2>
                  {benevole.ville && <p className="text-center text-xs">{benevole.ville}</p>}
                </div>
                {benevole.description && (
                  <p className="lg:text-sm text-[12px] text-gray-800 text-center lg:line-clamp-2 line-clamp-2">
                    {benevole.description}
                  </p>
                )}
                <div className="justify-center flex gap-8 text-sm">
                  {benevole.disponible && (
                    <span className="border border-orange-400 p-2 rounded-3xl">{benevole.disponible}</span>
                  )}
                  {benevole.heure && (
                    <span className="border border-orange-400 p-2 rounded-3xl">{benevole.heure}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Benevole; */}
