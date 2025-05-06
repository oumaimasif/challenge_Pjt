import React from 'react'
import { Phone, Mail, MapPin, X } from 'lucide-react';


export default function ModalContact({ association, benevole, onClose }) {

    return (
        <div className='fixed  inset-0 bg-black bg-opacity-50 z-50 flex items-center
    justify-center p-4'>
            <div className='bg-white  rounded-xl shadow-2xl relative p-8 w-full max-w-fit '>
                <button
                    onClick={onClose}
                    className=' absolute top-4  text-gray-500 right-4 hover:text-gray-800 transition'>
                    <X />
                </button>
                <div className=' space-x-4'>
                    <h2 className='text-xl p-2 font-bold text-purple-900 mb-4'>N'hésitez pas à nous Contactez </h2>
                    {benevole && (
                        <div className=' space-y-3'>
                            <div>
                                <div className='flex items-center pb-2'>
                                    {/* téléphone */}
                                    <div className='bg-violet-200 p-3 rounded-full mr-4 '>
                                        <Phone className=' text-violet-600' size={24} />
                                    </div>
                                    <div>
                                        <span className='text-sm text-gray-600'>Téléphone: </span>
                                        <span className='text-sm text-gray-800'>{benevole.numeTelephone || "Non spécifié"}</span>
                                    </div>
                                </div>
                                <div className='flex items-center pb-2'>
                                    {/* email */}
                                    <div className='bg-violet-200 p-3 rounded-full mr-4 '>
                                        <Mail className=' text-violet-600' size={24} />
                                    </div>
                                    <div>
                                        <span className='text-sm text-gray-600'>Email: </span>
                                        <span className='text-gray-800 font-semibold'>{benevole.email || "Non spécifié"}</span>
                                    </div>
                                </div>
                                <div className='flex items-center pb-2'>
                                    {/* adresse */}
                                    <div className='bg-violet-200 p-3 rounded-full mr-4 '>
                                        <MapPin className=' text-violet-600' size={24} />
                                    </div>
                                    <div>
                                        <span className='text-sm text-gray-600'>Adresse: </span>
                                        <span className='text-sm text-gray-800'>{benevole.ville || "Non spécifié"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {association && (

                        <div className=' space-y-3'>

                            <div className='flex items-center pb-2'>
                                {/* téléphone */}
                                <div className='bg-violet-200 p-3 rounded-full mr-4 '>
                                    <Phone className=' text-violet-600' size={24} />
                                </div>
                                <div>
                                    <span className='text-sm text-gray-600'>Téléphone: </span>
                                    <span className='text-sm text-gray-800 '>{association.numeTelephone || "Non spécifié"}</span>
                                </div>
                            </div>
                            <div className='flex items-center pb-2'>
                                {/* téléphone */}
                                <div className='bg-violet-200 p-3 rounded-full mr-4 '>
                                    <Mail className=' text-violet-600' size={24} />
                                </div>
                                <div>
                                    <span className='text-sm text-gray-600'>Email: </span>
                                    <span className='text-sm text-gray-800 font-semibold'>{association.email || "Non spécifié"}</span>
                                </div>
                            </div>
                            <div className='flex items-center pb-2'>
                                {/* téléphone */}
                                <div className='bg-violet-200 p-3 rounded-full mr-4 '>
                                    <MapPin className=' text-violet-600' size={24} />
                                </div>
                                <div>
                                    <span className='text-sm text-gray-600'>Adresse: </span>
                                    <span className='text-sm text-gray-800'>{association.ville || "Non spécifié"}</span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}
