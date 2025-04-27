import { Briefcase, CalendarHeart, Clock3, MapPinned, UserRoundCheck } from 'lucide-react'
import React from 'react'

export default function CarteProfil({ profil }) {
  return (
    <>
      <div style={{ width: 'auto',maxWidth: '340px',minWidth: '250px',}} className=' sticky top-[96px] rounded-lg md:p-0 p-1.5 bg-purple-400'>
        <img src={`http://localhost:5000/${profil.image}`}  alt="Photo de profil" className= 'h-auto w-full  md:border-none border-white shadow-lg md:rounded-tl-lg  md:rounded-none md:rounded-tr-lg  ' />

        <div className='flex  text-white px-5 pb-5 pt-2 flex-col space-y-2 '>
          <span className='flex items-center justify-center  text-xl py-2 font-semibold gap-2'>{profil.nom} {profil.prenom}</span>
          <span className='flex items-center text-base gap-2'> <Briefcase />{profil.profession}</span>
          <span className='flex items-center  text-base gap-2'><MapPinned /> {profil.ville}</span>
          <span className='flex items-center  text-base gap-2'><UserRoundCheck /> {profil.disponible}</span>
          <span className='flex items-center  text-base gap-2'><Clock3 />{profil.heure}</span>
          <span className='flex items-center  text-base gap-2'><CalendarHeart />{profil.categorie}</span>
        </div>

      </div>

    </>)
}      

