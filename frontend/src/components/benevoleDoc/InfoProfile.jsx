import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function InfoProfile() {
    const {profil}=useOutletContext();
    return (
        <div className='w-[335px] mt-3 md:w-[800px]'>

            <div className=" relative -top-12 space-y-4  bg-white shadow-lg w-full rounded-lg p-6">
                <h1 className='font-bold text-xl text-gray-700 mb-4'>À propos de moi</h1>
                <p className='bg-purple-400 p-5 text-white rounded-lg mb-6'>{profil.description || "Aucune description disponible "}</p>
                <h1 className='font-bold text-xl text-gray-700 mb-4'>Mes compétences</h1>
                <p className='bg-purple-400 p-5 text-white rounded-lg'>{profil.commentaires}</p>

                < div className='bg-gray-100 p-6 rounded-lg'>
                    <h1 className='font-bold text-xl text-gray-700 mb-4'>Contactez-Moi</h1>
                    <div className='space-y-2'>
                        <p>
                            <span className='w-32 font-semibold'> Email:  </span>  {profil.email}
                        </p>
                        <p>
                            <span className='w-32 font-semibold'> Téléphone: </span>  {profil.numeTelephone}
                        </p>
                    </div>

                </div>


            </div>

        </div>
    )
}
