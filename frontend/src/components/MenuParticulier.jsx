import { HelpCircle, Users } from 'lucide-react';
import React, { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



export default function MenuParticulier() {
    const navigate= useNavigate();
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
        <div className='bg-gray-100 flex justify-center rounded-lg mb-6 w-full max-w-md mx-auto overflow-hidden shadow-md'>
            <button 
                onClick={handleDemandeAide} 
                className={`flex items-center gap-2 py-3 px-4 transition-all ${
                    isDemandeActive 
                    ? 'bg-violet-500 text-white font-medium' 
                    : 'hover:bg-white text-gray-700'
                }`}
            >
                <HelpCircle className="w-5 h-5" />
                Liste des demandes d'aide
            </button>
            
            <button 
                onClick={handleParticulier} 
                className={`flex items-center gap-2 py-3 px-4 transition-all ${
                    isParticulierActive 
                    ? 'bg-violet-500 text-white font-medium' 
                    : 'hover:bg-white text-gray-700'
                }`}
            >
                <Users className="w-5 h-5" />
                Liste des particuliers
            </button>
        </div>
    );
}