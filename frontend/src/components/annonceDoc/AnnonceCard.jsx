import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown, Clock, Info, Tag } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function AnnonceCard({ annonce }) {


  const typeAnnonce = {
    Besoin: { bg: "bg-orange-100 ", icon: AlertCircle },
    Service: { bg: "bg-amber-200 ", icon: CheckCircle },
  }

  //affichet les niveaux de l'urgence
  const niveau = {
    Fiable: { bg: "bg-green-200 text-green-800", icon: CheckCircle },
    Moyen: { bg: "bg-blue-200 text-yellow-800", icon: Info },
    Urgent: { bg: "bg-red-200 text-red-800", icon: AlertTriangle }
  }

  //les statut des annonces valide par ( admin (si il passe 24h elle va etre publier 
  // automatique et benevole, association peuvent indiquer ci le annonce a ete terminer )..

  const TypeIcon = typeAnnonce[annonce.type]?.icon || Info
  const NiveauIcon = niveau[annonce.niveauDurgence]?.icon || Info

  return (
    <div className='relative flex flex-col justify-around bg-white rounded-2xl  shadow-lg  hover:shadow-xl transition-all duration-300 overflow-hidden'>{/* un effet de zoom pour les image *** */}
      <div className={`absolute top-0 left-0 z-10 ${typeAnnonce[annonce.type]?.bg || 'bg-gray-200'}  text-gray-700  font-semibold  py-1 px-2 rounded-br-xl flex items-center  `}>
        <TypeIcon className='w-5 h-5 flex-shrink-0' />
        <span className={` text-gray-700 font-semibold  w-min py-1 px-2 rounded-br-2xl`}>{annonce.type || "Type inconnu"}</span>
      </div>
      {annonce.terminer && (<div className="absolute bg-indigo-300 top-0 right-0 z-10 text-white  font-semibold  py-1 px-2 rounded-bl-xl flex items-center ">
        <Clock className="h-4 w-4 text-white mr-1" />
        <span>{annonce.terminer }</span>
      </div>)}



      {/* image des association (serveur) */}
      <div className='relative h-48 border-b-2 overflow-hidden '>
        <img src={`http://localhost:5000/${annonce.image}`} alt="Image de l'annonce"
          className='w-full h-full object-cover transition-transform duration-500 hover:scale-110' />
      </div>
      <div className='space-y-3 px-4 py-3'>
        <h1 className='text-purple-900 line-clamp-2 font-bold text-xl  '> {annonce.titre}</h1>
        <p className='text-sm  text-gray-700 line-clamp-3 '>{annonce.description}</p>

        <div className='space-y-2'>
          <div className=' flex items-center gap-2'>
            <Tag className='w-4 h-4  text-purple-500 ml-3' />
            <span className=''>{annonce.role}</span>
            {annonce.Association && annonce.Association.length > 0 ? (

              <span className='text-sm py-2 text-gray-700 '> : {annonce.Association[0].nomAssociation}</span>

            ) : annonce.Benevoles && annonce.Benevoles.length > 0 ? (
              <span className='text-sm py-2  text-gray-700 '>: {annonce.Benevoles[0].nom} {annonce.Benevoles[0].prenom}</span>

            ) : (
              <span className='text-sm py-2 text-gray-700 '>: Créateur inconnu</span>
            )

            }
          </div>
          <div className={`flex items-center gap-2 py-1 w-fit pr-3 rounded-xl ${niveau[annonce.niveauDurgence]?.bg}`}>
            {NiveauIcon &&
              <NiveauIcon className='w-4 h-4 text-violet-500 ml-3' />}
            <span className="font-medium text-sm">{annonce.niveauDurgence || "Niveaus d'urgence Non spécifié"} </span>
          </div>
        </div>
        {/* Bouton de détails avec effet */}
        <Link
          to={`/annonceDetail/${annonce._id}`}
          className=' flex items-center justify-center text-center bg-violet-500 text-white py-3 my-4  rounded-full 
          hover:bg-violet-600 transition-all duration-300  hover:shadow-lg'
        >
          Voir les détails <ChevronDown size={18} />
        </Link>
      </div>
    </div>
  )
}

{/* <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" /> */ }
