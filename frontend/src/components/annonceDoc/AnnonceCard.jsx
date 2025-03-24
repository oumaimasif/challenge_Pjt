import axios from 'axios'
import React, { useEffect } from 'react'

export default function AnnonceCard({ annonce }) {

  // useEffect(() => { 
  //   const fetshinfo = async () => {
  //     const res = await axios.get("http://localhost:5000/annonces/user_annonces");
  //     console.log("voila la liste des annoces avec plus de detaile sur le createurs : ", res.data)
  //   }
  //   fetshinfo();
  // }, [])
  const typeAnnance = {
    Besoin:"bg-orange-300",
    Service:"bg-amber-200",
  }
  

  return (
    <div className='bg-white h-full rounded-xl  shadow-sm flex  flex-col justify-between hover:shadow-lg transition-all duration-300 overflow-hidden'>
        { annonce.type && typeAnnance[annonce.type] ? (
            <span className={`${typeAnnance[annonce.type] } text-gray-700 font-semibold  w-min py-1 px-2 rounded-br-2xl`}>{annonce.type}</span>
          ) : (
          <span className={` text-gray-700 font-semibold  w-min py-1 px-2 rounded-br-2xl`}>{annonce.type||"Type inconnu"}</span>

         )}
        {/* Image des association */}
        {/* <div className='relative h-48 overflow-hidden '>
          {annonce.image}

        </div> */}
        <h1 className='text-purple-900 '> {annonce.titre}</h1>
      <p className='text-xl font-medium text-black line-clamp-2 text-balance'>{annonce.description}</p>
     <div className=''>
     <span className='text-[8px]  bg-slate-300 p-1 max-w-min rounded-md'>{annonce.role}</span>
     {annonce.Association && annonce.Association.length > 0 ? (
        <span className='text-sm bg-slate-300 p-1 max-w-min rounded-md'>{annonce.Association[0].nomAssociation}</span>

      ) : annonce.Benevoles && annonce.Benevoles.length > 0 ? (
        <span className='text-sm bg-slate-300 p-1 max-w-min rounded-md'>{annonce.Benevoles[0].nom} {annonce.Benevoles[0].prenom}</span>

      ) : (
        <span className='text-sm bg-slate-300 p-1 max-w-min rounded-md'>Créateur inconnu</span>

      )

      }
     </div>
      <div className='flex  items-center gap-3 md:gap-6'>
        <img src="/images/image.png" className='w-14 h-14' />
        <h1 className='text-purple-900'> {annonce.titre}</h1>
      </div>
    </div>
  )
}

//        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

   
// import React from 'react';

// export default function AnnonceCard({ annonce }) {
//   return (
//     <div className='bg-white p-5 h-full rounded-lg shadow-md flex flex-col justify-between relative'>
//       {/* Badge pour l'aide reçue */}
//       {(annonce.aideReçu || annonce.aideRecu) ? (
//         <span className='absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>
//           Aide reçue
//         </span>
//       ) : (
//         <span className='absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full'>
//           Aide en attente
//         </span>
//       )}

//       <div className='flex items-center gap-3 md:gap-6'>
//         <img src="/images/image.png" className='w-14 h-14' />
//         <h1 className='text-purple-900'> {annonce.titre}</h1>
//       </div>
//       <p className='text-xl text-black'>{annonce.description}</p>
//       <span className='text-[8px] bg-slate-300 p-1 max-w-min rounded-md'>{annonce.role}</span>
      
//       {annonce.Association && annonce.Association.length > 0 ? (
//         <span className='text-sm bg-slate-300 p-1 max-w-min rounded-md'>{annonce.Association[0].nomAssociation}</span>
//       ) : annonce.Benevoles && annonce.Benevoles.length > 0 ? (
//         <span className='text-sm bg-slate-300 p-1 max-w-min rounded-md'>{annonce.Benevoles[0].nom} {annonce.Benevoles[0].prenom}</span>
//       ) : (
//         <span className='text-sm bg-slate-300 p-1 max-w-min rounded-md'>Créateur inconnu</span>
//       )}
      
//       {/* Affichage du type d'annonce */}
//       {annonce.type && (
//         <span className='text-xs bg-purple-100 text-purple-800 mt-2 p-1 max-w-min rounded-md'>
//           {annonce.type}
//         </span>
//       )}
      
//       {/* Nombre de bénévoles recherchés (si applicable) */}
//       {annonce.type === 'Besoin' && annonce.nbrBenevole && (
//         <div className="mt-2 text-xs text-gray-600">
//           Bénévoles recherchés: {annonce.nbrBenevole}
//         </div>
//       )}
//     </div>
//   );
// }