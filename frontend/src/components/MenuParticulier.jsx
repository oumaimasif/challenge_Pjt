import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function MenuParticulier() {
    const navigate= useNavigate();
    const handleDemandeAide = () => {
        navigate('/demandeAide');
    }
    const handleParticulier = () => {
        navigate('/particuliers');
    }
  return (
    <div className='bg-gray-100 flex gap-3 rounded-lg mt-8 px-3 py-2'>
        <button onClick={handleDemandeAide} className=' hover:bg-white p-2 rounded-xl text-black '>
           Liste des Demandes d'aides
        </button>
        <button onClick={handleParticulier} className=' hover:bg-white p-2 rounded-xl text-black '>
           Liste des Particuliers
        </button>

    </div>
  )
}
