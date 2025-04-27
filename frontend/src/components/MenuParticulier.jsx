import { HelpCircle, ListCheck, MessageSquareHeart, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom'

import React from 'react'

export default function MenuParticulier() {
    const navigate = useNavigate();
    const location = useLocation();
    const isDemandeActive = location.pathname === '/demandeAide';
    const isParticulierActive = location.pathname === '/particuliers';
    const handleDemandeAide = () => {
        navigate('/demandeAide');
    }
    const handleParticulier = () => {
        navigate('/particuliers');
    }

    return (
        <div className='bg-gray-100 mt-5 flex text-lg justify-center w-fit rounded-2xl mb-6 mx-auto overflow-hidden shadow-md'>
            <button onClick={handleDemandeAide} className={`flex items-center rounded-l-2xl gap-2 px-3 py-4 lg:py-3 lgpx-4 transition-all ${isDemandeActive ? 'bg-violet-500 text-white font-medium' : 'hover:bg-white text-gray-700'}`}>
                <HelpCircle className='h-5 w-5' />
                Demande d'aide
            </button>
            <button onClick={handleParticulier} className={`flex items-center rounded-r-2xl gap-2 px-3 py-4 lg:py-3 lgpx-4 transition-all ${isParticulierActive ? 'bg-violet-500 text-white font-medium' : 'hover:bg-white text-gray-700'}`}>
                <MessageSquareHeart className="w-5 h-5" />
                Particuliers
            </button>

        </div>
    )
}


