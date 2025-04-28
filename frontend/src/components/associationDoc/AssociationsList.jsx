import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import AssociationCard from './AssociationCard';
import { toast } from 'react-toastify';
import Pagination from '../Pagination';



export default function AssociationsList() {
    const [associations, setAssociation] = useState([]);
    const [loading, setLoading] = useState(true)
    //   const navigate = useNavigate();
    // États pour la pagination
    const [limit] = useState(12) //nbr elements par page
    const [page, setPage] = useState(1);//current page
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:5000/associations?page=${page}&limit=${limit}`);
                console.log(response.data.associations)
                if (response.data) {
                    setAssociation(response.data.associations || [])
                    setTotalPages(response.data.totalPages)
                    setLoading(false);
                }
            } catch (error) {
                console.log("Erreur lors du chargement des Associations : ", error);
                toast.error("Erreur lors du chargement des données. Veuillez réessayer.")
                setLoading(false);
            }
        }
        fetchData();

    }, [page, limit])

    //fonction pour changer de page
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 1, behavior: 'smooth' })

        }
    }

    return (
        <div className=" bg-purple-100  min-h-screen">
        <div className='px-6 pt-24  md:pt-26 md:px-12 min-h-screen '>

            <div className='text-white bg-purple-600 p-8 mb-5  mt-6 rounded-2xl text-base  '>
                <h1 className='text-xl md:text-2xl font-bold mb-4 md:my-6 text-center'> Associations Engagées : Bâtissons Ensemble un Avenir Meilleur !</h1>
                <p className='text-lg md:text-xl'>Découvrez les <span className="font-bold text-lg md:text-xl text-gray-800">associations inspirantes</span> qui ont rejoint notre plateforme pour faire la différence.
                    Qu'il s'agisse d'éducation, d'entraide sociale, de protection de l'environnement ou d'initiatives humanitaires, ces organisations œuvrent chaque jour pour un monde plus solidaire.</p>
                <p className='text-xl'> Parcourez leurs missions, leurs actions et rejoignez celles qui résonnent avec vos valeurs. <br />Ensemble, transformons les idées en impact ! </p>
            </div>

            {
                loading ? (
                    <div className="flex justify-center items-center mt-20    md:mt-40 lg:mt-48">
                        <img src="/images/Spinner.svg" alt="Chargement..." className="w-20 h-20 sm:w-28  sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" />
                    </div>
                ) : (
                    <div>


                        <div className='px-6 py-4'>

                            {associations.length > 0 ? (
                                <div className="grid grid-cols-1 mt-6 mb-6  gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr md:gap-8">
                                    {associations.map((association) => (

                                        <AssociationCard key={association._id} association={association} />
                                    ))}
                                </div>

                            ) : (
                                <div className=" text-center py-6 sm:py-10">
                                    <p className="text-lg sm:text-xl text-gray-600">Aucune Association trouvée</p>
                                </div>
                            )}

                        </div>
                        {/* Pagination */}
                        {associations.length > 0 &&
                            (<Pagination page={page} totalPages={totalPages} onChangePage={changePage} />
                            )}
                    </div>
                )
            }
             </div>
        </div>
    )
}
