import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlertCircle, AlertTriangle, CheckCircle, Info, Tag } from 'lucide-react'
import axios from 'axios';

console.log("detail des annonces")

export default function PlusInfo() {
  const { id } = useParams();
  console.log("ID est :", id)
  const [detail, setDetail] = useState([]);
  const [benevole, setBenevole] = useState(null)
  const [association, setAssociation] = useState(null)
  // const ass = false;
  // const ben = false;

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
            console.log("Erreu lors de recuperation des information bénévole", error)
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
            console.log("Erreu lors de récupération des information association ", error)

          }
        }

      }
      fetchdata();
    } catch (error) {
      console.log("Impossible de charger les détails de l'annonce");
    }
  }, [id])

  //  const getbenevole= async()=>{
  //     const res = await axios.get("http://localhost:5000/annonces")
  //     return res.json(res.data)
  //  }

  const typeAnnonce = {
    Besoin: { bg: "bg-orange-100 ", icon: AlertCircle },
    Service: { bg: "bg-amber-200 ", icon: CheckCircle },
  }




  //affichet  niveaux de l'urgence
  const niveau = {
    Fiable: { bg: "bg-green-200 text-green-800", icon: CheckCircle },
    Moyen: { bg: "bg-yellow-20 text-yellow-800", icon: Info },
    Urgent: { bg: "bg-red-200 text-red-800", icon: AlertTriangle }

  }
  //les statut des annonces termine...

  const statutEncouleur = {
    brouillon: "bg-gray-300 test-gray-800",
    Publié: "bg-blue-300 test-blue-800",
    Terminé: "bg-green-300 test-green-800",
    "En cours": "bg-yellow-300 test-yellow-800",
  }
  const TypeIcon = typeAnnonce[detail.type]?.icon || Info
  const NiveauIcon = niveau[detail.niveauUrgence]?.icon || Info




  return (
    <div className='bg-purple-200 pt-24 pb-8'>
      <div className=' mx-auto px-4 md:w-[800px] min-h-screen'>
        <div className=' bg-white shadow-md rounded-md overflow-hidden'>
          <div className='h-64 md:h-96 '>
            <img src={`http://localhost:5000/${detail.image}`} alt={detail.titre}
              className='w-full h-full  object-cover' />
          </div>


          <div>
            <div className='space-y-3 p-4'>
              <h1 className='text-purple-900 line-clamp-2 font-bold text-xl '> {detail.titre}</h1>
              <p className='text-sm  text-gray-700 line-clamp-3 '>{detail.description}</p>
              <p></p>
              <div>
                {/* les Detaillée de l'annonce  */}
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
              </div>

            </div>
            <div>

            </div>
          </div>
          <buttom
            className='w-36 mt-4 mx-auto block mb-8 text-center bg-violet-500 text-white py-2 rounded-full 
          hover:bg-violet-600 transition-all duration-300  hover:shadow-lg'
          >
            Postuler
          </buttom>
        </div>

      </div>

    </div>

  )
}


