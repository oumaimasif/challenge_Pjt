import { Briefcase, CalendarHeart, Clock3, MapPinned, UserRoundCheck } from 'lucide-react'
import React from 'react'

export default function CarteProfil({ profil }) {
  return (
    <>
      {/* <div className='relative  max-w-80 rounded-lg -top-12 bg-purple-400 w-fit min-w-[250px]  '> */}
      <div style={{
        width: 'auto',
        maxWidth: '340px',
        minWidth: '250px',

      }} className='relative rounded-lg -top-12 md:p-0 p-1.5 bg-purple-400'>
        <img src="/images/image.png" alt="" className='h-42 w-42  md:border-none border-white shadow-lg md:rounded-tl-lg  md:rounded-none md:rounded-tr-lg  ' />
        {/* <div className='bg-black absolute top-1 text-center text-orange-500 p-1'>Follow</div> */}
        {/* <img src={profil.image} className='h-60 w-52'/> */}

        <div className='flex  text-white px-5 pb-5 pt-2 flex-col space-y-2 '>
          <span className='flex items-center justify-center  text-xl py-2 font-semibold gap-2'>{profil.nom} {profil.prenom}</span>
          <span className='flex items-center text-base gap-2'> <Briefcase />{profil.profession}</span>
          <span className='flex items-center  text-base gap-2'><MapPinned /> {profil.ville}</span>
          <span className='flex items-center  text-base gap-2'><UserRoundCheck /> {profil.disponible}</span>
          <span className='flex items-center  text-base gap-2'><Clock3 />{profil.heure}</span>
          <span className='flex items-center  text-base gap-2'><CalendarHeart />{profil.categorie}</span>

          {/* <CalendarHeart /> */}
        </div>

      </div>

    </>)
}      

