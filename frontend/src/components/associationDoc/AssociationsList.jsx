import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import AssociationCard from './AssociationCard';


export default function AssociationsList() {
    const [associations, setAssociation] = useState([]);
    const [loading, setLoading] = useState(true)
    //   const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get('http://localhost:5000/associations/');
                console.log(response.data)
                if (response.data) {
                    setAssociation(response.data || [])
                    setLoading(false);
                }
            } catch (error) {
                console.log("Erreur lors du chargement des Associations : ", error);
                setLoading(false);
            }
        }
        fetchData();

    }, [])


    return (
        <div className=" pt-24  md:pt-28  bg-purple-200 px-4  md:px-12 min-h-screen">
            {
                loading ? (
                    <div className="flex justify-center items-center mt-20  md:mt-40 lg:mt-52">
                        <img src="/images/Spinner.svg" alt="Chargement..." className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" />
                    </div>
                ) : (
                    <div>

                        <div className='text-white bg-purple-600 p-8 mb-5 rounded-2xl text-base  '>
                            <h1 className='text-xl md:text-2xl font-bold mb-4 md:my-6 text-center'> Associations Engagées : Bâtissons Ensemble un Avenir Meilleur !</h1>
                            <p className='text-lg md:text-xl'>Découvrez les <span className="font-bold text-lg md:text-xl text-gray-800">associations inspirantes</span> qui ont rejoint notre plateforme pour faire la différence.
                                Qu'il s'agisse d'éducation, d'entraide sociale, de protection de l'environnement ou d'initiatives humanitaires, ces organisations œuvrent chaque jour pour un monde plus solidaire.</p>
                            <p className='text-xl'> Parcourez leurs missions, leurs actions et rejoignez celles qui résonnent avec vos valeurs. <br />Ensemble, transformons les idées en impact ! </p>
                        </div>

                        <div className='px-6 py-4'>

                            {associations.length > 0 ? (
                                <div className="grid grid-cols-1  gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr md:gap-8">
                                    {associations.map((association) => (

                                        <AssociationCard key={association._id} association={association} />
                                    ))}
                                </div>

                            ) : (
                                <div className=" text-center py-6 sm:py-10">
                                    <p className="text-lg sm:text-xl text-gray-600">Aucun bénévole trouvé</p>
                                </div>
                            )}



                        </div>

                    </div>
                )
            }
        </div>
    )
}
