import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MapPinned, Briefcase, UserRoundCheck, Clock3, CalendarHeart } from "lucide-react"
import { useParams,Outlet,Link } from 'react-router-dom';


console.log("Partie Profile Benevole")
const ProfileBenevole = () => {

  const { id } = useParams();
  console.log("voila l'id :", id)
  const [profil, setProfil] = useState([]);
    // afficher partie

  useEffect(() => {
    const getInfo = async () => {
      const response = await axios.get(`http://localhost:5000/benevoles/profileBenevole/${id}`);
      console.log("le resultat APi :", response.data)

      setProfil(response.data)
    }
    getInfo();
  }, [])
  return (
    <div className='pt-32  min-h-screen'>
      <div className='m-auto mb-32'>

        {/* <div className=' h-40 w-10/12 bg-pink-200 relative rounded-br-[40px] rounded-tl-[40px] mx-auto'>
        <nav className='felx justify-center items-center'>
          <Link  className="text-xl  rounded-lg translate-x-3 duration-300 hover:shadow-lg text-purple-600 p-2" to={`/benevole/profileBenevole/${id}`}> Profil </Link>
          <Link className="text-xl  rounded-lg translate-x-3 duration-300 hover:shadow-lg text-purple-600 p-2"  to={`/benevole/annonces/${id}`}> Annonce </Link>
        </nav>
        </div> */}
        <div className='h-40 w-10/12 bg-pink-200 relative rounded-br-[40px] rounded-tl-[40px] mx-auto flex flex-col justify-end'>
  <nav className='flex justify-center  items-center gap-4 pb-4'>
    <Link 
      className="text-xl bg-white rounded-lg px-6 py-2 font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] text-purple-600" 
      to={`/benevole/profileBenevole/${id}`}
    >
      Profil
    </Link>
    <Link 
      className="text-xl bg-white rounded-lg px-6 py-2 font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] text-purple-600" 
      to={`/benevole/annonces/${id}`}
    >
      Annonce
    </Link>
  </nav>
</div>
        <div className='grid grid-cols-2'>

          <div className='relative rounded-lg -top-12 bg-purple-400 ml-56 h-[500px] w-[350px]'>
            <img src="/images/image.png" alt="" className=' rounded-tl-lg  rounded-tr-lg shadow-lg h-42 w-42 ' />
            {/* <div className='bg-black absolute top-1 text-center text-orange-500 p-1'>Follow</div> */}
            {/* <img src={profil.image} className='h-60 w-52'/> */}
            <div className='flex shadow-lg h[500] text-white px-5 pt-2 flex-col space-y-2 '>
              <span className='flex items-center text-lg font-semibold gap-2'>{profil.nom} {profil.prenom}</span>
              <span className='flex items-center text-base gap-2'> <Briefcase />{profil.profession}</span>
              <span className='flex items-center  text-base gap-2'><MapPinned /> {profil.ville}</span>
              <span className='flex items-center  text-base gap-2'><UserRoundCheck /> {profil.disponible}</span>
              <span className='flex items-center  text-base gap-2'><Clock3 />{profil.heure}</span>
              <span className='flex items-center  text-base gap-2'><CalendarHeart />{profil.categorie}</span>
              <span className='flex items-center  text-base gap-2'><CalendarHeart />{profil.categorie}</span>
              <span className='flex items-center  text-base gap-2'><CalendarHeart />{profil.categorie}</span>
              <span className='flex items-center  text-base gap-2'><CalendarHeart />{profil.categorie}</span>
              {/* <CalendarHeart /> */}
            </div>
          </div>

          <div className=" relative right-0 -top-9 space-y-4 bg-white shadow-lg w-2/3 rounded-lg  p-2  ">
          <span></span>
            <p className='bg-purple-400 p-5 text-white rounded-e-full'>{profil.description}</p>
            <p className='bg-purple-400 p-5 text-white rounded-e-full'>{profil.commentaires}</p>
            <h1>Contactez-Moi</h1>
            <div >
              <span>Adresse email : {profil.email}</span>
              <span> Numéro de Téléphone :{profil.numeTelephone}</span>

            </div>



          </div>
        </div>

      </div>
      <Outlet />

    </div>
  )
}

export default ProfileBenevole

