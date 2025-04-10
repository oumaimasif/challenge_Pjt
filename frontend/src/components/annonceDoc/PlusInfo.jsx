import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlertCircle, AlertTriangle, Calendar, CheckCircle, Info, Tag, MapPin, User, Contact, Share2 } from 'lucide-react'
import axios from 'axios';
import ModalContact from './ModalContact';

console.log("detail des annonces")

export default function PlusInfo() {
  const { id } = useParams();
  console.log("ID est :", id)
  const [detail, setDetail] = useState([]);
  const [benevole, setBenevole] = useState(null)
  const [association, setAssociation] = useState(null)
  const [showContactModal, setShowContactModal] = useState(false);

  //ouvrir et fermer le popup
  // const ToggleContact = () => {
  //   setShowContactModal(!showContactModal);
  // }

  useEffect(() => {

    try {
      const fetchdata = async () => {
        const info = await axios.get(`http://localhost:5000/annonces/annonceDetail/${id}`)
        console.log("Annonce Info : ", info.data)
        setDetail(info.data);

        //recuperer les info de benevole 
        if (info.data.benevoleID) {
          try {
            const benevoleInfo = await axios.get(`http://localhost:5000/annonces/benevole/${info.data.benevoleID}`);
            // console.log("Benovole ID: ", benevoleInfo.data)
            setBenevole(benevoleInfo.data);
          } catch (error) {
            console.log("Erreur lors de récupération des information bénévole", error)
          }

        }

        //gérer les inforamtion Association 
        if (info.data.associationID) {
          try {
            // console.log("Association ID: ", info.data.associationID)
            const assInfo = await axios.get(`http://localhost:5000/annonces/association/${info.data.associationID}`);
            // console.log("Association info: ", assInfo.data)
            setAssociation(assInfo.data);
          } catch (error) {
            console.log("Erreur lors de récupération des informations association ", error)

          }
        }

      }
      fetchdata();
    } catch (error) {
      console.log("Impossible de charger les détails de l'annonce");
    }
  }, [id])



  const typeAnnonce = {
    Besoin: { bg: "bg-orange-100 ", icon: AlertCircle },
    Service: { bg: "bg-amber-200 ", icon: CheckCircle },
  }

  //afficher  niveaux de l'urgence
  const niveau = {
    Fiable: { icon: CheckCircle },
    Moyen: { icon: Info },
    Urgent: { icon: AlertTriangle }
  }
  //les statut des annonces termine...

  // const statutEncouleur = {
  //   brouillon: "bg-gray-300 test-gray-800",
  //   Publié: "bg-blue-300 test-blue-800",
  //   Terminé: "bg-green-300 test-green-800",
  //   "En cours": "bg-yellow-300 test-yellow-800",
  // }
  // const TypeIcon = typeAnnonce[detail.type]?.icon || Info
  const NiveauIcon = niveau[detail.niveauDurgence]?.icon || Info




  return (
    <div className='bg-purple-200 pt-24 pb-8'>
      <div className=' mx-auto px-4 md:w-[900px]'>

        <div className=' bg-white shadow-lg rounded-xl overflow-hidden'>
          {/* image D'annonce */}
          <div className='h-52 md:h-[500px] w-full '>
            <img src={`http://localhost:5000/${detail.image}`} alt={detail.titre}
              className='w-full h-full  object-cover' />
          </div>

          {/* Partie Des Information Principale  */}
          <div>
            <div className='space-y-6 p-6'>
              {/* titre et Description */}
              <div>
                <h1 className='text-purple-900 font-bold text-xl mb-4 '> {detail.titre}</h1>
                <p className='text-lg  text-gray-700 '>{detail.description}</p>
              </div>

              {/* les information suplaimentaire */}
              <div className=' grid grid-cols-3 gap-4 '>
                <div className='flex items-center space-x-2'>
                  <Tag className='text-purple-500' />
                  <span className=''>{detail.type}</span>
                </div>

                <div className='flex items-center space-x-2'>
                  <MapPin className=" text-purple-500" />
                  <span>Ville: {detail.ville || "Non spécifiée"}</span>
                </div>

                <div className='flex items-center space-x-2'>
                  <Calendar className=" text-purple-500" />
                  <span>Statut: {detail.statut || "Non spécifiée"}</span>
                </div>
              </div>

              {/* <div>
                {/* les Detaillée de createur 
                <div className=' flex items-center gap-2'>
                  {association ? (
                    <div className=' flex flex-col  justify-between'>
                      <span><Tag className='w-4 h-4 text-purple-500 ml-3' />
                        Information Du Céateur: </span>
                      <span className=''> Role :{(" Role :" && association.role) || "Role inconnue"}</span>
                      <span className='text-sm  text-gray-700 '>
                        Nom Association: {association.nomAssociation || "Association inconnue"}
                      </span>
                    </div>
                  ) : benevole ? (
                    <>
                      <span className=''> Role :{benevole.role || "Role inconnue"}</span>
                      <span className='text-sm  text-gray-700 '>
                        {` ${benevole.nom || ""} ${benevole.prenom || ""} `.trim() || "Bénévole inconnu"}
                      </span>
                    </>
                  ) : (
                    <span className='text-sm text-gray-700'>Créateur non identifié</span>
                  )}

                </div>
                <div className={`flex items-center gap-2 py-1 rounded-xl ${niveau[detail.niveauUrgence]?.bg}`}>
                  <NiveauIcon className='w-4 h-4 text-violet-500 ml-3' />
                  <span className="font-medium text-sm">{detail?.niveauUrgence || "Niveaus d'urgence Non spécifié"} </span>
                </div>
              </div> */}

              {/* les info de createur */}
              <div className=' bg-purple-50 p-4 rounded-lg '>
                <h1 className='text-xl font-semibold mb-4 '>Details du Créateur </h1>
                {
                  benevole ? (
                    <div className='flex items-center space-x-4'>
                      <img src={benevole.image || '/default-avatar.png'}
                        alt={`${benevole.prenom} ${benevole.nom}`}
                        className='w-20 h-20  object-cover rounded-full' />
                      <div>
                        <p className='font-bold'>{`${benevole.prenom} ${benevole.nom}`} </p>
                        <p>{benevole.profession}</p>
                        <p className='text-sm text-gray-600 '>Compétences: {benevole.competence} </p>

                      </div>
                    </div>

                  ) : association ? (

                    <div className='flex items-center space-x-4'>
                      <img src={association.logo || '/default-logo.png'}
                        alt={association.nomAssociation}
                        className='w-20 h-20 object-cover rounded-full' />
                      <div>
                        <p className='font-bold'>{association.nomAssociation} </p>
                        <p>Responsable: {association.responsable}</p>
                        <p className='text-sm text-gray-600 '>Mission: {association.mission} </p>

                      </div>
                    </div>
                  ) : (
                    <p className='text-lg text-gray-600'> Créateur non identifié</p>
                  )
                }

              </div>


            </div>

            <div className='grid md:grid-cols-2   gap-4'>
              {/* decrire niveau d urgence */}
              <div className='ml-6'>
                <h3 className='font-semibold  '>Niveau d'Urgence</h3>
                <div className={` flex items-center space-x-2 p-2 `}>
                  {NiveauIcon && <NiveauIcon className=' text-violet-500 ' />}
                  <span>{detail.niveauDurgence || "Non spécifié"}</span>
                </div>
              </div>
              <div>
                <h3 className='font-semibold '>Période de la Mission</h3>
                <div className="flex items-center space-x-2 p-2 " >
                  <Calendar className='text-violet-500' />
                  {/* presenter la date */}
                  <span>
                    Du {new Date(detail.dateDebut).toLocaleDateString()}
                  </span>
                  <span>
                    au {new Date(detail.dateFin).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-4 justify-center m-8  '>

            {/* gerer les btns */}
            <button
              className='p-4  w-full bg-purple-500  text-white py-3 rounded-lg flex items-center justify-center 
          hover:bg-violet-600 transition-all duration-300  hover:shadow-lg'
            >
              <User className="mr-2" />Postuler
            </button>

            <button
              // onClick={ToggleContact}
              onClick={()=>{ setShowContactModal(true)}}
              className='p-4 w-full flex items-center justify-center bg-purple-500 text-white py-3 rounded-lg  
          hover:bg-violet-600 transition-all duration-300  hover:shadow-lg'
            >
              <Contact className="mr-2" />Contacter
            </button>
            {/* afficher partie popup  */}
            {/* {showContactModal && (benevole || association) && (
              <div>
                <div>
                  <h2>Contactez-nons</h2>
                  <div>
                    {benevole && (
                      <>
                        <p>Email: {benevole.email || "Non spécifié"}</p>
                        <p>Téléphone: {benevole.numeTelephone || "Non spécifié"}</p>
                      </>)}
                    {association && (
                      <>
                        <p>Email: {association.email || "Non spécifié"}</p>
                        <p>Téléphone: {association.numeTelephone || "Non spécifié"}</p>
                      </>)}
                  </div>
                </div>
              </div>
            )} */}
            {/* methode two */}
            {
              showContactModal && (
                <ModalContact  
                  onClose={()=>{
                  setShowContactModal(false) 
                }}
                benevole={benevole} 
                association={association} />
              )
            }

            <button
              className='bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition'
            >
              <Share2 />
            </button>
          </div>
        </div>

      </div>

    </div>

  )
}



// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import {
//   AlertCircle, AlertTriangle, CheckCircle, Info, Tag,
//   MapPin, Calendar, Users, Star, Contact, Share2
// } from 'lucide-react'
// import axios from 'axios';

// export default function PlusInfo() {
//   const { id } = useParams();
//   const [detail, setDetail] = useState(null);
//   const [benevole, setBenevole] = useState(null);
//   const [association, setAssociation] = useState(null);

//   useEffect(() => {
//     const fetchdata = async () => {
//       try {
//         const info = await axios.get(`http://localhost:5000/annonces/annonceDetail/${id}`);
//         setDetail(info.data);

//         // Fetch volunteer information
//         if (info.data.benevoleID) {
//           try {
//             const benevoleInfo = await axios.get(`http://localhost:5000/annonces/benevole/${info.data.benevoleID}`);
//             setBenevole(benevoleInfo.data);
//           } catch (error) {
//             console.log("Erreur lors de la récupération des informations bénévole", error);
//           }
//         }

//         // Fetch association information
//         if (info.data.associationID) {
//           try {
//             const assInfo = await axios.get(`http://localhost:5000/annonces/association/${info.data.associationID}`);
//             setAssociation(assInfo.data);
//           } catch (error) {
//             console.log("Erreur lors de la récupération des informations association", error);
//           }
//         }
//       } catch (error) {
//         console.log("Impossible de charger les détails de l'annonce");
//       }
//     };
//     fetchdata();
//   }, [id]);

//   // Styling constants
//   const typeAnnonce = {
//     Besoin: { bg: "bg-orange-100", icon: AlertCircle },
//     Service: { bg: "bg-amber-200", icon: CheckCircle },
//   };

//   const niveau = {
//     Fiable: { bg: "bg-green-200 text-green-800", icon: CheckCircle },
//     Moyen: { bg: "bg-yellow-200 text-yellow-800", icon: Info },
//     Urgent: { bg: "bg-red-200 text-red-800", icon: AlertTriangle }
//   };

//   const statutEncouleur = {
//     brouillon: "bg-gray-300 text-gray-800",
//     Publié: "bg-blue-300 text-blue-800",
//     Terminé: "bg-green-300 text-green-800",
//     "En cours": "bg-yellow-300 text-yellow-800",
//   };

//   // Render nothing if data is not loaded
//   if (!detail) return <div>Chargement...</div>;

//   return (
//     <div className='bg-purple-100 pt-24 pb-8'>
//       <div className='mx-auto px-4 md:w-[900px] '>
//         {/* Bannière d'Image et Titre */}
//         <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
//           {/* Image Principale */}
//           <div className='h-64 md:h-[500px] w-full'>
//             <img
//               src={`http://localhost:5000/${detail.image}`}
//               alt={detail.titre}
//               className='w-full h-full object-cover'
//             />
//           </div>

//           {/* Section Informations Principales */}
//           <div className='p-6 space-y-6'>
//             {/* Titre et Description */}
//             <div>
//               <h1 className='text-3xl font-bold text-purple-900 mb-4'>{detail.titre}</h1>
//               <p className='text-gray-700 text-lg'>{detail.description}</p>
//             </div>

//             {/* Informations Clés */}
//             <div className='grid md:grid-cols-3 gap-4'>
//               <div className='flex items-center space-x-2'>
//                 <Tag className='text-purple-500' />
//                 <span>Type: {detail.type}</span>
//               </div>
//               <div className='flex items-center space-x-2'>
//                 <MapPin className='text-purple-500' />
//                 <span>Ville: {detail.ville || 'Non spécifiée'}</span>
//               </div>
//               <div className='flex items-center space-x-2'>
//                 <Calendar className='text-purple-500' />
//                 <span>Statut: {detail.statut}</span>
//               </div>
//             </div>

//             {/* Détails du Créateur */}
//             <div className='bg-purple-50 p-4 rounded-lg'>
//               <h2 className='text-xl font-semibold mb-4'>Détails du Créateur</h2>
//               {benevole ? (
//                 <div className='flex items-center space-x-4'>
//                   <img
//                     src={benevole.image || '/default-avatar.png'}
//                     alt={`${benevole.prenom} ${benevole.nom}`}
//                     className='w-20 h-20 rounded-full object-cover'
//                   />
//                   <div>
//                     <p className='font-bold'>{`${benevole.prenom} ${benevole.nom}`}</p>
//                     <p>{benevole.profession}</p>
//                     <p className='text-sm text-gray-600'>Compétences: {benevole.competence}</p>
//                   </div>
//                 </div>
//               ) : association ? (
//                 <div className='flex items-center space-x-4'>
//                   <img
//                     src={association.logo || '/default-logo.png'}
//                     alt={association.nomAssociation}
//                     className='w-20 h-20 rounded-full object-cover'
//                   />
//                   <div>
//                     <p className='font-bold'>{association.nomAssociation}</p>
//                     <p>Responsable: {association.responsable}</p>
//                     <p className='text-sm text-gray-600'>Mission: {association.mission}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <p>Créateur non identifié</p>
//               )}
//             </div>

//             {/* Informations Complémentaires */}
//             <div className='grid md:grid-cols-2 gap-4'>
//               <div>
//                 <h3 className='font-semibold mb-2'>Niveau d'Urgence</h3>
//                 <div className={`flex items-center space-x-2 p-2 rounded ${niveau[detail.niveauUrgence]?.bg}`}>
//                   {React.createElement(niveau[detail.niveauUrgence]?.icon || Info, { className: 'text-purple-500' })}
//                   <span>{detail.niveauUrgence}</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className='font-semibold mb-2'>Période de la Mission</h3>
//                 <div className='flex items-center space-x-2'>
//                   <Calendar className='text-purple-500' />
//                   <span>
//                     Du {new Date(detail.dateDebut).toLocaleDateString()}
//                     au {new Date(detail.dateFin).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className='flex space-x-4 mt-6'>
//               <button
//                 className='flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition flex items-center justify-center'
//               >
//                 <Users className='mr-2' /> Postuler
//               </button>
//               <button
//                 className='flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center'
//               >
//                 <Contact className='mr-2' /> Contacter
//               </button>
//               <button
//                 className='bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition'
//               >
//                 <Share2 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }