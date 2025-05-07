import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertCircle, AlertTriangle, Calendar, CheckCircle, Info,
  Tag, MapPin, User, Contact, Share2,
  ExternalLink, Mail, Users, Share,
  Clock
} from 'lucide-react'
import axios from 'axios';
import ModalContact from './ModalContact';
import { toast } from 'react-toastify';
import Ccomment from '../formComponents/Ccomment';
import { Auth } from '../../context/Auth';


console.log("detail des annonces")

export default function PlusInfo() {
  const { id } = useParams();
  const { user } = useContext(Auth);
  console.log("ID est :", id)
  const [detail, setDetail] = useState([]);
  const [benevole, setBenevole] = useState(null)
  const [association, setAssociation] = useState(null)
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(true);



  //ouvrir et fermer le popup
  // const ToggleContact = () => {
  //   setShowContactModal(!showContactModal);
  // }

  useEffect(() => {
    const fetchdata = async () => {

      try {
        setLoading(true);
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
        setLoading(false)
      } catch (error) {
        console.log("Impossible de charger les détails de l'annonce");
        toast.error("Erreur lors du chargement des détails de l'annonce");
        setLoading(false);
      }
    }
    fetchdata();

  }, [id])

  // ---
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

  const TypeIcon = typeAnnonce[detail.type]?.icon || Info
  const NiveauIcon = niveau[detail.niveauDurgence]?.icon || Info

  if (loading) {
    return (
      <div className=' flex items-center justify-center h-screen'>
        <p className='text-2xl text-gray-800 '>Chargement...</p>
      </div >
    )
  }

  if (!detail) {
    return (
      <div className='mt-6 text-center'>
        <Link to="/annonces" className='text-purple-600 hover:text-purple-800 font-medium'>
          Retour aux annonces
        </Link>
      </div>
    )
  }

  return (
    <div className='bg-purple-50 pt-24 min-h-screen pb-8 '>
      <div className=' mx-auto px-4 max-w-4xl'>

        <div className=' bg-white shadow-lg rounded-xl overflow-hidden'>
          {/* image D'annonce */}
          <div className='h-52 md:h-80 w-full relative '>
            <img src={`http://localhost:5000/${detail.image}`} alt={detail.titre}
              className='w-full h-full  object-cover' />
            <div className={`absolute top-0 left-0 z-10 ${typeAnnonce[detail.type]?.bg || 'bg-gray-200'}  text-gray-700  font-semibold  py-1 px-2 rounded-br-xl flex items-center  `}>
              <TypeIcon className='w-4 h-4 mr-1 flex-shrink-0' />
              <span className={` text-gray-700 font-semibold  w-min py-1 px-2 rounded-br-2xl`}>{detail.type || "Type inconnu"}</span>
            </div>
            <div className={`absolute top-0 right-0 z-10 ${niveau[detail.niveauDurgence]?.bg || "bg-gray-100"}text-gray-700  font-semibold  py-1 px-2 rounded-bl-xl flex items-center `}>
              <NiveauIcon className="h-4 w-4 mr-1" />
              <span className="text-gray-700 font-semibold  w-min py-1 px-2 rounded-br-2xl">{detail.niveauDurgence || "Non spécifié"}</span>
            </div>
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
              <div className='grid grid-cols-1 md:grid-cols-3  text-gray-500 gap-6 mb-6 '>
                <div className='flex items-center  '>
                  <Users className='h-4 w-4 text-purple-500 mr-2 flex-shrink-0' />
                  <span className='font-medium mr-2'>Bénévoles: </span>
                  {detail.nbrBenevole || " Non spécifié"}
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 text-purple-500 mr-1" />
                  <span>{detail.terminer}</span>
                </div>
                <div className='flex items-center '>
                  <MapPin className="h-4 w-4 text-purple-500 mr-2 " />
                  <span>Ville: {detail.ville || "Non spécifiée"}</span>
                </div>
                {/* afficher pour user et admin  */}
                {(user && ((user.role === "association" && user.id === detail.associationID) ||
                  (user.role === "benevole" && user.id === detail.benevoleID) || user.role === "admin")) && (
                    <div className='flex items-center '>
                      <Share className=" text-purple-500 mr-2 " />
                      <span>Statut: {detail.statut || "Non spécifiée"}</span>
                    </div>
                  )}
              </div>
              <div className=''>
                <h3 className='font-semibold '>Période de la Mission</h3>
                <div className="flex items-center space-x-2 p-2 " >
                  <Calendar className='text-violet-500' />
                  {/* presenter la date */}
                  <span>
                    Du {new Date(detail.dateDebut).toLocaleDateString()}
                  </span>
                  <span>
                    {detail.dateFin ? `au ${new Date(detail.dateFin).toLocaleDateString()}` : ""}
                  </span>
                </div>
              </div>


            </div>

            <div className='grid grid-cols-1 p-6 md:grid-cols-2 gap-2 mb-6'>
              {/* les info de createur */}
              <div className=' bg-purple-50 p-4 rounded-lg '>
                <h2 className='text-lg font-semibold text-gray-800 mb-3'>
                  {benevole ? "Bénévole" : association ? "Association" : "Créateur"}
                </h2>
                {
                  benevole ? (
                    <div className='flex items-center space-x-4'>
                      <img src={`http://localhost:5000/${benevole.image}`}
                        alt={`${benevole.prenom} ${benevole.nom}`}
                        className='w-20 h-20  object-cover rounded-full mr-4' />
                      <div>
                        <p className='font-semibold text-lg'>{`${benevole.prenom} ${benevole.nom}`} </p>
                        <p>{benevole.profession}</p>
                        {/* <p className='text-sm text-gray-500 '>Compétences: {benevole.competence} </p> */}
                        <Link
                          to={`/profileBenevole/${benevole._id}`}
                          className='text-purple-600 hover:text-purple-800 inline-flex items-center mt-2 text-sm'
                        >
                          Voir le profil <ExternalLink className='h-3 w-3 ml-1' />
                        </Link>
                      </div>
                    </div>

                  ) : association ? (

                    <div className='flex items-center space-x-4'>
                      <img src={`http://localhost:5000/${association.image}`}
                        alt={association.nomAssociation}
                        className='w-20 h-20 object-cover rounded-full mr-4' />
                      <div>
                        <p className='font-semibold text-lg'>{association.nomAssociation} </p>
                        {association.nomPrenomResponsable && (<p>Responsable: {association.nomPrenomResponsable}</p>)}
                        {/* <p className='text-sm text-gray-600 '>Mission: {association.mission} </p> */}
                        <Link to={`/association/${association._id}`}
                          className='text-purple-600 hover:text-purple-800 inline-flex items-center mt-2 text-sm'>
                          Voir le profil <ExternalLink className='h-3 w-3 ml-1' />
                        </Link>

                      </div>
                    </div>
                  ) : (
                    <p className='text-lg text-gray-600'> Information non disponible</p>
                  )
                }

              </div>
              {/* Informations de contact */}
              <div className='bg-purple-50 p-4 rounded-lg'>
                <h2 className='text-lg font-semibold text-gray-800 mb-3'>Informations de contact</h2>
                {detail.infoContact ? (
                  <p className='text-gray-700'>{detail.infoContact}</p>
                ) : (
                  <p className='text-gray-500 italic'>Cliquez sur le bouton "Contacter" ci-dessous pour obtenir les informations de contact.</p>
                )}
              </div>
            </div>
          </div>

          <div className='flex items-center gap-4 justify-center m-8  '>

            {/* gerer les btns */}
            {/* <button
              className='p-4  w-full bg-purple-500  text-white py-3 rounded-lg flex items-center justify-center 
          hover:bg-violet-600 transition-all duration-300  hover:shadow-lg'
            >
              <User className="mr-2" />
              <Ccomment annonceId={detail._id}/>
            </button> */}

            <button
              onClick={() => { setShowContactModal(true) }}
              className='p-4 w-full flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg  
          hover:bg-blue-700 transition-all duration-300  hover:shadow-lg'
            >
              <Mail className="mr-2" />Contacter
            </button>
            {
              showContactModal && (
                <ModalContact
                  onClose={() => {
                    setShowContactModal(false)
                  }}
                  benevole={benevole}
                  association={association} />
              )
            }

            {/* <button
              className='bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition'
            >
              <Share2 />
            </button> */}
          </div>

          <div className='p-6'>
  <h2 className='text-xl font-semibold text-purple-700 mb-4'>Commentaires</h2>
  <Ccomment 
    Type="annonce" 
    typeId={detail._id} 
  />
</div>
        </div>
        <div className='my-8 text-center'>
          <Link to="/annonces" className='text-purple-600 hover:text-purple-800'>
            ← Retour aux annonces
          </Link>
        </div>
      </div>


    </div>

  )
}
