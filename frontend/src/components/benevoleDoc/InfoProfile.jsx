import { Mail, MapIcon, Phone } from 'lucide-react';
import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function InfoProfile() {
    const { profil } = useOutletContext();
    return (
        <div className='w-[340px] mt-3 md:w-[800px]'>

            <div className=" relative -top-2 space-y-4  bg-white shadow-lg w-full rounded-lg p-6">
                <h1 className='font-bold text-xl text-gray-700 mb-4'>À propos de bénévole</h1>

                <p className='bg-purple-400 p-5 text-white rounded-lg mb-6'>{profil.description || "Aucune description disponible. "}</p>

                < div className='bg-gray-50 p-6 rounded-lg'>
                    {/* <h1 className='font-bold text-xl text-gray-700 mb-4'>Plus de détails</h1> */}
                    <h2 className='text-xl font-semibold text-gray-700 border-b pb-2 '> Plus de détails</h2>

                    <div className='space-y-3 mt-2'>
                        <div>
                            <span className='mr-2 font-semibold'> Profession:  </span>  {profil.profession || "Non renseigné"}
                        </div>
                        {/* 
                                  <span className='flex items-center  text-base gap-2'><UserRoundCheck className='h-5 w-5 flex-shrink-0' /> {profil.disponible || "Non renseigné"}</span>
                                  <span className='flex items-center  text-base gap-2'><Clock3 className='h-5 w-5 flex-shrink-0' />{profil.heure || "Non renseigné"}</span> */}
                        <div>
                            <span className='mr-2 font-semibold'> Disponible: </span> {profil.disponible || "Non renseigné"}
                        </div>
                        <div>
                            <span className='mr-2 font-semibold'> Préférence horaire: </span> {profil.heure || "Non renseigné"}
                        </div>

                        <div>
                            <span className='mr-2 inline-block font-semibold '>Catégories:</span>
                            <span className='flex flex-wrap gap-1 mt-1'>
                                {profil.categorie && profil.categorie.length > 0 ?
                                    profil.categorie.map((cat, index) => (
                                        <span key={index} className='bg-orange-200 text-orange-600 text-xs px-2 py-1 rounded-full'>
                                            {cat}
                                        </span>
                                    )) : 'Non renseigné'

                                }
                            </span>
                        </div>
                    </div>

                </div>

                < div className='bg-gray-50 p-6 rounded-lg'>
                    <h2 className='text-xl font-semibold text-gray-700 border-b pb-2 '>Contactez-Moi</h2>


                    <div className='space-y-2 mt-2'>
                        <div className='flex  gap-2'>
                            <Mail className='flex-shrink-0 h-6 w-6 text-blue-500' />
                            <div>
                                <span className=' font-semibold'>Email: </span>
                                <span className='break-all mr-2'>{profil.email || "Non renseigné"}</span>
                            </div>
                        </div>
                        <div className='flex  gap-2'>
                            <Phone className='flex-shrink-0 h-6 w-6 text-blue-500' />
                            <span className=' font-semibold '>Téléphone: </span>
                            <span className='break-all mr-2'>{profil.numeTelephone || "Non renseigné"}</span>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}
