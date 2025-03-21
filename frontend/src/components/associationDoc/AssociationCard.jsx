import React from 'react';
import { MapIcon } from "lucide-react"
import { useNavigate } from 'react-router-dom';


const AssociationCard = ({ association }) => {
    const navigate = useNavigate();
    return (
        <div className=' bg-white h-full rounded-lg shadow-md flex p-5 flex-col justify-between '>
            {/* image nn indique sur db */}

            <div className='flex items-center mb-3'>

                <div className=" bg-gray-200 h-14 w-14 mr-4  border flex rounded-md items-centre justify-center">
                    <span className='bg-black text-slate-300'>hello</span>
                </div>

                <div className=''>
                    <h2 className='font-semibold text-lg line-clamp-1 text-purple-800'>{association.nomAssociation}</h2>
                    <div className='flex items-center text-gray-700 text-sm mt-1.5'>
                        <MapIcon className='mr-1 h-4 w-4 text-gray-500' />
                        <span className=' text-sm'>{association.VilleAssociation}</span>
                    </div>
                </div>
            </div>

            <div className='mb-4'>
                <p className='text-sm line-clamp-2 text-gray-600'>{association.description || "Aucune description n'est disponible."}</p>
            </div>

            <div >
                <span className="px-3 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full ">
                    {association.categorie}
                </span>
            </div>

            <div className=" text-gray-600 text-sm  mt-2">
                <span>{association.mission || 0} missions</span>
            </div>
            <div>
                <button onClick={() => navigate(`/associations/${association._id}`)}
                    className="w-full rounded-lg font-semibold hover:scale-[1.01] ease-in-out active:scale-[.98] active my-5 border-blue-700 border bg-white text-indigo-700 shadow-md hover:bg-blue-600 hover:text-white active:text-white active:bg-blue-800 py-2 px-4 ">
                    Afficher plus
                </button>
            </div>
        </div>
    )
}

export default AssociationCard