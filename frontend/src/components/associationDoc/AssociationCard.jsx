import React from 'react';
import { MapIcon } from "lucide-react"
import { useNavigate } from 'react-router-dom';


const AssociationCard = ({ association }) => {
    const navigate = useNavigate();
    return (
        <div className=' bg-white h-full rounded-lg shadow-md flex p-5 flex-col justify-between '>
            {/* image nn indique sur db */}

            <div className='flex items-center mb-3'>

                 <div className="mr-4 border  rounded-md items-centre justify-center overflow-hidden">
                    <img src={`http://localhost:5000/${association.image}`} alt={association.nomAssociation} className=" w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover" />
                </div> 

                <div className=''>
                    <h2 className='font-semibold text-lg line-clamp-1 text-purple-800'>{association.nomAssociation}</h2>
                    <div className='flex items-center text-gray-700  mt-1.5'>
                        <MapIcon className='mr-1 h-4 w-4 text-gray-500' />
                        <span className=' text-xs'>{association.VilleAssociation}</span>
                    </div>
                </div>
            </div>

            <div className=''>
                <p className='text-sm line-clamp-2 text-gray-600'>{association.description || "Aucune description n'est disponible."}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {association.categorie && association.categorie.length > 0 ? (
                    association.categorie.map((cat, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 border border-blue-300 bg-blue-50 text-blue-700 text-[8px] sm:text-[10px] rounded-full " 
                        >
                            {cat}
                        </span>
                    ))
                ) : (
                    <span className="px-3 py-1 border border-gray-300 bg-gray-50 text-gray-500 text-[8px] sm:text-[10px] rounded-full">
                        Aucune catégorie
                    </span>
                )}
            </div>

            <div className=" text-gray-600 text-sm  mt-2">
                <span className='border border-purple-400 p-1 font-semibold text-gray-600 bg-orange-50 text-[8px] sm:text-[10px] rounded-3xl'>
                    {association.annoncesCpt} annonce{association.annoncesCpt !== 1 ? 's' : ''}
                </span>
            </div>
            <div>
                <button onClick={() => navigate(`/association/${association._id}`)}
                    className="w-full rounded-lg font-semibold hover:scale-[1.01] ease-in-out active:scale-[.98] active my-5 border-blue-700 border bg-white text-indigo-700 shadow-md hover:bg-blue-600 hover:text-white active:text-white active:bg-blue-800 py-2 px-4 ">
                    Afficher plus
                </button>
            </div>
        </div>
    )
}

export default AssociationCard