import { Check, Edit, Edit2, FileEditIcon, X } from 'lucide-react';
import React from 'react'

export default function Confirmation({ isOpen, onCancel, onConfirm, msg }) {
    if (!isOpen) return null;
    return (
        <>
            <div className='fixed inset-0  flex items-center justify-center bg-black bg-opacity-50  z-50'>
                <div className='bg-white p-5 rounded-lg max-w-md w-full'>
                    <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-bold mb-4'>Confirmation</h1>
                    <button className='mb-4' onClick={onCancel}><X/></button>
                    </div>
                    <p className='mb-4'>
                        {msg || "Veuillez vérifier que toutes les informations sont correctes avant de soumettre le formulaire."}
                    </p>
                    <div className='flex justify-end space-x-4'>
                        <button onClick={onCancel} className=' bg-gray-300 flex items-center gap-2 text-gray-700 rounded-md hover:bg-gray-400 px-4 py-2 transition'>
                            Modifier <Edit2 className='w-4 h-4 ' />
                        </button>
                        <button onClick={onConfirm} className='px-4 py-4 flex items-center gap-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition'>
                            Confirmer <Check className='w-4 h-4' />
                        </button>


                    </div>
                </div>
            </div>
        </>
    )
}
