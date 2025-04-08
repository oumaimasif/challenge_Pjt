import { BriefcaseBusiness, MapPin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ParticulierCard({ particulier }) {
  // date jj-mm-aaaa
  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifiée";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-sm">
    {particulier.image && (  
      <img src={particulier.image} alt="Photo de profile" className='w-full h-48 object-cover rounded-lg mb-4' />
      ) }
      
      <div className='flex justify-between items-start mb-4'>
  
          <h2 className='text-xl font-semibold '>{particulier.prenom} {particulier.nom}</h2>
          <p className='text-sm text-gray-600'>{particulier.civilite}</p>        
      </div>
      <div className='mb-4'>
      <BriefcaseBusiness />
        <p className='font-medium'>{particulier.profession}</p>
      </div>
      <div className='mb-4'>
       <MapPin className='w-4 h-4 '/>
        <p className='font-medium'>{particulier.ville}</p>
      </div>


      <div className="mb-4">
        <p className="text-sm text-gray-700 line-clamp-3">{particulier.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>

        </div>
        <div>
          <p className="text-gray-500">Date du besoin:</p>
          <p className="font-medium">{formatDate(particulier.dateBesoin)}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Link 
            to={`/particulier/${particulier._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Détails
          </Link>
          {particulier.etreContacter && (
            <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
              À contacter
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
