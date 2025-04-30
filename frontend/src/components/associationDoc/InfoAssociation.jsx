import { Mail, MapIcon, Phone } from 'lucide-react'
import React from 'react'
import { useOutletContext } from 'react-router-dom'


export default function InfoAssociation() {
  const { profil } = useOutletContext();

  return (
    <div className="w-[340px] mt-3 md:w-[800px]">
      <div className=' relative -top-2 space-y-4 bg-white shadow-lg w-full rounded-lg p-6'>
        <h1 className='font-bold text-xl text-gray-700 mb-4'>À propos de l'association</h1>
        <p className='bg-blue-500 p-5 text-white rounded-lg mb-6'>{profil.description || "Aucune description disponible"}</p>


        <div className='bg-gray-50 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold text-gray-700 border-b pb-2 '>Détails de l'association</h2>
          <div className='space-y-2 mt-2'>
            <div>
              <span className=' mr-2 inline-block font-semibold'>Responsable:</span>
              {profil.nomPrenomResponsable || "Non renseigné"}
            </div>
            <div>
              <span className='mr-2 inline-block font-semibold'>Fonction:</span>
              {profil.fonctiondsAssociation || "Non renseigné"}
            </div>
            <div>
              <span className=' mr-2 inline-block font-semibold'>Créée le:</span>
              {profil.dateCreation ? new Date(profil.dateCreation).toLocaleDateString() : "Non renseigné"}
            </div>
            <div>
              <span className='mr-2 inline-block font-semibold '>Catégories:</span>
              <span className='flex flex-wrap gap-1 mt-1'>
                {profil.categorie && profil.categorie.length > 0 ?
                  profil.categorie.map((cat, index) => (
                    <span key={index} className='bg-orange-100 text-yellow-600 text-xs px-2 py-1 rounded-full'>
                      {cat}
                    </span>
                  )) : 'Non renseigné'

                }
              </span>
            </div>

          </div>
        </div>

        <div className='bg-gray-50 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold text-gray-700 border-b pb-2 '>Contactez-nous</h2>
          <div className='space-y-2 mt-2'>
            <div className='flex gap-2'>
              <Mail className='flex-shrink-0 h-6 w-6 text-blue-500' />
              <div>
                <span className='font-semibold mr-2'>Email:</span>
                <span className='break-all'>{profil.email || "Non renseigné"}</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Phone className='flex-shrink-0 h-6 w-6 text-blue-500' />
              <div className=''>
                <span className='font-semibold mr-2'>Téléphone:</span>
                <span className='break-all'>{profil.numeTelephone || "Non renseigné"}</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <MapIcon className='flex-shrink-0 h-6 w-6 text-blue-500' />
              <div>
                <span className='font-semibold mr-2'> Adresse:</span>
                <span className='break-all'>{profil.VilleAssociation || "Non renseigné"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
