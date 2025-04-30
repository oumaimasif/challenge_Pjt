import React from 'react'
import { DateString } from '../dateAgeFormat'
import { Award, Building2, Calendar, CalendarHeart, Mail, MapPin, Phone } from 'lucide-react'

export default function CarteAssociation({ profil }) {
  return (
    <>
      <div style={{ width: 'auto', maxWidth: '340px', minWidth: '250px' }} className='sticky top-[96px] rounded-lg md:p-0 p-1.5 bg-blue-500'>
        <img src={`http://localhost:5000/${profil.image}`} alt="Image de l'association"
          className='h-auto w-full md:border-none border-white shadow-lg md:rounded-tl-lg md:rounded-none md:rounded-tr-lg' />

        <div className='flex text-white px-5 pb-5 pt-2 flex-col space-y-2'>
          <span className='flex items-center justify-center text-xl py-2 font-semibold gap-2'>
            {profil.nomAssociation || ""}
          </span>

          <span className='flex items-center  text-base gap-2'>
            <MapPin className='h-5 w-5 flex-shrink-0' />{profil.VilleAssociation || ""}
          </span>

          <span className='flex items-center  text-base gap-2'>
            <Award className='h-5 w-5 flex-shrink-0' />{profil.accreditee ? "Association Accréditée" : "Nom Accréditée"}
          </span>

          <span className='flex items-center  text-base gap-2'>
            <CalendarHeart className='h-5 w-5 flex-shrink-0' />Membre le: {profil.createdAt ? DateString(profil.createdAt) : "Non renseigné"}
          </span>

          <span className='flex items-center text-base gap-2 flex-wrap'>
            <div className='flex flex-wrap gap-1 mt-1'>
              {profil.categorie && profil.categorie.map((cat, index) => (
                <span key={index} className='bg-white text-orange-600 text-xs px-2 py-1 rounded-full'>
                  {cat}
                </span>
              ))}
            </div>
          </span>

        </div>
      </div>
    </>
  )
}
