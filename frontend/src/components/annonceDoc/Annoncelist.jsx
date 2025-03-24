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
        const res = await axios.get("http://localhost:5000/annonces")
        console.log("Annonces av info benevoles//associations",res.data)
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
      <div className=' bg-purple-100 pb-8 min-h-screen '>


        {/* Partie des cartes d'annonces */}
        <div className='px-6 pt-24  md:pt-26 md:px-12 min-h-screen '>
          {loading === true ? (
            <div className='flex items-center mt-20 md:mt-40 lg:mt-52 justify-center '>
              <img src="images/Spinner.svg" alt="Chargement des annonces..."  className='w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40'/>
            </div>
          ) :
            (
              <>
                {/* Partie presentations des listes des annonces */}
                <div className='text-white bg-violet-600 my-4 md:mx-8 md:my-6 flex flex-col p-6 rounded-xl mb-6 justify-conter  '>
                  <h1 className='text-2xl md:text-3xl font-bold mb-2  sm:mb-4 md:mb-6 md:text-centre md:mt-4 text-center'>Besoins & Services : Ensemble, Aidons-nous !</h1>
                  <p className='text-lg text-start   md:text-left md:text-xl'>Retrouvez ici les besoins urgents des associations et les services généreusement proposés par nos bénévoles.
                    Ensemble, nous construisons une communauté solidaire et engagée.</p>
                </div>
                {annonces.length > 0 ? (
                  //afficher les cartes des annonces

                  <div className=' grid grid-cols-1  gap-6 mx-2 md: md:grid-cols-3  auto-rows-fr md:gap-8'>
                    {annonces.map((annonce) =>
                    (
                      <AnnonceCard key={annonce._id} annonce={annonce} />
                    ))
                    }
                    
                  </div>
                  

                )
                  : (
                    //message d'erreur si ancune annonce trouvée
                    <div className='text-center py-6 lg:py-10'>
                      <p className='text-lg md:text-xl text-gray-600'>Aucune annonce Trouvée.</p>
                    </div>
                  )}
              </>
            )}
        </div>
      </div>
    </>
  )
}



// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import AnnonceCard from './AnnonceCard';

// export default function AnnonceList() {
//   const [annonces, setAnnonces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('tous');
//   const [categoryFilter, setCategoryFilter] = useState('tous');

//   useEffect(() => {
//     const fetchAnnonces = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/annonces");
//         console.log("Annonces récupérées:", res.data);
//         setAnnonces(res.data || []);
//         setLoading(false);
//       } catch (error) {
//         console.log("Erreur lors du chargement des annonces: ", error);
//         setLoading(false);
//       }
//     };
//     fetchAnnonces();
//   }, []);

//   // Extract all unique categories from annonces
//   const allCategories = [...new Set(annonces.flatMap(annonce => 
//     annonce.categories || []))];

//   // Filter annonces based on selected filters
//   const filteredAnnonces = annonces.filter(annonce => {
//     // Filter by type (Service, Besoin)
//     const typeMatch = filter === 'tous' || annonce.type === filter;
    
//     // Filter by category
//     const categoryMatch = categoryFilter === 'tous' || 
//       (annonce.categories && annonce.categories.includes(categoryFilter));
    
//     return typeMatch && categoryMatch;
//   });

//   return (
//     <div className='bg-purple-50 pb-8 min-h-screen'>
//       {/* Header section */}
//       <div className='px-6 pt-24 md:pt-26 md:px-12 min-h-screen'>
//         {loading ? (
//           <div className='flex items-center mt-20 md:mt-40 lg:mt-52 justify-center'>
//             <img 
//               src="/images/Spinner.svg" 
//               alt="Chargement des annonces..." 
//               className='w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40'
//             />
//           </div>
//         ) : (
//           <>
//             {/* Introduction section */}
//             <div className='text-white bg-violet-600 my-4 md:mx-8 md:my-6 flex flex-col p-6 rounded-xl mb-6'>
//               <h1 className='text-2xl md:text-3xl font-bold mb-2 sm:mb-4 md:mb-6 text-center'>
//                 Besoins & Services : Ensemble, Aidons-nous !
//               </h1>
//               <p className='text-lg text-start md:text-left md:text-xl'>
//                 Retrouvez ici les besoins urgents des associations et les services 
//                 généreusement proposés par nos bénévoles. Ensemble, nous construisons 
//                 une communauté solidaire et engagée.
//               </p>
//             </div>

//             {/* Filters section */}
//             <div className='flex flex-col md:flex-row gap-4 mx-2 md:mx-12 mb-6'>
//               <div className='md:flex-1'>
//                 <label htmlFor="typeFilter" className='block text-sm font-medium text-gray-700 mb-1'>
//                   Type d'annonce
//                 </label>
//                 <select 
//                   id="typeFilter"
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   className='w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-700'
//                 >
//                   <option value="tous">Tous les types</option>
//                   <option value="Service">Services</option>
//                   <option value="Besoin">Besoins</option>
//                 </select>
//               </div>

//               <div className='md:flex-1'>
//                 <label htmlFor="categoryFilter" className='block text-sm font-medium text-gray-700 mb-1'>
//                   Catégorie
//                 </label>
//                 <select 
//                   id="categoryFilter"
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                   className='w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-700'
//                 >
//                   <option value="tous">Toutes les catégories</option>
//                   {allCategories.map((category, index) => (
//                     <option key={index} value={category}>{category}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Annonces cards section */}
//             {filteredAnnonces.length > 0 ? (
//               <div className='grid grid-cols-1 gap-6 mx-2 md:mx-12 md:grid-cols-3 auto-rows-fr md:gap-8'>
//                 {filteredAnnonces.map((annonce) => (
//                   <AnnonceCard key={annonce._id} annonce={annonce} />
//                 ))}
//               </div>
//             ) : (
//               <div className='text-center py-6 lg:py-10 bg-white rounded-lg shadow-md mx-2 md:mx-12'>
//                 <p className='text-lg md:text-xl text-gray-600'>
//                   Aucune annonce ne correspond à vos critères de recherche.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }