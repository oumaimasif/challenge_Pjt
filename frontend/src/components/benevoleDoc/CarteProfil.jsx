import { Briefcase, CakeIcon, CalendarHeart, Clock3, Heart, MapPinned, UserRoundCheck } from 'lucide-react'
import React from 'react'
import {DateString} from '../dateAgeFormat';

export default function CarteProfil({ profil }) {
  return (
    <>
      <div style={{ width: 'auto',maxWidth: '340px',minWidth: '250px'}} className=' sticky top-[96px] rounded-lg bg-purple-400'>
        <img src={`http://localhost:5000/${profil.image}`}  alt="Photo de profil" className= 'h-auto w-full rounded-t-lg  md:border-none border-white shadow-lg md:rounded-tl-lg  md:rounded-none md:rounded-tr-lg  ' />

        <div className='flex  text-white px-5 pb-5 pt-2 flex-col   space-y-2 '>

          <span className='flex items-center justify-center  text-xl py-2 font-semibold gap-2'>{profil.nom || ""} {profil.prenom || ""}</span>
          {/* <span className='flex items-center text-base gap-2'> <Briefcase className='h-5 w-5 flex-shrink-0'/>{profil.profession || "Non renseigné"}</span> */}
          <span className='flex items-center  text-base gap-2'><MapPinned className='h-5 w-5 flex-shrink-0'/> {profil.ville || "Non renseigné"}</span>
          <span className='flex items-center  text-base gap-2'><UserRoundCheck className='h-5 w-5 flex-shrink-0' /> {profil.disponible || "Non renseigné"}</span>
          {/* <span className='flex items-center  text-base gap-2'><Clock3 className='h-5 w-5 flex-shrink-0' />{profil.heure || "Non renseigné"}</span> */}
          <span className='flex items-center  text-base gap-2'><CalendarHeart className='h-5 w-5 flex-shrink-0' />Membre peduis: {DateString(profil.createdAt) || "Non renseigné" }</span>
          <span className='flex items-center  text-base gap-2'><CakeIcon className='h-5 w-5 flex-shrink-0' />{DateString(profil.dateDeNaissance) || "Non renseigné" }</span>
        </div>

      </div>

    </>)
}      

