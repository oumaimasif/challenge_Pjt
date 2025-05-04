import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react';

function BtnAddannonce() {
    const navigate = useNavigate();
    const handleAddAnnonce = () => {
        navigate('/formAnnonce');
    }

  return (
    <div className=' flex flex-col items-center justify-center p-6  bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-md'>
        <div className='text-centre mb-4'>
        <h2 className="mb-3 text-xl md:text-2xl font-bold text-orange-600">Vous avez un projet ou un besoin en bénévoles ?
        </h2>
        <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
          Publiez votre annonce et trouvez des bénévoles motivés qui peuvent vous aider à réaliser votre mission. 
          Que ce soit pour un événement ponctuel, un projet à long terme ou un besoin spécifique, 
          votre communauté est là pour vous soutenir.
        </p>
      </div>
      
      <button 
        onClick={handleAddAnnonce}
        className="flex items-center justify-center 
        bg-orange-500 hover:bg-orange-600 
        text-white font-bold py-3 px-6 
        rounded-lg shadow-md transition duration-300 
        transform hover:scale-105 active:scale-95"
      >
        <Plus className="mr-2" size={24} />
        Créer une Nouvelle Annonce
      </button>
    </div>
  );
}

export default BtnAddannonce;