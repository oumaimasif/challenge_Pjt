import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { isValidElement } from 'react';
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
          // const data = listBenevoles.data.dataBenevole || [] ;
          // const validBenevoles = data.filter(benevole => isValidData(benevole));
          // setBenevoles(validBenevoles);
          setBenevoles(listBenevoles.data.dataBenevole || []);
        }
      } catch (error) {
        console.log("Erreurlors du chargement des bénévoles :", error);
      }
    }
    fetchBenevoles();
    return () => { isMounted = false; }
  }, [])

  // const isValidData =(benevole)=>{
  //   return benevole.nom && benevole.prenom&& benevole.ville;
  // };


  return (
    <div className="pt-28 bg-purple-100  px-14">

      <h1 className="text-3xl font-bold mt-8  mb-6">Bénévoles à l'honneur </h1>
      <p className='text-gray-600 text-lg'> Découvrez nos <span className='font-bold text-xl text-gray-800'>Bénévoles</span> les plus actifs et engagés.Leurs compétences et leur disponibilité peuvent correspondre à vos besions. </p>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 px-8 py-5">
        {
          // verifier l afichage des benevoles existe ou nn 

          benevoles.length > 0 ? (benevoles.map((benevole) => (
            <div key={benevole._id} className="relative bg-white space-y-3 mx-3 mb-5 border rounded-lg  shadow-lg p-4">
              <div className='flex gap-x-28 s items-center'>

                {/* Afficher l'image si elle existe, sinon une alternative */}
                {benevole.image ?
                  (
                    <img src={benevole.image} alt={benevole.nom} className="rounded-full w-24 h-24 mx-auto" />
                  ) : (
                    <div className='rounded-full w-28 bg-black h-28 mx-auto'></div>
                  )}
              </div>

              {/* Vérifier la mission et l'afficher si elle existe */}
              {/* //todo il faut calculer le nbre des annoce publier par chaque benevole */}
              {
                <div>
                  <span className='absolute top-3 right-3 border border-purple-400 p-1 font-semibold text-gray-600 bg-orange-50 text-[10px] rounded-3xl'>2 mission</span>
                </div>
              }

              <div>
                <h2 className="text-xl font-bold  text-center">{benevole.nom} {benevole.prenom}</h2>

                {/* si le nom existe en l'affiche */}
                {benevole.ville && (<p className=" text-center text-xs">{benevole.ville}</p>)}
              </div>

              {/* <p className=" text-center">{benevole.competence}</p> */}

              {/*  afficher la description si elle existe */}
              {benevole.description && (
                <p className="text-sm text-gray-800 text-center line-clamp-2">{benevole.description}</p>
              )}
              <div className="justify-center  flex gap-8 text-sm ">
                {benevole.disponible && (
                  <span className="border border-orange-400 p-2 rounded-3xl">{benevole.disponible}</span>
                )}
                {benevole.heure && (
                  <span className="border border-orange-400 p-2 rounded-3xl">{benevole.heure}</span>
                )}
              </div>
              <button
                onClick={() => navigate(`/profileBenevole/${benevole._id}`)}
                className=" border-2 text-gray-900 font-semibold py-2 px-4 rounded-full w-full"
              >
                Voir le profil
              </button>
            </div>
          ))) : (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border border-border">
              <p className="text-lg font-medium mb-2">Chargement...</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Benevole