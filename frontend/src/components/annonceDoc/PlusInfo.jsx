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
